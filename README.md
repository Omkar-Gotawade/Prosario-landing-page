# Prosario — AI-Powered Outbound Sales Platform

A full-stack SaaS marketing website for Prosario, built to validate the product idea and collect early access users.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | TailwindCSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Backend | FastAPI (Python 3.11+) |
| Database | PostgreSQL |
| Email | fastapi-mail (SMTP) |

## Project Structure

```
prosario/
├── frontend/          # React Vite app
└── backend/           # FastAPI app
    ├── app/
    │   ├── api/       # Route handlers
    │   ├── models/    # SQLAlchemy models
    │   ├── schemas.py # Pydantic schemas
    │   ├── email.py   # Email automation
    │   ├── config.py  # Settings
    │   └── main.py    # FastAPI entry point
    └── requirements.txt
```

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:5173
```

### Backend

```bash
cd backend

# 1. Copy env file and fill in credentials
cp .env.example .env

# 2. Create a virtual environment
python -m venv venv
venv\Scripts\activate  # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Create the PostgreSQL database
# Run in psql: CREATE DATABASE prosario;

# 5. Start the server
uvicorn app.main:app --reload --port 8000
# API at http://localhost:8000
# Docs at http://localhost:8000/docs
```

## Environment Variables (backend/.env)

```env
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/prosario
SECRET_KEY=your-super-secret-key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=prosario2024
MAIL_USERNAME=your@email.com
MAIL_PASSWORD=your-smtp-password
MAIL_FROM=hello@prosario.io
MAIL_SERVER=smtp.gmail.com
ADMIN_EMAIL=founder@prosario.io
FRONTEND_URL=http://localhost:5173
CALENDLY_URL=https://calendly.com/your-link/15min
```

## Admin Dashboard

Visit `/admin` on the frontend to access the admin dashboard.

Default credentials (change in `.env`):
- Username: `admin`
- Password: `prosario2024`

Features:
- Total / today / weekly / beta signups stats
- Searchable user table
- Analytics panel (events by type, traffic sources)
- CSV export

## API Endpoints

```
POST /api/waitlist/          Join waitlist
GET  /api/waitlist/          List users (admin)
GET  /api/waitlist/stats     Stats (admin)
GET  /api/waitlist/export    Export CSV (admin)
POST /api/analytics/event    Track event
GET  /api/analytics/summary  Analytics summary (admin)
POST /api/admin/login        Admin login → JWT
GET  /api/admin/me           Current admin
GET  /docs                   Swagger UI
```

## Analytics Events Tracked

- `page_view` — Landing page load
- `cta_click` — CTA button clicks (type: hero_join, book_call, etc.)
- `scroll_depth` — 25%, 50%, 75%, 90%, 100%
- `form_started` — Form first interaction
- `form_completed` — Successful submission
- `form_error` — Submission error

## SEO

Optimized for:
- AI Lead Generation
- Cold Email Software
- AI SDR
- Lead Discovery
- Outbound Sales Automation
- AI Prospecting
- Personalized Cold Emails

## License

Private — All rights reserved.
