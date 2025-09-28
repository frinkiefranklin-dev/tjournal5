from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session
from typing import List, Optional
from datetime import datetime
from App.db.session import get_session
from App.schemas.trade import TradeCreate, TradeRead, TradeUpdate
from App.crud.trade import (
    create_trade, get_trade, get_trades, update_trade, delete_trade, close_trade
)
from App.models.trade import TradeStatus

router = APIRouter()

@router.post("/", response_model=TradeRead)
async def create_trade_endpoint(trade_in: TradeCreate, session: Session = Depends(get_session)):
    trade = create_trade(session, trade_in)
    return trade

@router.get("/", response_model=List[TradeRead])
async def list_trades(
    pair: Optional[str] = Query(None),
    status: Optional[TradeStatus] = Query(None),
    start: Optional[datetime] = Query(None),
    end: Optional[datetime] = Query(None),
    session: Session = Depends(get_session)
):
    trades = get_trades(session, pair, status, start, end)
    return trades

@router.get("/{trade_id}", response_model=TradeRead)
async def get_trade_endpoint(trade_id: int, session: Session = Depends(get_session)):
    trade = get_trade(session, trade_id)
    if not trade:
        raise HTTPException(status_code=404, detail="Trade not found")
    return trade

@router.put("/{trade_id}", response_model=TradeRead)
async def update_trade_endpoint(trade_id: int, trade_in: TradeUpdate, session: Session = Depends(get_session)):
    trade = update_trade(session, trade_id, trade_in)
    if not trade:
        raise HTTPException(status_code=404, detail="Trade not found")
    return trade

@router.delete("/{trade_id}", response_model=TradeRead)
async def delete_trade_endpoint(trade_id: int, session: Session = Depends(get_session)):
    trade = delete_trade(session, trade_id)
    if not trade:
        raise HTTPException(status_code=404, detail="Trade not found")
    return trade

@router.patch("/{trade_id}/close", response_model=TradeRead)
async def close_trade_endpoint(trade_id: int, exit_price: float, session: Session = Depends(get_session)):
    trade = close_trade(session, trade_id, exit_price)
    if not trade:
        raise HTTPException(status_code=404, detail="Trade not found or already closed")
    return trade
