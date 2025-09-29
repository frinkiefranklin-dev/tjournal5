import { cn } from "../../lib/utils"
import { Button, ButtonProps } from "./button"

interface NeonButtonProps extends ButtonProps {
  neonColor?: "blue" | "green" | "purple" | "pink"
}

export function NeonButton({ 
  children, 
  className, 
  neonColor = "blue", 
  ...props 
}: NeonButtonProps) {
  const neonClasses = {
    blue: "shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] border-blue-500/50",
    green: "shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] border-green-500/50",
    purple: "shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:shadow-[0_0_30px_rgba(147,51,234,0.8)] border-purple-500/50",
    pink: "shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] border-pink-500/50",
  }

  return (
    <Button
      className={cn(
        "neon-pulse relative border transition-all duration-300 bg-gradient-to-r from-transparent to-transparent hover:from-white/10 hover:to-white/5",
        neonClasses[neonColor],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}