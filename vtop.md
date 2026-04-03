# VTOP Data Extraction & Scraping Architecture

This document outlines the architecture and workflow for extracting student data from the VIT VTOP portal within the UniCC project. Use this as a reference for understanding how the backend handles authentication, session cloning, and HTML scraping.

## 1. Core Technologies
- **Axios**: Handles all HTTP requests to VTOP endpoints.
- **Cheerio**: Parses raw HTML responses from VTOP into queryable DOM structures.
- **Node-Canvas**: Used for pixel-level image processing of CAPTCHA images.
- **Matrix-based MLP**: A local machine learning inference implementation for solving CAPTCHAs.

## 2. Authentication Flow ("The Handshake")
The entry point for session establishment is [login.ts](file:///d:/Projects/UniCC/backend/src/routes/login/login.ts).

1.  **Initial Request**: Fetches the VTOP login page to obtain the initial `JSESSIONID` and the hidden `_csrf` token.
2.  **CAPTCHA Acquisition**: Downloads the CAPTCHA image as a base64 string.
3.  **Local Solving**: The [solveCaptcha.ts](file:///d:/Projects/UniCC/backend/src/routes/login/solveCaptcha.ts) utility processes the image:
    - Filters pixels by saturation.
    - Segments the image into character blocks.
    - Performs matrix multiplication against pre-defined weights/biases in [bitmaps.ts](file:///d:/Projects/UniCC/backend/src/routes/login/bitmaps.ts).
4.  **Credential Submission**: Submits a `POST` request to `/vtop/login` with `username`, `password`, `_csrf`, and the solved `captchaStr`.
5.  **Session Cloning**: Upon success, the backend extracts:
    - **Cookies**: `JSESSIONID` and other persistent session markers.
    - **CSRF Token**: A fresh token for authenticated requests.
    - **AuthorizedID**: The unique internal ID (e.g., student register number) required for data routes.

## 3. Data Extraction Strategy
Data is extracted by simulating an authenticated browser session. Most VTOP data is hidden behind internal "engines."

### Key Extraction Workflow:
1.  **Request Construction**: Uses [VTOPClient.ts](file:///d:/Projects/UniCC/backend/src/lib/clients/VTOPClient.ts) (configured with `withCredentials: true` and a custom `User-Agent`).
2.  **POST Parameters**: Most endpoints (like Attendance or Marks) require `authorizedID`, `_csrf`, and a `semesterSubId` passed as `URLSearchParams`.
3.  **HTML Parsing**: The response (HTML) is loaded into Cheerio (`cheerio.load(res.data)`).
4.  **Table Traversal**: Queries the DOM using selectors (e.g., `$("#getStudentDetails table tbody tr")`) to extract text and links.

### Example File: [attendance.ts](file:///d:/Projects/UniCC/backend/src/routes/attendance.ts)
- **Primary Method**: Scrapes the main attendance table.
- **Recursive Detail Fetching**: Some routes (like attendance) require secondary requests to fetch "details" (e.g., specific class dates) by extracting `onclick` JavaScript links and parsing the resulting pop-up HTML.
- **Data Merging**: Fetches timetable data separately and merges it with attendance records to provide a complete view (Venue + Attendance %).

## 4. Key Files to Reference
- `backend/src/lib/clients/VTOPClient.ts`: Base API client configuration.
- `backend/src/routes/login/login.ts`: Authentication and session extraction logic.
- `backend/src/routes/login/solveCaptcha.ts`: CAPTCHA image processing and ML inference.
- `backend/src/routes/attendance.ts`: Reference for complex table scraping and data merging.
- `backend/src/routes/marks.ts`: Reference for simple table extraction.

## 5. Security & Persistence
- **SSL**: Uses a custom `httpsAgent` with `rejectUnauthorized: false` to handle VTOP's certificate quirks.
- **Cookie Header**: Cookies are manually managed and joined into a single string for headers in each request to maintain state across different endpoints.
