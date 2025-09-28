from sqlmodel import Session, select
from App.models.trade import Trade, TradeStatus
from App.schemas.trade import TradeCreate, TradeUpdate
from App.utils.trading import compute_risk_reward, compute_result_pips, compute_result_usd
from datetime import datetime

def create_trade(session: Session, trade_in: TradeCreate):
    trade = Trade(**trade_in.dict())
    trade.risk_reward = compute_risk_reward(trade)
    session.add(trade)
    session.commit()
    session.refresh(trade)
    return trade

def get_trade(session: Session, trade_id: int):
    return session.get(Trade, trade_id)

def get_trades(session: Session, pair: str = None, status: TradeStatus = None, start: datetime = None, end: datetime = None):
    query = select(Trade)
    if pair:
        query = query.where(Trade.pair == pair)
    if status:
        query = query.where(Trade.status == status)
    if start:
        query = query.where(Trade.opened_at >= start)
    if end:
        query = query.where(Trade.opened_at <= end)
    return session.exec(query).all()

def update_trade(session: Session, trade_id: int, trade_in: TradeUpdate):
    trade = get_trade(session, trade_id)
    if not trade:
        return None
    for key, value in trade_in.dict(exclude_unset=True).items():
        setattr(trade, key, value)
    trade.updated_at = datetime.utcnow()
    session.commit()
    session.refresh(trade)
    return trade

def delete_trade(session: Session, trade_id: int):
    trade = get_trade(session, trade_id)
    if not trade:
        return None
    session.delete(trade)
    session.commit()
    return trade

def close_trade(session: Session, trade_id: int, exit_price: float):
    trade = get_trade(session, trade_id)
    if not trade or trade.status == TradeStatus.CLOSED:
        return None
    trade.exit_price = exit_price
    trade.closed_at = datetime.utcnow()
    trade.status = TradeStatus.CLOSED
    trade.result_pips = compute_result_pips(trade)
    trade.result_usd = compute_result_usd(trade)
    trade.risk_reward = compute_risk_reward(trade)
    trade.updated_at = datetime.utcnow()
    session.commit()
    session.refresh(trade)
    return trade
