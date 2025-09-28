from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from App.api.v1.routes import auth, trades, stats
from App.core.config import settings

app = FastAPI(title="Trading Journal API", version="1.0.0")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(trades.router, prefix="/api/v1/trades", tags=["trades"])
app.include_router(stats.router, prefix="/api/v1/stats", tags=["stats"])
