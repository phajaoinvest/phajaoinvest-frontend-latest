"use client"
import { StockResult } from "./stock-result"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, TrendingDown, Star } from "lucide-react"

// Mock stock data
const mockStocks = {
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.34,
    changePercent: 1.35,
    volume: "45.2M",
    marketCap: "2.8T",
    pe: 28.5,
    high52: 198.23,
    low52: 124.17,
    rsi: 54.46,
    support1: 155.5,
    support2: 135.5,
    resistance: 190.0,
  },
  GOOGL: {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 138.21,
    change: -1.23,
    changePercent: -0.88,
    volume: "28.1M",
    marketCap: "1.7T",
    pe: 25.3,
    high52: 151.55,
    low52: 83.34,
    rsi: 45.32,
    support1: 125.0,
    support2: 110.0,
    resistance: 150.0,
  },
  TSLA: {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.5,
    change: 12.45,
    changePercent: 5.27,
    volume: "89.3M",
    marketCap: "789B",
    pe: 65.2,
    high52: 299.29,
    low52: 138.8,
    rsi: 67.89,
    support1: 220.0,
    support2: 200.0,
    resistance: 280.0,
  },
  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.85,
    change: 4.12,
    changePercent: 1.1,
    volume: "32.7M",
    marketCap: "2.8T",
    pe: 32.1,
    high52: 384.3,
    low52: 213.43,
    rsi: 58.21,
    support1: 350.0,
    support2: 320.0,
    resistance: 390.0,
  },
  PLTR: {
    symbol: "PLTR",
    name: "Palantir Technologies Inc.",
    price: 169.25,
    change: -2.93,
    changePercent: -1.73,
    volume: "52.8M",
    marketCap: "35.2B",
    pe: 45.8,
    high52: 185.5,
    low52: 95.3,
    rsi: 54.46,
    support1: 155.5,
    support2: 135.5,
    resistance: 190.0,
  },
}

export function StockSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showDetailedResult, setShowDetailedResult] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const result = mockStocks[searchTerm.toUpperCase() as keyof typeof mockStocks]
      setSearchResult(result || null)
      setIsLoading(false)
      if (result) {
        setShowDetailedResult(true)
      }
    }, 500)
  }

  const handleBackToSearch = () => {
    setShowDetailedResult(false)
    setSearchResult(null)
    setSearchTerm("")
  }

  if (showDetailedResult && searchResult) {
    return <StockResult stockData={searchResult} onBack={handleBackToSearch} />
  }

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Search Any Stock</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get real-time quotes, detailed analytics, and comprehensive market data for any publicly traded stock
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <Input
              placeholder="Enter stock symbol (e.g., AAPL, GOOGL, TSLA, MSFT)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-sm"
            />
            <Button onClick={handleSearch} disabled={isLoading} className="text-sm">
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>

        {searchResult && !showDetailedResult && (
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{searchResult.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{searchResult.symbol}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4 mr-1" />
                    Add to Watchlist
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">${searchResult.price}</span>
                      <Badge
                        variant={searchResult.change >= 0 ? "default" : "destructive"}
                        className="flex items-center gap-1"
                      >
                        {searchResult.change >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {searchResult.change >= 0 ? "+" : ""}
                        {searchResult.change} ({searchResult.changePercent}%)
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Current Price</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-lg font-semibold">{searchResult.volume}</div>
                    <p className="text-xs text-muted-foreground">Volume</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-lg font-semibold">{searchResult.marketCap}</div>
                    <p className="text-xs text-muted-foreground">Market Cap</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-lg font-semibold">{searchResult.pe}</div>
                    <p className="text-xs text-muted-foreground">P/E Ratio</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-semibold">${searchResult.high52}</div>
                    <p className="text-xs text-muted-foreground">52W High</p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-semibold">${searchResult.low52}</div>
                    <p className="text-xs text-muted-foreground">52W Low</p>
                  </div>

                  <div className="md:col-span-2 flex gap-2">
                    <Button size="sm" className="flex-1">
                      Buy
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Sell
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {searchTerm && !searchResult && !isLoading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No results found for "{searchTerm}". Try searching for AAPL, GOOGL, TSLA, MSFT, or PLTR.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
