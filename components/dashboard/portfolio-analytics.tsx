"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Shield } from "lucide-react"

const analytics = {
  totalReturn: 14.2,
  annualizedReturn: 18.5,
  volatility: 12.3,
  sharpeRatio: 1.45,
  maxDrawdown: -8.7,
  beta: 1.12,
}

const riskMetrics = [
  { label: "Conservative", value: 20, color: "bg-green-500" },
  { label: "Moderate", value: 60, color: "bg-yellow-500" },
  { label: "Aggressive", value: 20, color: "bg-red-500" },
]

export function PortfolioAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Return</span>
            <div className="flex items-center">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-500">+{analytics.totalReturn}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Annualized Return</span>
            <div className="flex items-center">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-500">+{analytics.annualizedReturn}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Volatility</span>
            <span className="text-sm font-medium">{analytics.volatility}%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Sharpe Ratio</span>
            <span className="text-sm font-medium">{analytics.sharpeRatio}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Max Drawdown</span>
            <div className="flex items-center">
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              <span className="text-sm font-medium text-red-500">{analytics.maxDrawdown}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Beta</span>
            <span className="text-sm font-medium">{analytics.beta}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Risk Profile</span>
          </div>
          {riskMetrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">{metric.label}</span>
                <span>{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
