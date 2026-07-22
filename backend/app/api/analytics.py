from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from app.db import get_db
from app.models.analytics import AnalyticsEvent
from app.schemas import AnalyticsEventCreate, AnalyticsEventResponse
from app.api.admin import get_current_admin

router = APIRouter()


@router.post("/event", response_model=AnalyticsEventResponse, status_code=201)
async def track_event(
    data: AnalyticsEventCreate,
    db: AsyncSession = Depends(get_db),
):
    event = AnalyticsEvent(
        event_type=data.event_type,
        session_id=data.session_id,
        utm_source=data.utm_source,
        utm_medium=data.utm_medium,
        utm_campaign=data.utm_campaign,
        referrer=data.referrer,
        event_metadata=data.metadata,
    )
    db.add(event)
    await db.commit()
    await db.refresh(event)
    return event


@router.get("/summary")
async def get_analytics_summary(
    db: AsyncSession = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    # Event counts by type
    result = await db.execute(
        select(AnalyticsEvent.event_type, func.count(AnalyticsEvent.id).label("count"))
        .group_by(AnalyticsEvent.event_type)
        .order_by(desc("count"))
    )
    events_by_type = [{"event_type": row[0], "count": row[1]} for row in result.all()]

    # Total sessions
    sessions = await db.execute(
        select(func.count(func.distinct(AnalyticsEvent.session_id)))
    )

    # Top UTM sources
    utm_result = await db.execute(
        select(AnalyticsEvent.utm_source, func.count(AnalyticsEvent.id).label("count"))
        .where(AnalyticsEvent.utm_source != None)
        .group_by(AnalyticsEvent.utm_source)
        .order_by(desc("count"))
        .limit(10)
    )
    top_sources = [{"source": row[0], "count": row[1]} for row in utm_result.all()]

    # Top referrers
    ref_result = await db.execute(
        select(AnalyticsEvent.referrer, func.count(AnalyticsEvent.id).label("count"))
        .where(AnalyticsEvent.referrer != None)
        .group_by(AnalyticsEvent.referrer)
        .order_by(desc("count"))
        .limit(10)
    )
    top_referrers = [{"referrer": row[0], "count": row[1]} for row in ref_result.all()]

    return {
        "events_by_type": events_by_type,
        "total_sessions": sessions.scalar_one(),
        "top_utm_sources": top_sources,
        "top_referrers": top_referrers,
    }
