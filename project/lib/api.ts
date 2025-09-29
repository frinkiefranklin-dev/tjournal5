// Trades API placeholder
export const tradesApi = {
  list: async (filters?: any) => ({ data: [] }),
  create: async (data: any) => ({ data }),
  update: async (id: number, data: any) => ({ data: { ...data, id } }),
  delete: async (id: number) => ({ data: { id } }),
  close: async (id: number, exitPrice: number) => ({
    data: {
      id,
  status: 'CLOSED' as 'OPEN' | 'CLOSED',
      exit_price: exitPrice,
      pair: 'EURUSD',
      direction: 'BUY' as 'BUY' | 'SELL',
      entry_price: 1.0,
      position_size: 1,
      opened_at: '',
      created_at: '',
      updated_at: '',
    }
  }),
};

export interface TradeUpdate {
  pair?: string;
  direction?: 'BUY' | 'SELL';
  entry_price?: number;
  exit_price?: number;
  stop_loss?: number;
  take_profit?: number;
  position_size?: number;
  notes?: string;
  screenshot_url?: string;
  status?: 'OPEN' | 'CLOSED';
}
// Minimal placeholder for API
export const authApi = {
  login: async (data: { email: string; password: string }) => ({ data: { access_token: 'fake_token' } }),
  signup: async (data: { username: string; password: string; email?: string }) => ({ data: { access_token: 'fake_token' } })
};
export type UserLogin = { email: string; password: string };
export type UserCreate = { username: string; password: string; email?: string };

export interface SummaryStats {
  total_trades: number
  win_rate: number
  avg_risk_reward: number
  total_profit: number
}

// Removed redundant export for SummaryStats
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

// Removed redundant export for Trade and TradeCreate
export interface EquityPoint {
  date: string
  equity: number
}

export const statsApi = {
  summary: async () => ({ data: { total_trades: 0, win_rate: 0, avg_risk_reward: 0, total_profit: 0 } }),
  equityCurve: async () => ({ data: [] }),
};
