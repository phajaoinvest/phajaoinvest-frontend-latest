"use client"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n"
import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, ShoppingCart, ArrowLeft } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RSIStock {
  symbol: string
  rsi: number
  status: string
  lastPrice: number
  changePercent: number
  change: number
  group: string
  companyName: string
  lastUpdated: string | null
}

interface RSIData {
  timestamp: string
  oversold: RSIStock[]
  overbought: RSIStock[]
  metadata: {
    limitPerBucket: number
    inspected: number
    produced: number
    oversoldCount: number
    overboughtCount: number
    source: string
  }
}

export default function RSIAnalysisPage() {
  const router = useRouter()
  const { t } = useTranslation()

  const [rsiData, setRsiData] = useState<RSIData>({
    timestamp: '',
    oversold: [],
    overbought: [],
    metadata: {
      limitPerBucket: 0,
      inspected: 0,
      produced: 0,
      oversoldCount: 0,
      overboughtCount: 0,
      source: ''
    }
  })
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [currentLimit, setCurrentLimit] = useState(200)

  const fetchRSIData = async (limit: number, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/technical-indicators/rsi/all-us-stocks?window=14&fallback=true&timeperiod=14&limit=${limit}`)
      const result = await response.json()

      if (!result.is_error && result.data) {
        if (append) {
          // Append new stocks to existing ones, avoiding duplicates
          setRsiData(prevData => {
            const existingOversoldSymbols = new Set(prevData.oversold.map(s => s.symbol))
            const existingOverboughtSymbols = new Set(prevData.overbought.map(s => s.symbol))

            const newOversold = result.data.oversold.filter((s: RSIStock) => !existingOversoldSymbols.has(s.symbol))
            const newOverbought = result.data.overbought.filter((s: RSIStock) => !existingOverboughtSymbols.has(s.symbol))

            return {
              ...result.data,
              oversold: [...prevData.oversold, ...newOversold],
              overbought: [...prevData.overbought, ...newOverbought]
            }
          })
        } else {
          setRsiData(result.data)
        }
      }
    } catch (error) {
      console.error('Error fetching RSI data:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchRSIData(currentLimit)
  }, [])

  const handleLoadMore = () => {
    const newLimit = currentLimit + 200
    setCurrentLimit(newLimit)
    fetchRSIData(newLimit, true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-muted/20 to-primary/5 py-8 mt-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <h1 className="text-md font-bold">{t("rsi.title")}</h1>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/stock-analysis")}
                className="border hover:border-primary hover:bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("gainer.back")}
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-xl border border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <ShoppingCart className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-green-700 dark:text-green-300">{t("rsi.good_title")}</span>
                </CardTitle>
                <p className="text-sm text-green-600 dark:text-green-400 ml-12">
                  {t("rsi.good_des")}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-4">Loading RSI data...</p>
                  </div>
                ) : rsiData.oversold.length > 0 ? (
                  rsiData.oversold.map((stock: RSIStock) => (
                    <div
                      key={stock.symbol}
                      className="bg-white/80 dark:bg-gray-800/50 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-green-200/50 dark:border-green-800/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">{stock.symbol}</h3>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300">
                              {t("rsi.rsi")}: {stock.rsi?.toFixed(2) ?? "N/A"}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{stock.companyName}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-primary">${stock.lastPrice?.toFixed(2) ?? "N/A"}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">USD</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No oversold stocks found</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-xl border border-red-500 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-sm text-red-700 dark:text-red-300">{t("rsi.bad_title")}</span>
                </CardTitle>
                <p className="text-sm text-red-600 dark:text-red-400 ml-12">
                  {t("rsi.bad_des")}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-4">Loading RSI data...</p>
                  </div>
                ) : rsiData.overbought.length > 0 ? (
                  rsiData.overbought.map((stock: RSIStock) => (
                    <div
                      key={stock.symbol}
                      className="bg-white/80 dark:bg-gray-800/50 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-red-200/50 dark:border-red-800/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">{stock.symbol}</h3>
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300">
                              {t("rsi.rsi")}: {stock.rsi?.toFixed(2) ?? "N/A"}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{stock.companyName}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-primary">${stock.lastPrice?.toFixed(2) ?? "N/A"}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">USD</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">No overbought stocks found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {!loading && (rsiData.oversold.length > 0 || rsiData.overbought.length > 0) && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
              >
                {loadingMore ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </>
                ) : (
                  `Load More (${rsiData.oversold.length + rsiData.overbought.length} loaded)`
                )}
              </Button>
            </div>
          )}

          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    {t("rsi.warning_title")}
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                    {t("rsi.warning_des")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
