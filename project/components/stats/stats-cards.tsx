"use client"

import { motion } from "framer-motion"
import { TrendingUp, Target, DollarSign, ChartBar as BarChart3 } from "lucide-react"
import { GlassCard } from "../../components/ui/glass-card"
import { NeonButton } from "../../components/ui/neon-button"
import { SummaryStats } from "../../lib/api"
import { formatCurrency, cn } from "../../lib/utils"

interface StatsCardsProps {
  stats: SummaryStats | null
  isLoading?: boolean
  error?: string | null
}

export function StatsCards({ stats, isLoading, error }: StatsCardsProps) {
  if (error) {
    return (
      <div className="col-span-4">
        <div className="bg-red-900/80 border border-red-500 text-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Error loading stats</h3>
          <p>{error}</p>
        </div>
      </div>
    )
  }
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <GlassCard key={i} className="p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-white/10 rounded mb-2" />
              <div className="h-8 bg-white/10 rounded" />
            </div>
          </GlassCard>
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: "Total Trades",
      value: stats?.total_trades || 0,
      icon: BarChart3,
      color: "blue",
      format: (val: number) => val.toString(),
    },
    {
      title: "Win Rate",
      value: stats?.win_rate || 0,
      icon: Target,
      color: stats && stats.win_rate >= 0.6 ? "green" : stats && stats.win_rate >= 0.4 ? "yellow" : "red",
      format: (val: number) => `${(val * 100).toFixed(1)}%`,
    },
    {
      title: "Avg Risk/Reward",
      value: stats?.avg_risk_reward || 0,
      icon: TrendingUp,
      color: stats && stats.avg_risk_reward >= 2 ? "green" : stats && stats.avg_risk_reward >= 1 ? "yellow" : "red",
      format: (val: number) => `1:${val.toFixed(2)}`,
    },
    {
      title: "Total Profit",
      value: stats?.total_profit || 0,
      icon: DollarSign,
      color: stats && stats.total_profit > 0 ? "green" : stats && stats.total_profit < 0 ? "red" : "gray",
      format: (val: number) => formatCurrency(val),
    },
  ]

  const colorClasses = {
    blue: "text-blue-400 bg-blue-500/20",
    green: "text-green-400 bg-green-500/20",
    yellow: "text-yellow-400 bg-yellow-500/20",
    red: "text-red-400 bg-red-500/20",
    gray: "text-gray-400 bg-gray-500/20",
  }

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <GlassCard className="p-6 hover:scale-105 transition-transform duration-300" hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
                <p className="text-2xl font-bold">{card.format(card.value)}</p>
              </div>
              <div className={cn(
                "p-3 rounded-xl",
                colorClasses[card.color as keyof typeof colorClasses]
              )}>
                <card.icon className="h-6 w-6" />
              </div>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  )
}