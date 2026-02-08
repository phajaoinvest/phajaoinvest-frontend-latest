"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Star, Search, TrendingUp, TrendingDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const watchlistStocks = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 456.78,
    change: 12.34,
    changePercent: 2.78,
    volume: "45.2M",
    marketCap: "1.1T",
    pe: 65.2,
    alerts: 2,
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    price: 123.45,
    change: -2.15,
    changePercent: -1.71,
    volume: "28.1M",
    marketCap: "199B",
    pe: 45.3,
    alerts: 1,
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 298.76,
    change: 5.67,
    changePercent: 1.93,
    volume: "32.7M",
    marketCap: "756B",
    pe: 23.1,
    alerts: 0,
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc.",
    price: 387.65,
    change: -8.23,
    changePercent: -2.08,
    volume: "15.4M",
    marketCap: "172B",
    pe: 34.5,
    alerts: 3,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 145.32,
    change: 3.21,
    changePercent: 2.26,
    volume: "41.8M",
    marketCap: "1.5T",
    pe: 52.7,
    alerts: 1,
  },
]

export function WatchlistTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">My Watchlist</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search stocks..." className="pl-8 text-sm w-64" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-xs font-medium text-muted-foreground">SYMBOL</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">PRICE</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">CHANGE</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">VOLUME</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">MARKET CAP</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">P/E</th>
                <th className="text-center py-3 text-xs font-medium text-muted-foreground">ALERTS</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {watchlistStocks.map((stock) => (
                <tr key={stock.symbol} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <Button variant="ghost" size="sm" className="p-1">
                        <Star className="h-4 w-4 text-primary fill-primary" />
                      </Button>
                      <div>
                        <div className="font-semibold text-sm">{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">{stock.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4 text-sm font-medium">${stock.price}</td>
                  <td className="text-right py-4">
                    <div className="flex items-center justify-end">
                      {stock.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <div className={`text-sm ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {stock.change >= 0 ? "+" : ""}${stock.change}
                        <div className="text-xs">({stock.changePercent}%)</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4 text-sm">{stock.volume}</td>
                  <td className="text-right py-4 text-sm">{stock.marketCap}</td>
                  <td className="text-right py-4 text-sm">{stock.pe}</td>
                  <td className="text-center py-4">
                    {stock.alerts > 0 ? (
                      <Badge variant="secondary" className="text-xs">
                        {stock.alerts}
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="text-right py-4">
                    <div className="flex items-center justify-end space-x-1">
                      <Button size="sm" variant="outline" className="text-xs bg-transparent">
                        Buy
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Chart</DropdownMenuItem>
                          <DropdownMenuItem>Set Alert</DropdownMenuItem>
                          <DropdownMenuItem>Add to Portfolio</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remove from Watchlist</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
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
