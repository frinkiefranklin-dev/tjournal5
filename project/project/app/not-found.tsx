"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Hop as Home, ArrowLeft, Zap } from "lucide-react"
import { Button } from '../../components/ui/button';
import { GlassCard } from '../../components/ui/glass-card';
import { NeonButton } from '../../components/ui/neon-button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 grid-pattern flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-8 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist in the TradeJournal 2090 universe.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <NeonButton neonColor="blue" className="w-full sm:w-auto">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </NeonButton>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-white/20 hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}