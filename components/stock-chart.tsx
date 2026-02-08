"use client"

import { useEffect, useRef, useState } from "react"
import { queryData } from "@/app/api/api"

interface PriceData {
  v: number      // volume
  vw: number     // volume weighted average price
  o: number      // open
  c: number      // close
  h: number      // high
  l: number      // low
  t: number      // timestamp
  n: number      // number of transactions
}

interface StockChartProps {
  data: PriceData[]
  symbol: string
}

export default function StockChart({ data: initialData, symbol }: StockChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedPeriod, setSelectedPeriod] = useState("1M")
  const [data, setData] = useState<PriceData[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [tooltip, setTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    price: number
    date: string
  } | null>(null)
  const [hoverPoint, setHoverPoint] = useState<{
    x: number
    y: number
    dataIndex: number
  } | null>(null)
  const [periodPerformances, setPeriodPerformances] = useState<Record<string, string>>({})

  // Calculate statistics
  const calculateStats = () => {
    if (data.length === 0) return null

    const firstPrice = data[0].c
    const lastPrice = data[data.length - 1].c
    const change = lastPrice - firstPrice
    const changePercent = ((change / firstPrice) * 100).toFixed(2)

    return {
      firstPrice,
      lastPrice,
      change,
      changePercent,
      isPositive: change >= 0
    }
  }

  const stats = calculateStats()

  // Fetch data when period changes
  useEffect(() => {
    const fetchPriceHistory = async () => {
      setLoading(true)
      try {
        const endDate = new Date()
        const startDate = new Date()

        // Calculate start date based on period
        // For very short periods, we need to look back further to get enough data points
        switch (selectedPeriod) {
          case "1D":
            // Go back 3 days to ensure we get data (weekend, holidays, etc.)
            startDate.setDate(startDate.getDate() - 3)
            break
          case "5D":
            // Go back 7 days to account for weekends
            startDate.setDate(startDate.getDate() - 7)
            break
          case "1M":
            startDate.setMonth(startDate.getMonth() - 1)
            break
          case "6M":
            startDate.setMonth(startDate.getMonth() - 6)
            break
          case "YTD":
            startDate.setMonth(0)
            startDate.setDate(1)
            break
          case "1Y":
            startDate.setFullYear(startDate.getFullYear() - 1)
            break
          case "5Y":
            startDate.setFullYear(startDate.getFullYear() - 5)
            break
          case "ALL":
            startDate.setFullYear(startDate.getFullYear() - 20)
            break
          default:
            startDate.setMonth(startDate.getMonth() - 1)
        }

        const formatDate = (date: Date) => {
          return date.toISOString().split("T")[0]
        }

        const result = await queryData({
          url: `/technical-indicators/${symbol}/price-history?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&adjusted=true&limit=50000&multiplier=1`,
        })

        if (!result.is_error && result.data) {
          // Filter data based on the actual period requested
          let filteredData = result.data

          if (selectedPeriod === "1D") {
            // Only show last 24 hours of data
            const oneDayAgo = new Date()
            oneDayAgo.setDate(oneDayAgo.getDate() - 1)
            filteredData = result.data.filter((item: PriceData) => item.t >= oneDayAgo.getTime())
          } else if (selectedPeriod === "5D") {
            // Only show last 5 days of data
            const fiveDaysAgo = new Date()
            fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
            filteredData = result.data.filter((item: PriceData) => item.t >= fiveDaysAgo.getTime())
          }

          setData(filteredData)
        }
      } catch (error) {
        console.error("Error fetching price history:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPriceHistory()
  }, [selectedPeriod, symbol])

  // Update data when initialData changes
  useEffect(() => {
    setData(initialData)
  }, [initialData])

  // Calculate performance for all periods
  useEffect(() => {
    const calculateAllPeriodPerformances = async () => {
      const performances: Record<string, string> = {}
      const periods = ["5D", "1M", "6M", "YTD", "1Y", "5Y", "ALL"]

      for (const period of periods) {
        try {
          const endDate = new Date()
          const startDate = new Date()

          switch (period) {
            case "5D":
              startDate.setDate(startDate.getDate() - 7)
              break
            case "1M":
              startDate.setMonth(startDate.getMonth() - 1)
              break
            case "6M":
              startDate.setMonth(startDate.getMonth() - 6)
              break
            case "YTD":
              startDate.setMonth(0)
              startDate.setDate(1)
              break
            case "1Y":
              startDate.setFullYear(startDate.getFullYear() - 1)
              break
            case "5Y":
              startDate.setFullYear(startDate.getFullYear() - 5)
              break
            case "ALL":
              startDate.setFullYear(startDate.getFullYear() - 20)
              break
          }

          const formatDate = (date: Date) => {
            return date.toISOString().split("T")[0]
          }

          const result = await queryData({
            url: `/technical-indicators/${symbol}/price-history?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&adjusted=true&limit=50000&multiplier=1`,
          })

          if (!result.is_error && result.data && result.data.length > 0) {
            let periodData = result.data

            if (period === "5D") {
              const fiveDaysAgo = new Date()
              fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)
              periodData = result.data.filter((item: PriceData) => item.t >= fiveDaysAgo.getTime())
            }

            if (periodData.length > 0) {
              const firstPrice = periodData[0].c
              const lastPrice = periodData[periodData.length - 1].c
              const change = lastPrice - firstPrice
              const changePercent = ((change / firstPrice) * 100).toFixed(2)
              performances[period] = `${changePercent}%`
            } else {
              performances[period] = "N/A"
            }
          } else {
            performances[period] = "N/A"
          }
        } catch (error) {
          console.error(`Error calculating ${period} performance:`, error)
          performances[period] = "N/A"
        }
      }

      setPeriodPerformances(performances)
    }

    if (symbol) {
      calculateAllPeriodPerformances()
    }
  }, [symbol])

  // Handle mouse move for tooltip
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || data.length === 0) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const padding = { top: 20, right: 60, bottom: 50, left: 10 }
    const chartWidth = rect.width - padding.left - padding.right
    const chartHeight = rect.height - padding.top - padding.bottom

    // Calculate which data point is closest
    const relativeX = x - padding.left
    const dataIndex = Math.round((relativeX / chartWidth) * (data.length - 1))

    if (dataIndex >= 0 && dataIndex < data.length) {
      const point = data[dataIndex]
      const date = new Date(point.t)
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      })
      const formattedTime = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      })

      // Calculate exact position on chart
      const prices = data.map((d) => d.c)
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)
      const priceRange = maxPrice - minPrice
      const priceBuffer = priceRange * 0.1

      const xPos = padding.left + (dataIndex / (data.length - 1)) * chartWidth
      const yPos = padding.top + chartHeight - ((point.c - (minPrice - priceBuffer)) / (priceRange + priceBuffer * 2)) * chartHeight

      setTooltip({
        visible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        price: point.c,
        date: `${formattedDate} ${formattedTime}`,
      })

      setHoverPoint({
        x: xPos,
        y: yPos,
        dataIndex: dataIndex,
      })
    }
  }

  const handleMouseLeave = () => {
    setTooltip(null)
    setHoverPoint(null)
  }

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Chart dimensions
    const padding = { top: 20, right: 60, bottom: 50, left: 10 }
    const chartWidth = rect.width - padding.left - padding.right
    const chartHeight = rect.height - padding.top - padding.bottom

    // Find min and max prices
    const prices = data.map((d) => d.c)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice
    const priceBuffer = priceRange * 0.1

    // Scale functions
    const xScale = (index: number) => padding.left + (index / (data.length - 1)) * chartWidth
    const yScale = (price: number) =>
      padding.top + chartHeight - ((price - (minPrice - priceBuffer)) / (priceRange + priceBuffer * 2)) * chartHeight

    // Draw gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, rect.height - padding.bottom)
    if (stats?.isPositive) {
      gradient.addColorStop(0, "rgba(34, 197, 94, 0.3)")
      gradient.addColorStop(1, "rgba(34, 197, 94, 0.01)")
    } else {
      gradient.addColorStop(0, "rgba(239, 68, 68, 0.3)")
      gradient.addColorStop(1, "rgba(239, 68, 68, 0.01)")
    }

    // Draw filled area
    ctx.beginPath()
    ctx.moveTo(xScale(0), yScale(data[0].c))
    data.forEach((point, index) => {
      ctx.lineTo(xScale(index), yScale(point.c))
    })
    ctx.lineTo(xScale(data.length - 1), rect.height - padding.bottom)
    ctx.lineTo(xScale(0), rect.height - padding.bottom)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw line
    ctx.beginPath()
    ctx.moveTo(xScale(0), yScale(data[0].c))
    data.forEach((point, index) => {
      ctx.lineTo(xScale(index), yScale(point.c))
    })
    ctx.strokeStyle = stats?.isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw previous close line (dotted)
    if (data.length > 0) {
      const prevClose = data[0].c
      const y = yScale(prevClose)

      ctx.beginPath()
      ctx.setLineDash([5, 5])
      ctx.moveTo(padding.left, y)
      ctx.lineTo(rect.width - padding.right, y)
      ctx.strokeStyle = "rgba(148, 163, 184, 0.5)"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.setLineDash([])

      // Draw prev close label
      ctx.fillStyle = "rgba(71, 85, 105, 1)"
      ctx.fillRect(rect.width - padding.right + 5, y - 10, 55, 20)
      ctx.fillStyle = "white"
      ctx.font = "11px sans-serif"
      ctx.textAlign = "left"
      ctx.fillText("Prev close", rect.width - padding.right + 8, y + 3)
    }

    // Draw Y-axis labels (prices)
    ctx.fillStyle = "rgb(148, 163, 184)"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "left"

    const numYLabels = 5
    for (let i = 0; i < numYLabels; i++) {
      const price = minPrice - priceBuffer + ((priceRange + priceBuffer * 2) / (numYLabels - 1)) * i
      const y = yScale(price)
      ctx.fillText(price.toFixed(2), rect.width - padding.right + 5, y + 4)
    }

    // Draw X-axis labels (dates)
    ctx.textAlign = "center"
    const numXLabels = Math.min(6, data.length)
    for (let i = 0; i < numXLabels; i++) {
      const index = Math.floor((i / (numXLabels - 1)) * (data.length - 1))
      const date = new Date(data[index].t)
      const x = xScale(index)

      // Format based on period
      let label1 = ""
      let label2 = ""

      if (selectedPeriod === "1D" || selectedPeriod === "5D") {
        // Show time for short periods
        const hours = date.getHours().toString().padStart(2, "0")
        const minutes = date.getMinutes().toString().padStart(2, "0")
        label1 = `${hours}:${minutes}`
        if (i === 0 || i === numXLabels - 1) {
          label2 = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
        }
      } else {
        // Show date for longer periods
        label1 = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
        if (selectedPeriod === "1Y" || selectedPeriod === "5Y" || selectedPeriod === "ALL") {
          label2 = date.getFullYear().toString()
        }
      }

      ctx.fillText(label1, x, rect.height - padding.bottom + 15)
      if (label2) {
        ctx.fillText(label2, x, rect.height - padding.bottom + 30)
      }
    }

    // Draw hover point indicator
    if (hoverPoint && hoverPoint.dataIndex >= 0 && hoverPoint.dataIndex < data.length) {
      // Draw vertical line
      ctx.beginPath()
      ctx.setLineDash([3, 3])
      ctx.moveTo(hoverPoint.x, padding.top)
      ctx.lineTo(hoverPoint.x, rect.height - padding.bottom)
      ctx.strokeStyle = "rgba(148, 163, 184, 0.5)"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.setLineDash([])

      // Draw horizontal line
      ctx.beginPath()
      ctx.setLineDash([3, 3])
      ctx.moveTo(padding.left, hoverPoint.y)
      ctx.lineTo(rect.width - padding.right, hoverPoint.y)
      ctx.strokeStyle = "rgba(148, 163, 184, 0.5)"
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.setLineDash([])

      // Draw outer circle (white border)
      ctx.beginPath()
      ctx.arc(hoverPoint.x, hoverPoint.y, 6, 0, 2 * Math.PI)
      ctx.fillStyle = "white"
      ctx.fill()

      // Draw inner circle (colored based on trend)
      ctx.beginPath()
      ctx.arc(hoverPoint.x, hoverPoint.y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = stats?.isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
      ctx.fill()
    }
  }, [data, stats, hoverPoint])

  // Get period performance from pre-calculated values
  const getPeriodPerformance = (periodKey: string) => {
    return periodPerformances[periodKey] || "N/A"
  }

  const periods = [
    // { key: "1D", label: "" },
    { key: "5D", label: "5 days" },
    { key: "1M", label: "1 month" },
    { key: "6M", label: "6 months" },
    { key: "YTD", label: "Year to date" },
    { key: "1Y", label: "1 year" },
    { key: "5Y", label: "5 years" },
    { key: "ALL", label: "All time" },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-slate-400">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500"></div>
          <span>Loading chart...</span>
        </div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-slate-400">
        No price data available
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Chart</h3>
      </div>

      <div ref={containerRef} className="relative bg-slate-900/50 rounded-lg p-4">
        <canvas
          ref={canvasRef}
          className="w-full h-96"
          style={{ width: "100%", height: "400px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />

        {/* Tooltip */}
        {tooltip && tooltip.visible && (
          <div
            className="absolute bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 pointer-events-none z-20 shadow-xl"
            style={{
              left: `${tooltip.x + 10}px`,
              top: `${tooltip.y - 60}px`,
              transform: tooltip.x > 300 ? "translateX(-100%)" : "translateX(0)",
            }}
          >
            <div className="text-white text-lg font-semibold mb-1">
              {tooltip.price.toFixed(2)}
            </div>
            <div className="text-slate-400 text-xs whitespace-nowrap">
              {tooltip.date}
            </div>
          </div>
        )}
      </div>

      {/* Period selector */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {periods.map((period) => {
          const isSelected = selectedPeriod === period.key
          const value = getPeriodPerformance(period.key)
          const isPositive = value !== "N/A" && !value.startsWith("-")

          return (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key)}
              disabled={loading}
              className={`flex flex-col items-center min-w-[100px] p-3 rounded-lg transition-all ${isSelected
                ? "bg-slate-800 border border-slate-700"
                : "bg-transparent hover:bg-slate-800/50"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <span className="text-sm text-slate-400 mb-1">{period.label}</span>
              <span
                className={`text-sm font-semibold ${value === "N/A" ? "text-slate-500" : isPositive ? "text-green-500" : "text-red-500"
                  }`}
              >
                {value}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
