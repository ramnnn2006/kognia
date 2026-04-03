import os
import httpx
import json
from typing import Dict, Any, Optional

# VTOP-Auth Node Server Configuration
VTOP_AUTH_URL = "http://localhost:4000/fetch"

async def get_vtop_captcha_setup() -> Dict[str, Any]:
    """
    Since the Node server (vtop-auth) has an AUTO-SOLVE captcha solver,
    we just report that the handshake is automated.
    """
    return {
        "auto_solve": True,
        "message": "Institutional identity node anchored to Google Biometrics. Handshake is automated."
    }

async def perform_vtop_login(
    uname: str, passwd: str, captcha: str = "", csrf_token: str = "", cookies: Dict[str, str] = {}
) -> Dict[str, Any]:
    """
    Calls the Node.js Express server (port 4000) which handles the full VTOP handshake,
    captcha solving, and identity extraction.
    """
    async with httpx.AsyncClient(timeout=45.0) as client:
        try:
            # 1. Dispatch POST /fetch to the VTOP-Auth node engine
            response = await client.post(
                VTOP_AUTH_URL,
                json={"username": uname, "password": passwd},
                headers={"Content-Type": "application/json"}
            )
            
            # 2. Check for HTTP level errors
            if response.status_code != 200:
                # Attempt to extract detailed error JSON if available
                try:
                    err_node = response.json()
                    raise Exception(err_node.get("error", f"Node Handshake Failed (HTTP {response.status_code})"))
                except:
                    raise Exception(f"Node Engine Offline or Rejecting Connection (HTTP {response.status_code})")
            
            data = response.json()
            
            # 3. Handle service-level failure signals from the Node script
            if not data.get("success"):
                raise Exception(data.get("error", "Handshake successful but rejection signal received."))

            # 4. Success: Retrieve full identity profile
            return {
                "status": "success",
                "data": data.get("data")
            }

        except httpx.ConnectError:
            raise Exception("VTOP-Auth Node Server (Port 4000) is not running. Please start it to enable VTOP functionality.")
        except Exception as e:
            print(f"VTOP Anchor Internal Failure: {e}")
            raise Exception(f"VTOP Handshake Rejected: {str(e)}")

# Backward Compatibility Placeholders
async def get_session_and_captcha(client): pass
async def scrape_student_profile(client, reg_no, csrf_token): pass
