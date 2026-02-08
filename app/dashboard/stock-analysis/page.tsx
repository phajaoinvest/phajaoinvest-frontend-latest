import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  FileText,
  TrendingUp,
  DollarSign,
  Settings,
  LogOut,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function StockAnalysisPage() {
  const user = {
    name: "John Smith",
    email: "john.smith@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const analysisReports = [
    {
      id: "RPT001",
      stock: "AAPL",
      title: "Apple Inc. Q4 Analysis",
      recommendation: "Buy",
      targetPrice: "$195.00",
      currentPrice: "$175.43",
      upside: "+11.2%",
      date: "August 12, 2025",
      isPositive: true,
    },
    {
      id: "RPT002",
      stock: "TSLA",
      title: "Tesla Growth Prospects",
      recommendation: "Hold",
      targetPrice: "$260.00",
      currentPrice: "$248.50",
      upside: "+4.6%",
      date: "August 11, 2025",
      isPositive: true,
    },
    {
      id: "RPT003",
      stock: "GOOGL",
      title: "Alphabet Market Position",
      recommendation: "Sell",
      targetPrice: "$125.00",
      currentPrice: "$138.21",
      upside: "-9.6%",
      date: "August 10, 2025",
      isPositive: false,
    },
  ]

  const sidebarItems = [
    { icon: User, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Transaction", href: "/dashboard/transactions" },
    { icon: TrendingUp, label: "Investment Portfolio", href: "/dashboard/investment-portfolio" },
    { icon: DollarSign, label: "Portfolio (International)", href: "/dashboard/international-portfolio" },
    { icon: TrendingUp, label: "Stock Analysis", href: "/dashboard/stock-analysis", isActive: true },
    { icon: Settings, label: "Account Setting", href: "/dashboard/account-settings" },
    { icon: LogOut, label: "Sign out", href: "/auth/logout" },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="h-16 w-16 mx-auto mb-4 ring-4 ring-primary/20">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                    <Wallet className="h-4 w-4 mr-2" />
                    Add Funds
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sidebarItems.map((item, index) => {
                    const IconComponent = item.icon
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 border-l-4 ${
                          item.isActive
                            ? "bg-slate-100 border-slate-600 text-slate-900 font-medium"
                            : "border-transparent hover:bg-muted/50 hover:border-muted-foreground/20"
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-semibold">Stock Analysis Reports</CardTitle>
                  <Button variant="outline" size="sm">
                    View All Reports
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {analysisReports.map((report, index) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors border-b last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{report.stock}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{report.title}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{report.id}</span>
                            <span>•</span>
                            <span>{report.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="font-semibold">{report.targetPrice}</p>
                            <div
                              className={`flex items-center text-sm ${report.isPositive ? "text-emerald-600" : "text-red-500"}`}
                            >
                              {report.isPositive ? (
                                <ArrowUpRight className="h-3 w-3 mr-1" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 mr-1" />
                              )}
                              {report.upside}
                            </div>
                          </div>
                          <Badge
                            variant="default"
                            className={
                              report.recommendation === "Buy"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                : report.recommendation === "Hold"
                                  ? "bg-amber-100 text-amber-800 border-amber-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                            }
                          >
                            {report.recommendation}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
