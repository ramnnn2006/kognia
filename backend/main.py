from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

import models, schemas, crud, database, vtop_service
from pydantic import BaseModel
from typing import Dict, Any

class VtopLoginRequest(BaseModel):
    uname: str
    passwd: str
    captcha: str
    cookies: Dict[str, str]

app = FastAPI(title="Cognia — Backend")

# Enable CORS for Next.js Dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Telemetry Endpoint (Called by Android App) ──────────────────────
@app.post("/api/v1/telemetry/sync", status_code=201)
async def sync_telemetry(telemetry: schemas.TelemetrySync, db: AsyncSession = Depends(database.get_db)):
    try:
        return await crud.sync_telemetry_data(db, telemetry)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ── Heatmap Data (Called by Next.js Dashboard) ──────────────────────
@app.get("/api/v1/heatmap/summary")
async def get_heatmap(db: AsyncSession = Depends(database.get_db)):
    try:
        stats = await crud.get_heatmap_stats(db)
        # Transform for frontend
        return [
            {
                "block": s.block,
                "room": s.room,
                "avg_score": round(s.avg_score, 1),
                "count": s.student_count
            }
            for s in stats
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/auth/vtop/captcha")
async def get_captcha():
    try:
        return await vtop_service.get_vtop_captcha()
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"VTOP Handshake Failed: {str(e)}")

@app.post("/api/v1/auth/vtop/login")
async def vtop_login(details: VtopLoginRequest):
    try:
        return await vtop_service.perform_vtop_login(details.uname, details.passwd, details.captcha, details.cookies)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"VTOP Login Failed: {str(e)}")

@app.get("/api/v1/health")
async def health():
    return {"status": "ok"}
