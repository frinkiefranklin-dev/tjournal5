"use client"

import { motion } from "framer-motion"
import { MoveHorizontal as MoreHorizontal, CreditCard as Edit, Trash2, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { GlassCard } from "../../components/ui/glass-card"
import { NeonButton } from "../../components/ui/neon-button"
import { Trade } from "../../lib/api"
import { formatCurrency, formatDate, cn } from "../../lib/utils"

interface TradesTableProps {
  trades: Trade[]
  onEdit: (trade: Trade) => void
  onDelete: (trade: Trade) => void
  onClose: (trade: Trade) => void
  isLoading?: boolean
  error?: string | null
}
interface TradesTableProps {
  trades: Trade[];
  onEdit: (trade: Trade) => void;
  onDelete: (trade: Trade) => void;
  onClose: (trade: Trade) => void;
  isLoading?: boolean;
}

export function TradesTable({ trades, onEdit, onDelete, onClose, isLoading, error }: TradesTableProps) {
  // ...existing code...

  if (error) {
    return (
      <GlassCard className="p-6">
        <div className="bg-red-900/80 border border-red-500 text-red-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Error loading trades</h3>
          <p>{error}</p>
        </div>
      </GlassCard>
    )
  }

  if (isLoading) {
    return (
      <GlassCard className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-white/10 rounded-lg" />
          ))}
        </div>
      </GlassCard>
    )
  }

  if (trades.length === 0) {
    return (
      <GlassCard className="p-12 text-center">
        <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No trades yet</h3>
        <p className="text-muted-foreground">Start by creating your first trade</p>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 font-medium text-muted-foreground">Pair</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Direction</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Entry</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Exit</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Size</th>
              <th className="text-left p-4 font-medium text-muted-foreground">R:R</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Result</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade, index) => (
              <motion.tr
                key={trade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="p-4">
                  <div className="font-medium">{trade.pair}</div>
                </td>
                <td className="p-4">
                  <div className={cn(
                    "flex items-center space-x-2",
                    trade.direction === "BUY" ? "text-green-400" : "text-red-400"
                  )}>
                    {trade.direction === "BUY" ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="font-medium">{trade.direction}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-mono text-sm">{trade.entry_price.toFixed(5)}</div>
                </td>
                <td className="p-4">
                  <div className="font-mono text-sm">
                    {trade.exit_price ? trade.exit_price.toFixed(5) : "-"}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-mono text-sm">{trade.position_size}</div>
                </td>
                <td className="p-4">
                  <div className="font-mono text-sm">
                    {trade.risk_reward ? `1:${trade.risk_reward.toFixed(2)}` : "-"}
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    {trade.result_pips && (
                      <div className={cn(
                        "text-sm font-medium",
                        trade.result_pips > 0 ? "text-green-400" : "text-red-400"
                      )}>
                        {trade.result_pips}
                      </div>
                    )}
                    {trade.result_usd && (
                      <div className={cn(
                        "text-xs font-mono",
                        trade.result_usd > 0 ? "text-green-400" : "text-red-400"
                      )}>
                        {formatCurrency(trade.result_usd)}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className={cn(
                    "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                    trade.status === "OPEN"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-gray-500/20 text-gray-400"
                  )}>
                    {trade.status}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-muted-foreground">
                    {formatDate(trade.opened_at)}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-xl border-white/10">
                      <DropdownMenuItem onClick={() => onEdit(trade)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {trade.status === "OPEN" && (
                        <DropdownMenuItem onClick={() => onClose(trade)}>
                          <DollarSign className="h-4 w-4 mr-2" />
                          Close Trade
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => onDelete(trade)}
                        className="text-red-400"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  )
}