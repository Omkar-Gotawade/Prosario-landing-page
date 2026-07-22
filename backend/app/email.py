import logging
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from app.config import settings

logger = logging.getLogger(__name__)

conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_FROM_NAME=settings.MAIL_FROM_NAME,
    MAIL_STARTTLS=settings.MAIL_STARTTLS,
    MAIL_SSL_TLS=settings.MAIL_SSL_TLS,
    USE_CREDENTIALS=bool(settings.MAIL_USERNAME),
    VALIDATE_CERTS=True,
)

WELCOME_EMAIL_HTML = """
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #e5e5e5; margin: 0; padding: 0; }}
    .container {{ max-width: 600px; margin: 40px auto; padding: 40px; background: #111; border: 1px solid #222; border-radius: 12px; }}
    .logo {{ font-size: 24px; font-weight: 700; color: #3b82f6; margin-bottom: 32px; }}
    h1 {{ font-size: 28px; font-weight: 700; color: #fff; margin: 0 0 16px; }}
    p {{ color: #a3a3a3; line-height: 1.6; margin: 0 0 16px; }}
    .highlight {{ color: #3b82f6; font-weight: 600; }}
    .badge {{ display: inline-block; background: #1e3a5f; color: #60a5fa; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 24px; }}
    .cta {{ display: inline-block; background: #3b82f6; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-top: 8px; }}
    .divider {{ border: none; border-top: 1px solid #222; margin: 32px 0; }}
    .footer {{ color: #555; font-size: 13px; }}
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">Prosario</div>
    <div class="badge">🎉 You're on the list</div>
    <h1>Welcome, {name}!</h1>
    <p>You've secured your spot as an <span class="highlight">Early Design Partner</span> for Prosario.</p>
    <p>We're building AI-powered outbound that actually works — where you describe your business, and Prosario discovers the right companies, researches every lead, and writes personalized emails for you.</p>
    <p>As an early design partner, you'll get:</p>
    <ul style="color: #a3a3a3; line-height: 2;">
      <li>✅ Early access before public launch</li>
      <li>✅ Direct line to the founder</li>
      <li>✅ Influence over the roadmap</li>
      <li>✅ Lifetime early adopter pricing</li>
      <li>✅ Priority onboarding</li>
    </ul>
    <p>I'm building Prosario in public. Expect regular updates as we hit milestones.</p>
    <p>Want to talk? Book a quick 15-minute call — your feedback shapes what we build:</p>
    <a href="{calendly_url}" class="cta">Book a 15-Minute Call →</a>
    <hr class="divider">
    <p class="footer">You're receiving this because you joined the Prosario waitlist. Reply to this email anytime — I read every message.</p>
  </div>
</body>
</html>
"""

ADMIN_NOTIFICATION_HTML = """
<h2>New Waitlist Signup 🎉</h2>
<p><strong>Name:</strong> {name}</p>
<p><strong>Email:</strong> {email}</p>
<p><strong>Company:</strong> {company}</p>
<p><strong>Role:</strong> {role}</p>
<p><strong>What they sell:</strong> {product_description}</p>
<p><strong>Biggest challenge:</strong> {biggest_outbound_challenge}</p>
<p><strong>Monthly outreach:</strong> {monthly_outreach}</p>
<p><strong>Beta willing:</strong> {beta_feedback}</p>
"""


async def send_welcome_email(user_name: str, user_email: str) -> None:
    if not settings.MAIL_USERNAME:
        logger.warning("Email not configured, skipping welcome email")
        return
    try:
        message = MessageSchema(
            subject="You're on the Prosario waitlist 🎉",
            recipients=[user_email],
            body=WELCOME_EMAIL_HTML.format(
                name=user_name,
                calendly_url=settings.CALENDLY_URL,
            ),
            subtype=MessageType.html,
        )
        fm = FastMail(conf)
        await fm.send_message(message)
        logger.info(f"Welcome email sent to {user_email}")
    except Exception as e:
        logger.error(f"Failed to send welcome email: {e}")


async def send_admin_notification(user_data: dict) -> None:
    if not settings.MAIL_USERNAME or not settings.ADMIN_EMAIL:
        return
    try:
        message = MessageSchema(
            subject=f"New Prosario Signup: {user_data.get('name', 'Unknown')}",
            recipients=[settings.ADMIN_EMAIL],
            body=ADMIN_NOTIFICATION_HTML.format(
                name=user_data.get("name", ""),
                email=user_data.get("email", ""),
                company=user_data.get("company", ""),
                role=user_data.get("role", ""),
                product_description=user_data.get("product_description", ""),
                biggest_outbound_challenge=user_data.get("biggest_outbound_challenge", ""),
                monthly_outreach=user_data.get("monthly_outreach", ""),
                beta_feedback=user_data.get("beta_feedback", False),
            ),
            subtype=MessageType.html,
        )
        fm = FastMail(conf)
        await fm.send_message(message)
    except Exception as e:
        logger.error(f"Failed to send admin notification: {e}")
