import { cn } from "../../lib/utils"
import { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl",
        hover && "transition-all duration-300 hover:bg-white/20 dark:hover:bg-black/30 hover:scale-[1.02] hover:shadow-3xl",
        className
      )}
    >
      {children}
    </div>
  )
}