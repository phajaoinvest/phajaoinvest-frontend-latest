"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Plus, TrendingUp, TrendingDown } from "lucide-react"

const watchlistStocks = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 456.78,
    change: 12.34,
    changePercent: 2.78,
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    price: 123.45,
    change: -2.15,
    changePercent: -1.71,
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 298.76,
    change: 5.67,
    changePercent: 1.93,
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc.",
    price: 387.65,
    change: -8.23,
    changePercent: -2.08,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 145.32,
    change: 3.21,
    changePercent: 2.26,
  },
]

export function WatchList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Watchlist</CardTitle>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Add Stock
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {watchlistStocks.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="p-1">
                  <Star className="h-3 w-3 text-primary fill-primary" />
                </Button>
                <div>
                  <div className="font-medium text-sm">{stock.symbol}</div>
                  <div className="text-xs text-muted-foreground truncate max-w-[120px]">{stock.name}</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-medium text-sm">${stock.price}</div>
                <div className="flex items-center justify-end">
                  {stock.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={`text-xs ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {stock.changePercent}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
