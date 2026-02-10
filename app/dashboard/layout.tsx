"use client"

import Link from "next/link"
import type React from "react"
import { usePathname } from "next/navigation"
import { User, Crown, TrendingUp, Settings, LogOut, Activity } from "lucide-react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useTranslation } from "@/lib/i18n"
import { useAuth } from "@/lib/auth-context"
import { useCustomerStore } from "../store/useCustomerStore"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { logout } = useAuth()
  const { t } = useTranslation()
  const pathname = usePathname()
  const customer = useCustomerStore((state) => state.customer);
  const clearCustomer = useCustomerStore((state) => state.clearCustomer);

  if (!customer) {
    return <div>Loading...</div>
  }

  const sidebarItems = [
    { icon: User, label: t("dashboard.sidebar.dashboard"), href: "/dashboard" },
    { icon: Crown, label: t("dashboard.sidebar.membership"), href: "/dashboard/membership" },
    { icon: TrendingUp, label: t("dashboard.sidebar.my_investment"), href: "/dashboard/guaranteed-returns" },
    // { icon: DollarSign, label: t("dashboard.sidebar.my_stock"), href: "/dashboard/international-portfolio" },
    { icon: Activity, label: t("dashboard.sidebar.stock_pick_history"), href: "/dashboard/stock-pick-history" },
  ]

  const mobileSidebarItems = [
    { icon: User, label: t("dashboard.sidebar.home"), href: "/dashboard" },
    { icon: Crown, label: t("dashboard.sidebar.member"), href: "/dashboard/membership" },
    { icon: TrendingUp, label: t("dashboard.sidebar.investment"), href: "/dashboard/guaranteed-returns" },
    // { icon: ChartNoAxesColumn, label: t("dashboard.sidebar.stock_portfolio"), href: "/dashboard/international-portfolio" },
    { icon: Activity, label: t("dashboard.sidebar.stock_picks"), href: "/dashboard/stock-pick-history" },
    { icon: Settings, label: t("dashboard.sidebar.account_settings"), href: "/dashboard/account-settings" },
  ]

  const handleSignOut = () => {
    logout()
    clearCustomer()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-2 sm:px-4 py-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 sm:gap-8">
          <div className="lg:col-span-1 space-y-0 sm:space-y-6">
            <div className="sticky top-4">
              <Card className="hidden lg:block border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Avatar className="h-16 w-16 mx-auto mb-4 ring-4 ring-primary/20">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt={customer.username} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {customer.username
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{customer.username}</h3>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full bg-primary" size="sm" asChild>
                      <Link href="/dashboard/account-settings">
                        <Settings className="h-4 w-4 mr-2" />
                        {t("dashboard.sidebar.account_settings")}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <nav className="hidden lg:block space-y-1">
                    {sidebarItems.map((item, index) => {
                      const IconComponent = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={index}
                          href={item.href}
                          className={`flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 border-l-4 ${isActive
                            ? "bg-slate-100 border-slate-600 text-slate-900 font-medium"
                            : "border-transparent hover:bg-muted/50 hover:border-muted-foreground/20"
                            }`}
                        >
                          <IconComponent className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      )
                    })}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 border-l-4 border-transparent hover:bg-muted/50 hover:border-muted-foreground/20 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t("dashboard.sidebar.sign_out")}</span>
                    </button>
                  </nav>

                </CardContent>
              </Card>

            </div>
          </div>

          <div className="col-span-4 sm:col-span-3 flex items-start justify-center mb-10 sm:mb-0">
            <div className="w-full sm:w-10/12 px-2 sm:px-0">
              {children}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom navigation (visible only on small screens) */}
      <nav className="fixed bottom-0 left-0 right-0 z-[60] flex lg:hidden justify-around items-center bg-white border-t border-gray-200 shadow-lg py-2 md:py-4" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        {mobileSidebarItems.map((item, index) => {
          const IconComponent = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center justify-center text-xs md:space-y-2 ${isActive ? "text-rose-600 font-medium" : "text-gray-500 hover:text-gray-800"
                }`}
            >
              <IconComponent className="h-4 w-4 md:h-5 md:w-5 mb-0.5" />
              <span className="text-md font-bold">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
