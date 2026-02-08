"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, ExternalLink } from "lucide-react"

const trendingTopics = [
  { topic: "Federal Reserve", mentions: 1247, change: "+12%" },
  { topic: "AI Technology", mentions: 892, change: "+8%" },
  { topic: "Electric Vehicles", mentions: 634, change: "+15%" },
  { topic: "Cryptocurrency", mentions: 521, change: "-3%" },
  { topic: "Inflation", mentions: 445, change: "+5%" },
]

const breakingNews = [
  {
    id: "1",
    title: "Market Opens Higher on Fed Comments",
    time: "5 min ago",
    source: "Reuters",
    urgent: true,
  },
  {
    id: "2",
    title: "Tech Earnings Beat Expectations",
    time: "15 min ago",
    source: "Bloomberg",
    urgent: false,
  },
  {
    id: "3",
    title: "Oil Prices Surge on Supply Concerns",
    time: "32 min ago",
    source: "CNBC",
    urgent: false,
  },
  {
    id: "4",
    title: "Dollar Strengthens Against Euro",
    time: "1 hour ago",
    source: "MarketWatch",
    urgent: false,
  },
]

const watchlistNews = [
  { symbol: "AAPL", title: "Apple Announces New Product Line", time: "2h ago" },
  { symbol: "GOOGL", title: "Alphabet Invests in AI Startup", time: "4h ago" },
  { symbol: "TSLA", title: "Tesla Expands Charging Network", time: "6h ago" },
]

export function TrendingNews() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{topic.topic}</div>
                <div className="text-xs text-muted-foreground">{topic.mentions} mentions</div>
              </div>
              <Badge variant={topic.change.startsWith("+") ? "default" : "destructive"} className="text-xs">
                {topic.change}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Breaking News</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {breakingNews.map((news) => (
            <div key={news.id} className="space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-sm line-clamp-2 flex-1">{news.title}</h4>
                {news.urgent && (
                  <Badge variant="destructive" className="text-xs ml-2">
                    URGENT
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{news.source}</span>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {news.time}
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
            <ExternalLink className="h-4 w-4 mr-1" />
            View All Breaking News
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Watchlist News</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {watchlistNews.map((news, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {news.symbol}
                </Badge>
                <span className="text-xs text-muted-foreground">{news.time}</span>
              </div>
              <h4 className="font-medium text-sm line-clamp-2">{news.title}</h4>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
            View All Watchlist News
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
