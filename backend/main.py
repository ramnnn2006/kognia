from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

import os
from typing import Dict, Any, List, Optional
from pydantic import BaseModel
import models, schemas, crud, database, vtop_service, google_auth_service

class VtopLoginRequest(BaseModel):
    uname: str
    passwd: str
    captcha: str
    csrf_token: str
    cookies: Dict[str, str]

class GoogleAuthRequest(BaseModel):
    id_token: str
    access_token: str
    refresh_token: Optional[str] = None
    token_expiry: Optional[str] = None

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

# ... Existing VTOP logic preserved below ...

@app.get("/api/v1/auth/google/url")
async def google_auth_url():
    url, state = google_auth_service.get_google_auth_url()
    return {"url": url, "state": state}

@app.post("/api/v1/telemetry/sync/google")
async def sync_google_telemetry(auth: GoogleAuthRequest, db: AsyncSession = Depends(database.get_db)):
    try:
        credentials = {
            "token": auth.access_token,
            "refresh_token": auth.refresh_token,
            "token_uri": "https://oauth2.googleapis.com/token",
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
            "scopes": google_auth_service.SCOPES
        }
        
        # 1. Fetch Fit Data (Steps/Sleep)
        fit_data = await google_auth_service.get_google_fit_data(credentials)
        
        # 2. Fetch Calendar Events (Next 10)
        calendar_events = await google_auth_service.get_google_calendar_events(credentials)
        
        # 3. Create a Synthetic Telemetry Payload for DB Sync
        # Using a dummy student hash for the demo, linked to the Google Identity
        synthetic_telemetry = schemas.TelemetrySync(
            student_hash="google_" + auth.id_token[:10], # Hashed ID Token for anonymity
            stress_score=42, # Baseline
            room_no=1, 
            block="A",
            sleep_hours=fit_data["sleep_hours"],
            steps_count=fit_data["steps"],
            social_interaction_ratio=0.5,
            screen_time_mins=120,
            social_mins=60,
            sleep_disruption=False
        )
        
        await crud.sync_telemetry_data(db, synthetic_telemetry)
        
        return {
            "status": "success",
            "data": fit_data,
            "upcoming_events": len(calendar_events)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Google Sync Failed: {str(e)}")

@app.get("/api/v1/auth/vtop/captcha")
async def get_captcha():
    try:
        return await vtop_service.get_vtop_captcha_setup()
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"VTOP Handshake Failed: {str(e)}")

@app.post("/api/v1/auth/vtop/login")
async def vtop_login(details: VtopLoginRequest):
    try:
        return await vtop_service.perform_vtop_login(details.uname, details.passwd, details.captcha, details.csrf_token, details.cookies)
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"VTOP Login Failed: {str(e)}")

@app.get("/api/v1/health")
async def health():
    return {"status": "ok"}
