from sqlmodel import Session, select
from App.models.user import User
from App.schemas.user import UserCreate
from App.utils.security import get_password_hash

def get_user_by_email(session: Session, email: str):
    return session.exec(select(User).where(User.email == email)).first()

def create_user(session: Session, user_in: UserCreate):
    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password)
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user
