"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Settings, Shield, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { NeonButton } from "@/components/ui/neon-button"

export default function ProfilePage() {
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth()
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

  const handleLogout = () => {
    logout()
    router.push("/")
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
              Profile Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <GlassCard className="p-8">
              <div className="flex items-center space-x-6 mb-8">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Trader Profile</h2>
                  <p className="text-muted-foreground">TradeJournal 2090 User</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-muted-foreground">user@example.com</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Member Since</label>
                    <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-muted-foreground">January 2024</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Trading Experience</label>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                    <span className="text-muted-foreground">Advanced Trader</span>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <NeonButton neonColor="blue">
                    Update Profile
                  </NeonButton>
                  <Button variant="outline">
                    Change Password
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Account Settings */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="font-medium">Notifications</div>
                  <div className="text-sm text-muted-foreground">Manage alerts and emails</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="font-medium">Display</div>
                  <div className="text-sm text-muted-foreground">Theme and appearance</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="font-medium">Trading Preferences</div>
                  <div className="text-sm text-muted-foreground">Default settings</div>
                </button>
              </div>
            </GlassCard>

            {/* Security */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="font-medium">Two-Factor Auth</div>
                  <div className="text-sm text-muted-foreground">Enable 2FA</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="font-medium">Login History</div>
                  <div className="text-sm text-muted-foreground">Recent activity</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="font-medium">API Keys</div>
                  <div className="text-sm text-muted-foreground">Manage integrations</div>
                </button>
              </div>
            </GlassCard>

            {/* Logout */}
            <GlassCard className="p-6">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  )
}