"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, TrendingUp, ChartBar as BarChart3, User, Menu, X, Zap } from "lucide-react"
import { cn } from "../../lib/utils"
import { GlassCard } from "../ui/glass-card"

const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "blue" },
	{ name: "Trades", href: "/trades", icon: TrendingUp, color: "green" },
	{ name: "Analytics", href: "/stats", icon: BarChart3, color: "purple" },
	{ name: "Profile", href: "/profile", icon: User, color: "pink" },
]

export function Sidebar() {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const pathname = usePathname()

	return (
		<>
			{/* Mobile overlay */}
			{!isCollapsed && (
				<div
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
					onClick={() => setIsCollapsed(true)}
				/>
			)}

			<motion.aside
				initial={false}
				animate={{ width: isCollapsed ? 80 : 280 }}
				className="fixed left-0 top-0 z-50 h-full"
			>
				<GlassCard className="h-full rounded-none rounded-r-3xl border-l-0">
					<div className="flex h-full flex-col">
						{/* Header */}
						<div className="flex items-center justify-between p-6">
							<motion.div
								initial={false}
								animate={{ opacity: isCollapsed ? 0 : 1 }}
								className="flex items-center space-x-3"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
									<Zap className="h-6 w-6 text-white" />
								</div>
								{!isCollapsed && (
									<div>
										<h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
											TradeJournal
										</h1>
										<p className="text-xs text-muted-foreground">
											2090 Edition
										</p>
									</div>
								)}
							</motion.div>

							<button
								onClick={() => setIsCollapsed(!isCollapsed)}
								className="rounded-lg p-2 hover:bg-white/10 transition-colors"
							>
								{isCollapsed ? (
									<Menu className="h-5 w-5" />
								) : (
									<X className="h-5 w-5" />
								)}
							</button>
						</div>

						{/* Navigation */}
						<nav className="flex-1 space-y-2 px-4">
							{navigation.map((item) => {
								const isActive = pathname === item.href
								return (
									<Link key={item.name} href={item.href}>
										<motion.div
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className={cn(
												"flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
												isActive
													? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg"
													: "text-muted-foreground hover:bg-white/10 hover:text-foreground"
											)}
										>
											<item.icon className="h-5 w-5 flex-shrink-0" />
									<item.icon className={cn(
										"h-7 w-7 flex-shrink-0 drop-shadow-lg transition-all duration-300",
										item.color === 'blue' && isActive ? 'text-blue-400' : '',
										item.color === 'green' && isActive ? 'text-green-400' : '',
										item.color === 'purple' && isActive ? 'text-purple-400' : '',
										item.color === 'pink' && isActive ? 'text-pink-400' : '',
										!isActive ? 'text-muted-foreground' : ''
									)} />
											<motion.span
												initial={false}
												animate={{ opacity: isCollapsed ? 0 : 1 }}
												className="truncate"
											>
												{item.name}
											</motion.span>
										</motion.div>
									</Link>
								)
							})}
						</nav>

						{/* Footer */}
						<div className="p-4">
							<motion.div
								initial={false}
								animate={{ opacity: isCollapsed ? 0 : 1 }}
								className="text-center text-xs text-muted-foreground"
							>
								<p>Powered by AI</p>
								<p className="text-blue-400">v2090.1.0</p>
							</motion.div>
						</div>
					</div>
				</GlassCard>
			</motion.aside>
		</>
	)
}