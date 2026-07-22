from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime


class WaitlistCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    role: Optional[str] = None
    website: Optional[str] = None
    product_description: Optional[str] = None
    biggest_outbound_challenge: Optional[str] = None
    monthly_outreach: Optional[str] = None
    beta_feedback: bool = False
    source: Optional[str] = None

    @field_validator("name")
    @classmethod
    def name_must_not_be_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Name must not be empty")
        return v.strip()


class WaitlistResponse(BaseModel):
    id: int
    name: str
    email: str
    company: Optional[str]
    role: Optional[str]
    website: Optional[str]
    product_description: Optional[str]
    biggest_outbound_challenge: Optional[str]
    monthly_outreach: Optional[str]
    beta_feedback: bool
    source: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class WaitlistStats(BaseModel):
    total: int
    today: int
    this_week: int
    beta_willing: int


class AnalyticsEventCreate(BaseModel):
    event_type: str
    session_id: Optional[str] = None
    utm_source: Optional[str] = None
    utm_medium: Optional[str] = None
    utm_campaign: Optional[str] = None
    referrer: Optional[str] = None
    metadata: Optional[dict] = None


class AnalyticsEventResponse(BaseModel):
    id: int
    event_type: str
    session_id: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class AdminLogin(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
