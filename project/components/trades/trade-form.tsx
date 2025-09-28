"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GlassCard } from "@/components/ui/glass-card"
import { NeonButton } from "@/components/ui/neon-button"
import { TradeCreate, Trade } from "@/lib/api"

const tradeSchema = z.object({
  pair: z.string().min(1, "Pair is required"),
  direction: z.enum(["BUY", "SELL"]),
  entry_price: z.number().positive("Entry price must be positive"),
  stop_loss: z.number().positive().optional(),
  take_profit: z.number().positive().optional(),
  position_size: z.number().positive("Position size must be positive"),
  notes: z.string().optional(),
  screenshot_url: z.string().url().optional().or(z.literal("")),
})

type TradeFormData = z.infer<typeof tradeSchema>

interface TradeFormProps {
  trade?: Trade
  onSubmit: (data: TradeCreate) => Promise<{ success: boolean; error?: string }>
  onCancel: () => void
  isLoading?: boolean
}

const CURRENCY_PAIRS = [
  "EUR/USD", "GBP/USD", "USD/JPY", "USD/CHF", "AUD/USD", "USD/CAD", "NZD/USD",
  "XAU/USD", "XAG/USD", "BTC/USD", "ETH/USD", "OIL/USD"
]

export function TradeForm({ trade, onSubmit, onCancel, isLoading }: TradeFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TradeFormData>({
    resolver: zodResolver(tradeSchema),
    defaultValues: trade ? {
      pair: trade.pair,
      direction: trade.direction,
      entry_price: trade.entry_price,
      stop_loss: trade.stop_loss,
      take_profit: trade.take_profit,
      position_size: trade.position_size,
      notes: trade.notes || "",
      screenshot_url: trade.screenshot_url || "",
    } : {
      direction: "BUY",
      position_size: 1,
    },
  })

  const direction = watch("direction")
  const entryPrice = watch("entry_price")
  const stopLoss = watch("stop_loss")
  const takeProfit = watch("take_profit")

  // Calculate risk/reward ratio
  const riskReward = entryPrice && stopLoss && takeProfit
    ? Math.abs(takeProfit - entryPrice) / Math.abs(entryPrice - stopLoss)
    : null

  const onFormSubmit = async (data: TradeFormData) => {
    setSubmitError(null)
    const result = await onSubmit({
      ...data,
      screenshot_url: data.screenshot_url || undefined,
      notes: data.notes || undefined,
      stop_loss: data.stop_loss || undefined,
      take_profit: data.take_profit || undefined,
    })
    
    if (!result.success) {
      setSubmitError(result.error || "Failed to save trade")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <GlassCard className="p-6 max-w-2xl mx-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {trade ? "Edit Trade" : "New Trade"}
            </h2>
            <p className="text-muted-foreground">
              {trade ? "Update your trade details" : "Record a new trading position"}
            </p>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Pair and Direction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pair">Currency Pair</Label>
                <Select onValueChange={(value) => setValue("pair", value)}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select pair" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCY_PAIRS.map((pair) => (
                      <SelectItem key={pair} value={pair}>
                        {pair}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.pair && (
                  <p className="text-sm text-red-400">{errors.pair.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="direction">Direction</Label>
                <Select onValueChange={(value) => setValue("direction", value as "BUY" | "SELL")}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BUY">
                      <span className="text-green-400">BUY (Long)</span>
                    </SelectItem>
                    <SelectItem value="SELL">
                      <span className="text-red-400">SELL (Short)</span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.direction && (
                  <p className="text-sm text-red-400">{errors.direction.message}</p>
                )}
              </div>
            </div>

            {/* Prices */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="entry_price">Entry Price</Label>
                <Input
                  id="entry_price"
                  type="number"
                  step="0.00001"
                  placeholder="0.00000"
                  className="bg-white/5 border-white/10"
                  {...register("entry_price", { valueAsNumber: true })}
                />
                {errors.entry_price && (
                  <p className="text-sm text-red-400">{errors.entry_price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="stop_loss">Stop Loss</Label>
                <Input
                  id="stop_loss"
                  type="number"
                  step="0.00001"
                  placeholder="0.00000"
                  className="bg-white/5 border-white/10"
                  {...register("stop_loss", { valueAsNumber: true })}
                />
                {errors.stop_loss && (
                  <p className="text-sm text-red-400">{errors.stop_loss.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="take_profit">Take Profit</Label>
                <Input
                  id="take_profit"
                  type="number"
                  step="0.00001"
                  placeholder="0.00000"
                  className="bg-white/5 border-white/10"
                  {...register("take_profit", { valueAsNumber: true })}
                />
                {errors.take_profit && (
                  <p className="text-sm text-red-400">{errors.take_profit.message}</p>
                )}
              </div>
            </div>

            {/* Position Size and R:R */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position_size">Position Size</Label>
                <Input
                  id="position_size"
                  type="number"
                  step="0.01"
                  placeholder="1.00"
                  className="bg-white/5 border-white/10"
                  {...register("position_size", { valueAsNumber: true })}
                />
                {errors.position_size && (
                  <p className="text-sm text-red-400">{errors.position_size.message}</p>
                )}
              </div>

              {riskReward && (
                <div className="space-y-2">
                  <Label>Risk/Reward Ratio</Label>
                  <div className="h-10 px-3 py-2 bg-white/5 border border-white/10 rounded-md flex items-center">
                    <span className={`font-medium ${riskReward >= 2 ? 'text-green-400' : riskReward >= 1 ? 'text-yellow-400' : 'text-red-400'}`}>
                      1:{riskReward.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Trade analysis, setup, reasoning..."
                className="bg-white/5 border-white/10 min-h-[100px]"
                {...register("notes")}
              />
            </div>

            {/* Screenshot URL */}
            <div className="space-y-2">
              <Label htmlFor="screenshot_url">Screenshot URL</Label>
              <Input
                id="screenshot_url"
                type="url"
                placeholder="https://example.com/screenshot.png"
                className="bg-white/5 border-white/10"
                {...register("screenshot_url")}
              />
              {errors.screenshot_url && (
                <p className="text-sm text-red-400">{errors.screenshot_url.message}</p>
              )}
            </div>

            {submitError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-400">{submitError}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <NeonButton
                type="submit"
                neonColor="green"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : trade ? "Update Trade" : "Create Trade"}
              </NeonButton>
            </div>
          </form>
        </div>
      </GlassCard>
    </motion.div>
  )
}