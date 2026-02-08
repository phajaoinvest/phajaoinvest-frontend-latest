"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { TrendingUp, BarChart3, Wallet, History, Star, Settings, Shield, Calendar, Newspaper } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Portfolio", href: "/dashboard/portfolio", icon: TrendingUp },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Transactions", href: "/dashboard/transactions", icon: History },
  { name: "Watchlist", href: "/dashboard/watchlist", icon: Star },
  { name: "Market Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "News", href: "/dashboard/news", icon: Newspaper },
  { name: "Security", href: "/dashboard/security", icon: Shield },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-muted/30 border-r border-border">
      <div className="flex items-center h-14 px-6 border-b border-border">
        <Link href="/" className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Phajaoinvest</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Button
              key={item.name}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-sm",
                isActive && "bg-primary/10 text-primary hover:bg-primary/20",
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-primary/10 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-2">Upgrade to Pro</h3>
          <p className="text-xs text-muted-foreground mb-3">Get advanced analytics and unlimited watchlists</p>
          <Button size="sm" className="w-full text-xs">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  )
}
