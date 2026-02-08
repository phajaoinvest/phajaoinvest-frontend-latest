"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, TrendingUp, Building2, Calendar, DollarSign, Newspaper, ChevronRight, Loader, ExternalLink } from "lucide-react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Chart } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler)

// components:
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// API, utils and interfaces:
import { queryData } from "@/app/api/api"
import StockChart from "@/components/stock-chart"
import { Separator } from "@/components/ui/separator"
import { isPositive } from "@/app/utils/functions/format-number"
import { formatUSD } from "@/app/utils/functions/format-currency"
import { formatDateDDMMYYYY } from "@/app/utils/functions/format-date"
import { useTranslation } from "@/lib/i18n"

// Mock stock data
const mockStocks = {
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.34,
    changePercent: 1.35,
    volume: "45.2M",
    marketCap: "2.8T",
    pe: 28.5,
    high52: 198.23,
    low52: 124.17,
    rsi: 54.46,
    support1: 155.5,
    support2: 135.5,
    resistance: 190.0,
  },
  GOOGL: {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 138.21,
    change: -1.23,
    changePercent: -0.88,
    volume: "28.1M",
    marketCap: "1.7T",
    pe: 25.3,
    high52: 151.55,
    low52: 83.34,
    rsi: 45.32,
    support1: 125.0,
    support2: 110.0,
    resistance: 150.0,
  },
  TSLA: {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.5,
    change: 12.45,
    changePercent: 5.27,
    volume: "89.3M",
    marketCap: "789B",
    pe: 65.2,
    high52: 299.29,
    low52: 138.8,
    rsi: 67.89,
    support1: 220.0,
    support2: 200.0,
    resistance: 280.0,
  },
  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.85,
    change: 4.12,
    changePercent: 1.1,
    volume: "32.7M",
    marketCap: "2.8T",
    pe: 32.1,
    high52: 384.3,
    low52: 213.43,
    rsi: 58.21,
    support1: 350.0,
    support2: 320.0,
    resistance: 390.0,
  },
  PLTR: {
    symbol: "PLTR",
    name: "Palantir Technologies Inc.",
    price: 169.25,
    change: -2.93,
    changePercent: -1.73,
    volume: "52.8M",
    marketCap: "35.2B",
    pe: 45.8,
    high52: 185.5,
    low52: 95.3,
    rsi: 54.46,
    support1: 155.5,
    support2: 135.5,
    resistance: 190.0,
  },
}

export default function StockResultPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useTranslation()
  const [activeAnalysis, setActiveAnalysis] = useState("summary")
  const [stockData, setStockData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [newsData, setNewsData] = useState<any[]>([])
  const [newsLoading, setNewsLoading] = useState(true)
  const [overviewData, setOverviewData] = useState<any>(null)
  const [overviewLoading, setOverviewLoading] = useState(true)
  const [priceHistoryData, setPriceHistoryData] = useState<any[]>([])
  const [priceHistoryLoading, setPriceHistoryLoading] = useState(true)
  const [performanceData, setPerformanceData] = useState<any>(null)
  const [performanceLoading, setPerformanceLoading] = useState(true)
  const [financialData, setFinancialData] = useState<any>(null)
  const [financialLoading, setFinancialLoading] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState("totalRevenue")
  const [selectedTimeframe, setSelectedTimeframe] = useState("annual")

  const symbol = params.symbol as string

  useEffect(() => {
    // Simulate API call to fetch stock data
    const fetchStockData = () => {
      setLoading(true)
      setTimeout(() => {
        const data = mockStocks[symbol?.toUpperCase() as keyof typeof mockStocks]
        setStockData(data || null)
        setLoading(false)
      }, 500)
    }

    if (symbol) {
      fetchStockData()
    }
  }, [symbol])

  useEffect(() => {
    if (activeAnalysis !== "news") return;
    const fetchNews = async () => {
      setNewsLoading(true);
      try {
        const result = await queryData({ url: `/technical-indicators/${symbol}/news?limit=6` });
        if (!result.is_error && result.data?.items) {
          setNewsData(result.data.items);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setNewsLoading(false);
      }
    };
    if (symbol) fetchNews();
  }, [symbol, activeAnalysis]);

  useEffect(() => {
    if (activeAnalysis !== "summary") return;
    const fetchOverview = async () => {
      setOverviewLoading(true);
      try {
        const result = await queryData({ url: `/technical-indicators/${symbol}/overview` });
        if (!result.is_error && result.data) {
          setOverviewData(result.data);
        }
      } catch (error) {
        console.error("Error fetching overview:", error);
      } finally {
        setOverviewLoading(false);
      }
    };
    if (symbol) fetchOverview();
  }, [symbol, activeAnalysis]);

  useEffect(() => {
    if (activeAnalysis !== "summary") return;
    const fetchPriceHistory = async () => {
      setPriceHistoryLoading(true);
      try {
        // Calculate date range (last 30 days)
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        const formatDate = (date: Date) => {
          return date.toISOString().split('T')[0];
        };

        const result = await queryData({
          url: `/technical-indicators/${symbol}/price-history?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&adjusted=true&limit=50000&multiplier=1`
        });

        if (!result.is_error && result.data) {
          setPriceHistoryData(result.data);
        }
      } catch (error) {
        console.error("Error fetching price history:", error);
      } finally {
        setPriceHistoryLoading(false);
      }
    };
    if (symbol) fetchPriceHistory();
  }, [symbol, activeAnalysis]);

  useEffect(() => {
    if (activeAnalysis !== "returns") return;
    const fetchPerformance = async () => {
      setPerformanceLoading(true);
      try {
        const result = await queryData({ url: `/technical-indicators/${symbol}/performance` });
        if (!result.is_error && result.data) {
          setPerformanceData(result.data);
        }
      } catch (error) {
        console.error("Error fetching performance:", error);
      } finally {
        setPerformanceLoading(false);
      }
    };
    if (symbol) fetchPerformance();
  }, [symbol, activeAnalysis]);

  useEffect(() => {
    if (activeAnalysis !== "financial") return;
    const fetchFinancialData = async () => {
      setFinancialLoading(true);
      try {
        const result = await queryData({
          url: `/technical-indicators/${symbol}/financials?timeframe=${selectedTimeframe}&order=asc&limit=100`
        });
        if (!result.is_error && result.data) {
          setFinancialData(result.data);
        }
      } catch (error) {
        console.error("Error fetching financial data:", error);
      } finally {
        setFinancialLoading(false);
      }
    };
    if (symbol) fetchFinancialData();
  }, [symbol, activeAnalysis, selectedTimeframe]);

  const analysisButtons = [
    { key: "summary", label: t("stock_result.company_overview"), icon: Building2, action: "" },
    { key: "financial", label: t("stock_result.financial_data"), icon: DollarSign, action: "" },
    { key: "returns", label: t("stock_result.returns_analysis"), icon: TrendingUp, action: "" },
    { key: "news", label: t("stock_result.latest_news"), icon: Newspaper, action: "" },
  ]

  const renderAnalysisContent = () => {
    switch (activeAnalysis) {
      case "summary":
        if (overviewLoading || priceHistoryLoading) {
          return (
            <div className="h-full flex items-center justify-center gap-2">
              <Loader className="animate-spin" size={16} />
              <p className="text-slate-300">{t("stock_result.loading_overview")}</p>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start justify-start gap-6">
              <div className="w-full sm:w-1/5 space-y-2">
                <h4 className="text-sm font-bold text-slate-300 mb-3">{t("stock_result.stock_overview_retrieved")}</h4>
                <ul className="text-sm text-slate-300 space-y-3 pl-2">
                  <li><span className="text-gray-400">{t("stock_result.stock_symbol")}:</span> {overviewData?.symbol || symbol}</li>
                  <li><span className="text-gray-400">{t("stock_result.company_name")}:</span> {overviewData?.companyName || "N/A"}</li>
                  <li><span className="text-gray-400">{t("stock_result.last_price")}:</span> {overviewData?.price || "N/A"}</li>
                  <li><span className="text-gray-400">{t("stock_result.change_percent")}:</span> {isPositive(overviewData?.changePercent || 0) ? <span className="text-green-500">{overviewData?.changePercent}%</span> : <span className="text-red-500">{overviewData?.changePercent}%</span>}</li>
                  {overviewData?.group && <li><span className="text-gray-400">{t("stock_result.group")}:</span> <span className="py-1 px-2 rounded-md bg-primary text-black text-xs">{overviewData.group}</span></li>}
                  <li><span className="text-gray-400">{t("stock_result.updated_at")}:</span> {overviewData?.metadata?.timestamp ? formatDateDDMMYYYY(overviewData.metadata.timestamp) : "N/A"}</li>
                  <Separator />
                  <li className="text-green-500"><span className="text-gray-400">{t("stock_result.support_level_1")}</span> {formatUSD(overviewData?.supportLevel)}</li>
                  <li className="text-green-500"><span className="text-gray-400">{t("stock_result.support_level_2")}:</span> {formatUSD(overviewData?.supportLevelSecondary)}</li>
                  <li className="text-red-500"><span className="text-gray-400">{t("stock_result.resistance_01")}:</span> {formatUSD(overviewData?.resistance1)}</li>
                  <li className="text-red-500"><span className="text-gray-400">{t("stock_result.resistance_02")}:</span> {formatUSD(overviewData?.resistance2)}</li>
                  <li><span className="text-gray-400">{t("stock_result.relative_strength_index")}:</span> {overviewData?.rsi > 30 ?
                    <span className="text-red-500">{overviewData?.rsi}</span>
                    :
                    <span className="text-green-500">{overviewData?.rsi}</span>}</li>
                </ul>
                <Separator />
                <br />
                <div className="flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs w-full bg-transparent hover:bg-slate-800/50  text-slate-200 font-medium rounded-md border hover:border-primary transition-all duration-200"
                  >
                    {t("stock_result.company_info")}
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs w-full bg-transparent hover:bg-slate-800/50 text-slate-200 font-medium rounded-md transition-all duration-200 border hover:border-primary"
                    onClick={() => router.push("/favorite-stocks")}
                  >
                    {t("stock_result.quarterly_report")}
                  </Button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs w-full bg-transparent hover:bg-slate-800/50  text-slate-200 font-medium rounded-md border hover:border-primary transition-all duration-200"
                  >
                    {t("stock_result.add_to_favorites")}
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs w-full bg-transparent hover:bg-slate-800/50 text-slate-200 font-medium rounded-md transition-all duration-200 border hover:border-primary"
                    onClick={() => router.push("/favorite-stocks")}
                  >
                    {t("stock_result.my_favorite_stocks")}
                  </Button>
                </div>
              </div>

              <div className="w-full sm:w-4/5 space-y-2">
                <div className="mt-6">
                  <StockChart data={priceHistoryData} symbol={symbol} />
                </div>
              </div>
            </div>
          </div>
        )
      case "financial":
        if (financialLoading) {
          return (
            <div className="h-full flex items-center justify-center gap-2 py-20">
              <Loader className="animate-spin" size={20} />
              <p className="text-slate-300">Loading financial data...</p>
            </div>
          );
        }

        if (!financialData || !financialData.metrics) {
          return (
            <div className="h-full flex items-center justify-center py-20">
              <p className="text-slate-400">{t("stock_result.no_financial_data")}</p>
            </div>
          );
        }

        const metricOptions = [
          { key: "totalRevenue", label: t("stock_result.total_revenue") },
          { key: "grossProfit", label: t("stock_result.gross_profit") },
          { key: "operatingIncome", label: t("stock_result.operating_income") },
          { key: "netIncome", label: t("stock_result.net_income") },
        ]

        const currentMetricData = financialData.metrics[selectedMetric] || []

        // Prepare Chart.js data
        const chartData = {
          labels: currentMetricData.map((item: any) => item.period),
          datasets: [
            {
              type: 'bar' as const,
              label: metricOptions.find(m => m.key === selectedMetric)?.label,
              data: currentMetricData.map((item: any) => item.value),
              backgroundColor: '#fefce8',
              borderColor: '#eab308',
              borderWidth: 2,
              borderRadius: 6,
              yAxisID: 'y',
              order: 2, // Render bars behind the line
            },
            {
              type: 'line' as const,
              label: t("stock_result.yoy_growth"),
              data: currentMetricData.map((item: any) => item.yoyChangePercent),
              borderColor: '#22c55e',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              borderWidth: 3,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointBackgroundColor: '#22c55e',
              pointBorderColor: '#22c55e',
              pointBorderWidth: 2,
              pointHoverBackgroundColor: '#eab308',
              pointHoverBorderColor: '#22c55e',
              pointHoverBorderWidth: 3,
              tension: 0.4,
              yAxisID: 'y1',
              order: 1, // Render line on top in frontend layer
              fill: false,
            },
          ],
        }

        const chartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index' as const,
            intersect: false,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              titleColor: '#eab308',
              bodyColor: '#ffffff',
              borderColor: 'rgba(234, 179, 8, 0.5)',
              borderWidth: 2,
              padding: 16,
              boxPadding: 6,
              usePointStyle: true,
              callbacks: {
                title: (context: any) => {
                  return context[0].label
                },
                label: (context: any) => {
                  const datasetLabel = context.dataset.label || ''
                  const value = context.parsed.y

                  if (context.datasetIndex === 0) {
                    // Bar chart - format as currency
                    const formatted = value >= 1e9
                      ? `$${(value / 1e9).toFixed(2)}B`
                      : `$${(value / 1e6).toFixed(2)}M`
                    return `${datasetLabel}: ${formatted}`
                  } else {
                    // Line chart - format as percentage
                    return `YoY: ${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
                  }
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#9CA3AF',
                font: {
                  size: 11,
                },
              },
            },
            y: {
              type: 'linear' as const,
              display: true,
              position: 'left' as const,
              grid: {
                color: 'rgba(55, 65, 81, 0.3)',
                drawBorder: false,
              },
              ticks: {
                color: '#9CA3AF',
                font: {
                  size: 10,
                },
                callback: (value: any) => {
                  const num = Number(value)
                  return num >= 1e9
                    ? `$${(num / 1e9).toFixed(1)}B`
                    : `$${(num / 1e6).toFixed(0)}M`
                },
              },
            },
            y1: {
              type: 'linear' as const,
              display: true,
              position: 'right' as const,
              grid: {
                drawOnChartArea: false,
              },
              ticks: {
                color: '#9CA3AF',
                font: {
                  size: 10,
                },
                callback: (value: any) => `${value}%`,
              },
            },
          },
        }

        return (
          <div className="space-y-6 p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{t("stock_result.income_statement")}</h3>
                <p className="text-sm text-slate-400">
                  {financialData.companyName} ({financialData.symbol})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">{t("stock_result.period")}:</span>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-amber-500"
                >
                  <option value="quarterly">{t("stock_result.quarterly")}</option>
                  <option value="annual">{t("stock_result.annual")}</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {metricOptions.map((metric) => (
                <button
                  key={metric.key}
                  onClick={() => setSelectedMetric(metric.key)}
                  className={`text-sm px-4 py-2 rounded-lg font-medium transition-all ${selectedMetric === metric.key
                    ? "bg-amber-500 text-black border border-amber-500"
                    : "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-600"
                    }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>

            <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-6">
              <div style={{ height: '400px' }}>
                <Chart type="bar" data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded shadow-md shadow-yellow-500/30"></div>
                <span className="text-slate-300">{metricOptions.find(m => m.key === selectedMetric)?.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full shadow-md shadow-green-500/30"></div>
                <span className="text-slate-300">{t("stock_result.yoy_growth")}</span>
              </div>
            </div>

          </div>
        )
      case "returns":
        if (performanceLoading) {
          return (
            <div className="h-full flex items-center justify-center gap-2 py-20">
              <Loader className="animate-spin" size={20} />
              <p className="text-slate-300">Loading performance data...</p>
            </div>
          );
        }

        if (!performanceData) {
          return (
            <div className="h-full flex items-center justify-center py-20">
              <p className="text-slate-400">{t("stock_result.no_performance_data")}</p>
            </div>
          );
        }

        return (
          <div className="space-y-4 p-2 sm:p-4">

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-md text-white">{t("stock_result.returns_analysis_title")}</h3>
                    <p className="text-sm text-slate-300 mt-1">
                      {performanceData.companyName} <span className="text-amber-500">({performanceData.symbol})</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 min-w-[180px]">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{t("stock_result.latest_close")}</p>
                <p className="text-md font-bold text-white">{formatUSD(performanceData.latestClose)}</p>
                <p className="text-xs text-slate-500 mt-1">{t("stock_result.real_time_data")}</p>
              </div>
            </div>

            <div className="hidden sm:block space-y-4">
              <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <h4 className="text-sm text-white">{t("stock_result.performance_summary")}</h4>
                <Separator className="flex-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <Card className="cursor-pointer relative overflow-hidden border border-green-500 bg-gradient-to-br from-green-500/10 via-slate-800/50 to-slate-900/80 hover:border-green-500/50 transition-all duration-300">
                  <div className="relative p-5 space-y-3 border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400 text-xs uppercase tracking-wider">{t("stock_result.best_performance")}</p>
                        <p className="text-white font-semibold text-sm">{t("stock_result.performance")}</p>
                      </div>
                    </div>
                    {(() => {
                      const best = performanceData.entries.reduce((max: any, entry: any) =>
                        entry.changePercent > max.changePercent ? entry : max
                      )
                      return (
                        <div className="flex items-start justify-start gap-2">
                          <p className="text-md font-black text-green-500 mb-2">
                            +{best.changePercent.toFixed(2)}%
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold">
                              {best.timeframe}
                            </span>
                            <span className="text-xs text-slate-500">{t("stock_result.periods")}</span>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </Card>

                <Card className="cursor-pointer relative overflow-hidden border border-red-500 bg-gradient-to-br from-red-500/10 via-slate-800/50 to-slate-900/80 hover:border-red-500/50 transition-all duration-300">
                  <div className="relative p-5 space-y-3 border">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400 text-xs uppercase tracking-wider">{t("stock_result.worst_performance")}</p>
                        <p className="text-white font-semibold text-sm">{t("stock_result.performance")}</p>
                      </div>
                    </div>
                    {(() => {
                      const worst = performanceData.entries.reduce((min: any, entry: any) =>
                        entry.changePercent < min.changePercent ? entry : min
                      )
                      const isPositive = worst.changePercent >= 0
                      return (
                        <div className="flex items-start justify-start gap-2">
                          <p className={`text-md font-black mb-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {isPositive ? '+' : ''}{worst.changePercent.toFixed(2)}%
                          </p>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {worst.timeframe}
                            </span>
                            <span className="text-xs text-slate-500">{t("stock_result.periods")}</span>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </Card>

                <Card className="cursor-pointer relative overflow-hidden border border-amber-500 bg-gradient-to-br from-amber-500/10 via-slate-800/50 to-slate-900/80 hover:border-amber-500/50 transition-all duration-300">
                  <div className="relative p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-500/20 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-400 text-xs uppercase tracking-wider">{t("stock_result.average_return")}</p>
                        <p className="text-white font-semibold text-sm">{t("stock_result.return")}</p>
                      </div>
                    </div>
                    {(() => {
                      const avg = performanceData.entries.reduce((sum: number, entry: any) =>
                        sum + entry.changePercent, 0
                      ) / performanceData.entries.length
                      const isPositive = avg >= 0
                      return (
                        <div className="flex items-start justify-start gap-2">
                          <p className={`text-md font-black mb-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {isPositive ? '+' : ''}{avg.toFixed(2)}%
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs font-bold">
                              {performanceData.entries.length} {t("stock_result.periods")}
                            </span>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                </Card>
              </div>
            </div>

            <br />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-white">{t("stock_result.performance_by_period")}:</h4>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
                    <span>{t("stock_result.positive")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
                    <span>{t("stock_result.negative")}</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-700/50">
                <table className="w-full">
                  <thead className="bg-slate-800/50 border-b border-slate-700/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("stock_result.period_label")}</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("stock_result.start_price")}</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("stock_result.end_price")}</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">{t("stock_result.change_percent_label")}</th>
                      <th className="px-4 py-3 text-start text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">{t("stock_result.date_range")}</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">{t("stock_result.performance")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/30">
                    {performanceData.entries.map((entry: any) => {
                      const isPositive = entry.changePercent >= 0
                      const changeValue = Math.abs(entry.changePercent)

                      return (
                        <tr
                          key={entry.timeframe}
                          className={`transition-colors hover:bg-slate-800/30 ${isPositive ? 'bg-green-500/5' : 'bg-red-500/5'
                            }`}
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                <TrendingUp className={`h-4 w-4 ${isPositive ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
                              </div>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                }`}>
                                {
                                  entry.timeframe === "1D" ? t("stock_result.1_day") : entry.timeframe === "1W" ? t("stock_result.1_week") : entry.timeframe === "1M" ? t("stock_result.1_month") : entry.timeframe === "3M" ? t("stock_result.3_months") : entry.timeframe === "6M" ? t("stock_result.6_months") : t("stock_result.1_year")
                                }
                              </span>
                            </div>
                          </td>

                          <td className="px-4 py-4 text-right">
                            <div className="text-sm text-slate-300 font-medium">{formatUSD(entry.startPrice)}</div>
                          </td>

                          <td className="px-4 py-4 text-right">
                            <div className="text-sm text-white font-semibold">{formatUSD(entry.endPrice)}</div>
                          </td>

                          <td className="px-4 py-4 text-right">
                            <div className={`text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                              {isPositive ? '+' : '-'}{changeValue.toFixed(2)}%
                            </div>
                          </td>

                          <td className="px-4 py-4 text-end hidden md:table-cell">
                            <div className="flex items-center gap-1">
                              <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDateDDMMYYYY(entry.startDate)}</span>
                              </div>
                              <ChevronRight className="h-3 w-3 text-white" />
                              <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Calendar className="h-3 w-3" />
                                <span>{formatDateDDMMYYYY(entry.endDate)}</span>
                              </div>
                            </div>
                          </td>

                          {/* Performance Bar */}
                          <td className="px-4 py-4 hidden lg:table-cell">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-slate-500">{t("stock_result.progress")}</span>
                                <span className={`font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                  {Math.min(changeValue, 100).toFixed(1)}%
                                </span>
                              </div>
                              <div className="relative w-full h-2 bg-slate-900/50 rounded-full overflow-hidden border border-slate-700/50">
                                <div
                                  className={`absolute h-full rounded-full transition-all duration-700 ${isPositive
                                    ? 'bg-gradient-to-r from-green-500 to-green-400'
                                    : 'bg-gradient-to-r from-red-500 to-red-400'
                                    }`}
                                  style={{ width: `${Math.min(changeValue, 100)}%` }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case "news":
        if (newsLoading) {
          return (
            <div className="h-full flex items-center justify-center gap-2">
              <Loader className="animate-spin" size={16} />
              <p className="text-slate-300">Loading news...</p>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            <h3 className="text-md font-bold text-white mb-4">{t("stock_result.latest_news_title")}</h3>
            <div className="space-y-4">
              {newsData.map((newsItem, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg shadow-md flex flex-col gap-4 border"
                >
                  <img
                    src={newsItem.imageUrl}
                    alt={newsItem.title_th}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <h4 className="text-lg font-semibold text-white">{newsItem.title_th}</h4>
                  <p className="text-slate-300 text-sm">{newsItem.description_th}</p>
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>{new Date(newsItem.publishedAt).toLocaleString()}</span>
                    <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded-md">
                      {newsItem.sentiment}
                    </span>
                  </div>

                  {newsItem.topicTags && newsItem.topicTags.length > 0 && (
                    <div className="flex items-center justify-start text-sm text-slate-400 gap-2 rounded-full">
                      {newsItem.topicTags.map((tag: any, idx: number) => (
                        <span key={idx + 1} className="bg-slate-700 text-slate-300 px-2 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-slate-700 text-slate-300 px-2 py-1 rounded-md">
                      {newsItem.source}
                    </span>
                    <a
                      href={newsItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center text-blue-400 hover:underline text-sm gap-2"
                    >
                      {t("stock_result.read_more")} <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        if (overviewLoading || priceHistoryLoading) {
          return (
            <div className="h-full flex items-center justify-center gap-2">
              <Loader className="animate-spin" size={16} />
              <p className="text-slate-300">Loading overview...</p>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start justify-start gap-6">
              <div className="w-full sm:w-1/5 space-y-2">
                <h4 className="text-sm font-bold text-slate-300 mb-3">{t("stock_result.stock_overview_retrieved")}</h4>
                <ul className="text-sm text-slate-300 space-y-3 pl-2">
                  <li><span className="text-gray-400">{t("stock_result.stock_symbol")}:</span> {overviewData?.symbol || symbol}</li>
                  <li><span className="text-gray-400">{t("stock_result.company_name")}:</span> {overviewData?.companyName || "N/A"}</li>
                  <li><span className="text-gray-400">{t("stock_result.last_price")}:</span> {overviewData?.price || "N/A"}</li>
                  <li><span className="text-gray-400">{t("stock_result.change_percent")}:</span> {isPositive(overviewData?.changePercent || 0) ? <span className="text-green-500">{overviewData?.changePercent}%</span> : <span className="text-red-500">{overviewData?.changePercent}%</span>}</li>
                  {overviewData?.group && <li><span className="text-gray-400">{t("stock_result.group")}:</span> <span className="py-1 px-2 rounded-md bg-primary text-black text-xs">{overviewData.group}</span></li>}
                  <li><span className="text-gray-400">{t("stock_result.updated_at")}:</span> {overviewData?.metadata?.timestamp ? formatDateDDMMYYYY(overviewData.metadata.timestamp) : "N/A"}</li>
                  <Separator />
                  <li className="text-green-500"><span className="text-gray-400">{t("stock_result.support_level_1")}</span> {formatUSD(overviewData?.supportLevel)}</li>
                  <li className="text-green-500"><span className="text-gray-400">{t("stock_result.support_level_2")}:</span> {formatUSD(overviewData?.supportLevelSecondary)}</li>
                  <li className="text-red-500"><span className="text-gray-400">{t("stock_result.resistance_01")}:</span> {formatUSD(overviewData?.resistance1)}</li>
                  <li className="text-red-500"><span className="text-gray-400">{t("stock_result.resistance_02")}:</span> {formatUSD(overviewData?.resistance2)}</li>
                  <li><span className="text-gray-400">{t("stock_result.relative_strength_index")}:</span> {overviewData?.rsi > 30 ?
                    <span className="text-red-500">{overviewData?.rsi}</span>
                    :
                    <span className="text-green-500">{overviewData?.rsi}</span>}</li>
                </ul>
                <Separator />
                <br />
                <div className="flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs w-full bg-transparent hover:bg-slate-800/50  text-slate-200 font-medium rounded-md border hover:border-primary transition-all duration-200"
                  >
                    Company Info
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs w-full bg-transparent hover:bg-slate-800/50 text-slate-200 font-medium rounded-md transition-all duration-200 border hover:border-primary"
                    onClick={() => router.push("/favorite-stocks")}
                  >
                    Quanterly Report
                  </Button>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs w-full bg-transparent hover:bg-slate-800/50  text-slate-200 font-medium rounded-md border hover:border-primary transition-all duration-200"
                  >
                    Add to Favorites
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs w-full bg-transparent hover:bg-slate-800/50 text-slate-200 font-medium rounded-md transition-all duration-200 border hover:border-primary"
                    onClick={() => router.push("/favorite-stocks")}
                  >
                    My Favorite Stocks
                  </Button>
                </div>
              </div>

              <div className="w-full sm:w-4/5 space-y-2">
                <div className="mt-6">
                  <StockChart data={priceHistoryData} symbol={symbol} />
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Loading stock data...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!stockData) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Stock Not Found</h1>
            <p className="text-slate-300 mb-6">The stock symbol "{symbol}" was not found.</p>
            <Button onClick={() => router.back()} className="bg-amber-500 hover:bg-amber-600 text-black">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 p-0 sm:p-4 mt-16">
        <div className="sm:container mx-auto max-w-6xl space-y-0 sm:space-y-4">
          <div className="space-y-4">
            <div className="sticky top-16 z-10 bg-black py-4 rounded-md px-2 sm:px-0">
              <Tabs value={activeAnalysis} onValueChange={setActiveAnalysis} className="w-full">
                <TabsList className="flex h-auto w-full bg-transparent gap-2 p-0 overflow-x-scroll">
                  {analysisButtons.map((button) => {
                    const IconComponent = button.icon
                    return (
                      <TabsTrigger
                        key={button.key}
                        value={button.key}
                        className="flex-1 min-w-fit h-10 justify-center data-[state=active]:border data-[state=active]:border-primary data-[state=active]:bg-slate-800/50 bg-transparent hover:bg-slate-800/50 text-slate-200 hover:border-amber-500 font-medium rounded-md transition-all duration-200 border border-transparent"
                      >
                        <IconComponent className="h-4 w-4 mr-2" />
                        {button.label}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
              </Tabs>
            </div>
            <Card>
              <div className="space-y-4 p-0 sm:p-6">
                <div className="rounded-2xl">{renderAnalysisContent()}</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
