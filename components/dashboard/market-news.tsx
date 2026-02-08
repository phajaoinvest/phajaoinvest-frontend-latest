"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Clock } from "lucide-react"

const newsItems = [
  {
    id: "1",
    title: "Apple Reports Strong Q4 Earnings",
    summary: "Apple Inc. exceeded expectations with record iPhone sales and services revenue growth.",
    source: "MarketWatch",
    time: "2 hours ago",
    category: "Earnings",
  },
  {
    id: "2",
    title: "Fed Signals Potential Rate Cut",
    summary: "Federal Reserve hints at possible interest rate reduction in upcoming meeting.",
    source: "Reuters",
    time: "4 hours ago",
    category: "Economic",
  },
  {
    id: "3",
    title: "Tesla Announces New Gigafactory",
    summary: "Tesla reveals plans for new manufacturing facility in Southeast Asia.",
    source: "Bloomberg",
    time: "6 hours ago",
    category: "Corporate",
  },
  {
    id: "4",
    title: "Tech Stocks Rally on AI Optimism",
    summary: "Major technology companies see gains as AI adoption accelerates across industries.",
    source: "CNBC",
    time: "8 hours ago",
    category: "Technology",
  },
]

export function MarketNews() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Market News</CardTitle>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-1" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-sm leading-tight line-clamp-2">{item.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.source}</span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
