"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Filter } from "lucide-react"

const transactions = [
  {
    id: "TXN001",
    type: "deposit",
    description: "Bank Transfer",
    amount: 5000,
    status: "completed",
    date: "2024-01-15",
    time: "09:30 AM",
  },
  {
    id: "TXN002",
    type: "trade",
    description: "Buy AAPL - 10 shares",
    amount: -1754.3,
    status: "completed",
    date: "2024-01-15",
    time: "09:35 AM",
  },
  {
    id: "TXN003",
    type: "withdrawal",
    description: "Bank Transfer",
    amount: -2500,
    status: "pending",
    date: "2024-01-14",
    time: "02:15 PM",
  },
  {
    id: "TXN004",
    type: "dividend",
    description: "MSFT Dividend Payment",
    amount: 125.5,
    status: "completed",
    date: "2024-01-12",
    time: "11:45 AM",
  },
  {
    id: "TXN005",
    type: "trade",
    description: "Sell GOOGL - 5 shares",
    amount: 691.05,
    status: "completed",
    date: "2024-01-10",
    time: "10:20 AM",
  },
]

export function TransactionHistory() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Transaction History</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="pl-8 text-sm" />
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
              <SelectItem value="trade">Trades</SelectItem>
              <SelectItem value="dividend">Dividends</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-medium text-sm">{transaction.description}</div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.id} • {transaction.date} at {transaction.time}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs">
                  {transaction.status}
                </Badge>
                <div className="text-right">
                  <div className={`font-medium text-sm ${transaction.amount >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {transaction.amount >= 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
