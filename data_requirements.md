# COGNIA: Advanced Behavioral Data Requirements

This document outlines the "Dream Data" sync requirements for the Cognia prototype. Since this is a specialized test environment, we are maximizing the fidelity of our behavioral sensing.

## 1. Passive Sleep & Circadian Biomarkers
*   **Phone Inactivity Latency**: Time between the last "Screen Off" event at night and the first "Screen On" event in the morning.
    *   *Signal*: Detecting Insomnia vs. Over-sleeping (both are primary depression/anxiety indicators).
*   **Charging Status Time**: When the phone is plugged in vs. when it is unplugged.
    *   *Signal*: Identifying regular habit cycles.

## 2. Social & Withdrawal Metrics
*   **Notification Response Latency**: The average time (in seconds) between a Notification arriving and the user clicking/dismissing it.
    *   *Signal*: High delay consistently indicates social withdrawal or high avoidance anxiety.
*   **Interaction Ratio**: (Notifications Replied To / Notifications Received).
    *   *Signal*: Drops in this ratio are the strongest indicators of a student "shutting down" socially.

## 3. Digital Environment (Doomscrolling)
*   **App Category Affinity**: Percentage of time spent on "High-Valence Social Media" (Instagram, TikTok) vs. "Productivity" (GitHub, Notion).
    *   *Signal*: High social time with low response latency usually indicates a "doomscrolling" loop.
*   **Unlock Frequency**: How many times the device is unlocked per hour.
    *   *Signal*: Correlates with anxiety and high-distraction states.

## 4. Physical & Ecological Context
*   **WiFi SSID Diversity**: Number of unique WiFi access points connected to per 24-hour period.
    *   *Signal*: A low count (1 or 2 hubs only) indicates a student hasn't left their room/hostel for over 24 hours.
*   **Mean Ambient Light**: Average brightness levels captured during phone usage.
    *   *Signal*: Consistently low light levels suggest the student is isolating in a dark room during daylight hours.
*   **Physical Activity Index**: Real-time Step counts and Movement velocity (via phone accelerometer).

## 5. Media Valence (Emotional Tone)
*   **Music BPM / Mood**: Average BPM and "Happiness" score of the songs currently playing on Spotify/YouTube Music.
    *   *Signal*: A sudden shift to low-BPM, low-valence music over multiple days matches clinical depression traits.

---

### Implementation Priority for "Automate":
1.  **Sleep Latency** (Last Off -> First On)
2.  **Notification Delay** (Arrival -> Action)
3.  **SSID Diversity** (Hub count per day)
4.  **Social Interaction Ratio**
