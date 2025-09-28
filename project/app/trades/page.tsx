"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, ListFilter as Filter, Search } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useTrades } from "@/hooks/useTrades"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { TradesTable } from "@/components/trades/trades-table"
import { TradeForm } from "@/components/trades/trade-form"
import { CloseTradeDialog } from "@/components/trades/close-trade-dialog"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Trade, TradeCreate } from "@/lib/api"

export default function TradesPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { 
    trades, 
    isLoading, 
    createTrade, 
    updateTrade, 
    deleteTrade, 
    closeTrade,
    fetchTrades 
  } = useTrades()
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Modal states
  const [showTradeForm, setShowTradeForm] = useState(false)
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null)
  const [closingTrade, setClosingTrade] = useState<Trade | null>(null)
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [pairFilter, setPairFilter] = useState<string>("all")

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    // Check if we should open the new trade form
    if (searchParams.get("new") === "true") {
      setShowTradeForm(true)
    }
    
    // Apply status filter from URL
    const status = searchParams.get("status")
    if (status && (status === "OPEN" || status === "CLOSED")) {
      setStatusFilter(status)
    }
  }, [searchParams])

  useEffect(() => {
    // Apply filters
    const filters: any = {}
    if (statusFilter !== "all") filters.status = statusFilter
    if (pairFilter !== "all") filters.pair = pairFilter
    
    fetchTrades(filters)
  }, [statusFilter, pairFilter, fetchTrades])

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Filter trades by search term
  const filteredTrades = trades.filter(trade =>
    trade.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateTrade = async (data: TradeCreate) => {
    const result = await createTrade(data)
    if (result.success) {
      setShowTradeForm(false)
    }
    return result
  }

  const handleUpdateTrade = async (data: TradeCreate) => {
    if (!editingTrade) return { success: false, error: "No trade selected" }
    
    const result = await updateTrade(editingTrade.id, data)
    if (result.success) {
      setEditingTrade(null)
    }
    return result
  }

  const handleDeleteTrade = async (trade: Trade) => {
    if (confirm("Are you sure you want to delete this trade?")) {
      await deleteTrade(trade.id)
    }
  }

  const handleCloseTrade = async (tradeId: number, exitPrice: number) => {
    const result = await closeTrade(tradeId, exitPrice)
    if (result.success) {
      setClosingTrade(null)
    }
    return result
  }

  // Get unique pairs for filter
  const uniquePairs = Array.from(new Set(trades.map(trade => trade.pair)))

  return (
    <DashboardLayout onAddTrade={() => setShowTradeForm(true)}>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">Trading Positions</h1>
            <p className="text-muted-foreground">
              Manage and analyze your trading portfolio
            </p>
          </div>
          <NeonButton
            onClick={() => setShowTradeForm(true)}
            neonColor="green"
            className="mt-4 sm:mt-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Trade
          </NeonButton>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search trades, pairs, notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-40 bg-white/5 border-white/10">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="OPEN">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>

              {/* Pair Filter */}
              <Select value={pairFilter} onValueChange={setPairFilter}>
                <SelectTrigger className="w-full lg:w-40 bg-white/5 border-white/10">
                  <SelectValue placeholder="Pair" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pairs</SelectItem>
                  {uniquePairs.map(pair => (
                    <SelectItem key={pair} value={pair}>{pair}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </GlassCard>
        </motion.div>

        {/* Trades Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TradesTable
            trades={filteredTrades}
            onEdit={setEditingTrade}
            onDelete={handleDeleteTrade}
            onClose={setClosingTrade}
            isLoading={isLoading}
          />
        </motion.div>
      </div>

      {/* Trade Form Dialog */}
      <Dialog open={showTradeForm || !!editingTrade} onOpenChange={() => {
        setShowTradeForm(false)
        setEditingTrade(null)
      }}>
        <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0">
          <TradeForm
            trade={editingTrade || undefined}
            onSubmit={editingTrade ? handleUpdateTrade : handleCreateTrade}
            onCancel={() => {
              setShowTradeForm(false)
              setEditingTrade(null)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Close Trade Dialog */}
      <CloseTradeDialog
        trade={closingTrade}
        open={!!closingTrade}
        onClose={() => setClosingTrade(null)}
        onConfirm={handleCloseTrade}
      />
    </DashboardLayout>
  )
}