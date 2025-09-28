from App.db.session import engine
from sqlmodel import Session
from App.db.session import engine
from App.models.trade import Trade, TradeDirection, TradeStatus
from datetime import datetime, timedelta

def seed_trades():
    demo_trades = [
        Trade(
            pair="XAU/USD",
            direction=TradeDirection.BUY,
            entry_price=1900.0,
            exit_price=1910.0,
            stop_loss=1895.0,
            take_profit=1920.0,
            position_size=1.0,
            status=TradeStatus.CLOSED,
            opened_at=datetime.utcnow() - timedelta(days=2),
            closed_at=datetime.utcnow() - timedelta(days=1),
            notes="Gold breakout",
        ),
        Trade(
            pair="BTC/USD",
            direction=TradeDirection.SELL,
            entry_price=27000.0,
            exit_price=26500.0,
            stop_loss=27200.0,
            take_profit=26000.0,
            position_size=0.5,
            status=TradeStatus.CLOSED,
            opened_at=datetime.utcnow() - timedelta(days=3),
            closed_at=datetime.utcnow() - timedelta(days=2),
            notes="BTC short scalp",
        ),
    ]
    with Session(engine) as session:
        for trade in demo_trades:
            session.add(trade)
        session.commit()
        print("Seeded demo trades.")

if __name__ == "__main__":
    seed_trades()
