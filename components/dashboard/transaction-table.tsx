"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const transactions = [
  {
    id: "TXN001",
    type: "buy",
    symbol: "AAPL",
    description: "Buy Apple Inc.",
    shares: 10,
    price: 175.43,
    total: 1754.3,
    status: "completed",
    date: "2024-01-15",
    time: "09:30 AM",
  },
  {
    id: "TXN002",
    type: "sell",
    symbol: "GOOGL",
    description: "Sell Alphabet Inc.",
    shares: 5,
    price: 138.21,
    total: 691.05,
    status: "completed",
    date: "2024-01-14",
    time: "02:15 PM",
  },
  {
    id: "TXN003",
    type: "deposit",
    symbol: null,
    description: "Bank Transfer Deposit",
    shares: null,
    price: null,
    total: 5000,
    status: "completed",
    date: "2024-01-12",
    time: "11:45 AM",
  },
  {
    id: "TXN004",
    type: "buy",
    symbol: "TSLA",
    description: "Buy Tesla Inc.",
    shares: 8,
    price: 248.5,
    total: 1988.0,
    status: "pending",
    date: "2024-01-10",
    time: "10:20 AM",
  },
  {
    id: "TXN005",
    type: "withdrawal",
    symbol: null,
    description: "Bank Transfer Withdrawal",
    shares: null,
    price: null,
    total: 2500,
    status: "completed",
    date: "2024-01-08",
    time: "03:30 PM",
  },
]

export function TransactionTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">All Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-xs font-medium text-muted-foreground">TYPE</th>
                <th className="text-left py-3 text-xs font-medium text-muted-foreground">DESCRIPTION</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">SHARES</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">PRICE</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">TOTAL</th>
                <th className="text-center py-3 text-xs font-medium text-muted-foreground">STATUS</th>
                <th className="text-left py-3 text-xs font-medium text-muted-foreground">DATE</th>
                <th className="text-right py-3 text-xs font-medium text-muted-foreground">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-1 rounded-full ${
                          transaction.type === "buy" || transaction.type === "deposit"
                            ? "bg-green-100 dark:bg-green-900/20"
                            : "bg-red-100 dark:bg-red-900/20"
                        }`}
                      >
                        {transaction.type === "buy" || transaction.type === "deposit" ? (
                          <ArrowDownLeft className="h-3 w-3 text-green-600 dark:text-green-400" />
                        ) : (
                          <ArrowUpRight className="h-3 w-3 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {transaction.type.toUpperCase()}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-4">
                    <div>
                      <div className="font-medium text-sm">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground">{transaction.id}</div>
                    </div>
                  </td>
                  <td className="text-right py-4 text-sm">{transaction.shares ? transaction.shares : "-"}</td>
                  <td className="text-right py-4 text-sm">{transaction.price ? `$${transaction.price}` : "-"}</td>
                  <td className="text-right py-4 text-sm font-medium">${transaction.total.toLocaleString()}</td>
                  <td className="text-center py-4">
                    <Badge
                      variant={
                        transaction.status === "completed"
                          ? "default"
                          : transaction.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {transaction.status}
                    </Badge>
                  </td>
                  <td className="py-4 text-sm">
                    <div>{transaction.date}</div>
                    <div className="text-xs text-muted-foreground">{transaction.time}</div>
                  </td>
                  <td className="text-right py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        {transaction.status === "pending" && <DropdownMenuItem>Cancel Transaction</DropdownMenuItem>}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
