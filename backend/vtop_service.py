import asyncio
import json
import subprocess
import os
from typing import Dict, Any, Optional

# Paths
ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
INDEX_JS = os.path.join(ROOT_DIR, "index.js")

async def get_vtop_captcha_setup() -> Dict[str, Any]:
    """
    Since the Node script (index.js) now has an AUTO-SOLVE captcha solver,
    we no longer need to present the captcha to the student for manual input.
    We just return a placeholder or null signals.
    """
    return {
        "auto_solve": True,
        "message": "Institutional identity node anchored to Google Biometrics. Handshake is automated."
    }

async def perform_vtop_login(
    uname: str, passwd: str, captcha: str = "", csrf_token: str = "", cookies: Dict[str, str] = {}
) -> Dict[str, Any]:
    """
    Calls the Node.js scraper (index.js) which handles the specialized VIT captcha 
    solving logic, session anchoring, and full profile extraction in one shot.
    """
    try:
        # Construct command to run index.js with credentials
        # We run it from the root directory so it can find bitmaps.js
        cmd = ["node", INDEX_JS, uname, passwd]
        
        process = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            cwd=ROOT_DIR
        )

        stdout, stderr = await process.communicate()
        
        if process.returncode != 0:
            err_json = stderr.decode().strip()
            try:
                err_data = json.loads(err_json)
                raise Exception(err_data.get("error", "Institutional handshake failed"))
            except:
                raise Exception(f"Node Engine Error: {stderr.decode()}")

        # Capture the JSON output from the Node script
        out_str = stdout.decode().strip()
        
        # In case of multiple lines, we want the last JSON object (the profile)
        lines = out_str.splitlines()
        for line in reversed(lines):
            try:
                data = json.loads(line)
                # Check for login errors handled by the script
                if "loginResponse" in data and not data["loginResponse"].get("authorised"):
                    raise Exception(data["loginResponse"].get("error_message", "Login Rejected"))
                
                return {"status": "success", **data}
            except json.JSONDecodeError:
                continue
                
        raise Exception("Handshake successful but no identity nodes retrieved.")

    except Exception as e:
        print(f"VTOP Engine Internal Failure: {e}")
        raise Exception(f"VTOP Handshake Rejected: {str(e)}")

# Placeholder for backward compatibility
async def get_session_and_captcha(client):
    pass

async def scrape_student_profile(client, reg_no, csrf_token):
    pass
