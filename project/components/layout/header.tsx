"use client"

import { Bell, Plus, Search, LogOut } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { GlassCard } from "../../components/ui/glass-card"
import { NeonButton } from "../../components/ui/neon-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { useAuth } from "../../hooks/useAuth"
import { motion } from "framer-motion"

interface HeaderProps {
  onAddTrade?: () => void
}

export function Header({ onAddTrade }: HeaderProps) {
  const { logout } = useAuth()

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 w-full"
    >
      <GlassCard className="mx-6 mt-6 rounded-2xl">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Search */}
          <div className="flex flex-1 items-center space-x-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-400 drop-shadow-lg" />
              <Input
                placeholder="Search trades, pairs..."
                className="pl-10 bg-white/5 border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Add Trade Button */}
            <NeonButton
              onClick={onAddTrade}
              size="sm"
              neonColor="green"
              className="hidden sm:flex"
            >
              <Plus className="h-5 w-5 mr-2 text-green-400 drop-shadow-lg" />
              Add Trade
            </NeonButton>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-6 w-6 text-yellow-400 drop-shadow-lg" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs"></span>
            </Button>


            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
                    U
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-black/90 backdrop-blur-xl border-white/10">
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-400">
                  <LogOut className="h-5 w-5 mr-2 text-red-400 drop-shadow-lg" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </GlassCard>
    </motion.header>
  )
}