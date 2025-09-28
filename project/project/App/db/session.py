from sqlmodel import SQLModel, create_engine, Session
from App.core.config import settings

engine = create_engine(settings.SQLITE_DB, echo=False, connect_args={"check_same_thread": False})

def get_session():
    with Session(engine) as session:
        yield session
