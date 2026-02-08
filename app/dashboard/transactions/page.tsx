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
} from "lucide-react"
import Link from "next/link"

export default function TransactionsPage() {
  const user = {
    name: "John Smith",
    email: "john.smith@email.com",
    avatar: "/placeholder.svg?height=40&width=40",
    balance: "$12,450.00",
    totalInvestment: "$25,000.00",
    totalReturn: "+15.2%",
  }

  const transactions = [
    {
      id: "#6033",
      date: "August 12, 2025",
      status: "Completed",
      amount: "$210.00",
      type: "Stock Purchase",
      stock: "AAPL",
      change: "+2.5%",
      isPositive: true,
    },
    {
      id: "#6032",
      date: "August 11, 2025",
      status: "Pending",
      amount: "$299.00",
      type: "Membership",
      stock: "Premium",
      change: "",
      isPositive: null,
    },
    {
      id: "#6031",
      date: "August 10, 2025",
      status: "Completed",
      amount: "$5,000.00",
      type: "Investment",
      stock: "Portfolio",
      change: "+8.1%",
      isPositive: true,
    },
    {
      id: "#6030",
      date: "August 9, 2025",
      status: "Completed",
      amount: "$150.00",
      type: "Stock Purchase",
      stock: "TSLA",
      change: "+1.8%",
      isPositive: true,
    },
    {
      id: "#6029",
      date: "August 8, 2025",
      status: "Failed",
      amount: "$75.00",
      type: "Stock Purchase",
      stock: "GOOGL",
      change: "-0.5%",
      isPositive: false,
    },
  ]

  const sidebarItems = [
    { icon: User, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Transaction", href: "/dashboard/transactions", isActive: true },
    { icon: TrendingUp, label: "Investment Portfolio", href: "/dashboard/investment-portfolio" },
    { icon: DollarSign, label: "Portfolio (International)", href: "/dashboard/international-portfolio" },
    { icon: TrendingUp, label: "Stock Analysis", href: "/dashboard/stock-analysis" },
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
                  <CardTitle className="text-2xl font-semibold">All Transactions</CardTitle>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {transactions.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors border-b last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {transaction.type === "Stock Purchase" ? (
                            <TrendingUp className="h-5 w-5 text-primary" />
                          ) : transaction.type === "Membership" ? (
                            <User className="h-5 w-5 text-accent" />
                          ) : (
                            <DollarSign className="h-5 w-5 text-emerald-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{transaction.stock}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{transaction.type}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{transaction.id}</span>
                            <span>•</span>
                            <span>{transaction.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="font-semibold">{transaction.amount}</p>
                            {transaction.change && (
                              <div
                                className={`flex items-center text-sm ${transaction.isPositive ? "text-emerald-600" : "text-red-500"}`}
                              >
                                {transaction.isPositive ? (
                                  <ArrowUpRight className="h-3 w-3 mr-1" />
                                ) : (
                                  <ArrowDownRight className="h-3 w-3 mr-1" />
                                )}
                                {transaction.change}
                              </div>
                            )}
                          </div>
                          <Badge
                            variant={transaction.status === "Completed" ? "default" : "secondary"}
                            className={
                              transaction.status === "Completed"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                : transaction.status === "Failed"
                                  ? "bg-red-100 text-red-800 border-red-200"
                                  : "bg-amber-100 text-amber-800 border-amber-200"
                            }
                          >
                            {transaction.status}
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
