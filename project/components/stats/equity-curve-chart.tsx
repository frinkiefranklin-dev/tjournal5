"use client"

import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { GlassCard } from "@/components/ui/glass-card"
import { EquityPoint } from "@/lib/api"
import { formatCurrency, formatDate } from "@/lib/utils"

interface EquityCurveChartProps {
  data: EquityPoint[]
  isLoading?: boolean
}

export function EquityCurveChart({ data, isLoading }: EquityCurveChartProps) {
  if (isLoading) {
    return (
      <GlassCard className="p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-white/10 rounded mb-4 w-48" />
          <div className="h-80 bg-white/10 rounded" />
        </div>
      </GlassCard>
    )
  }

  if (data.length === 0) {
    return (
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold mb-4">Equity Curve</h3>
        <div className="h-80 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <p>No closed trades yet</p>
            <p className="text-sm">Your equity curve will appear here once you close some trades</p>
          </div>
        </div>
      </GlassCard>
    )
  }

  // Format data for chart
  const chartData = data.map((point, index) => ({
    ...point,
    date: new Date(point.date).toLocaleDateString(),
    index,
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg p-3">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold text-blue-400">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  const isProfit = data[data.length - 1]?.equity > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Equity Curve</h3>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className={`text-xl font-bold ${isProfit ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(data[data.length - 1]?.equity || 0)}
            </p>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="equity"
                stroke="url(#equityGradient)"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              />
              <defs>
                <linearGradient id="equityGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </motion.div>
  )
}