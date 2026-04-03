# 🛡️ COGNIA — The Digital Sanctuary
**Beyond Questionnaires: Passive Behavioral Monitoring for Institutional Wellness.**

COGNIA is a privacy-first mental health platform designed for university campuses. Unlike traditional wellness apps that rely on flawed self-reporting, Cognia captures **Digital Biomarkers** passively—detecting crises before they manifest through objective behavioral data.

---

## 🎨 The Innovation: Institutional Immunity 
Traditional mental health monitoring is **reactive**. Cognia makes it **proactive**.

- **Welfare Heatmap**: An institutional dashboard that visualizes stress patterns across rooms and floors using anonymized telemetry.
- **Privacy Shield**: All student data is hashed using **SHA-256** on-device. No names, no register numbers, only behavior.
- **VTOP Handshake**: Secure student authentication via institutional portals without storing credentials.

---

## 🏗️ Technical Architecture

### 📱 Android Node (The Sensing Engine)
- **Tech**: Kotlin, Jetpack Compose, WorkManager.
- **Biomarkers**:
    - **Sleep Latency**: Analyzing screen-off/on cycles for insomnia detection.
    - **Social Ratio**: Real-time notification response latency (withdrawal signaling).
    - **SSID Diversity**: Location variety tracking (isolation detection).

### 🖥️ Warden Dashboard (The Command Center)
- **Tech**: Next.js 16 (Turbopack), Tailwind 4, Framer Motion.
- **Modules**:
    - **High-Risk Triage**: Automated clinical alerts for outlier behavioral signals.
    - **Institutional Trends**: Real-time campus-wide stress and activity curves.
    - **Identity Audit Log**: Transparent, immutable sync registry for privacy auditing.

### ⚙️ Backend Hub (The Telemetry Engine)
- **Tech**: FastAPI (Python), SQLAlchemy (Async), NeonDB (PostgreSQL).
- **Security**: Asynchronous handshakes with JWT-free session cloning.

---

## 🚀 Quick Setup

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # venv\Scripts\activate on Windows
pip install -r requirements.txt
python init_db.py
python run.py
```

### Web Dashboard
```bash
cd web
npm install
npm run dev
```

### Android App
1. Open `android/` in Android Studio.
2. Ensure `BASE_URL` in `Constants.kt` points to your backend.
3. Build and Deploy!

---

## 🔒 Privacy & Ethics
Cognia adheres to a strict "Patterns, Not People" protocol. Identity anonymization happens at the source, ensuring that university administration sees **behavioral health trends**, not individual student identities.

Built for the **VIT Chennai Hackathon 2026**.
