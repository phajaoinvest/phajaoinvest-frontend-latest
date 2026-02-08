"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

export function PortfolioChart() {
  const portfolioValue = 125430.5
  const dayChange = 2340.25
  const dayChangePercent = 1.9

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Portfolio Performance</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="text-xs bg-transparent">
              1D
            </Button>
            <Button variant="outline" size="sm" className="text-xs bg-transparent">
              1W
            </Button>
            <Button variant="outline" size="sm" className="text-xs bg-transparent">
              1M
            </Button>
            <Button variant="default" size="sm" className="text-xs">
              3M
            </Button>
            <Button variant="outline" size="sm" className="text-xs bg-transparent">
              1Y
            </Button>
            <Button variant="outline" size="sm" className="text-xs bg-transparent">
              ALL
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">${portfolioValue.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                {dayChange >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <Badge variant={dayChange >= 0 ? "default" : "destructive"} className="text-sm">
                  {dayChange >= 0 ? "+" : ""}${dayChange.toLocaleString()} ({dayChangePercent}%)
                </Badge>
              </div>
            </div>
          </div>

          {/* Placeholder for chart */}
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-semibold mb-2">Portfolio Chart</div>
              <div className="text-sm text-muted-foreground">Interactive chart would be displayed here</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
