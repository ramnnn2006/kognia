import httpx
import base64
import time
from bs4 import BeautifulSoup
from typing import Tuple, Dict, Any, Optional

PRIMARY_URL = 'https://vtopcc.vit.ac.in/vtop'
VTOP_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
}

async def get_session_and_captcha(client: httpx.AsyncClient) -> Tuple[str, str, str]:
    """
    Extracts JSESSIONID, CSRF token, and captcha from VTOP login process.
    Matches the traced browser flow.
    """
    try:
        # Step 1: Initial visit to login page
        resp = await client.get(f"{PRIMARY_URL}/login", timeout=15.0)
        jsessionid = resp.cookies.get("JSESSIONID") or ""
        
        soup = BeautifulSoup(resp.text, 'lxml')
        csrf_token_el = soup.find('input', {'name': '_csrf'})
        csrf_token = csrf_token_el.get('value', '') if csrf_token_el else ""
        
        # Step 2: Request the built-in captcha via AJAX endpoint
        captcha_resp = await client.get(f"{PRIMARY_URL}/get/new/captcha", timeout=10.0)
        captcha_soup = BeautifulSoup(captcha_resp.text, 'lxml')
        
        captcha_img = captcha_soup.find('img', src=lambda s: s and s.startswith('data:image'))
        if not captcha_img:
            raise Exception("Captcha image not found in AJAX response")
            
        captcha_src = captcha_img.get('src', '')
        captcha_b64 = captcha_src.split(',')[-1]
        
        return jsessionid, csrf_token, captcha_b64
    except Exception as e:
        raise Exception(f"Could not connect to VTOP: {e}")

async def get_vtop_captcha_setup() -> Dict[str, Any]:
    """Exposes captcha setup to the frontend for manual solving."""
    async with httpx.AsyncClient(follow_redirects=True, verify=False) as client:
        jsessionid, csrf_token, captcha_b64 = await get_session_and_captcha(client)
        cookies = {name: value for name, value in client.cookies.items()}
        return {
            "captcha": captcha_b64,
            "jsessionid": jsessionid,
            "csrf_token": csrf_token,
            "cookies": cookies
        }

async def scrape_student_profile(client: httpx.AsyncClient, reg_no: str, csrf_token: str) -> Dict[str, Any]:
    """Scrapes student profile details from VTOP."""
    headers = {
        "Referer": f"{PRIMARY_URL}/content",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        **VTOP_HEADERS
    }
    
    payload = {
        "verifyMenu": "true",
        "authorizedID": reg_no,
        "_csrf": csrf_token,
        "nocache": str(int(time.time() * 1000))
    }
    
    resp = await client.post(f"{PRIMARY_URL}/studentsRecord/StudentProfileAllView", data=payload, headers=headers)
    soup = BeautifulSoup(resp.text, 'lxml')
    
    def get_val_by_label(label_text: str) -> Optional[str]:
        label_td = soup.find('td', string=lambda s: s and label_text in s)
        if label_td and label_td.find_next_sibling('td'):
            return label_td.find_next_sibling('td').text.strip()
        return None

    return {
        "student_name": get_val_by_label("Name") or "Student",
        "reg_no": reg_no,
        "email": get_val_by_label("Email") or "",
        "programme": get_val_by_label("Programme") or "B.Tech",
        "hostel_block": get_val_by_label("Hostel Block") or "Unknown",
        "room_no": get_val_by_label("Room No") or "000"
    }

async def perform_vtop_login(uname: str, passwd: str, captcha: str, csrf_token: str, cookies: Dict[str, str]) -> Dict[str, Any]:
    """Authenticates with VTOP using human-solved captcha and session cloning."""
    async with httpx.AsyncClient(headers=VTOP_HEADERS, cookies=cookies, timeout=15, follow_redirects=True, verify=False) as client:
        payload = {
            "uname": uname,
            "passwd": passwd,
            "captchaCheck": captcha.upper(),
            "_csrf": csrf_token
        }
        
        # 3. Perform the actual login
        headers = { "Referer": f"{PRIMARY_URL}/login", **VTOP_HEADERS }
        resp = await client.post(f"{PRIMARY_URL}/doLogin", data=payload, headers=headers)
        content = resp.text.lower()
        
        print(f"DEBUG: VTOP Response URL: {resp.url}")
        print(f"DEBUG: VTOP Status: {resp.status_code}")
        print(f"DEBUG: VTOP Response Body: {resp.text[:500]}")
        
        if "invalid captcha" in content:
            print("DEBUG: Caught 'Invalid Captcha' text")
            raise Exception("Invalid captcha solution.")
        
        if "invalid" in content and ("credential" in content or "password" in content):
            print("DEBUG: Caught 'Invalid Credentials' text")
            raise Exception("Invalid registration number or password.")
            
        # Success check: dashboard presence
        if "logout" in content or "menu" in content or "authorizedid" in content or "content" in resp.url.path:
            print("DEBUG: Login SUCCESS detected!")
            new_soup = BeautifulSoup(resp.text, 'lxml')
            new_csrf_el = new_soup.find('input', {'name': '_csrf'})
            active_csrf = new_csrf_el.get('value', '') if new_csrf_el else csrf_token
            
            profile = await scrape_student_profile(client, uname, active_csrf)
            return { "status": "success", **profile }
        
        print(f"DEBUG: Login FAILED. Content Sample: {resp.text[:300]}")
        raise Exception("Authentication failed. Session could be unstable.")
