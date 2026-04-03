from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TelemetrySync(BaseModel):
    student_hash: str
    stress_score: int
    room_no: int
    block: str
    wifi_ssid: Optional[str] = None
    screen_time_mins: int
    social_mins: int
    sleep_disruption: bool
    # New Behavioral Fields
    sleep_hours: Optional[float] = 0.0
    steps_count: Optional[int] = 0
    social_interaction_ratio: Optional[float] = 0.0

class StressSummary(BaseModel):
    average_score: float
    high_risk_count: int
    total_students: int
