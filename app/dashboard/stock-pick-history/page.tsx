"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import EmptyPage from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Search, BarChart3, Loader, Calendar, ListFilter } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { queryData } from "@/app/api/api"
import useFilterMyStockPicks from "./hooks/useFilter"
import { useCustomerStore } from "@/app/store/useCustomerStore"
import { useFetchStockPickByCustomerId } from "./hooks/useFetch"
import type { IStockPickResponse } from "@/interfaces/stock"

interface StatCardProps {
  label: string
  value: string
  gradient: string
  textColor: string
}

function StatCard({ label, value, gradient, textColor }: StatCardProps) {
  return (
    <Card className={`border-0 shadow-lg ${gradient}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-start flex-col space-y-1">
          <p className={`text-sm font-medium ${textColor}`}>{label}</p>
          <p className={`text-md font-bold ${textColor.replace('700', '900').replace('300', '100')}`}>
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

interface StockPickItemProps {
  t: (key: string) => string
  pick: {
    id: string
    stock: string | null
    company: string
    date: string
    buyPrice: string
    currentPrice: string
    isPositive: boolean
    change: string
    status: string
    recommendation: string
  }
}

function StockPickItem({ t, pick }: StockPickItemProps) {
  const isApproved = pick.status === "Approved"

  return (
    <div className="flex items-center justify-between p-2 sm:p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-blue-950/10 dark:hover:to-indigo-950/10 transition-all duration-200 border-b last:border-b-0">
      <div className="flex items-center space-x-4">
        <div>
          <div className="flex items-center space-x-2">
            <p className="font-bold text-sm">
              {pick.stock || <span className="blur-sm select-none">{t("sph.pending")}</span>}
            </p>
            <span className="text-sm text-muted-foreground">•</span>
            <p className="text-xs font-medium text-muted-foreground">
              {pick.stock ? pick.company : <span className="blur-sm select-none">{t("sph.pending")}</span>}
            </p>
          </div>
          <div className="text-xs flex items-center space-x-3 text-muted-foreground mt-1">
            <span>{t("sph.buy_date")} {pick.date}</span>
            <span>•</span>
            <span className="font-medium">{t("sph.buy_price")} {pick.buyPrice}</span>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center space-x-4">
          <div className="space-y-1">
            <p className="font-bold text-sm">{pick.currentPrice}</p>
            <div className={`flex items-center text-xs font-semibold ${pick.isPositive ? "text-emerald-600" : "text-red-500"}`}>
              {pick.isPositive ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {pick.change}
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Badge
              variant={isApproved ? "default" : "secondary"}
              className={isApproved
                ? "text-xs bg-emerald-100 text-emerald-800 border-emerald-200 font-medium"
                : "text-xs bg-gray-100 text-gray-800 border-gray-200 font-medium"
              }
            >
              {pick.status}
            </Badge>
            <Badge variant="outline" className="w-auto text-xs font-medium">
              {pick.recommendation}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StockPickHistoryPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [endDate, setEndDate] = useState("")
  const [startDate, setStartDate] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [stockPickPerformance, setStockPickPerformance] = useState<IStockPickResponse | null>(null)

  const customer = useCustomerStore((state) => state.customer)
  const filter = useFilterMyStockPicks()
  const myStockPicks = useFetchStockPickByCustomerId({ filter: filter.data })

  useEffect(() => {
    const getStockPickPerformance = async () => {
      try {
        setIsLoading(true)
        const res = await queryData({ url: "/stock-picks/my-stats" })

        if (res.code === "SUCCESS" && res.status_code === 200) {
          setStockPickPerformance(res.data.display)
        }
      } catch (error) {
        console.error("Failed to fetch stock pick performance:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getStockPickPerformance()
  }, [])

  useEffect(() => {
    if (!customer) {
      router.push("/auth/login")
    }
  }, [customer, router])

  const handleSearchStockPicks = () => {
    router.push("/stock-picks")
  }

  const handleClearFilters = () => {
    setStartDate("")
    setEndDate("")
    filter.dispatch({ type: filter.ACTION_TYPE.START_DATE, payload: "" })
    filter.dispatch({ type: filter.ACTION_TYPE.END_DATE, payload: "" })
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold">{t("sph.title")}</CardTitle>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-start gap-2">
          <Loader className="w-5 h-5 animate-spin text-primary" />
          <span>{t("sph.loading")}</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          <StatCard
            label={t("sph.total_picks")}
            value={`${stockPickPerformance?.total_picks ?? 0} ${t("sph.stocks")}`}
            gradient="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20"
            textColor="text-emerald-700 dark:text-emerald-300"
          />
          <StatCard
            label={t("sph.winning_rate")}
            value={`${stockPickPerformance?.winning_rate_percent ?? 0}%`}
            gradient="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20"
            textColor="text-blue-700 dark:text-blue-300"
          />
          <StatCard
            label={t("sph.total_return")}
            value={stockPickPerformance?.total_return ?? "N/A"}
            gradient="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
            textColor="text-purple-700 dark:text-purple-300"
          />
          <StatCard
            label={t("sph.avg_return")}
            value={stockPickPerformance?.avg_return_percent_per_pick ?? "N/A"}
            gradient="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
            textColor="text-orange-700 dark:text-orange-300"
          />
        </div>
      )}

      <Card className="border-0 shadow-lg">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-normal flex items-center">
              <BarChart3 className="h-4 w-4 mr-3 text-blue-600" />
              {t("sph.card_title")}
            </CardTitle>
            <div className="flex sm:hidden items-center justify-center gap-6">
              <ListFilter size={20} />
              <Search size={20} onClick={handleSearchStockPicks} />
            </div>
          </div>
          <div className="hidden sm:flex items-center justify-end gap-4">
            <div className="w-1/2 flex items-center gap-4">
              <div className="flex-1 relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value)
                    filter.dispatch({
                      type: filter.ACTION_TYPE.START_DATE,
                      payload: e.target.value
                    })
                  }}
                  className="pl-10 border-0 bg-white/70 dark:bg-gray-800/70 shadow-sm"
                />
              </div>
              <div className="flex-1 relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value)
                    filter.dispatch({
                      type: filter.ACTION_TYPE.END_DATE,
                      payload: e.target.value
                    })
                  }}
                  className="pl-10 border-0 bg-white/70 dark:bg-gray-800/70 shadow-sm"
                />
              </div>
            </div>
            {(startDate || endDate) && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="text-sm bg-white/70 dark:bg-gray-800/70"
              >
                {t("sph.clear")}
              </Button>
            )}
            <div className="w-1/2 flex items-center justify-end">
              <Button onClick={handleSearchStockPicks} className="bg-primary shadow-lg text-white">
                <Search className="h-4 w-4 mr-2" />
                {t("sph.browse_picks")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {myStockPicks.loading ? (
            <div className="flex justify-center items-center min-h-[40vh]">
              <Loader className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2">{t("sph.loading")}</span>
            </div>
          ) : (
            <>
              <div className="space-y-0">
                {myStockPicks.data && myStockPicks.data.length > 0 ? (
                  myStockPicks.data.map((pick) => (
                    <StockPickItem key={pick.id} t={t} pick={pick} />
                  ))
                ) : (
                  <EmptyPage
                    title={t("sph.not_found")}
                    description={t("sph.no_picks")}
                  />
                )}
              </div>
              {myStockPicks.data && myStockPicks.data.length > 0 && (
                <div className="w-full flex items-center justify-end mb-4">
                  <Pagination
                    filter={filter.data}
                    totalPage={Math.ceil((myStockPicks.total ?? 0) / filter.data.limit)}
                    onPageChange={(page) => {
                      filter.dispatch({
                        type: filter.ACTION_TYPE.PAGE,
                        payload: page,
                      })
                    }}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
