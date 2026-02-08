"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Crown, CreditCard, Calendar, Loader } from "lucide-react"

// components
import { Input } from "@/components/ui/input"
import EmptyPage from "@/components/ui/empty"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// API, hooks, store
import { queryData } from "@/app/api/api"
import { useTranslation } from "@/lib/i18n"
import MemberShipPaymentHistory from "./hooks/useFilter"
import type { IPackagesResponse } from "@/interfaces/package"
import { useCustomerStore } from "@/app/store/useCustomerStore"
import { useFetchMemberShipPaymentHistory } from "./hooks/useFetch"

function LoadingSkeleton({ text }: { text: string }) {
  return (
    <div className="flex h-[200px] items-center justify-center bg-muted/10 rounded-md animate-pulse">
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  )
}

// Maps DB plan description to translation key by duration
const planDescriptionKey: Record<number, string> = {
  3: "membership.plan_3_months",
  6: "membership.plan_6_months",
  12: "membership.plan_12_months",
}

// Maps DB feature strings to translation keys
const featureKeyMap: Record<string, string> = {
  "Membership: 3 months": "membership.feature_membership_3",
  "Membership: 6 months (save 10%)": "membership.feature_membership_6",
  "Membership: 12 months (save 20%)": "membership.feature_membership_12",
  "Advanced stock analysis tools": "membership.feature_stock_tools",
  "Unlimited stock picks": "membership.feature_unlimited_picks",
  "Portfolio tracking": "membership.feature_portfolio_tracking",
  "Priority support": "membership.feature_priority_support",
  "Cheaper monthly rate than Basic": "membership.feature_cheaper_rate",
  "Best monthly rate": "membership.feature_best_rate",
}

// Maps DB status strings to translation keys
const statusKeyMap: Record<string, string> = {
  "Active": "membership.status_active",
  "Pending": "membership.status_pending",
  "Expired": "membership.status_expired",
}

// Maps DB plan name strings to translation keys
const planNameMap: Record<string, string> = {
  "3-month premium membership": "membership.plan_3_months",
  "6-month premium membership": "membership.plan_6_months",
  "12-month premium membership": "membership.plan_12_months",
}

// Format date string to dd/mm/yyyy h:m
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr
  const dd = String(date.getDate()).padStart(2, "0")
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const yyyy = date.getFullYear()
  const h = String(date.getHours()).padStart(2, "0")
  const m = String(date.getMinutes()).padStart(2, "0")
  return `${dd}/${mm}/${yyyy} ${h}:${m}`
}

interface PlanCardProps {
  plan: IPackagesResponse
  t: (key: string) => string
  onSelectPlan: (plan: IPackagesResponse) => void
  onRenewPlan: (plan: IPackagesResponse) => void
}

function PlanCard({ plan, t, onSelectPlan, onRenewPlan }: PlanCardProps) {
  const isExpired = plan.days_left !== null && plan.days_left < 0
  const isUnderReview = plan.days_left === null
  const description = planDescriptionKey[plan.duration_months]
    ? t(planDescriptionKey[plan.duration_months])
    : plan.description

  return (
    <Card className={`relative ${plan.is_current ? "ring-2 ring-primary" : ""}`}>
      {plan.is_current && (
        <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">
          {isUnderReview
            ? t("membership.under_review")
            : `${t("membership.current")}, ${t("membership.has_expired")}: ${plan.days_left} ${t("membership.days")}`}
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-sm sm:text-md">{description}</CardTitle>
        <div className="text-md sm:text-xl font-bold text-primary">
          {plan.currency === "USD" ? "$" : ""}{plan.price}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">{plan.duration_months} {t("membership.months")}</p>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 py-0 pb-4">
        <ul className="space-y-2 mb-4">
          {plan?.features?.map((feature, index) => (
            <li key={index} className="text-gray-500 text-xs flex items-center">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
              {featureKeyMap[feature] ? t(featureKeyMap[feature]) : feature}
            </li>
          ))}
        </ul>
        <Button
          className="text-sm w-full"
          variant={plan.is_current ? (isExpired ? "secondary" : "outline") : "default"}
          disabled={plan.is_current && !isExpired}
          onClick={() => plan.is_current && isExpired ? onRenewPlan(plan) : onSelectPlan(plan)}
        >
          {plan.is_current ? (isExpired ? t("membership.renew") : t("membership.current_plan")) : t("membership.select_plan")}
        </Button>
      </CardContent>
    </Card>
  )
}

interface PaymentItemProps {
  t: (key: string) => string
  payment: {
    id: string
    plan: string
    currency: string
    amount: string
    status: string
    date: string
    expiryDate: string
  }
}

function PaymentItem({ t, payment }: PaymentItemProps) {
  const isActive = payment.status === "Active"
  const currencySymbol = payment.currency === "USD" ? "$" : ""
  const translatedStatus = statusKeyMap[payment.status] ? t(statusKeyMap[payment.status]) : payment.status
  const translatedPlan = planNameMap[payment.plan] ? t(planNameMap[payment.plan]) : payment.plan

  return (
    <div className="flex items-center justify-between py-4 px-0 hover:bg-muted/30 transition-colors border-b last:border-b-0">
      <div className="w-full flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Crown className="h-4 w-4 text-primary" />
        </div>
        <div className="w-full space-y-1">
          <div className="w-full flex items-start justify-between space-x-2">
            <span className="text-xs sm:text-sm font-medium">{translatedPlan}</span>
            <div className="flex sm:hidden items-center space-x-3">
              <p className="text-sm font-semibold">
                {currencySymbol}{payment.amount}
              </p>
              <Badge
                variant={isActive ? "default" : "secondary"}
                className={`whitespace-nowrap ${isActive
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                  : "bg-gray-100 text-gray-800 border-gray-200"
                  }`}
              >
                {translatedStatus}
              </Badge>
            </div>
          </div>
          <div className="w-full flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
            <span>{t("membership.start")} {formatDate(payment.date)}</span>
            <span>-</span>
            <span>{t("membership.expires")} {formatDate(payment.expiryDate)}</span>
          </div>
        </div>
      </div>
      <div className="hidden sm:block text-right">
        <div className="flex items-center space-x-3">
          <p className="text-sm font-semibold">
            {payment.amount}
          </p>
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={`whitespace-nowrap ${isActive
              ? "bg-emerald-100 text-emerald-800 border-emerald-200"
              : "bg-gray-100 text-gray-800 border-gray-200"
              }`}
          >
            {translatedStatus}
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default function MembershipPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [endDate, setEndDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState("")
  const customer = useCustomerStore((state) => state.customer)
  const [packages, setPackages] = useState<IPackagesResponse[] | null>(null)

  const filter = MemberShipPaymentHistory()
  const membershipPaymentHistories = useFetchMemberShipPaymentHistory({ filter: filter.data })

  useEffect(() => {
    if (!customer) {
      router.push("/auth/login")
    }
  }, [customer, router])

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true)
        const res = await queryData({ url: "/subscription-packages" })

        if (res.data.length > 0) {
          setPackages(res.data)
        }
      } catch (error) {
        console.error("Fetch packages failed:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  const handleSelectPlan = (plan: IPackagesResponse) => {
    if (!plan.is_current) {
      const paymentUrl = `/payment?plan=${encodeURIComponent(plan.service_type)}&price=${encodeURIComponent(plan.price)}&id=${encodeURIComponent(plan.id)}`
      router.push(paymentUrl)
    }
  }

  const handleRenewPlan = (plan: IPackagesResponse) => {
    if (plan.is_current) {
      const paymentUrl = `/payment?plan=${encodeURIComponent(plan.service_type)}&price=${encodeURIComponent(plan.price)}&id=${encodeURIComponent(plan.id)}&renew=true&duration=${encodeURIComponent(plan.duration_months)}`
      router.push(paymentUrl)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-8">
      <Card className="border-0 shadow-sm space-y-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center justify-start text-sm sm:text-lg font-semibold">
            <Crown className="h-5 w-5 mr-2 text-primary" /> {t("membership.title")}
          </CardTitle>
          <p className="text-xs text-muted-foreground">{t("membership.subtitle")}</p>
        </CardHeader>
        {loading ? (
          <LoadingSkeleton text={t("membership.loading")} />
        ) : (
          <CardContent className="p-0">
            {packages && packages.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6">
                {packages.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    t={t}
                    onSelectPlan={handleSelectPlan}
                    onRenewPlan={handleRenewPlan}
                  />
                ))}
              </div>
            ) : (
              <EmptyPage
                title={t("membership.no_packages")}
                description={t("membership.no_packages_des")}
              />
            )}
          </CardContent>
        )}
      </Card>

      <hr />

      <Card className="border-0 shadow-sm space-y-8">
        <CardHeader className="p-0">
          <div className="w-full flex items-center justify-between">
            <CardTitle className="text-sm sm:text-md font-semibold flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              {t("membership.payment_history")}
            </CardTitle>
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
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {membershipPaymentHistories.loading ? (
            <div className="flex justify-center items-center min-h-[40vh]">
              <Loader className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2">{t("membership.loading")}</span>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                {membershipPaymentHistories?.data && membershipPaymentHistories.data.length > 0 ? (
                  membershipPaymentHistories.data.map((payment) => (
                    <PaymentItem key={payment.id} t={t} payment={payment} />
                  ))
                ) : (
                  <EmptyPage
                    title={t("membership.no_history")}
                    description={t("membership.no_history_des")}
                  />
                )}
              </div>

              {membershipPaymentHistories?.data && membershipPaymentHistories.data.length > 0 && (
                <>
                  <hr />
                  <div className="w-full flex items-center justify-end mb-4">
                    <Pagination
                      filter={filter.data}
                      totalPage={Math.ceil((membershipPaymentHistories.total ?? 0) / filter.data.limit)}
                      onPageChange={(page) => {
                        filter.dispatch({
                          type: filter.ACTION_TYPE.PAGE,
                          payload: page,
                        })
                      }}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
