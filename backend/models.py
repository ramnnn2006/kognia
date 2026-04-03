from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from database import Base


class Room(Base):
    __tablename__ = "rooms"

    id = Column(String, primary_key=True)          # e.g. "A-1-01" (block-floor-room)
    block = Column(String, nullable=False)          # A, B, C, D
    floor = Column(Integer, nullable=False)         # 1, 2, 3, 4
    room_number = Column(String, nullable=False)    # 01..10
    capacity = Column(Integer, default=4)
    scores = relationship("Score", back_populates="room")


class StudentHash(Base):
    """Stores only the hashed student ID — never the raw register number."""
    __tablename__ = "student_hashes"

    id_hash = Column(String, primary_key=True)      # SHA-256(reg_no + salt)
    room_id = Column(String, ForeignKey("rooms.id"), nullable=False)
    opted_named_referral = Column(Boolean, default=False)
    scores = relationship("Score", back_populates="student")


class Score(Base):
    __tablename__ = "scores"

    id = Column(Integer, primary_key=True, autoincrement=True)
    student_hash = Column(String, ForeignKey("student_hashes.id_hash"), nullable=False)
    room_id = Column(String, ForeignKey("rooms.id"), nullable=False)
    score = Column(Integer, nullable=False)         # 0..100
    # Advanced Behavioral Biomarkers
    sleep_hours = Column(Float, nullable=True)
    steps_count = Column(Integer, nullable=True)
    social_interaction_ratio = Column(Float, nullable=True)
    
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    student = relationship("StudentHash", back_populates="scores")
    room = relationship("Room", back_populates="scores")


class Counsellor(Base):
    __tablename__ = "counsellors"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    specialization = Column(String, default="Clinical Psychology")
    is_active = Column(Boolean, default=True)
    slots = relationship("BookingSlot", back_populates="counsellor")


class BookingSlot(Base):
    __tablename__ = "booking_slots"

    id = Column(Integer, primary_key=True, autoincrement=True)
    counsellor_id = Column(Integer, ForeignKey("counsellors.id"), nullable=False)
    slot_time = Column(DateTime(timezone=True), nullable=False)
    is_available = Column(Boolean, default=True)
    session_type = Column(String, default="in-person")  # in-person / online
    counsellor = relationship("Counsellor", back_populates="slots")
    booking = relationship("Booking", back_populates="slot", uselist=False)


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    slot_id = Column(Integer, ForeignKey("booking_slots.id"), nullable=False)
    student_hash = Column(String, ForeignKey("student_hashes.id_hash"), nullable=False)
    anonymous_note = Column(Text, nullable=True)
    status = Column(String, default="confirmed")    # confirmed / resolved / cancelled
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    assigned_counsellor_note = Column(Text, nullable=True)

    slot = relationship("BookingSlot", back_populates="booking")
