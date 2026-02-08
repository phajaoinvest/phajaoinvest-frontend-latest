"use client"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n"
import { Calendar, Clock } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"

// components
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const newsData = [
  {
    id: 1,
    title: "Global Markets Rally as Tech Stocks Surge",
    summary:
      "Major technology companies lead market gains amid positive earnings reports and strong guidance for the upcoming quarter.",
    category: "Market News",
    publishedAt: "2024-01-15",
    readTime: "3 min",
    image: "/stock-market-charts.jpg",
  },
  {
    id: 2,
    title: "Federal Reserve Signals Interest Rate Stability",
    summary:
      "The Fed maintains current interest rates while monitoring inflation trends and economic indicators for future policy decisions.",
    category: "Economic Policy",
    publishedAt: "2024-01-14",
    readTime: "5 min",
    image: "/federal-reserve-building.png",
  },
  {
    id: 3,
    title: "Cryptocurrency Market Shows Strong Recovery",
    summary:
      "Bitcoin and major altcoins experience significant gains as institutional adoption continues to grow worldwide.",
    category: "Crypto",
    publishedAt: "2024-01-13",
    readTime: "4 min",
    image: "/bitcoin-concept.png",
  },
  {
    id: 4,
    title: "Energy Sector Outlook: Renewable Investments Rise",
    summary:
      "Clean energy stocks attract record investments as governments worldwide accelerate green transition policies.",
    category: "Energy",
    publishedAt: "2024-01-12",
    readTime: "6 min",
    image: "/renewable-energy-solar-panels.png",
  },
  {
    id: 5,
    title: "AI Companies Drive Innovation in Financial Services",
    summary:
      "Artificial intelligence revolutionizes trading algorithms and risk management systems across major financial institutions.",
    category: "Technology",
    publishedAt: "2024-01-11",
    readTime: "4 min",
    image: "/artificial-intelligence-finance.png",
  },
  {
    id: 6,
    title: "Emerging Markets Show Resilience Amid Global Uncertainty",
    summary:
      "Developing economies demonstrate strong fundamentals despite geopolitical tensions and supply chain challenges.",
    category: "Global Markets",
    publishedAt: "2024-01-10",
    readTime: "5 min",
    image: "/emerging-markets-world-map.jpg",
  },
  {
    id: 7,
    title: "Healthcare Stocks Gain on Breakthrough Drug Approvals",
    summary:
      "Pharmaceutical companies see significant gains following FDA approvals for innovative treatments and therapies.",
    category: "Healthcare",
    publishedAt: "2024-01-09",
    readTime: "3 min",
    image: "/healthcare-medical-research.png",
  },
  {
    id: 8,
    title: "Real Estate Investment Trusts Adapt to Market Changes",
    summary:
      "REITs implement new strategies to navigate changing interest rates and evolving commercial property demands.",
    category: "Real Estate",
    publishedAt: "2024-01-08",
    readTime: "4 min",
    image: "/real-estate-buildings.jpg",
  },
  {
    id: 9,
    title: "Commodity Prices Fluctuate on Supply Chain Concerns",
    summary:
      "Gold, oil, and agricultural commodities experience volatility as global supply chains face ongoing disruptions.",
    category: "Commodities",
    publishedAt: "2024-01-07",
    readTime: "5 min",
    image: "/commodities-gold-oil.jpg",
  },
  {
    id: 10,
    title: "Fintech Startups Reshape Traditional Banking",
    summary:
      "Digital financial services continue to disrupt traditional banking models with innovative payment solutions.",
    category: "Fintech",
    publishedAt: "2024-01-06",
    readTime: "4 min",
    image: "/fintech-digital-banking.jpg",
  },
]

export function MarketOverview() {
  const router = useRouter()
  const { t } = useTranslation()
  return (
    <section id="news" className="py-8 sm:py-16 px-2 sm:px-4 bg-muted/50">
      <div className="sm:container mx-auto space-y-8 sm:space-y-12">
        <div className="text-center">
          <h2 className="text-lg sm:text-2xl font-bold mb-2 text-primary">{t("news.title")}</h2>
          <p className="text-md text-muted-foreground max-w-2xl mx-auto font-light">
            {t("news.description")}
          </p>
        </div>

        <div className="block md:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={8}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
            className="news-swiper"
          >
            {newsData.map((article) => (
              <SwiperSlide key={article.id}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="px-1.5 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-xs line-clamp-2 px-1">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-2">
                    <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{article.summary}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-3">
          {newsData.map((article, index) => (
            <Card
              key={article.id}
              className={`hover:shadow-lg transition-all duration-700 cursor-pointer transform}`}
            >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <CardTitle className="text-sm line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{article.summary}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="w-full flex items-center justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/protected-routes/news")}
            className="text-white flex items-center gap-2 hover:border hover:border-primary hover:bg-transparent"
          >
            {t("news.read_more")}
          </Button>
        </div>
      </div>
    </section>
  )
}
