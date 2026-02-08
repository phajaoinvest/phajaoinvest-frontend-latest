"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react"

const portfolioData = {
  totalValue: 125430.5,
  dayChange: 2340.25,
  dayChangePercent: 1.9,
  totalGainLoss: 15430.5,
  totalGainLossPercent: 14.0,
}

const holdings = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 50,
    avgPrice: 150.25,
    currentPrice: 175.43,
    value: 8771.5,
    gainLoss: 1259.0,
    gainLossPercent: 16.8,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 25,
    avgPrice: 145.8,
    currentPrice: 138.21,
    value: 3455.25,
    gainLoss: -189.75,
    gainLossPercent: -5.2,
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    shares: 30,
    avgPrice: 220.15,
    currentPrice: 248.5,
    value: 7455.0,
    gainLoss: 850.5,
    gainLossPercent: 12.9,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 40,
    avgPrice: 350.25,
    currentPrice: 378.85,
    value: 15154.0,
    gainLoss: 1144.0,
    gainLossPercent: 8.2,
  },
]

export function PortfolioOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Total Value</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold">${portfolioData.totalValue.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                {portfolioData.dayChange >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={`text-xs ${portfolioData.dayChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  ${Math.abs(portfolioData.dayChange).toLocaleString()} ({portfolioData.dayChangePercent}%)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Total Gain/Loss</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-green-500">+${portfolioData.totalGainLoss.toLocaleString()}</div>
              <div className="text-xs text-green-500">+{portfolioData.totalGainLossPercent}%</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Holdings</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold">{holdings.length}</div>
              <div className="text-xs text-muted-foreground">Active positions</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Cash</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold">$12,450</div>
              <div className="text-xs text-muted-foreground">Available</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {holdings.map((holding) => (
              <div
                key={holding.symbol}
                className="flex items-center justify-between p-3 border border-border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-semibold text-sm">{holding.symbol}</div>
                      <div className="text-xs text-muted-foreground">{holding.name}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    {holding.shares} shares @ ${holding.avgPrice}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold text-sm">${holding.value.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">${holding.currentPrice}</div>
                  <Badge variant={holding.gainLoss >= 0 ? "default" : "destructive"} className="mt-1 text-xs">
                    {holding.gainLoss >= 0 ? "+" : ""}${holding.gainLoss.toLocaleString()} ({holding.gainLossPercent}%)
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
