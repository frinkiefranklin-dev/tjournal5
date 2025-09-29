"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAuth } from "../../hooks/useAuth"
import { useStats } from "../../hooks/useStats"
import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { StatsCards } from "../../components/stats/stats-cards"
import { EquityCurveChart } from "../../components/stats/equity-curve-chart"

export default function StatsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { summaryStats, equityCurve, isLoading, error } = useStats()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, authLoading, router])

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Advanced Analytics
            </h1>
            <p className="text-muted-foreground">
              Deep insights into your trading performance and patterns
            </p>
          </div>
        </motion.div>

  {/* Stats Cards */}
  <StatsCards stats={summaryStats} isLoading={isLoading} error={error} />

  {/* Equity Curve */}
  <EquityCurveChart data={equityCurve} isLoading={isLoading} error={error} />
      </div>
    </DashboardLayout>
  )
}