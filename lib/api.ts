import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  }
)

export interface Trade {
  id: number
  pair: string
  direction: 'BUY' | 'SELL'
  entry_price: number
  exit_price?: number
  stop_loss?: number
  take_profit?: number
  position_size: number
  risk_reward?: number
  result_pips?: number
  result_usd?: number
  notes?: string
  screenshot_url?: string
  status: 'OPEN' | 'CLOSED'
  opened_at: string
  closed_at?: string
  created_at: string
  updated_at: string
}

export interface TradeCreate {
  pair: string
  direction: 'BUY' | 'SELL'
  entry_price: number
  stop_loss?: number
  take_profit?: number
  position_size: number
  notes?: string
  screenshot_url?: string
}

export interface TradeUpdate {
  entry_price?: number
  exit_price?: number
  stop_loss?: number
  take_profit?: number
  position_size?: number
  notes?: string
  screenshot_url?: string
  status?: 'OPEN' | 'CLOSED'
}

export interface SummaryStats {
  total_trades: number
  win_rate: number
  avg_risk_reward: number
  total_profit: number
}

export interface EquityPoint {
  date: string
  equity: number
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

export interface UserCreate {
  email: string
  password: string
}

export interface UserLogin {
  email: string
  password: string
}

// Auth API
export const authApi = {
  signup: (data: UserCreate) => api.post<AuthResponse>('/api/v1/auth/signup', data),
  login: (data: UserLogin) => api.post<AuthResponse>('/api/v1/auth/login', data),
}

// Trades API
export const tradesApi = {
  create: (data: TradeCreate) => api.post<Trade>('/api/v1/trades/', data),
  list: (params?: { pair?: string; status?: string; start?: string; end?: string }) =>
    api.get<Trade[]>('/api/v1/trades/', { params }),
  get: (id: number) => api.get<Trade>(`/api/v1/trades/${id}`),
  update: (id: number, data: TradeUpdate) => api.put<Trade>(`/api/v1/trades/${id}`, data),
  delete: (id: number) => api.delete<Trade>(`/api/v1/trades/${id}`),
  close: (id: number, exitPrice: number) =>
    api.patch<Trade>(`/api/v1/trades/${id}/close?exit_price=${exitPrice}`),
}

// Stats API
export const statsApi = {
  summary: () => api.get<SummaryStats>('/api/v1/stats/summary'),
  equityCurve: () => api.get<EquityPoint[]>('/api/v1/stats/equity_curve'),
}