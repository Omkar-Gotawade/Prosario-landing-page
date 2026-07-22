from app.db import Base
from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.sql import func


class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String(100), nullable=False, index=True)
    session_id = Column(String(255), nullable=True, index=True)
    utm_source = Column(String(255), nullable=True)
    utm_medium = Column(String(255), nullable=True)
    utm_campaign = Column(String(255), nullable=True)
    referrer = Column(String(500), nullable=True)
    event_metadata = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
