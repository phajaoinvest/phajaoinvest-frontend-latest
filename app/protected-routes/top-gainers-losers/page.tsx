"use client"
import { useTranslation } from "@/lib/i18n"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, TrendingUp, TrendingDown, Lock, ArrowRight } from "lucide-react"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// apps and hooks:
import { useCustomerStore } from "@/app/store/useCustomerStore"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface StockData {
  symbol: string
  lastPrice: number
  change: number
  changePercent: number
  high: number | null
  low: number | null
  volume: number
  companyName: string | null
}

interface MarketMoversData {
  topGainers: StockData[]
  topLosers: StockData[]
  timestamp: string | null
}

export default function TopGainersLosersPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const customer = useCustomerStore((state) => state.customer);
  const { ref: gainersRef, isVisible: gainersVisible } = useScrollAnimation({})
  const { ref: losersRef, isVisible: losersVisible } = useScrollAnimation({})

  const [marketData, setMarketData] = useState<MarketMoversData>({
    topGainers: [],
    topLosers: [],
    timestamp: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarketMovers = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/technical-indicators/market-movers/all-us-stocks`)
        const result = await response.json()

        if (!result.is_error && result.data) {
          setMarketData(result.data)
        }
      } catch (error) {
        console.error('Error fetching market movers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMarketMovers()
  }, [])


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
              <h1 className="text-lg sm:text-xl font-bold mb-4 tracking-tight">{t("stock.analysis.success_title")}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mx-auto">
                {t("stock.analysis.success_description")}
              </p>
            </div>

            <Card className="border text-primary">
              <CardContent className="p-8 text-center">
                <h2 className="text-md sm:text-xl font-bold mb-3">{t("stock.analysis.ready_start")}</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-8 max-w-xl mx-auto">
                  {t("stock.analysis.join_invest")}
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-muted/20 to-primary/5 py-8 mt-16">
        <div className="container mx-auto max-w-6xl px-2 sm:px-4 space-y-4">

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="text-md">📈</div>
              <h1 className="text-md font-bold">{t("gainer.title")}</h1>
            </div>
            <Button variant="outline" onClick={() => router.push("/protected-routes/stock-analysis")} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("gainer.back")}
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            <Card
              ref={gainersRef}
              className={`bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 shadow-lg transition-all duration-700 ${gainersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-md text-green-700 dark:text-green-400">
                  <TrendingUp className="h-4 w-4" />
                  {t("gainer.top10")} &nbsp;🚀
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-4">Loading market data...</p>
                  </div>
                ) : marketData.topGainers.length > 0 ? (
                  marketData.topGainers.map((stock: StockData, index: number) => (
                    <div
                      key={`${stock.symbol}-${index}`}
                      className={`bg-white/80 dark:bg-gray-900/40 rounded-lg p-3 border border-green-100 dark:border-green-800/50 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${gainersVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                        }`}
                      style={{
                        transitionDelay: gainersVisible ? `${index * 100}ms` : "0ms",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{stock.symbol}</span>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 font-semibold">
                              +{stock.changePercent.toFixed(2)}%
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                            {stock?.companyName}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-md font-bold text-gray-900 dark:text-gray-100">
                            ${stock.lastPrice.toFixed(2)}
                          </div>
                          <div className="text-xs text-green-600">
                            +${stock.change.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card
              ref={losersRef}
              className={`bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-red-200 dark:border-red-800 shadow-lg transition-all duration-700 ${losersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-md text-red-700 dark:text-red-400">
                  <TrendingDown className="h-4 w-4" />
                  {t("loser.top10")} 💔
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-4">Loading market data...</p>
                  </div>
                ) : marketData.topLosers.length > 0 ? (
                  marketData.topLosers.map((stock: StockData, index: number) => (
                    <div
                      key={`${stock.symbol}-${index}`}
                      className={`bg-white/80 dark:bg-gray-900/40 rounded-lg p-3 border border-red-100 dark:border-red-800/50 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${losersVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                        }`}
                      style={{
                        transitionDelay: losersVisible ? `${index * 100}ms` : "0ms",
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{stock.symbol}</span>
                            <Badge variant="destructive" className="font-semibold">
                              {stock.changePercent.toFixed(2)}%
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                            {stock?.companyName}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-md font-bold text-gray-900 dark:text-gray-100">
                            ${stock.lastPrice.toFixed(2)}
                          </div>
                          <div className="text-xs text-red-600">
                            ${stock.change.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
