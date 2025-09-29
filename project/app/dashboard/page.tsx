"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { TrendingUp, DollarSign, ChartBar as BarChart3, Plus } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import { useStats } from "../../hooks/useStats"
import { useTrades } from "../../hooks/useTrades"
import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { GlassCard } from "../../components/ui/glass-card"
import { StatsCards } from "../../components/stats/stats-cards"
import { EquityCurveChart } from "../../components/stats/equity-curve-chart"
import { formatCurrency, formatDate, cn } from "../../lib/utils"

export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { summaryStats, equityCurve, isLoading: statsLoading } = useStats()
  const { trades, isLoading: tradesLoading } = useTrades()
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

  // Get recent trades (last 5)
  const recentTrades = trades.slice(0, 5)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Welcome to the Future of Trading
            </h1>
            <p className="text-muted-foreground">
              Your advanced trading analytics dashboard • {formatDate(new Date())}
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <StatsCards stats={summaryStats} isLoading={statsLoading} />

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equity Curve */}
          <div className="lg:col-span-2">
            <EquityCurveChart data={equityCurve} isLoading={statsLoading} />
          </div>

          {/* Recent Trades */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Recent Trades</h3>
                <button
                  onClick={() => router.push("/trades")}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {tradesLoading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-16 bg-white/10 rounded-lg" />
                    </div>
                  ))
                ) : recentTrades.length > 0 ? (
                  recentTrades.map((trade) => (
                    <div
                      key={trade.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{trade.pair}</span>
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            trade.direction === "BUY" 
                              ? "bg-green-500/20 text-green-400" 
                              : "bg-red-500/20 text-red-400"
                          )}>
                            {trade.direction}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(trade.opened_at)}
                        </div>
                      </div>
                      <div className="text-right">
                        {trade.result_usd ? (
                          <div className={cn(
                            "font-medium",
                            trade.result_usd > 0 ? "text-green-400" : "text-red-400"
                          )}>
                            {formatCurrency(trade.result_usd)}
                          </div>
                        ) : (
                          <div className="text-blue-400 text-sm">OPEN</div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No trades yet</p>
                    <p className="text-sm">Start by adding your first trade</p>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  title: "Add Trade",
                  description: "Record a new position",
                  icon: Plus,
                  color: "green",
                  action: () => router.push("/trades?new=true"),
                },
                {
                  title: "View Analytics",
                  description: "Detailed performance stats",
                  icon: BarChart3,
                  color: "blue",
                  action: () => router.push("/stats"),
                },
                {
                  title: "Open Positions",
                  description: "Manage active trades",
                  icon: TrendingUp,
                  color: "purple",
                  action: () => router.push("/trades?status=OPEN"),
                },
                {
                  title: "Profit Analysis",
                  description: "Review closed trades",
                  icon: DollarSign,
                  color: "yellow",
                  action: () => router.push("/trades?status=CLOSED"),
                },
              ].map((action) => (
                <button
                  key={action.title}
                  onClick={action.action}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 text-left group"
                >
                  <div className={cn(
                    "inline-flex p-2 rounded-lg mb-3 group-hover:scale-110 transition-transform",
                    action.color === "green" && "bg-green-500/20 text-green-400",
                    action.color === "blue" && "bg-blue-500/20 text-blue-400",
                    action.color === "purple" && "bg-purple-500/20 text-purple-400",
                    action.color === "yellow" && "bg-yellow-500/20 text-yellow-400"
                  )}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-medium mb-1">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}