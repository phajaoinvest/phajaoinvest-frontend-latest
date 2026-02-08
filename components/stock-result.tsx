"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, TrendingUp, BarChart3, Calendar, DollarSign, Activity } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  pe: number
  high52: number
  low52: number
  rsi: number
  support1: number
  support2: number
  resistance: number
}

interface StockResultProps {
  stockData: StockData
  onBack: () => void
}

export function StockResult({ stockData, onBack }: StockResultProps) {
  const { t } = useTranslation()
  const [selectedPeriod, setSelectedPeriod] = useState("1M")

  const periods = ["1M", "6M", "YTD", "1Y", "5Y"]

  const analysisButtons = [
    { key: "summary", label: "สรุปวิจัย", icon: BarChart3 },
    { key: "structure", label: "สรุปโครงสร้าง", icon: Activity },
    { key: "financial", label: "ข้อมูลการเงิน", icon: DollarSign },
    { key: "returns", label: "ผลตอบแทน", icon: TrendingUp },
    { key: "news", label: "ข่าวล่าสุด", icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-4 bg-gray-800 text-white hover:bg-gray-700 border-gray-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับหน้าหลัก
          </Button>
        </div>

        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="text-center">
              <CardTitle className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
                <span className="text-2xl">✨</span>
                Rocket Tool
              </CardTitle>

              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg text-muted-foreground">ข้อมูลหุ้น:</span>
                  <span className="text-2xl font-bold text-primary">{stockData.symbol}</span>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <span className="text-lg text-muted-foreground">ราคา:</span>
                  <span className="text-3xl font-bold">{stockData.price.toFixed(2)} USD</span>
                  <Badge variant={stockData.change >= 0 ? "default" : "destructive"} className="text-lg px-3 py-1">
                    {stockData.change >= 0 ? "+" : ""}
                    {stockData.changePercent.toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Analysis Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {analysisButtons.map((button) => {
                const Icon = button.icon
                return (
                  <Button
                    key={button.key}
                    variant="outline"
                    className="h-12 bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700 font-medium"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {button.label}
                  </Button>
                )
              })}
            </div>

            {/* Time Period Buttons */}
            <div className="flex justify-center gap-2 flex-wrap">
              {periods.map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className={
                    selectedPeriod === period
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }
                >
                  {period === "1M"
                    ? "1 เดือน"
                    : period === "6M"
                      ? "6 เดือน"
                      : period === "1Y"
                        ? "1 ปี"
                        : period === "5Y"
                          ? "5 ปี"
                          : period}
                </Button>
              ))}
            </div>

            {/* Chart Area */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 min-h-[400px] relative">
              {/* Chart Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm text-gray-600">ราคาปิด | RSI: {stockData.rsi.toFixed(2)}</div>
              </div>

              {/* Price Levels */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm font-medium text-green-700">
                    แนวต้าน 1: ${stockData.resistance.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-sm font-medium text-red-700">แนวรับ 1: ${stockData.support1.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-400 rounded"></div>
                  <span className="text-sm font-medium text-red-600">แนวรับ 2: ${stockData.support2.toFixed(2)}</span>
                </div>
              </div>

              {/* Simulated Chart */}
              <div className="relative h-64 bg-white rounded-lg border-2 border-gray-200 p-4">
                <div className="absolute inset-4">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 text-xs text-gray-500">{stockData.resistance.toFixed(0)}</div>
                  <div className="absolute left-0 top-1/2 text-xs text-gray-500">{stockData.price.toFixed(0)}</div>
                  <div className="absolute left-0 bottom-0 text-xs text-gray-500">{stockData.support2.toFixed(0)}</div>

                  {/* Chart line simulation */}
                  <div className="w-full h-full relative">
                    <svg className="w-full h-full" viewBox="0 0 300 200">
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                        </linearGradient>
                      </defs>

                      {/* Support/Resistance lines */}
                      <line x1="0" y1="40" x2="300" y2="40" stroke="#10B981" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="0" y1="120" x2="300" y2="120" stroke="#EF4444" strokeWidth="1" strokeDasharray="5,5" />
                      <line x1="0" y1="160" x2="300" y2="160" stroke="#F87171" strokeWidth="1" strokeDasharray="5,5" />

                      {/* Price line */}
                      <polyline
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        points="0,140 50,120 100,110 150,115 200,105 250,100 300,95"
                      />

                      {/* Area under curve */}
                      <polygon
                        fill="url(#chartGradient)"
                        points="0,200 0,140 50,120 100,110 150,115 200,105 250,100 300,95 300,200"
                      />

                      {/* Current price point */}
                      <circle cx="300" cy="95" r="4" fill="#EF4444" />
                    </svg>
                  </div>

                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 text-xs text-gray-500">15 ต.ค.</div>
                  <div className="absolute bottom-0 right-0 text-xs text-gray-500">8 ม.ค.</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">วันที่</div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{stockData.volume}</div>
                <div className="text-sm text-muted-foreground">Volume</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{stockData.marketCap}</div>
                <div className="text-sm text-muted-foreground">Market Cap</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{stockData.pe}</div>
                <div className="text-sm text-muted-foreground">P/E Ratio</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{stockData.rsi.toFixed(1)}</div>
                <div className="text-sm text-muted-foreground">RSI</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
