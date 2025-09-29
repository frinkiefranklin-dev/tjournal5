import { useState, useEffect } from 'react'
import { statsApi, SummaryStats, EquityPoint } from '../lib/api'

export function useStats() {
  const [summaryStats, setSummaryStats] = useState<SummaryStats | null>(null)
  const [equityCurve, setEquityCurve] = useState<EquityPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      const [summaryResponse, equityResponse] = await Promise.all([
        statsApi.summary(),
        statsApi.equityCurve(),
      ])
      setSummaryStats(summaryResponse.data)
      setEquityCurve(equityResponse.data)
      setError(null)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to fetch stats')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return {
    summaryStats,
    equityCurve,
    isLoading,
    error,
    refetch: fetchStats,
  }
}