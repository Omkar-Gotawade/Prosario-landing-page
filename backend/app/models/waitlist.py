from app.db import Base
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.sql import func


class WaitlistUser(Base):
    __tablename__ = "waitlist_users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True, index=True)
    company = Column(String(255), nullable=True)
    role = Column(String(255), nullable=True)
    website = Column(String(500), nullable=True)
    product_description = Column(Text, nullable=True)
    biggest_outbound_challenge = Column(Text, nullable=True)
    monthly_outreach = Column(String(50), nullable=True)
    beta_feedback = Column(Boolean, default=False)
    source = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
