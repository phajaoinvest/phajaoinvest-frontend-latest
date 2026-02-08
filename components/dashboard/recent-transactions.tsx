"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react"

const transactions = [
  {
    id: "1",
    type: "buy",
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 10,
    price: 175.43,
    total: 1754.3,
    date: "2024-01-15",
    time: "09:30 AM",
  },
  {
    id: "2",
    type: "sell",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 5,
    price: 138.21,
    total: 691.05,
    date: "2024-01-14",
    time: "02:15 PM",
  },
  {
    id: "3",
    type: "buy",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    shares: 8,
    price: 248.5,
    total: 1988.0,
    date: "2024-01-12",
    time: "11:45 AM",
  },
  {
    id: "4",
    type: "buy",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 15,
    price: 378.85,
    total: 5682.75,
    date: "2024-01-10",
    time: "10:20 AM",
  },
  {
    id: "5",
    type: "sell",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    shares: 3,
    price: 456.78,
    total: 1370.34,
    date: "2024-01-08",
    time: "03:30 PM",
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
        <Button variant="outline" size="sm">
          <ExternalLink className="h-4 w-4 mr-1" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-full ${
                    transaction.type === "buy" ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"
                  }`}
                >
                  {transaction.type === "buy" ? (
                    <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{transaction.symbol}</span>
                    <Badge variant={transaction.type === "buy" ? "default" : "secondary"} className="text-xs">
                      {transaction.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {transaction.shares} shares @ ${transaction.price}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {transaction.date} at {transaction.time}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-medium text-sm">
                  {transaction.type === "buy" ? "-" : "+"}${transaction.total.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
