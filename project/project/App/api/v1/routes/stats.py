from fastapi import APIRouter, Depends
from sqlmodel import Session
from App.db.session import get_session
from App.crud.stats import get_summary_stats, get_equity_curve

router = APIRouter()

@router.get("/summary")
async def summary_stats(session: Session = Depends(get_session)):
    return get_summary_stats(session)

@router.get("/equity_curve")
async def equity_curve(session: Session = Depends(get_session)):
    return get_equity_curve(session)
