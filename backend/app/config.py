from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost:5432/prosario"
    SECRET_KEY: str = "your-super-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "prosario2024"

    MAIL_USERNAME: str = ""
    MAIL_PASSWORD: str = ""
    MAIL_FROM: str = "hello@prosario.io"
    MAIL_FROM_NAME: str = "Prosario"
    MAIL_SERVER: str = "smtp.gmail.com"
    MAIL_PORT: int = 587
    MAIL_STARTTLS: bool = True
    MAIL_SSL_TLS: bool = False

    ADMIN_EMAIL: str = "founder@prosario.io"
    FRONTEND_URL: str = "http://localhost:5173"
    BOOKING_URL: str = "https://calendar.app.google/prosario-15min"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
