"use client"

import {
  Users,
  Globe,
  TrendingUp,
  Star,
  CheckCircle,
  Shield,
  Award,
  BarChart3,
  Newspaper,
  Phone,
  Mail,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/i18n"
import { useSearchParams, useRouter } from "next/navigation"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCustomerStore } from "../store/useCustomerStore"

export default function ServicesPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("membership")
  const customer = useCustomerStore((state) => state.customer);

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["membership", "international", "returns", "picks"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/services?tab=${value}`, { scroll: false })
  }

  const handleMembershipClick = () => {
    router.push("/pricing")
  }

  const handleCreateStockAccount = () => {
    if (!customer) {
      router.push("/auth/login")
    } else {
      router.push("/dashboard/application/stock-account")
    }
  }

  const handleCreateInvestmentAccount = () => {
    if (!customer) {
      router.push("/auth/login")
    } else {
      router.push("/dashboard/application/return-invest")
    }
  }

  return (
    <div className="px-4 sm:px-0 sm:container min-h-screen bg-background">
      <Header />

      <main className="mt-16 p-0">
        <section className="py-8 px-0 sm:px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto text-center space-y-2">
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              {t("services.title")}
            </h1>
            <p className="text-md text-muted-foreground max-w-3xl mx-auto">
              {t("services.des")}
            </p>
          </div>
        </section>

        <section className="pb-16 px-0 sm:px-4">
          <div className="sm:container mx-auto">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">

                <TabsTrigger value="membership" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("services.member")}</span>
                  <span className="sm:hidden">{t("services.member")}</span>
                </TabsTrigger>

                <TabsTrigger value="international" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("services.stock_account")}</span>
                  <span className="sm:hidden">{t("services.stock_account")}</span>
                </TabsTrigger>

                <TabsTrigger value="returns" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("services.invest")}</span>
                  <span className="sm:hidden">{t("services.invest1")}</span>
                </TabsTrigger>

                <TabsTrigger value="picks" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("services.stock_pick")}</span>
                  <span className="sm:hidden">{t("services.stock_pick")}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="membership" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-md font-bold">{t("services.member")}</h2>
                        <p className="text-sm text-muted-foreground">{t("services.member_des")}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 text-sm">
                      <p className="leading-relaxed">
                        {t("services.member_des1")}
                      </p>
                      <p className="leading-relaxed">
                        {t("services.member_des2")}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Newspaper className="h-4 h-4 text-primary" />
                            <h4 className="text-md font-semibold">{t("services.daily_new")}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{t("services.daily_new_des")}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="h-4 h-4 text-primary" />
                            <h4 className="text-md font-semibold">{t("services.tools")}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{t("servies.tool_des")}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="font-bold text-md flex items-center gap-2">
                          {t("services.member_feature_title")}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.member_feature1")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.member_feature2")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.member_feature3")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.member_feature4")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.member_feature5")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.member_feature6")}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md">{t("services.member_benefit_title")}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{t("services.member_benefit1_title")}</Badge>
                          <span className="text-sm">{t("services.member_benefit1_des")}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{t("services.member_benefit2_title")}</Badge>
                          <span className="text-sm">{t("services.member_benefit2_des")}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="w-full text-center sm:text-start">
                      <Button size="lg" className="w-auto" onClick={handleMembershipClick}>
                        {t("services.start_member")}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="international" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-md font-bold">{t("services.stock_account_title")}</h2>
                        <p className="text-sm text-muted-foreground">{t("services.stock_account_des")}</p>
                      </div>
                    </div>

                    <div className="text-sm space-y-4 mb-8">
                      <p className="leading-relaxed">
                        {t("services.stock_account_des1")}
                      </p>
                      <p className="leading-relaxed">
                        {t("services.stock_account_des2")}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="h-4 w-4 text-primary" />
                            <h4 className="text-md font-semibold">{t("servcies.stock_account_title1")}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{t("servcies.stock_account_des3")}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-primary" />
                            <h4 className="text-md font-semibold">{t("servcies.stock_account_title2")}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{t("servcies.stock_account_des4")}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-500" />
                          {t("services.stock_account_market_title")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.stock_account_market1")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.stock_account_market2")}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md">{t("services.stock_account_feature_title")}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{t("services.stock_account_feature1_title")}</Badge>
                          <span className="text-sm">{t("services.stock_account_feature1_des")}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{t("services.stock_account_feature2_title")}</Badge>
                          <span className="text-sm">{t("services.stock_account_feature2_des")}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{t("services.stock_account_feature3_title")}</Badge>
                          <span className="text-sm">{t("services.stock_account_feature3_des")}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="w-full text-center sm:text-start">
                      <Button size="lg" className="w-auto" onClick={() => handleCreateStockAccount()}>
                        {t("services.stock_account_open")}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="returns" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-md font-bold">{t("services.invest_title")}</h2>
                        <p className="text-sm text-muted-foreground">
                          {t("services.invest_des")}
                        </p>
                      </div>
                    </div>

                    <div className="text-sm space-y-4 mb-8">
                      <p className="leading-relaxed">
                        {t("services.invest_des1")}
                      </p>
                      <p className="leading-relaxed">
                        {t("services.invest_des2")}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 h-4 text-primary" />
                            <h4 className="text-md font-semibold">{t("services.invest_title1")}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{t("services.invest_des3")}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="h-4 h-4 text-primary" />
                            <h4 className="text-md font-semibold">{t("services.invest_title2")}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{t("services.invest_des4")}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                          <TrendingUp className="h-4 h-4 text-green-500" />
                          {t("services.invest_feature_title")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.invest_feature1")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.invest_feature2")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.invest_feature3")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.invest_feature4")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.invest_feature5")}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md">{t("services.invest_tier_title")}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{t("services.invest_tier_title1")}</Badge>
                          <span className="text-sm">{t("services.invest_tier_des1")}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{t("services.invest_tier_title2")}</Badge>
                          <span className="text-sm">{t("services.invest_tier_des2")}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{t("services.invest_tier_title3")}</Badge>
                          <span className="text-sm">{t("services.invest_tier_des3")}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="w-full text-center sm:text-start">
                      <Button size="lg" className="w-auto" onClick={() => handleCreateInvestmentAccount()}>
                        {t("services.invest_start")}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="picks" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-md font-bold">{t("services.stock_pick_title")}</h2>
                        <p className="text-sm text-muted-foreground">{t("services.stock_pick_des")}</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 text-sm">
                      <p className="leading-relaxed">
                        {t("services.stock_pick_des1")}
                      </p>
                      <p className="leading-relaxed">
                        {t("services.stock_pick_des2")}
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 h-4 text-primary" />
                            <h4 className="font-semibold">{t("services.stock_pick_title1")}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{t("services.stock_pick_des3")}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="h-4 h-4 text-primary" />
                            <h4 className="font-semibold">{t("services.stock_pick_title2")}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">{t("services.stock_pick_des4")}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                          <Star className="h-4 h-4 text-yellow-500" />
                          {t("services.stock_pick_feature_title")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.stock_pick_feature1")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.stock_pick_feature2")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.stock_pick_feature3")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.stock_pick_feature4")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.stock_pick_feature5")}</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">{t("services.stock_pick_feature6")}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md">{t("services.stock_pick_performance_title")}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{t("services.stock_pick_performance_title1")}</Badge>
                          <span className="text-sm">{t("services.stock_pick_performance_des1")}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{t("services.stock_pick_performance_title2")}</Badge>
                          <span className="text-sm">{t("services.stock_pick_performance_des2")}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">{t("services.stock_pick_performance_title3")}</Badge>
                          <span className="text-sm">{t("services.stock_pick_performance_des3")}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="w-full text-center sm:text-start">
                      <Button size="lg" className="w-auto" onClick={() => router.push("/stock-picks")}>
                        {t("services.stock_pick_start")}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16 px-0 sm:px-4 bg-muted/30">
          <div className="container mx-auto text-center space-y-4">
            <div>
              <h2 className="text-md font-bold">{t("services.more_title")}</h2>
              <p className="text-sm text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t("services.more_des")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {t("services.more_call")}
              </Button>
              <Button size="lg" variant="outline" className="flex items-center gap-2 bg-transparent">
                <Mail className="h-4 w-4" />
                {t("services.more_email")}
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
