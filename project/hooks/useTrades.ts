import { useState, useEffect } from 'react'
import { tradesApi, Trade, TradeCreate, TradeUpdate } from '../lib/api'

export function useTrades() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrades = async (filters?: {
    pair?: string
    status?: string
    start?: string
    end?: string
  }) => {
    try {
      setIsLoading(true)
      const response = await tradesApi.list(filters)
      setTrades(response.data)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch trades')
    } finally {
      setIsLoading(false)
    }
  }

  const createTrade = async (data: TradeCreate) => {
    try {
      const response = await tradesApi.create(data)
      setTrades(prev => [response.data, ...prev])
      return { success: true, data: response.data }
    } catch (err: any) {
      return { success: false, error: err.response?.data?.detail || 'Failed to create trade' }
    }
  }

  const updateTrade = async (id: number, data: TradeUpdate) => {
    try {
      const response = await tradesApi.update(id, data)
      setTrades(prev => prev.map(trade => trade.id === id ? response.data : trade))
      return { success: true, data: response.data }
    } catch (err: any) {
      return { success: false, error: err.response?.data?.detail || 'Failed to update trade' }
    }
  }

  const deleteTrade = async (id: number) => {
    try {
      await tradesApi.delete(id)
      setTrades(prev => prev.filter(trade => trade.id !== id))
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err.response?.data?.detail || 'Failed to delete trade' }
    }
  }

  const closeTrade = async (id: number, exitPrice: number) => {
    try {
      const response = await tradesApi.close(id, exitPrice)
      setTrades(prev => prev.map(trade => trade.id === id ? response.data : trade))
      return { success: true, data: response.data }
    } catch (err: any) {
      return { success: false, error: err.response?.data?.detail || 'Failed to close trade' }
    }
  }

  useEffect(() => {
    fetchTrades()
  }, [])

  return {
    trades,
    isLoading,
    error,
    fetchTrades,
    createTrade,
    updateTrade,
    deleteTrade,
    closeTrade,
  }
}