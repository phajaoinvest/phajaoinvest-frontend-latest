"use client"

import { queryData } from "../api/api"
import { useTranslation } from "@/lib/i18n"
import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, XAxis, YAxis, AreaChart, CartesianGrid, ResponsiveContainer } from "recharts"
import type { IInvestmentPerformanceResponse, IStockPerformanceResponse } from "@/interfaces/dashboard"

function ChartSkeleton({ loadingText }: { loadingText: string }) {
  return (
    <div className="flex h-[300px] items-center justify-center bg-muted/10 rounded-md animate-pulse">
      <span className="text-sm text-muted-foreground">{loadingText}</span>
    </div>
  )
}

interface PerformanceCardProps {
  title: string
  data: IStockPerformanceResponse | IInvestmentPerformanceResponse | null
  isLoading: boolean
  chartColor: string
  gradientId: string
  t: (key: string) => string
}

function PerformanceCard({ title, data, isLoading, chartColor, gradientId, t }: PerformanceCardProps) {
  return (
    <Card className="border-0 shadow-sm space-y-4">
      <CardHeader className="p-0">
        <div className="flex flex-col space-y-3">
          <CardDescription>{title}</CardDescription>
          {!isLoading && data && (
            <div className="flex items-center space-x-3">
              <div className="text-sm font-bold text-foreground">
                {data.displayCurrentValue}
              </div>
              <div className="flex items-center text-sm text-emerald-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                <span className="font-semibold">{data.displayYtdPercent}</span>
                <span className="text-muted-foreground ml-1">{t("dashboard.this_year")}</span>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <ChartSkeleton loadingText={t("dashboard.loading_chart")} />
        ) : (
          <ChartContainer
            config={{
              value: {
                label: t("dashboard.portfolio_value"),
                color: chartColor,
              },
            }}
            className="h-[300px] sm:w-full"
          >
            <ResponsiveContainer width="100%" height="100%" className="-ml-8 sm:ml-0">
              <AreaChart data={data?.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis
                  className="text-xs"
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) =>
                        name === "value"
                          ? [`$${Number(value).toLocaleString()}`, t("dashboard.portfolio_value")]
                          : [
                            `${Number(value) >= 0 ? "+" : ""}$${Number(value).toLocaleString()}`,
                            t("dashboard.monthly_profit"),
                          ]
                      }
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  fill={`url(#${gradientId})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const { t } = useTranslation()
  const [stockPerformance, setStockPerformance] = useState<IStockPerformanceResponse | null>(null)
  const [investPerformance, setInvestPerformance] = useState<IInvestmentPerformanceResponse | null>(null)
  const [isLoadingStock, setIsLoadingStock] = useState(true)
  const [isLoadingInvest, setIsLoadingInvest] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [investRes, stockRes] = await Promise.all([
          queryData({ url: "/dashboard/investment-portfolio-performance?year=2025" }),
          queryData({ url: "/dashboard/global-market-performance?year=2025" }),
        ])

        if (investRes.code === "SUCCESS") {
          setInvestPerformance(investRes.data)
        }
        if (stockRes.code === "SUCCESS") {
          setStockPerformance(stockRes.data)
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoadingInvest(false)
        setIsLoadingStock(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid gap-10 md:grid-cols-1">
        <PerformanceCard
          title={t("dashboard.invest_performance")}
          data={investPerformance}
          isLoading={isLoadingInvest}
          chartColor="hsl(var(--chart-1))"
          gradientId="colorValue"
          t={t}
        />
        <PerformanceCard
          title={t("dashboard.stock_performance")}
          data={stockPerformance}
          isLoading={isLoadingStock}
          chartColor="hsl(var(--chart-3))"
          gradientId="colorInternational"
          t={t}
        />
      </div>
    </div>
  )
}
