import httpx
import base64
from typing import Dict, Any, Optional

VTOP_BASE_URL = "https://vtop.vitcc.ac.in/vtop"
VTOP_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
}


async def get_vtop_captcha() -> Dict[str, Any]:
    """Starts a VTOP session and fetches a new CAPTCHA."""
    async with httpx.AsyncClient(timeout=10, follow_redirects=True) as client:
        # 1. Initial handshake to get basic cookies
        await client.get(f"{VTOP_BASE_URL}/initialProcess", headers=VTOP_HEADERS)
        
        # 2. Get the CAPTCHA image
        captcha_res = await client.get(f"{VTOP_BASE_URL}/vtop/get/new/captcha", headers=VTOP_HEADERS)
        
        if captcha_res.status_code != 200:
            raise Exception("VTOP CAPTCHA fetch failed")
            
        # Encode image to base64 for the frontend
        captcha_b64 = base64.b64encode(captcha_res.content).decode("utf-8")
        
        # Store cookies as a dict to pass back to the frontend/client
        cookies = {name: value for name, value in client.cookies.items()}
        
        return {
            "captcha": captcha_b64,
            "cookies": cookies
        }


async def perform_vtop_login(uname: str, passwd: str, captcha: str, cookies: Dict[str, str]) -> Dict[str, Any]:
    """Submits credentials to VTOP using the session cookies."""
    async with httpx.AsyncClient(headers=VTOP_HEADERS, cookies=cookies, timeout=10, follow_redirects=True) as client:
        payload = {
            "uname": uname,
            "passwd": passwd,
            "captchaCheck": captcha.upper(), # Handled exactly like the manual
        }
        
        # 3. Perform the actual login
        login_res = await client.post(f"{VTOP_BASE_URL}/vtop/doLogin", data=payload)
        
        if "Invalid" in login_res.text or "Error" in login_res.text:
             raise Exception("Invalid VTOP Credentials or Captcha")
             
        # If login was successful, VTOP usually redirects. 
        # In this prototype, we'll return a mocked success with the student details.
        # Ideally, we scrape the student profile here.
        return {
            "status": "success",
            "student_name": "Demo Student", # Replace with Scraped Data in Ph 2
            "reg_no": uname,
            "programme": "B.Tech CSE",
            "room_no": "A-301" # Extracted from floor-map (or scraped)
        }
