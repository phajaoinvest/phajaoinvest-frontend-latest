"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// import { useCustomerStore } from "../store/useCustomerStore"
import { Search, Calendar, Clock, TrendingUp, Coins, ChevronLeft, ChevronRight, Lock, ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { useCustomerStore } from "@/app/store/useCustomerStore"

const stockNews = [
  {
    id: 1,
    title: "Tech Stocks Rally as AI Investments Surge",
    excerpt:
      "Major technology companies see significant gains as artificial intelligence investments continue to drive market optimism.",
    category: "Technology",
    date: "2024-01-15",
    readTime: "3 min read",
    image: "/tech-stocks.jpg",
  },
  {
    id: 2,
    title: "Federal Reserve Signals Potential Rate Cuts",
    excerpt:
      "The Federal Reserve hints at possible interest rate reductions in the coming months, boosting investor confidence.",
    category: "Economy",
    date: "2024-01-14",
    readTime: "4 min read",
    image: "/federal-reserve.jpg",
  },
  {
    id: 3,
    title: "Energy Sector Outperforms Market Expectations",
    excerpt:
      "Oil and gas companies report strong quarterly earnings, leading to sector-wide gains in the stock market.",
    category: "Energy",
    date: "2024-01-13",
    readTime: "2 min read",
    image: "/energy-sector.jpg",
  },
  {
    id: 4,
    title: "Healthcare Stocks Rise on Drug Approval News",
    excerpt:
      "Pharmaceutical companies see stock price increases following FDA approval of several breakthrough medications.",
    category: "Healthcare",
    date: "2024-01-12",
    readTime: "3 min read",
    image: "/healthcare-stocks.jpg",
  },
  {
    id: 5,
    title: "Banking Sector Shows Strong Q4 Performance",
    excerpt: "Major banks report better-than-expected earnings, driven by higher interest rates and loan growth.",
    category: "Banking",
    date: "2024-01-11",
    readTime: "4 min read",
    image: "/banking-stocks.jpg",
  },
  {
    id: 6,
    title: "Retail Giants Prepare for Holiday Season",
    excerpt: "Consumer retail companies gear up for the holiday shopping season with optimistic sales forecasts.",
    category: "Retail",
    date: "2024-01-10",
    readTime: "3 min read",
    image: "/retail-stocks.jpg",
  },
  {
    id: 7,
    title: "Automotive Industry Embraces Electric Future",
    excerpt: "Traditional automakers accelerate their transition to electric vehicles, impacting stock valuations.",
    category: "Technology",
    date: "2024-01-09",
    readTime: "5 min read",
    image: "/auto-stocks.jpg",
  },
  {
    id: 8,
    title: "Real Estate Investment Trusts Show Resilience",
    excerpt: "REITs demonstrate strong performance despite economic headwinds and changing interest rate environment.",
    category: "Real Estate",
    date: "2024-01-08",
    readTime: "3 min read",
    image: "/reit-stocks.jpg",
  },
  {
    id: 9,
    title: "Semiconductor Stocks Gain on Supply Chain Recovery",
    excerpt: "Chip manufacturers see stock price increases as global supply chain issues continue to resolve.",
    category: "Technology",
    date: "2024-01-07",
    readTime: "4 min read",
    image: "/semiconductor-stocks.jpg",
  },
  {
    id: 10,
    title: "Aerospace Sector Benefits from Travel Recovery",
    excerpt: "Airlines and aerospace companies experience growth as travel demand returns to pre-pandemic levels.",
    category: "Aerospace",
    date: "2024-01-06",
    readTime: "3 min read",
    image: "/aerospace-stocks.jpg",
  },
]

const goldNews = [
  {
    id: 1,
    title: "Gold Prices Reach New Monthly Highs",
    excerpt:
      "Precious metals market sees significant gains as investors seek safe-haven assets amid economic uncertainty.",
    category: "Precious Metals",
    date: "2024-01-15",
    readTime: "2 min read",
    image: "/gold-prices.jpg",
  },
  {
    id: 2,
    title: "Central Bank Gold Purchases Continue to Rise",
    excerpt: "Global central banks increase their gold reserves, driving demand and supporting higher prices.",
    category: "Central Banking",
    date: "2024-01-14",
    readTime: "4 min read",
    image: "/central-bank-gold.jpg",
  },
  {
    id: 3,
    title: "Mining Companies Report Strong Gold Production",
    excerpt:
      "Major gold mining operations exceed production targets, benefiting from higher gold prices and operational efficiency.",
    category: "Mining",
    date: "2024-01-13",
    readTime: "3 min read",
    image: "/gold-mining.jpg",
  },
  {
    id: 4,
    title: "Gold ETFs See Increased Investor Interest",
    excerpt:
      "Exchange-traded funds focused on gold investments attract significant capital inflows from retail and institutional investors.",
    category: "Investment",
    date: "2024-01-12",
    readTime: "2 min read",
    image: "/gold-etf.jpg",
  },
]

export default function NewsPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const customer = useCustomerStore((state) => state.customer);
  console.log("Customer:::", customer)

  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("stocks")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const handleNewsClick = (newsId: number, newsType: string) => {
    router.push(`/news/${newsType}/${newsId}`)
  }

  const filterNews = (news: typeof stockNews) => {
    return news.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase()
      return matchesSearch && matchesCategory
    })
  }

  const getCategories = (news: typeof stockNews) => {
    const categories = [...new Set(news.map((item) => item.category))]
    return ["all", ...categories]
  }

  const currentNews = activeTab === "stocks" ? stockNews : goldNews
  const filteredNews = filterNews(currentNews)
  const categories = getCategories(currentNews)

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setCurrentPage(1)
    setSelectedCategory("all")
  }

  if (!customer || customer === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background flex items-center justify-center py-20 px-4">
          <div className="max-w-5xl w-full space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-yellow-500/10 relative">
                <div className="absolute inset-0 rounded-2xl bg-yellow-500/20 animate-pulse" />
                <Lock className="h-5 w-5 text-primary relative z-10" />
              </div>
              <h1 className="text-md sm:text-xl font-bold mb-4 tracking-tight">
                {t("news.success_title")}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mx-auto">
                {t("news.success_description1")}
              </p>
            </div>

            <Card className="border text-primary">
              <CardContent className="p-8 text-center">
                <h2 className="text-md sm:text-xl font-bold mb-3">
                  {t("news.signin")}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-8 max-w-xl mx-auto">
                  {t("news.join_community")}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    className="text-primary text-sm text-black font-semibold px-4 sm:px-8 h-10 group"
                    onClick={() => router.push("/auth/login")}
                  >
                    {t("news.sigin_to_continue")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 px-4 sm:px-8 text-sm border-2 hover:bg-primary"
                    onClick={() => router.push("/auth/register")}
                  >
                    {t("news.create_account")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center mb-6 space-y-1">
          <h1 className="text-2xl font-bold text-primary">
            {t("news.financial_news")}
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {t("news.financial_description")}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-4">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="stocks" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              {t("news.stock_news")}
            </TabsTrigger>
            <TabsTrigger value="gold" className="flex items-center gap-2">
              <Coins className="h-4 w-4" />
              {t("news.gold_news")}
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col md:flex-row gap-4 mb-8 mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t("news.search_news")}
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                  className="capitalize hover:border hover:border-primary hover:bg-transparent"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <TabsContent value="stocks">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {paginatedNews.map((article) => (
                <Card
                  key={article.id}
                  className="transition-shadow cursor-pointer hover:shadow-lg hover:border hover:border-primary"
                  onClick={() => handleNewsClick(article.id, "stock")}
                >
                  <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-sm leading-tight">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="text-xs flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gold">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {paginatedNews.map((article) => (
                <Card
                  key={article.id}
                  className="transition-shadow cursor-pointer hover:shadow-lg hover:border hover:border-primary"
                  onClick={() => handleNewsClick(article.id, "gold")}
                >
                  <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                    <Coins className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                    </div>
                    <CardTitle className="text-sm leading-tight">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.readTime}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              {t("news.news_prevous")}
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              {t("news.news_next")}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("news.no_news")}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
