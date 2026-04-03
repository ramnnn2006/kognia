import os
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
import datetime
from typing import Dict, Any, List

# Scopes required for Cognia's behavioral telemetry
SCOPES = [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.sleep.read',
    'https://www.googleapis.com/auth/calendar.readonly',
    'openid',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
]

CLIENT_CONFIG = {
    "web": {
        "client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "project_id": os.getenv("GOOGLE_PROJECT_ID"),
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
        "redirect_uris": [os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:3000/api/auth/callback/google")]
    }
}

def get_google_auth_url():
    flow = Flow.from_client_config(CLIENT_CONFIG, scopes=SCOPES)
    flow.redirect_uri = CLIENT_CONFIG["web"]["redirect_uris"][0]
    authorization_url, state = flow.authorization_url(access_type='offline', include_granted_scopes='true')
    return authorization_url, state

async def get_google_fit_data(credentials_dict: Dict[str, Any]):
    creds = Credentials.from_authorized_user_info(credentials_dict, SCOPES)
    fitness = build('fitness', 'v1', credentials=creds)
    
    # 1. Fetch Steps
    now = datetime.datetime.utcnow()
    start_time = now - datetime.timedelta(days=1)
    
    start_ns = int(start_time.timestamp() * 1e9)
    end_ns = int(now.timestamp() * 1e9)
    
    aggregate_body = {
        "aggregateBy": [{
            "dataTypeName": "com.google.step_count.delta",
            "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
        }],
        "bucketByTime": { "durationMillis": 86400000 },
        "startTimeMillis": int(start_time.timestamp() * 1000),
        "endTimeMillis": int(now.timestamp() * 1000)
    }
    
    dataset = fitness.users().dataset().aggregate(userId='me', body=aggregate_body).execute()
    steps = 0
    if dataset.get('bucket'):
        for bucket in dataset['bucket']:
            for dataset_item in bucket['dataset']:
                for point in dataset_item['point']:
                    for value in point['value']:
                        steps += value['intVal']
                        
    # 2. Fetch Sleep (via Activity Data)
    sleep_body = {
        "aggregateBy": [{
            "dataTypeName": "com.google.sleep.segment"
        }],
        "startTimeMillis": int(start_time.timestamp() * 1000),
        "endTimeMillis": int(now.timestamp() * 1000)
    }
    
    sleep_dataset = fitness.users().dataset().aggregate(userId='me', body=sleep_body).execute()
    sleep_hours = 0.0
    if sleep_dataset.get('bucket'):
        for bucket in sleep_dataset['bucket']:
             total_ms = int(bucket['endTimeMillis']) - int(bucket['startTimeMillis'])
             sleep_hours += total_ms / (1000 * 60 * 60)

    # 3. Fetch Active Calories
    calorie_body = {
        "aggregateBy": [{
            "dataTypeName": "com.google.calories.expended"
        }],
        "startTimeMillis": int(start_time.timestamp() * 1000),
        "endTimeMillis": int(now.timestamp() * 1000)
    }
    
    calorie_dataset = fitness.users().dataset().aggregate(userId='me', body=calorie_body).execute()
    calories = 0.0
    if calorie_dataset.get('bucket'):
        for bucket in calorie_dataset['bucket']:
            for dataset_item in bucket['dataset']:
                for point in dataset_item['point']:
                    for value in point['value']:
                        calories += value['fpVal']

    return {
        "steps": steps,
        "sleep_hours": round(sleep_hours, 1),
        "calories": int(calories)
    }

async def get_google_calendar_events(credentials_dict: Dict[str, Any]):
    creds = Credentials.from_authorized_user_info(credentials_dict, SCOPES)
    service = build('calendar', 'v3', credentials=creds)
    
    now = datetime.datetime.utcnow().isoformat() + 'Z'
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                        maxResults=10, singleEvents=True,
                                        orderBy='startTime').execute()
    events = events_result.get('items', [])
    return events
