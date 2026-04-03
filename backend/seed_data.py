import asyncio
import random
from database import AsyncSessionLocal
from models import Room, StudentHash, Score
from datetime import datetime, timedelta

async def seed():
    async with AsyncSessionLocal() as db:
        print("Seeding Cognia Prototype Data...")
        
        # 1. Create Rooms if they don't exist
        for r in range(1, 41):
            room_id = f"B-3-{r:02d}"
            q = await db.get(Room, room_id)
            if not q:
                db.add(Room(id=room_id, block="B", floor=3, room_number=str(r), capacity=4))
        
        await db.commit()
        
        # 2. Add some active stress signals
        for i in range(20):
            room_no = random.randint(1, 40)
            room_id = f"B-3-{room_no:02d}"
            h_id = f"hash_{i}"
            
            # Check if student exists
            s = await db.get(StudentHash, h_id)
            if not s:
                db.add(StudentHash(id_hash=h_id, room_id=room_id, opted_named_referral=False))
            
            # Add a stress score
            db.add(Score(
                student_hash=h_id,
                room_id=room_id,
                score=random.randint(10, 95), # Varied stress levels
                sleep_hours=random.uniform(4.0, 9.0),
                steps_count=random.randint(500, 12000),
                social_interaction_ratio=random.uniform(0.1, 0.9),
                timestamp=datetime.utcnow() - timedelta(minutes=random.randint(0, 1440))
            ))
            
        await db.commit()
        print("Database Seeded Successfully! Heatmap is now LIVE.")

if __name__ == "__main__":
    asyncio.run(seed())
