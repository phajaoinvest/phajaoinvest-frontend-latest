"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
    allocation: 28.5,
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
    allocation: 11.2,
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
    allocation: 24.2,
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
    allocation: 36.1,
  },
]

export function PortfolioHoldings() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Holdings</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search holdings..." className="pl-8 text-sm w-64" />
            </div>
            <Button size="sm">Add Position</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-xs font-medium text-muted-foreground">SYMBOL</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">SHARES</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">AVG PRICE</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">CURRENT</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">VALUE</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">GAIN/LOSS</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">ALLOCATION</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <tr key={holding.symbol} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4">
                    <div>
                      <div className="font-semibold text-sm">{holding.symbol}</div>
                      <div className="text-xs text-muted-foreground">{holding.name}</div>
                    </div>
                  </td>
                  <td className="text-right py-4 text-sm">{holding.shares}</td>
                  <td className="text-right py-4 text-sm">${holding.avgPrice}</td>
                  <td className="text-right py-4 text-sm">${holding.currentPrice}</td>
                  <td className="text-right py-4 text-sm font-medium">${holding.value.toLocaleString()}</td>
                  <td className="text-right py-4">
                    <div className="flex items-center justify-end">
                      {holding.gainLoss >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <div className={`text-sm ${holding.gainLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {holding.gainLoss >= 0 ? "+" : ""}${holding.gainLoss.toLocaleString()}
                        <div className="text-xs">({holding.gainLossPercent}%)</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4 text-sm">{holding.allocation}%</td>
                  <td className="text-right py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Buy More</DropdownMenuItem>
                        <DropdownMenuItem>Sell</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
