"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { GlassCard } from "../../components/ui/glass-card"
import { NeonButton } from "../../components/ui/neon-button"
import { Trade } from "../../lib/api"
import { formatCurrency } from "../../lib/utils"

const closeTradeSchema = z.object({
  exit_price: z.number().positive("Exit price must be positive"),
})

type CloseTradeFormData = z.infer<typeof closeTradeSchema>

interface CloseTradeDialogProps {
  trade: Trade | null
  open: boolean
  onClose: () => void
  onConfirm: (tradeId: number, exitPrice: number) => Promise<{ success: boolean; error?: string }>
  isLoading?: boolean
}

export function CloseTradeDialog({ 
  trade, 
  open, 
  onClose, 
  onConfirm, 
  isLoading 
}: CloseTradeDialogProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CloseTradeFormData>({
    resolver: zodResolver(closeTradeSchema),
  })

  const exitPrice = watch("exit_price")

  // Calculate potential result
  const potentialResult = trade && exitPrice
    ? (trade.direction === "BUY" 
        ? (exitPrice - trade.entry_price) 
        : (trade.entry_price - exitPrice)) * trade.position_size
    : null

  const onSubmit = async (data: CloseTradeFormData) => {
    if (!trade) return

    setSubmitError(null)
    const result = await onConfirm(trade.id, data.exit_price)
    
    if (result.success) {
      reset()
      onClose()
    } else {
      setSubmitError(result.error || "Failed to close trade")
    }
  }

  const handleClose = () => {
    reset()
    setSubmitError(null)
    onClose()
  }

  if (!trade) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-black/90 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Close Trade
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Trade Summary */}
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Pair:</span>
                <span className="ml-2 font-medium">{trade.pair}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Direction:</span>
                <span className={`ml-2 font-medium ${
                  trade.direction === "BUY" ? "text-green-400" : "text-red-400"
                }`}>
                  {trade.direction}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Entry:</span>
                <span className="ml-2 font-mono">{trade.entry_price.toFixed(5)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Size:</span>
                <span className="ml-2 font-mono">{trade.position_size}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="exit_price">Exit Price</Label>
              <Input
                id="exit_price"
                type="number"
                step="0.00001"
                placeholder="0.00000"
                className="bg-white/5 border-white/10"
                {...register("exit_price", { valueAsNumber: true })}
              />
              {errors.exit_price && (
                <p className="text-sm text-red-400">{errors.exit_price.message}</p>
              )}
            </div>

            {/* Potential Result */}
            {potentialResult !== null && (
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-sm text-muted-foreground mb-1">Potential Result:</div>
                <div className={`text-lg font-bold ${
                  potentialResult > 0 ? "text-green-400" : "text-red-400"
                }`}>
                  {formatCurrency(potentialResult)}
                </div>
              </div>
            )}

            {submitError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-400">{submitError}</p>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <NeonButton
                type="submit"
                neonColor="blue"
                disabled={isLoading}
              >
                {isLoading ? "Closing..." : "Close Trade"}
              </NeonButton>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}