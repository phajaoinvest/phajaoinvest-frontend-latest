"use client"

import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Share2, TrendingUp, Coins } from "lucide-react"

// Sample news data (in a real app, this would come from an API)
const newsData = {
  stock: {
    1: {
      title: "Tech Stocks Rally as AI Investments Surge",
      content: `
        <p>Major technology companies are experiencing significant gains as artificial intelligence investments continue to drive unprecedented market optimism. The surge in AI-related stocks has been particularly pronounced in the past quarter, with several major players reporting substantial increases in their market valuations.</p>
        
        <p>Leading technology giants have announced massive investments in AI infrastructure, research, and development. These strategic moves are being viewed favorably by investors who see artificial intelligence as the next major growth driver for the technology sector.</p>
        
        <p>Market analysts predict that this trend will continue throughout the year, with AI-focused companies likely to see sustained growth. The integration of AI technologies across various industries is creating new opportunities and revenue streams for technology companies.</p>
        
        <p>However, experts also caution that investors should remain vigilant about potential market volatility and ensure they maintain diversified portfolios despite the current AI enthusiasm.</p>
      `,
      category: "Technology",
      date: "2024-01-15",
      readTime: "3 min read",
      author: "Sarah Johnson",
      tags: ["AI", "Technology", "Stocks", "Investment"],
    },
    2: {
      title: "Federal Reserve Signals Potential Rate Cuts",
      content: `
        <p>The Federal Reserve has hinted at possible interest rate reductions in the coming months, a move that has significantly boosted investor confidence across various market sectors. This potential shift in monetary policy comes as economic indicators suggest a more balanced approach to inflation control.</p>
        
        <p>Fed officials have indicated that recent economic data supports a more accommodative stance, with inflation showing signs of stabilization within target ranges. The prospect of lower interest rates has particularly benefited growth stocks and sectors sensitive to borrowing costs.</p>
        
        <p>Market participants are closely monitoring upcoming Fed meetings and economic releases for further clarity on the timing and magnitude of potential rate cuts. The anticipation has already led to increased trading volumes and positive sentiment across equity markets.</p>
      `,
      category: "Economy",
      date: "2024-01-14",
      readTime: "4 min read",
      author: "Michael Chen",
      tags: ["Federal Reserve", "Interest Rates", "Economy", "Monetary Policy"],
    },
  },
  gold: {
    1: {
      title: "Gold Prices Reach New Monthly Highs",
      content: `
        <p>The precious metals market is experiencing significant gains as gold prices reach new monthly highs, driven by investors seeking safe-haven assets amid ongoing economic uncertainty. This surge reflects growing concerns about global economic stability and inflation pressures.</p>
        
        <p>Gold has traditionally served as a hedge against inflation and economic volatility, and recent market conditions have reinforced this role. Central bank policies, geopolitical tensions, and currency fluctuations have all contributed to increased demand for precious metals.</p>
        
        <p>Investment analysts suggest that gold's current trajectory may continue as long as economic uncertainties persist. The metal's performance has outpaced many other asset classes in recent weeks, attracting both institutional and retail investors.</p>
      `,
      category: "Precious Metals",
      date: "2024-01-15",
      readTime: "2 min read",
      author: "Emma Rodriguez",
      tags: ["Gold", "Precious Metals", "Safe Haven", "Investment"],
    },
  },
}

export default function NewsArticlePage() {
  const params = useParams()
  const router = useRouter()
  const { type, id } = params

  const article = newsData[type as keyof typeof newsData]?.[id as keyof typeof newsData.stock]

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center h-screen container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The requested news article could not be found.</p>
            <Button onClick={() => router.push("/protected-routes/news")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => router.push("/protected-routes/news")} className="mb-6 border hover:border-primary hover:bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <Badge variant="secondary">{article.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(article.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {article.readTime}
              </div>
            </div>

            <h1 className="text-xl font-bold mb-2 text-balance">{article.title}</h1>

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">By {article.author}</p>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Article Image */}
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-8">
            {type === "stock" ? (
              <TrendingUp className="h-16 w-16 text-muted-foreground" />
            ) : (
              <Coins className="h-16 w-16 text-muted-foreground" />
            )}
          </div>

          {/* Article Content */}
          <div className="text-sm prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: article.content }} />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Related Articles */}
          <div className="border-t pt-8">
            <h3 className="text-md font-semibold mb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="text-sm font-medium mb-2">Energy Sector Outperforms Market Expectations</h4>
                <p className="text-sm text-muted-foreground">
                  Oil and gas companies report strong quarterly earnings...
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <h4 className="text-sm font-medium mb-2">Healthcare Stocks Rise on Drug Approval News</h4>
                <p className="text-sm text-muted-foreground">Pharmaceutical companies see stock price increases...</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
