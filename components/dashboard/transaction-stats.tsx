"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownLeft, DollarSign, Activity } from "lucide-react"

const stats = [
  {
    title: "Total Transactions",
    value: "1,247",
    change: "+12%",
    icon: Activity,
    positive: true,
  },
  {
    title: "Total Volume",
    value: "$2.4M",
    change: "+8.2%",
    icon: DollarSign,
    positive: true,
  },
  {
    title: "Buy Orders",
    value: "743",
    change: "+15%",
    icon: ArrowDownLeft,
    positive: true,
  },
  {
    title: "Sell Orders",
    value: "504",
    change: "+5%",
    icon: ArrowUpRight,
    positive: true,
  },
]

export function TransactionStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{stat.title}</span>
            </div>
            <div className="mt-2">
              <div className="text-xl font-bold">{stat.value}</div>
              <div className={`text-xs ${stat.positive ? "text-green-500" : "text-red-500"}`}>
                {stat.change} from last month
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
