import httpx
import time
from bs4 import BeautifulSoup
from typing import Tuple, Dict, Any, Optional, List

PRIMARY_URL = 'https://vtopcc.vit.ac.in/vtop'
VTOP_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "Accept": "*/*",
    "Accept-Language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive",
}


# ---------------------------------------------------------------------------
# Session / Captcha
# ---------------------------------------------------------------------------

async def get_session_and_captcha(client: httpx.AsyncClient) -> Tuple[str, str, str]:
    try:
        resp = await client.get(f"{PRIMARY_URL}/login", timeout=15.0)
        jsessionid = resp.cookies.get("JSESSIONID") or ""

        soup = BeautifulSoup(resp.text, 'lxml')
        csrf_el = soup.find('input', {'name': '_csrf'})
        csrf_token = csrf_el.get('value', '') if csrf_el else ""

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
    async with httpx.AsyncClient(follow_redirects=True, verify=False) as client:
        jsessionid, csrf_token, captcha_b64 = await get_session_and_captcha(client)
        cookies = {name: value for name, value in client.cookies.items()}
        return {
            "captcha": captcha_b64,
            "jsessionid": jsessionid,
            "csrf_token": csrf_token,
            "cookies": cookies,
        }


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

async def trigger_engine(client: httpx.AsyncClient, path: str):
    try:
        await client.get(f"{PRIMARY_URL}/{path}", headers=VTOP_HEADERS, timeout=10.0)
    except Exception:
        pass


def _label_tds(soup: BeautifulSoup) -> List[Any]:
    return [
        td for td in soup.find_all('td')
        if '#d4d3d3' in (td.get('style') or '')
    ]


def _value_td(label_td) -> Optional[str]:
    sibling = label_td.find_next_sibling('td')
    if sibling:
        return sibling.get_text(strip=True)
    return None


def get_field(soup: BeautifulSoup, label: str) -> Optional[str]:
    label_upper = label.strip().upper()
    for td in _label_tds(soup):
        cell_text = td.get_text(strip=True).upper().rstrip(':').strip()
        if cell_text == label_upper:
            return _value_td(td)
    return None


def get_field_after_section(soup: BeautifulSoup, section_header: str, label: str) -> Optional[str]:
    section_upper = section_header.strip().upper()
    label_upper = label.strip().upper()

    section_td = None
    for td in soup.find_all('td'):
        style = td.get('style') or ''
        if '#a5bbff' in style and td.get_text(strip=True).upper() == section_upper:
            section_td = td
            break

    if section_td is None:
        return None

    for td in section_td.find_all_next('td'):
        style = td.get('style') or ''
        if '#a5bbff' in style and td.get_text(strip=True).upper() != section_upper:
            break
        if '#d4d3d3' in style:
            cell_text = td.get_text(strip=True).upper().rstrip(':').strip()
            if cell_text == label_upper:
                return _value_td(td)

    return None


def _read_label_tag(soup: BeautifulSoup, label_text: str) -> Optional[str]:
    """
    Reads values from the card-header area where data lives in <label> pairs:
        <label style="color:#c7254e; font-weight:bold;">VIT EMAIL: </label>
        <label>yeswanth.ram2024@vitstudent.ac.in</label>
    """
    label_upper = label_text.strip().upper()
    for lbl in soup.find_all('label'):
        text = lbl.get_text(strip=True).upper().rstrip(':').strip()
        if text == label_upper:
            next_lbl = lbl.find_next_sibling('label')
            if next_lbl:
                return next_lbl.get_text(strip=True)
    return None


def _extract_csrf(soup: BeautifulSoup) -> Optional[str]:
    el = soup.find('input', {'name': '_csrf'})
    return el.get('value') if el else None


def _is_login_page(resp: httpx.Response) -> bool:
    """
    True if VTOP bounced us back to the login page.
    Checks URL and body — login page always has captchaCheck input.
    """
    if 'vtop/login' in str(resp.url):
        return True
    if 'captchacheck' in resp.text.lower():
        return True
    return False


def _is_authenticated(resp: httpx.Response) -> bool:
    """
    True only for a real authenticated VTOP page.
    Must NOT be the login page AND must have the authorizedID marker.
    """
    if _is_login_page(resp):
        return False
    content = resp.text.lower()
    return 'authorizedid' in content or 'vtop/content' in str(resp.url).lower()


# ---------------------------------------------------------------------------
# Scraping
# ---------------------------------------------------------------------------

async def scrape_attendance(
    client: httpx.AsyncClient, reg_no: str, csrf_token: str
) -> List[Dict[str, Any]]:
    await trigger_engine(client, "processViewAttendance")
    payload = {
        "semesterSubId": "CH2024251",
        "authorizedID": reg_no,
        "_csrf": csrf_token,
    }
    resp = await client.post(
        f"{PRIMARY_URL}/processViewAttendance", data=payload, headers=VTOP_HEADERS
    )
    soup = BeautifulSoup(resp.text, 'lxml')
    rows = soup.select("#getAttendance table tbody tr")
    attendance_data = []
    for row in rows:
        cols = row.find_all('td')
        if len(cols) > 8:
            attendance_data.append({
                "code": cols[1].get_text(strip=True),
                "title": cols[2].get_text(strip=True),
                "percentage": cols[8].get_text(strip=True) + "%",
            })
    return attendance_data


async def scrape_marks(
    client: httpx.AsyncClient, reg_no: str, csrf_token: str
) -> List[Dict[str, Any]]:
    await trigger_engine(client, "processViewStudentMark")
    payload = {
        "semesterSubId": "CH2024251",
        "authorizedID": reg_no,
        "_csrf": csrf_token,
    }
    resp = await client.post(
        f"{PRIMARY_URL}/processViewStudentMark", data=payload, headers=VTOP_HEADERS
    )
    soup = BeautifulSoup(resp.text, 'lxml')
    rows = soup.select("#getStudentMark table tbody tr")
    marks_data = []
    for row in rows:
        cols = row.find_all('td')
        if len(cols) > 7:
            marks_data.append({
                "code": cols[1].get_text(strip=True),
                "title": cols[2].get_text(strip=True),
                "mark": cols[7].get_text(strip=True),
            })
    return marks_data


async def scrape_student_profile(
    client: httpx.AsyncClient, reg_no: str, csrf_token: str
) -> Dict[str, Any]:
    """
    Scrapes the VTOP student profile page.

    Flow:
      1. Hit /content to warm up the VTOP session state (browser does this too)
      2. POST to StudentProfileAllView with fresh CSRF
      3. Parse the full HTML — all accordion data IS in the HTML regardless
         of collapse state, so no JS needed.

    Cell colours:
      Label cells  → background-color: #d4d3d3  (grey)
      Value cells  → background-color: #FAF0DD  (cream)
      Section hdrs → background-color: #a5bbff  (blue)
    """
    # Step 2: POST to profile endpoint directly (session is already warm from doLogin)
    headers = {
        "Referer": f"{PRIMARY_URL}/content",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        **VTOP_HEADERS,
    }
    payload = {
        "verifyMenu": "true",
        "authorizedID": reg_no,
        "_csrf": csrf_token,
        "nocache": str(int(time.time() * 1000)),
    }

    resp = await client.post(
        f"{PRIMARY_URL}/studentsRecord/StudentProfileAllView",
        data=payload,
        headers=headers,
    )

    print(f"DEBUG profile  status={resp.status_code}  url={resp.url}")
    print(f"DEBUG profile body (first 600):\n{resp.text[:600]}")

    if _is_login_page(resp):
        raise Exception("VTOP session expired before profile could be fetched.")

    soup = BeautifulSoup(resp.text, 'lxml')

    # --- Personal ---
    student_name = get_field(soup, "STUDENT NAME") or "Student"
    app_no       = get_field(soup, "APPLICATION NUMBER") or ""
    dob          = get_field(soup, "DATE OF BIRTH") or ""
    blood_group  = get_field(soup, "BLOOD GROUP") or ""
    mobile       = get_field(soup, "MOBILE NUMBER") or ""
    native_lang  = get_field(soup, "NATIVE LANGUAGE") or ""
    native_state = get_field(soup, "NATIVE STATE") or ""
    community    = get_field(soup, "COMMUNITY") or ""
    nationality  = get_field(soup, "NATIONALITY") or ""
    hosteller    = get_field(soup, "HOSTELLER") or ""
    city         = get_field(soup, "CITY") or ""
    state_val    = get_field(soup, "STATE") or ""
    pincode      = get_field(soup, "PINCODE") or ""
    email_p      = get_field(soup, "EMAIL") or ""

    # --- Card header <label> pairs ---
    vit_email   = _read_label_tag(soup, "VIT EMAIL")        or get_field(soup, "VIT EMAIL")        or ""
    register_no = _read_label_tag(soup, "REGISTER NUMBER")  or get_field(soup, "REGISTER NUMBER")  or reg_no
    programme   = _read_label_tag(soup, "PROGRAM & BRANCH") or get_field(soup, "PROGRAM & BRANCH") or ""
    school_name = _read_label_tag(soup, "SCHOOL NAME")      or get_field(soup, "SCHOOL NAME")      or ""

    # --- Family (ambiguous labels — use section-scoped lookup) ---
    father_name = (
        get_field_after_section(soup, "FATHER DETAILS", "FATHER NAME")
        or get_field(soup, "FATHER NAME") or ""
    )
    mother_name = (
        get_field_after_section(soup, "MOTHER DETAILS", "NAME")
        or get_field(soup, "MOTHER NAME") or ""
    )

    # --- Proctor ---
    proctor_name        = get_field(soup, "FACULTY NAME")          or "Not Assigned"
    proctor_email       = get_field(soup, "FACULTY EMAIL")         or ""
    proctor_designation = get_field(soup, "FACULTY DESIGNATION")   or ""
    proctor_mobile      = get_field(soup, "FACULTY MOBILE NUMBER") or ""

    # --- Hostel ---
    hostel_block = get_field(soup, "Block Name")       or get_field(soup, "BLOCK NAME")       or "Hosteller"
    room_no      = get_field(soup, "Room No.")         or get_field(soup, "ROOM NO")          or "N/A"
    bed_type     = get_field(soup, "Bed Type")         or get_field(soup, "BED TYPE")         or ""
    mess_info    = get_field(soup, "Mess Information") or get_field(soup, "MESS INFORMATION") or "Standard Mess"

    print(f"DEBUG extracted → name={student_name} | reg={register_no} | email={vit_email} | block={hostel_block} | room={room_no} | proctor={proctor_name}")

    attendance = await scrape_attendance(client, reg_no, fresh_csrf)
    marks      = await scrape_marks(client, reg_no, fresh_csrf)

    return {
        "student_name":         student_name,
        "reg_no":               register_no,
        "app_no":               app_no,
        "vit_email":            vit_email,
        "programme":            programme,
        "school":               school_name,
        "dob":                  dob,
        "blood_group":          blood_group,
        "mobile":               mobile,
        "native_lang":          native_lang,
        "native_state":         native_state,
        "community":            community,
        "nationality":          nationality,
        "hosteller":            hosteller,
        "city":                 city,
        "state":                state_val,
        "pincode":              pincode,
        "email_personal":       email_p,
        "father_name":          father_name,
        "mother_name":          mother_name,
        "proctor_name":         proctor_name,
        "proctor_email":        proctor_email,
        "proctor_designation":  proctor_designation,
        "proctor_mobile":       proctor_mobile,
        "hostel_block":         hostel_block,
        "room_no":              room_no,
        "bed_type":             bed_type,
        "mess_info":            mess_info,
        "attendance":           attendance,
        "marks":                marks,
    }


# ---------------------------------------------------------------------------
# Login entry point
# ---------------------------------------------------------------------------

async def perform_vtop_login(
    uname: str, passwd: str, captcha: str, csrf_token: str, cookies: Dict[str, str]
) -> Dict[str, Any]:
    async with httpx.AsyncClient(
        headers=VTOP_HEADERS,
        cookies=cookies,
        timeout=30,
        follow_redirects=True,
        verify=False,
    ) as client:
        payload = {
            "uname": uname.strip().upper(),
            "passwd": passwd,
            "captchaCheck": captcha.strip().upper(),
            "_csrf": csrf_token,
        }
        
        login_headers = {
            "Referer": f"{PRIMARY_URL}/login",
            "Origin": "https://vtopcc.vit.ac.in",
            "Content-Type": "application/x-www-form-urlencoded",
            **VTOP_HEADERS,
        }

        print(f"DEBUG INITIATING HANDSHAKE: user={uname.strip().upper()} captcha={captcha.strip().upper()}")
        resp = await client.post(
            f"{PRIMARY_URL}/doLogin", 
            data=payload, 
            headers=login_headers,
            timeout=30.0
        )

        print(f"DEBUG doLogin → url={resp.url}  status={resp.status_code}")
        
        content_lower = resp.text.lower()

        # Hard failure checks (Check for username input which exists only on login page)
        if 'id="uname"' in resp.text or 'name="uname"' in resp.text:
            err_soup = BeautifulSoup(resp.text, 'lxml')
            err_el = (
                err_soup.find(class_=lambda c: c and 'error' in c.lower())
                or err_soup.find(class_=lambda c: c and 'alert' in c.lower())
            )
            err_msg = err_el.get_text(strip=True) if err_el else ""
            print(f"DEBUG: Login REJECTED. Captured Error: '{err_msg}'")
            raise Exception(err_msg or "VTOP rejected the handshake (Invalid session).")

        # Success check: Redirection to content or presence of logout/authorizedID
        is_at_content = "vtop/content" in str(resp.url).lower() or "vtop/content" in content_lower
        has_authorized = "authorizedid" in content_lower or "authorizedid" in str(resp.url).lower()
        has_logout = "href=\"logout\"" in content_lower or "logout" in content_lower
        
        if is_at_content or has_authorized or has_logout:
            print(f"DEBUG: Handshake SUCCESS! Content: {is_at_content}, AuthID: {has_authorized}, Logout: {has_logout}")
            
            # SESSION ANCHORING: Hit /content once to solidify the session
            # This mirrors the browser loading the 'Home' page after login.
            anchor_resp = await client.get(f"{PRIMARY_URL}/content", timeout=20.0)
            print(f"DEBUG: Session Anchored at {anchor_resp.url} (Status {anchor_resp.status_code})")
            
            anchor_soup = BeautifulSoup(anchor_resp.text, 'lxml')
            final_csrf = _extract_csrf(anchor_soup) or csrf_token
            
            # Now fetch profile with the anchored session
            profile = await scrape_student_profile(client, uname, final_csrf)
            return {"status": "success", **profile}

        # If we reached here, it's a rejection (even if no error msg found)
        err_soup = BeautifulSoup(resp.text, 'lxml')
        
        # Specific VTOP error patterns
        if "invalid captcha" in content_lower:
            raise Exception("Invalid Captcha. Please try again.")
        if "timeout" in content_lower or "session expired" in content_lower:
            raise Exception("VTOP Session Expired. Please refresh the captcha.")
        if "already logged" in content_lower:
            raise Exception("User is already logged in or session is active elsewhere.")

        # Generic error harvesting
        err_el = (
            err_soup.find(class_=lambda c: c and 'error' in c.lower())
            or err_soup.find(class_=lambda c: c and 'alert' in c.lower())
            or err_soup.find(style=lambda s: s and 'red' in s.lower())
        )
        err_msg = err_el.get_text(strip=True) if err_el else ""
        
        print(f"DEBUG: Rejection at {resp.url}. Collected Error: '{err_msg}'")
        
        if "vtop/login" in str(resp.url).lower():
            raise Exception(err_msg or "Login failed. Incorrect captcha or credentials.")
        
        raise Exception(f"VTOP Handshake Failed (Status {resp.status_code}).")
