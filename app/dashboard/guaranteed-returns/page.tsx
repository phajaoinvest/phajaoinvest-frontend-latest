"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpRight, Calendar, Plus, ListFilter, DollarSign, Clock, Loader, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import EmptyPage from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IncompleteApplicationView } from "@/components/ui/complete-application"
import { queryData } from "@/app/api/api"
import { useTranslation } from "@/lib/i18n"
import { useCustomerStore } from "@/app/store/useCustomerStore"
import { useFetchInvestmentCustomerId } from "./hooks/useFetch"
import { formatMoney } from "@/app/utils/functions/format-number"
import useFilterMyStockPicks from "../stock-pick-history/hooks/useFilter"
import type { InvestmentSummaryOverviewResponse } from "@/interfaces/invest"

const investStatusKeyMap: Record<string, string> = {
  "Completed": "invest.status_completed",
  "Pending": "invest.status_pending",
  "Active": "invest.status_active",
}

interface StatCardProps {
  label: string
  value: string
  gradient: string
  textColor: string
}

function StatCard({ label, value, gradient, textColor }: StatCardProps) {
  return (
    <Card className={`border-0 shadow-lg ${gradient}`}>
      <CardContent className="p-3 sm:p-6">
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

interface InvestmentCardProps {
  t: (key: string) => string
  investment: {
    id: string
    amountInvested: string
    status: string
    investDate: string
    duration: string
    maturityDate: string
    totalProfit: string
    returnRate: string
  }
}

function InvestmentCard({ t, investment }: InvestmentCardProps) {
  const isCompleted = investment.status === "Completed"
  const translatedStatus = investStatusKeyMap[investment.status] ? t(investStatusKeyMap[investment.status]) : investment.status

  return (
    <Card className="border hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{investment.id}</h3>
              <Badge
                variant={isCompleted ? "default" : "secondary"}
                className={`whitespace-nowrap ${isCompleted ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
              >
                {translatedStatus}
              </Badge>
            </div>
          </div>
          <div className="text-right space-y-1">
            <p className="text-md font-bold">{investment.amountInvested}</p>
            <p className="text-sm text-muted-foreground">{t("invest.amount_invested")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-start space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium">{t("invest.investment_date")}</p>
              <p className="text-xs text-muted-foreground">{investment.investDate}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium">{t("invest.duration")}</p>
              <p className="text-sm text-muted-foreground">{investment.duration}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium">{t("invest.maturity_date")}</p>
              <p className="text-sm text-muted-foreground">{investment.maturityDate}</p>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <ArrowUpRight className="h-4 w-4 text-green-600" />
            <div className="space-y-1">
              <p className="text-sm font-medium">{t("invest.total_profit_label")}</p>
              <div className="flex items-center space-x-1">
                <p className="text-sm font-semibold text-green-600">{investment.totalProfit}</p>
                <span className="text-xs text-green-600">({investment.returnRate})</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function ReviewPending({ t }: { t: (key: string) => string }) {
  return (
    <div className="w-full flex items-center justify-end flex-col mb-4 space-y-3">
      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
        <FileText className="h-4 w-4 text-amber-600" />
      </div>
      <h2 className="text-md font-bold">{t("invest.under_review_title")}</h2>
      <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
        {t("invest.under_review_des")}
      </p>
    </div>
  )
}

export default function InvestmentPortfolioPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const customer = useCustomerStore((state) => state.customer)
  const [investmentOverview, setInvestmentOverview] = useState<InvestmentSummaryOverviewResponse | null>(null)

  const filter = useFilterMyStockPicks()
  const myInvestments = useFetchInvestmentCustomerId({ filter: filter.data })

  useEffect(() => {
    const fetchInvestmentOverview = async () => {
      try {
        const res = await queryData({ url: "/investment-requests/my-summary" })
        if (res.status_code === 200) {
          setInvestmentOverview(res.data)
        }
      } catch (error) {
        console.error("Failed to fetch investment overview:", error)
      }
    }

    fetchInvestmentOverview()
  }, [])

  useEffect(() => {
    if (!customer) {
      router.push("/auth/login")
    }
  }, [customer, router])

  const handleNewInvestment = () => {
    router.push("/dashboard/guaranteed-returns/add-new")
  }

  const hasInvestAccount =
    customer?.services?.find(
      service => service.service_type === "guaranteed_returns"
    )?.status ?? "not";

  return (
    <div className="space-y-8">
      {hasInvestAccount === "approved" ? (
        <div className="space-y-4 sm:space-y-6">
          <Card className="border-0 shadow-sm space-y-1 sm:space-y-4">
            <CardHeader className="px-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">{t("invest.portfolio_overview")}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNewInvestment}
                  className="text-primary border border-primary hover:bg-primary"
                >
                  <Plus className="mr-2" />
                  {t("invest.new_investment")}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                <StatCard
                  label={t("invest.total_balance")}
                  value={`$${formatMoney(investmentOverview?.total_current_balance ?? "")}`}
                  gradient="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20"
                  textColor="text-emerald-700 dark:text-emerald-300"
                />
                <StatCard
                  label={t("invest.total_invested")}
                  value={`$${formatMoney(investmentOverview?.total_original_investment ?? "")}`}
                  gradient="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20"
                  textColor="text-blue-700 dark:text-blue-300"
                />
                <StatCard
                  label={t("invest.total_profit")}
                  value={`$${formatMoney(investmentOverview?.total_interest_earned ?? "")}`}
                  gradient="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
                  textColor="text-purple-700 dark:text-purple-300"
                />
                <StatCard
                  label={t("invest.active_investments")}
                  value={`${investmentOverview?.active_investments ?? 0} ${t("invest.invests")}`}
                  gradient="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
                  textColor="text-orange-700 dark:text-orange-300"
                />
              </div>
            </CardContent>
          </Card>

          <div className="w-full hidden sm:flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center justify-start mb-4 gap-2">
              <ListFilter size={16} />
              <h2 className="text-sm font-semibold">{t("invest.filter_by_date")}</h2>
            </div>
            <div className="w-1/2 flex items-center gap-4">
              <div className="flex-1 relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="date"
                  onChange={(e) => {
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
                  onChange={(e) => {
                    filter.dispatch({
                      type: filter.ACTION_TYPE.END_DATE,
                      payload: e.target.value
                    })
                  }}
                  className="pl-10 border-0 bg-white/70 dark:bg-gray-800/70 shadow-sm"
                />
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {myInvestments.loading ? (
                <div className="flex justify-center items-center min-h-[40vh]">
                  <Loader className="w-6 h-6 animate-spin text-primary" />
                  <span className="ml-2">{t("invest.loading")}</span>
                </div>
              ) : (
                <>
                  <div className="grid gap-6">
                    {myInvestments.data && myInvestments.data.length > 0 ? (
                      myInvestments.data.map((investment) => (
                        <InvestmentCard key={investment.id} t={t} investment={investment} />
                      ))
                    ) : (
                      <EmptyPage
                        title={t("invest.not_found")}
                        description={t("invest.no_investments")}
                      />
                    )}
                  </div>

                  {myInvestments.data && myInvestments.data.length > 0 && (
                    <div className="w-full flex items-center justify-end mb-4">
                      <Pagination
                        filter={filter.data}
                        totalPage={Math.ceil((myInvestments.total ?? 0) / filter.data.limit)}
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
      ) : hasInvestAccount === "pending" ?
        <ReviewPending t={t} />
        : (
          <IncompleteApplicationView url="/dashboard/application/return-invest" />
        )}
    </div>
  )
}
