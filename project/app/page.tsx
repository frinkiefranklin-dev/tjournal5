"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../hooks/useAuth"
import { motion } from "framer-motion"
import { Zap, TrendingUp, ChartBar as BarChart3, Shield } from "lucide-react"
import { Button } from "../components/ui/button"
import { GlassCard } from "../components/ui/glass-card"
import { NeonButton } from "../components/ui/neon-button"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 grid-pattern">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 neon-pulse">
              <Zap className="h-10 w-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-6 gradient-text">
            TradeJournal 2090
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The future of trading analytics is here. Advanced journaling with AI-powered insights, 
            real-time analytics, and a cutting-edge interface designed for the modern trader.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NeonButton
              size="lg"
              neonColor="blue"
              onClick={() => router.push("/auth/signup")}
              className="text-lg px-8 py-4"
            >
              Start Trading Journey
            </NeonButton>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push("/auth/login")}
              className="text-lg px-8 py-4 border-white/20 hover:bg-white/10"
            >
              Sign In
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: TrendingUp,
              title: "Advanced Analytics",
              description: "Real-time performance tracking with AI-powered insights and predictive analytics.",
              color: "green"
            },
            {
              icon: BarChart3,
              title: "Interactive Charts",
              description: "Beautiful, responsive charts that adapt to your trading style and preferences.",
              color: "blue"
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description: "Bank-level security with end-to-end encryption for your trading data.",
              color: "purple"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <GlassCard className="p-8 text-center" hover>
                <div className={`inline-flex p-4 rounded-2xl mb-6 ${
                  feature.color === 'green' ? 'bg-green-500/20 text-green-400' :
                  feature.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-purple-500/20 text-purple-400'
                }`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <GlassCard className="p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 gradient-text">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of traders who have revolutionized their approach with TradeJournal 2090.
              Experience the future of trading analytics today.
            </p>
            <NeonButton
              size="lg"
              neonColor="purple"
              onClick={() => router.push("/auth/signup")}
              className="text-lg px-12 py-4"
            >
              Get Started Free
            </NeonButton>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}