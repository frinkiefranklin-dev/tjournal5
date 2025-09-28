from App.models.trade import Trade

def compute_risk_reward(trade: Trade) -> float:
    """Calculate risk/reward ratio."""
    if not trade.stop_loss or not trade.take_profit:
        return None
    risk = abs(trade.entry_price - trade.stop_loss)
    reward = abs(trade.take_profit - trade.entry_price)
    return round(reward / risk, 2) if risk > 0 else None

def compute_result_pips(trade: Trade) -> float:
    """Calculate result in pips (for Forex, XAU/USD, BTC/USD)."""
    if not trade.exit_price:
        return None
    pip_factor = 0.01 if "JPY" not in trade.pair else 0.01
    direction = 1 if trade.direction == "BUY" else -1
    return round((trade.exit_price - trade.entry_price) * direction / pip_factor, 2)

def compute_result_usd(trade: Trade) -> float:
    """Calculate result in USD."""
    if not trade.exit_price or not trade.position_size:
        return None
    direction = 1 if trade.direction == "BUY" else -1
    return round((trade.exit_price - trade.entry_price) * direction * trade.position_size, 2)
