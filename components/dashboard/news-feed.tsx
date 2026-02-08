"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ExternalLink, Bookmark, Share } from "lucide-react"

const newsArticles = [
  {
    id: "1",
    title: "Apple Reports Record Q4 Earnings, Beats Wall Street Expectations",
    summary:
      "Apple Inc. reported quarterly earnings that exceeded analyst expectations, driven by strong iPhone sales and growing services revenue. The company's stock jumped 5% in after-hours trading.",
    source: "MarketWatch",
    author: "Sarah Johnson",
    time: "2 hours ago",
    category: "Earnings",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "3 min read",
  },
  {
    id: "2",
    title: "Federal Reserve Signals Potential Rate Cut in December Meeting",
    summary:
      "Fed Chair Jerome Powell hinted at a possible interest rate reduction during his speech at the Economic Club, citing concerns about slowing economic growth and inflation trends.",
    source: "Reuters",
    author: "Michael Chen",
    time: "4 hours ago",
    category: "Economic Policy",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "5 min read",
  },
  {
    id: "3",
    title: "Tesla Announces New Gigafactory in Southeast Asia",
    summary:
      "Tesla revealed plans for a new manufacturing facility in Thailand, marking the company's continued expansion into Asian markets. The facility is expected to produce 500,000 vehicles annually.",
    source: "Bloomberg",
    author: "Lisa Wang",
    time: "6 hours ago",
    category: "Corporate News",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "4 min read",
  },
  {
    id: "4",
    title: "Tech Stocks Rally on AI Optimism, Nasdaq Hits New High",
    summary:
      "Major technology companies saw significant gains as investors showed renewed optimism about artificial intelligence adoption across industries. The Nasdaq composite reached a new all-time high.",
    source: "CNBC",
    author: "David Rodriguez",
    time: "8 hours ago",
    category: "Market Analysis",
    image: "/placeholder.svg?height=200&width=300",
    readTime: "6 min read",
  },
]

export function NewsFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Latest News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {newsArticles.map((article) => (
            <article key={article.id} className="border-b border-border pb-6 last:border-0">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary cursor-pointer">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{article.summary}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{article.source}</span>
                      <span>•</span>
                      <span>By {article.author}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.time}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="w-24 h-24 bg-muted rounded-lg flex-shrink-0">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">Load More Articles</Button>
        </div>
      </CardContent>
    </Card>
  )
}
