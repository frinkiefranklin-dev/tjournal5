from sqlmodel import Session, select, func
from App.models.trade import Trade, TradeStatus

def get_summary_stats(session: Session):
    trades = session.exec(select(Trade).where(Trade.status == TradeStatus.CLOSED)).all()
    total = len(trades)
    wins = [t for t in trades if t.result_usd and t.result_usd > 0]
    losses = [t for t in trades if t.result_usd and t.result_usd <= 0]
    win_rate = len(wins) / total if total else 0
    avg_rr = sum([t.risk_reward for t in trades if t.risk_reward]) / total if total else 0
    total_profit = sum([t.result_usd for t in trades if t.result_usd])
    return {
        "total_trades": total,
        "win_rate": win_rate,
        "avg_risk_reward": avg_rr,
        "total_profit": total_profit,
    }

def get_equity_curve(session: Session):
    trades = session.exec(select(Trade).where(Trade.status == TradeStatus.CLOSED).order_by(Trade.closed_at)).all()
    curve = []
    equity = 0
    for t in trades:
        equity += t.result_usd or 0
        curve.append({"date": t.closed_at, "equity": equity})
    return curve
