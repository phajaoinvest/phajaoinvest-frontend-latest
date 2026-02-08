"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Star } from "lucide-react"

const earningsEvents = [
  {
    id: "1",
    symbol: "AAPL",
    company: "Apple Inc.",
    time: "After Market Close",
    eps_estimate: "$1.39",
    eps_actual: null,
    revenue_estimate: "$89.5B",
    date: "Today",
    inWatchlist: true,
  },
  {
    id: "2",
    symbol: "GOOGL",
    company: "Alphabet Inc.",
    time: "After Market Close",
    eps_estimate: "$1.34",
    eps_actual: null,
    revenue_estimate: "$74.3B",
    date: "Today",
    inWatchlist: false,
  },
  {
    id: "3",
    symbol: "MSFT",
    company: "Microsoft Corporation",
    time: "After Market Close",
    eps_estimate: "$2.78",
    eps_actual: "$2.85",
    revenue_estimate: "$56.2B",
    date: "Yesterday",
    inWatchlist: true,
  },
  {
    id: "4",
    symbol: "TSLA",
    company: "Tesla, Inc.",
    time: "After Market Close",
    eps_estimate: "$0.73",
    eps_actual: null,
    revenue_estimate: "$25.8B",
    date: "Tomorrow",
    inWatchlist: true,
  },
]

export function EarningsCalendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Earnings Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {earningsEvents.map((event) => (
            <div key={event.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm">{event.symbol}</span>
                      {event.inWatchlist && <Star className="h-3 w-3 text-primary fill-primary" />}
                    </div>
                    <div className="text-xs text-muted-foreground">{event.company}</div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {event.date}
                </Badge>
              </div>

              <div className="text-xs text-muted-foreground mb-3">{event.time}</div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">EPS Estimate:</span>
                  <span className="ml-1 font-medium">{event.eps_estimate}</span>
                  {event.eps_actual && (
                    <div className="mt-1">
                      <span className="text-muted-foreground">Actual:</span>
                      <span className="ml-1 font-medium text-green-500">{event.eps_actual}</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-muted-foreground">Revenue Est:</span>
                  <span className="ml-1 font-medium">{event.revenue_estimate}</span>
                </div>
              </div>

              {!event.inWatchlist && (
                <Button variant="outline" size="sm" className="w-full mt-3 text-xs bg-transparent">
                  Add to Watchlist
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
