"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Star, Bell } from "lucide-react"

const stats = {
  totalStocks: 15,
  gainers: 8,
  losers: 7,
  activeAlerts: 7,
}

const topPerformers = [
  { symbol: "NVDA", change: 2.78, positive: true },
  { symbol: "AMZN", change: 2.26, positive: true },
  { symbol: "META", change: 1.93, positive: true },
]

const topLosers = [
  { symbol: "NFLX", change: -2.08, positive: false },
  { symbol: "AMD", change: -1.71, positive: false },
]

export function WatchlistStats() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Watchlist Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Stocks</span>
            </div>
            <span className="text-lg font-bold">{stats.totalStocks}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Gainers</span>
            </div>
            <span className="text-lg font-bold text-green-500">{stats.gainers}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
              <span className="text-sm text-muted-foreground">Losers</span>
            </div>
            <span className="text-lg font-bold text-red-500">{stats.losers}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Active Alerts</span>
            </div>
            <span className="text-lg font-bold">{stats.activeAlerts}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Performers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topPerformers.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between">
              <span className="font-medium text-sm">{stock.symbol}</span>
              <Badge variant="default" className="text-xs">
                +{stock.change}%
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Losers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topLosers.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-between">
              <span className="font-medium text-sm">{stock.symbol}</span>
              <Badge variant="destructive" className="text-xs">
                {stock.change}%
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
