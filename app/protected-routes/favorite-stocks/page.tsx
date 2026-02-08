"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Star, Eye, Trash2 } from "lucide-react"

export default function FavoriteStocksPage() {
  const router = useRouter()
  const [favoriteStocks] = useState([
    {
      symbol: "PLTR",
      name: "Palantir Technologies Inc.",
      price: 168.19,
      change: -2.02,
      lastUpdated: "12/08/2568",
    },
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 175.43,
      change: 1.25,
      lastUpdated: "12/08/2568",
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      price: 248.5,
      change: -0.85,
      lastUpdated: "12/08/2568",
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h1 className="text-2xl font-bold">หุ้นโปรดของฉัน</h1>
          </div>
          <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            กลับ
          </Button>
        </div>

        {/* User ID Card */}
        <Card className="mb-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-blue-700 dark:text-blue-300 font-medium">User ID: 1343</p>
            </div>
          </CardContent>
        </Card>

        {/* Favorite Stocks List */}
        <div className="space-y-4">
          {favoriteStocks.map((stock, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{stock.symbol}</h3>
                    </div>
                    <p className="text-muted-foreground mb-3">{stock.name}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">ราคาปัจจุบัน: </span>
                        <span className="font-semibold text-lg">${stock.price}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">แนวรับ: </span>
                        <span className={`font-semibold ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {stock.change >= 0 ? "+" : ""}
                          {stock.change}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="text-xs text-muted-foreground">เพิ่มเมื่อ: {stock.lastUpdated}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Eye className="h-4 w-4 mr-1" />
                      ดูรายละเอียด
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4 mr-1" />
                      ลบ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {favoriteStocks.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">ยังไม่มีหุ้นโปรด</h3>
              <p className="text-muted-foreground">เพิ่มหุ้นที่คุณสนใจเพื่อติดตามได้ง่ายขึ้น</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
