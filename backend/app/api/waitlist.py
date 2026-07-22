import csv
import io
import logging
from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc, and_
from sqlalchemy.sql.expression import cast
from sqlalchemy import Date
from datetime import date, timedelta, datetime, timezone
from app.db import get_db
from app.models.waitlist import WaitlistUser
from app.schemas import WaitlistCreate, WaitlistResponse, WaitlistStats
from app.email import send_welcome_email, send_admin_notification
from app.api.admin import get_current_admin

logger = logging.getLogger(__name__)
router = APIRouter()


@router.post("/", response_model=WaitlistResponse, status_code=201)
async def join_waitlist(
    data: WaitlistCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    # Check for duplicate email
    existing = await db.execute(
        select(WaitlistUser).where(WaitlistUser.email == data.email.lower())
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="This email is already on the waitlist.")

    user = WaitlistUser(
        name=data.name,
        email=data.email.lower(),
        company=data.company,
        role=data.role,
        website=data.website,
        product_description=data.product_description,
        biggest_outbound_challenge=data.biggest_outbound_challenge,
        monthly_outreach=data.monthly_outreach,
        beta_feedback=data.beta_feedback,
        source=data.source,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    # Send emails in background
    background_tasks.add_task(send_welcome_email, user.name, user.email)
    background_tasks.add_task(send_admin_notification, {
        "name": user.name,
        "email": user.email,
        "company": user.company,
        "role": user.role,
        "product_description": user.product_description,
        "biggest_outbound_challenge": user.biggest_outbound_challenge,
        "monthly_outreach": user.monthly_outreach,
        "beta_feedback": user.beta_feedback,
    })

    logger.info(f"New waitlist signup: {user.email}")
    return user


@router.get("/", response_model=list[WaitlistResponse])
async def list_waitlist(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=500),
    search: str = Query(None),
    role: str = Query(None),
    db: AsyncSession = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    query = select(WaitlistUser).order_by(desc(WaitlistUser.created_at))
    if search:
        query = query.where(
            (WaitlistUser.name.ilike(f"%{search}%")) |
            (WaitlistUser.email.ilike(f"%{search}%")) |
            (WaitlistUser.company.ilike(f"%{search}%"))
        )
    if role:
        query = query.where(WaitlistUser.role.ilike(f"%{role}%"))
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


@router.get("/stats", response_model=WaitlistStats)
async def get_stats(
    db: AsyncSession = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    total = await db.execute(select(func.count(WaitlistUser.id)))
    today_count = await db.execute(
        select(func.count(WaitlistUser.id)).where(
            cast(WaitlistUser.created_at, Date) == date.today()
        )
    )
    week_ago = datetime.now(timezone.utc) - timedelta(days=7)
    week_count = await db.execute(
        select(func.count(WaitlistUser.id)).where(
            WaitlistUser.created_at >= week_ago
        )
    )
    beta_count = await db.execute(
        select(func.count(WaitlistUser.id)).where(WaitlistUser.beta_feedback == True)
    )
    return WaitlistStats(
        total=total.scalar_one(),
        today=today_count.scalar_one(),
        this_week=week_count.scalar_one(),
        beta_willing=beta_count.scalar_one(),
    )


@router.get("/export")
async def export_csv(
    db: AsyncSession = Depends(get_db),
    _: str = Depends(get_current_admin),
):
    result = await db.execute(
        select(WaitlistUser).order_by(desc(WaitlistUser.created_at))
    )
    users = result.scalars().all()

    output = io.StringIO()
    writer = csv.DictWriter(output, fieldnames=[
        "id", "name", "email", "company", "role", "website",
        "product_description", "biggest_outbound_challenge",
        "monthly_outreach", "beta_feedback", "source", "created_at"
    ])
    writer.writeheader()
    for u in users:
        writer.writerow({
            "id": u.id, "name": u.name, "email": u.email,
            "company": u.company or "", "role": u.role or "",
            "website": u.website or "",
            "product_description": u.product_description or "",
            "biggest_outbound_challenge": u.biggest_outbound_challenge or "",
            "monthly_outreach": u.monthly_outreach or "",
            "beta_feedback": u.beta_feedback,
            "source": u.source or "",
            "created_at": u.created_at.isoformat() if u.created_at else "",
        })

    output.seek(0)
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=prosario_waitlist.csv"},
    )
