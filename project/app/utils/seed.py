"""
Seed script for automatic dev login in FastAPI backend.
Creates a default dev user if not present and returns a JWT token for frontend use.
"""

from app.db.session import SessionLocal
from app.models.user import User
from app.utils.security import get_password_hash
from app.core.config import settings
from fastapi_jwt_auth import AuthJWT

DEV_EMAIL = "dev@tradejournal.local"
DEV_PASSWORD = "devpass2090"


def seed_dev_user():
    db = SessionLocal()
    user = db.query(User).filter(User.email == DEV_EMAIL).first()
    if not user:
        user = User(
            email=DEV_EMAIL,
            hashed_password=get_password_hash(DEV_PASSWORD),
            is_active=True,
            is_superuser=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    db.close()
    return user


def get_dev_jwt():
    user = seed_dev_user()
    authjwt = AuthJWT()
    token = authjwt.create_access_token(subject=user.id)
    return token

if __name__ == "__main__":
    print("Seeding dev user and generating JWT token...")
    token = get_dev_jwt()
    print(f"DEV JWT: {token}")
