"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react"

const walletData = {
  totalBalance: 45230.75,
  availableBalance: 12450.25,
  investedAmount: 32780.5,
  pendingTransactions: 3,
}

const recentActivity = [
  {
    type: "deposit",
    amount: 5000,
    description: "Bank Transfer",
    date: "2024-01-15",
    status: "completed",
  },
  {
    type: "withdrawal",
    amount: 2500,
    description: "Stock Purchase - AAPL",
    date: "2024-01-14",
    status: "completed",
  },
  {
    type: "deposit",
    amount: 1000,
    description: "Dividend Payment",
    date: "2024-01-12",
    status: "completed",
  },
]

export function WalletOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Total Balance</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold">${walletData.totalBalance.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Available Cash</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold text-green-500">${walletData.availableBalance.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Invested</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold">${walletData.investedAmount.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Pending</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold">{walletData.pendingTransactions}</div>
              <div className="text-xs text-muted-foreground">Transactions</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === "deposit"
                        ? "bg-green-100 dark:bg-green-900/20"
                        : "bg-red-100 dark:bg-red-900/20"
                    }`}
                  >
                    {activity.type === "deposit" ? (
                      <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{activity.description}</div>
                    <div className="text-xs text-muted-foreground">{activity.date}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`font-medium text-sm ${activity.type === "deposit" ? "text-green-500" : "text-red-500"}`}
                  >
                    {activity.type === "deposit" ? "+" : "-"}${activity.amount.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground capitalize">{activity.status}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
