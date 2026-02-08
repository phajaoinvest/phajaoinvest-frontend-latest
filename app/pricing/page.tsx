"use client";

import React from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n"
import { Star, Globe, TrendingUp } from "lucide-react"

// components:
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import EmptyPage from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// appi and interfaces:
import { queryData } from "../api/api"
import { IPackagesResponse } from "@/interfaces/package"

export default function PricingPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [packages, setPackages] = React.useState<IPackagesResponse[] | null>(null)

  const fetchPackages = async () => {
    try {
      const res = await queryData({
        url: "/subscription-packages",
      });

      if (res.data.length > 1) {
        setPackages(res.data);
      }
    } catch (error: any) {
      console.log("Fetch packages failed!", error)
    }
  };

  React.useEffect(() => {
    fetchPackages();
  }, []);

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background to-muted/30 mt-10">
        <div className="container mx-auto max-w-6xl px-4 py-16 space-y-8 sm:space-y-16">
          {packages && packages?.length > 0 &&
            <div className="text-center space-y-2">
              <h1 className="text-md sm:text-xl font-bold text-primary">
                {t("pricing.title")}
              </h1>
              <p className="text-xs sm:text-sm text-light text-muted-foreground max-w-3xl mx-auto">
                {t("pricing.description")}
              </p>
            </div>
          }

          {packages && packages.length > 0 ?
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6">
              {packages?.map((plan) => (
                <Card key={plan.id} className={`relative ${plan.is_current ? "ring-2 ring-primary" : ""}`}>
                  {plan.is_current && (
                    <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">
                      {plan.days_left !== null ? t("pricing.is_current_plan") : <p> {t("pricing.current")},&nbsp; <span>{t("pricing.has_expired")}: {plan.days_left} {t("pricing.days")}</span></p>}
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-sm sm:text-md">{plan.description}</CardTitle>
                    <div className="text-md sm:text-xl font-bold text-primary">{plan.currency === "USD" ? "$" : ""}{plan.price}</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{plan.duration_months} Months</p>
                  </CardHeader>
                  <CardContent className="px-2 sm:px-4 py-0 pb-4">
                    <ul className="space-y-2 mb-4">
                      {plan?.features && plan?.features.map((feature, featureIndex) => (
                        <li key={featureIndex + 1} className="text-gray-500 text-sm flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="text-sm w-full"
                      variant={plan.is_current ? plan?.days_left < 0 ? "secondary" : "outline" : "default"}
                      disabled={plan.is_current && plan.days_left > 0}
                      onClick={() => plan.is_current && plan.days_left < 0 ? handleRenewPlan(plan) : handleSelectPlan(plan)}
                    >
                      {plan.is_current ? plan.days_left < 0 ? t("pricing.renew") : t("pricing.current_plan") : t("pricing.select_plan")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            :
            <EmptyPage
              title={t("pricing.no_package")}
              description={t("pricing.no_package_description")}
            />
          }

          <hr />

          <div className="space-y-2 sm:space-y-8 text-center">
            <h2 className="text-md sm:text-xl font-bold text-primary">{t("pricing.work_title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-8 max-w-6xl mx-auto">
              <div className="text-center border p-4 rounded">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm sm:text-md font-semibold mb-2">{t("pricing.language_title")}</h3>
                <p className="text-sm font-light text-muted-foreground">
                  {t("pricing.language_description")}
                </p>
              </div>

              <div className="text-center border p-4 rounded">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm sm:text-md font-semibold mb-2">{t("pricing.analysis_title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pricing.analysis_description")}
                </p>
              </div>

              <div className="text-center border p-4 rounded">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-sm sm:text-md font-semibold mb-2">{t('pricing.premium_support')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pricing.premium_support_description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
