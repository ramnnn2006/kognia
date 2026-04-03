from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
import models, schemas
from datetime import datetime, timedelta

async def sync_telemetry_data(db: AsyncSession, telemetry: schemas.TelemetrySync):
    # Create new Score record
    new_score = models.Score(
        student_hash=telemetry.student_hash,
        score=telemetry.stress_score,
        room_id=f"{telemetry.block}-{telemetry.room_no}", # Mapping to standard room_id
        sleep_hours=telemetry.sleep_hours,
        steps_count=telemetry.steps_count,
        social_interaction_ratio=telemetry.social_interaction_ratio,
        timestamp=datetime.utcnow()
    )
    db.add(new_score)
    await db.commit()
    await db.refresh(new_score)
    return new_score

async def get_heatmap_stats(db: AsyncSession):
    # Get average stress scores by room (aggregated for heatmap)
    since = datetime.utcnow() - timedelta(hours=24)
    query = select(
        models.Room.block,
        models.Room.room_number.label("room"),
        func.avg(models.Score.score).label("avg_score"),
        func.count(models.Score.id).label("student_count")
    ).join(models.Score, models.Room.id == models.Score.room_id).where(models.Score.timestamp > since).group_by(models.Room.block, models.Room.room_number)
    
    result = await db.execute(query)
    return result.all()
