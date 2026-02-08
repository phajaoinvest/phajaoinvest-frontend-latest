"use client"

import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n"
import { useState, useEffect } from "react"
import { ArrowLeft, TrendingDown } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import EmptyPage from "@/components/ui/empty"

interface SupportStock {
  symbol: string
  companyName: string
  lastPrice: number
  changePercent: number
  change: number
  volume: number | null
  supportLevel: number
  supportLevelSecondary: number | null
  resistance1: number | null
  resistance2: number | null
  belowSupportPercent: number | null
  distanceToSupportPercent: number | null
  rsi: number
  ema50: number
  ema200: number
  group: string
}

interface SupportStocksData {
  timestamp: string
  stocks: SupportStock[]
  metadata: {
    limitRequested: number
    inspected: number
    produced: number
    tolerancePercent: number
    minDropPercent: number
    resolution: string
    skippedSymbols: Array<{
      symbol: string
      reason: string
    }>
  }
}

export default function LowSupportPricingPage() {
  const router = useRouter()
  const { t } = useTranslation()

  const [supportData, setSupportData] = useState<SupportStocksData>({
    timestamp: '',
    stocks: [],
    metadata: {
      limitRequested: 0,
      inspected: 0,
      produced: 0,
      tolerancePercent: 0,
      minDropPercent: 0,
      resolution: '',
      skippedSymbols: []
    }
  })
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [currentLimit, setCurrentLimit] = useState(200)

  const fetchSupportStocks = async (limit: number, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/technical-indicators/market-movers/us-losers/breaking-support?minDropPercent=0.5&tolerancePercent=8&limit=${limit}`)
      const result = await response.json()

      if (!result.is_error && result.data) {
        if (append) {
          // Append new stocks to existing ones, avoiding duplicates
          setSupportData(prevData => {
            const existingSymbols = new Set(prevData.stocks.map(s => s.symbol))
            const newStocks = result.data.stocks.filter((s: SupportStock) => !existingSymbols.has(s.symbol))
            return {
              ...result.data,
              stocks: [...prevData.stocks, ...newStocks]
            }
          })
        } else {
          setSupportData(result.data)
        }
      }
    } catch (error) {
      console.error('Error fetching support stocks:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchSupportStocks(currentLimit)
  }, [])

  const handleLoadMore = () => {
    const newLimit = currentLimit + 200
    setCurrentLimit(newLimit)
    fetchSupportStocks(newLimit, true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-900 py-8 mt-16">
        <div className="container mx-auto max-w-6xl px-4 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-900/30 rounded-full border border-red-800/50">
                  <TrendingDown className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <h1 className="text-md font-bold text-white">{t("lowsupport.title")}</h1>
                  <p className="text-sm text-slate-400">{t("lowsupport.des")}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/protected-routes/stock-analysis")}
                className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("gainer.back")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
                <p className="text-sm text-slate-400 mt-4">Loading support level data...</p>
              </div>
            ) : supportData.stocks.length > 0 ? (
              supportData.stocks.map((stock: SupportStock, index: number) => (
                <Card
                  key={`${stock.symbol}-${index}`}
                  className="group hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-1 bg-slate-800 border-slate-700 hover:border-red-500/50 cursor-pointer"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm text-white group-hover:text-red-400 transition-colors">
                          {stock.symbol}&nbsp;&nbsp;<span className="text-xs">({stock.companyName})</span>
                        </h3>
                        <div className="p-2 bg-red-900/30 rounded-full group-hover:bg-red-800/40 transition-colors border border-red-800/30">
                          <TrendingDown className="h-4 w-4 text-red-400" />
                        </div>
                      </div>

                      <div className="space-y-1 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-400">{t("lowsupport.current_price")}:</span>
                          <span className="font-semibold text-sm text-white">
                            ${stock.lastPrice?.toFixed(2) ?? 'N/A'}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-400">{t("lowsupport.support_level")}:</span>
                          <span className="font-semibold text-sm text-green-400">
                            ${stock.supportLevel?.toFixed(2) ?? 'N/A'}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-400">{t("lowsupport.below_support")}:</span>
                          <span className="font-semibold text-sm text-red-400">
                            {stock.lastPrice && stock.supportLevel
                              ? `${(((stock.lastPrice - stock.supportLevel) / stock.supportLevel) * 100).toFixed(2)}%`
                              : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <EmptyPage title="Sorry, No data founded" description="No stocks breaking support levels found" />
              </div>
            )}
          </div>

          {!loading && supportData.stocks.length > 0 && supportData.stocks.length >= currentLimit && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
              >
                {loadingMore ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </>
                ) : (
                  `Load More (${supportData.stocks.length} loaded)`
                )}
              </Button>
            </div>
          )}

          <Separator />

          <Card className="mt-12 bg-slate-800 border-slate-700">
            <CardContent className="p-4 sm:p-8">
              <div className="text-center">
                <h2 className="text-md font-bold text-red-400 mb-4">{t("lowsupport.summary_title")}</h2>
                <p className="text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  {t("lowsupport.summary_des")}
                </p>
                {!loading && supportData.stocks.length > 0 && (
                  <div className="mt-6 flex justify-center gap-4 text-sm">
                    <div className="bg-slate-700/50 rounded-lg px-4 py-2 border border-slate-600">
                      <span className="font-semibold text-red-400">{t("lowsupport.total_stock")}: </span>
                      <span className="text-primary text-md font-bold">{supportData.stocks.length}</span>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg px-4 py-2 border border-slate-600">
                      <span className="font-semibold text-red-400">{t("lowsupport.avg")}: </span>
                      <span className="text-primary text-md font-bold">
                        {(
                          supportData.stocks.reduce((sum: number, stock: SupportStock) => {
                            const value = stock.belowSupportPercent ?? stock.distanceToSupportPercent ?? 0
                            return sum + Math.abs(value)
                          }, 0) / supportData.stocks.length
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
