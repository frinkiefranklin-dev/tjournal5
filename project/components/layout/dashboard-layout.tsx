"use client"

import { ReactNode } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface DashboardLayoutProps {
  children: ReactNode
  onAddTrade?: () => void
}

export function DashboardLayout({ children, onAddTrade }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar />
      <div className="lg:pl-80">
        <Header onAddTrade={onAddTrade} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}