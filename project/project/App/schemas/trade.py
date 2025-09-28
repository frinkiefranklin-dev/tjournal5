from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime
from App.models.trade import TradeDirection, TradeStatus

class TradeBase(BaseModel):
    pair: str
    direction: TradeDirection
    entry_price: float = Field(..., gt=0)
    stop_loss: Optional[float] = Field(None, gt=0)
    take_profit: Optional[float] = Field(None, gt=0)
    position_size: float = Field(..., gt=0)
    notes: Optional[str] = None
    screenshot_url: Optional[str] = None

class TradeCreate(TradeBase):
    pass

class TradeUpdate(BaseModel):
    entry_price: Optional[float] = Field(None, gt=0)
    exit_price: Optional[float] = Field(None, gt=0)
    stop_loss: Optional[float] = Field(None, gt=0)
    take_profit: Optional[float] = Field(None, gt=0)
    position_size: Optional[float] = Field(None, gt=0)
    notes: Optional[str] = None
    screenshot_url: Optional[str] = None
    status: Optional[TradeStatus] = None

class TradeRead(TradeBase):
    id: int
    exit_price: Optional[float]
    risk_reward: Optional[float]
    result_pips: Optional[float]
    result_usd: Optional[float]
    status: TradeStatus
    opened_at: datetime
    closed_at: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
