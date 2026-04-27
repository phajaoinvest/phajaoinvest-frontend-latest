"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  DollarSign,
  Wallet,
  Loader2,
  RefreshCw,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertTriangle,
  EyeOff,
  Briefcase,
  History,
  TrendingDown,
  ChevronRight,
  Plus,
  Info,
} from "lucide-react"
import { queryData, postAPI } from "@/app/api/api"
import * as ga from "@/lib/ga"
import { useCustomerStore } from "@/app/store/useCustomerStore"
import { useTranslation } from "@/lib/i18n"
import Header from "@/components/header"

// ============================================================================
// Types
// ============================================================================

interface PortfolioSummary {
  total_invested: number
  total_current_value: number
  total_unrealized_pnl: number
  total_realized_pnl: number
  total_pnl: number
  open_trades_count: number
  closed_trades_count: number
}

interface OpenPosition {
  id: string
  stock_id: string
  symbol: string | null
  show_symbol: boolean
  name: string
  investment_amount: number
  entry_price: number
  current_price: number
  shares_bought: number
  current_value: number
  unrealized_pnl: number
  pnl_percent: number
  is_profit: boolean
  opened_at: string
  status: string
}

interface ClosedPosition {
  id: string
  stock_id: string
  symbol: string | null
  show_symbol: boolean
  name: string
  investment_amount: number
  entry_price: number
  close_price: number
  shares_bought: number
  realized_pnl: number
  is_profit: boolean
  opened_at: string
  closed_at: string
  status: string
}

interface BalanceInfo {
  demo_balance: number
  total_invested: number
  total_demo_value: number
  initial_demo_balance: number
}

// ============================================================================
// Symbol Display Component — blurs when hidden
// ============================================================================

function SymbolDisplay({ symbol, showSymbol, className = "" }: { symbol: string | null; showSymbol: boolean; className?: string }) {
  if (showSymbol && symbol) {
    return <span className={`font-black text-primary tracking-tighter ${className}`}>{symbol}</span>
  }
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="font-bold text-slate-600 blur-[4px] select-none pointer-events-none" aria-hidden>
        XXXX
      </span>
      <EyeOff className="h-3 w-3 text-slate-600 shrink-0" />
    </span>
  )
}

// ============================================================================
// Page Component
// ============================================================================

export default function PaperPortfolioPage() {
  const router = useRouter()
  const customer = useCustomerStore((state) => state.customer)
  const { t, language } = useTranslation()

  const [portfolio, setPortfolio] = useState<{
    summary: PortfolioSummary
    open_positions: OpenPosition[]
    closed_positions: ClosedPosition[]
  } | null>(null)
  const [balance, setBalance] = useState<BalanceInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCloseConfirm, setShowCloseConfirm] = useState(false)
  const [selectedTrade, setSelectedTrade] = useState<OpenPosition | null>(null)
  const [closing, setClosing] = useState(false)

  // Auth Guard
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
    if (!token && !customer) {
      router.push("/auth/login")
    }
  }, [customer, router])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [portfolioRes, balanceRes] = await Promise.all([
        queryData({ url: "/paper-trades/portfolio" }),
        queryData({ url: "/paper-trades/balance" }),
      ])
      if (portfolioRes?.data) setPortfolio(portfolioRes.data)
      if (balanceRes?.data) setBalance(balanceRes.data)
    } catch (err) {
      console.error("Failed to load portfolio:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleCloseTrade = async () => {
    if (!selectedTrade) return
    setClosing(true)
    try {
      await postAPI({
        url: `/paper-trades/${selectedTrade.id}/close`,
        body: {},
      })
      ga.event({
        action: "close_paper_trade",
        category: "trading",
        label: selectedTrade.symbol || "hidden_stock",
        value: selectedTrade.unrealized_pnl,
      });
      setShowCloseConfirm(false)
      setSelectedTrade(null)
      fetchData()
    } catch (err) {
      console.error("Failed to close trade:", err)
    } finally {
      setClosing(false)
    }
  }

  const formatCurrency = (val: number) =>
    `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const formatPnl = (val: number) => {
    const sign = val >= 0 ? "+" : ""
    return `${sign}${formatCurrency(val)}`
  }

  const formatPercent = (val: number) => {
    const sign = val >= 0 ? "+" : ""
    return `${sign}${val.toFixed(2)}%`
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading && !portfolio) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#050505]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-slate-500 animate-pulse font-medium">{t("common.loading")}</p>
      </div>
    )
  }

  const summary = portfolio?.summary
  const openPositions = portfolio?.open_positions || []
  const closedPositions = portfolio?.closed_positions || []

  // Calculate demo performance %
  const initialBalance = balance?.initial_demo_balance || 100000
  const totalDemoValue = balance?.total_demo_value || 0
  const overallReturn = totalDemoValue - initialBalance
  const overallReturnPct = initialBalance > 0 ? ((overallReturn / initialBalance) * 100) : 0

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-primary/30 pb-20">
      <Header />

      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-5%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <main className="container relative z-10 pt-24 px-4 sm:px-6 space-y-10">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                <Briefcase className="w-4 h-4" />
              </div>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {t("paper.title")}
              </h1>
            </div>
            <p className="text-slate-400 text-sm max-w-lg">
              {t("paper.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchData} className="h-10 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-primary" : ""}`} />
              {t("paper.refresh")}
            </Button>
            <Button size="sm" className="h-10 px-5 rounded-xl bg-primary text-white font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all" asChild>
              <a href="/guess-buy">
                <Plus className="h-4 w-4" />
                {t("paper.new_trade")}
              </a>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Demo Balance Card */}
          <div className="group relative rounded-lg border border-white/5 bg-white/[0.03] p-4 backdrop-blur-2xl transition-all duration-300 hover:border-primary/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]">
            <div className="flex items-start justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm font-black uppercase text-slate-500">{t("paper.demo_balance")}</p>
                <p className="text-base sm:text-2xl font-mono font-black text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.3)] leading-none">
                  {formatCurrency(balance?.demo_balance ?? 0)}
                </p>
              </div>
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                <div className="relative p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Wallet className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex items-center gap-1.5 px-1.5 sm:px-2 py-0.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 w-fit">
              <span className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[8px] sm:text-[10px] font-black text-emerald-500 uppercase tracking-tighter">{t("paper.virtual_money")}</p>
            </div>
          </div>

          {/* Active Positions Card */}
          <div className="group relative rounded-lg border border-white/5 bg-white/[0.03] p-4 backdrop-blur-2xl transition-all duration-300 hover:border-blue-500/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <div className="flex items-start justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm font-black uppercase text-slate-500">{t("paper.active_positions")}</p>
                <p className="text-base sm:text-2xl font-mono font-black text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] leading-none">
                  {formatCurrency(summary?.total_invested ?? 0)}
                </p>
              </div>
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                <div className="relative p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 flex items-center gap-2">
              <Badge variant="outline" className="text-[8px] sm:text-[9px] border-blue-500/20 bg-blue-500/5 text-blue-400 font-black tracking-widest px-1.5 sm:px-2 py-0.5 rounded-lg">
                {openPositions.length} {t("paper.open_badge")}
              </Badge>
            </div>
          </div>

          {/* Current Value Card */}
          <div className="group relative rounded-lg border border-white/5 bg-white/[0.03] p-4 backdrop-blur-2xl transition-all duration-300 hover:border-purple-500/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <div className="flex items-start justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm font-black uppercase text-slate-500">{t("paper.current_value")}</p>
                <p className="text-base sm:text-2xl font-mono font-black text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] leading-none">
                  {formatCurrency(summary?.total_current_value ?? 0)}
                </p>
              </div>
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
                <div className="relative p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <BarChart3 className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 h-1 sm:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500/50 to-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)] transition-all duration-1000" style={{ width: '75%' }} />
            </div>
          </div>

          {/* Total PnL Card */}
          <div className={`group relative rounded-lg border border-white/5 p-4 backdrop-blur-2xl transition-all duration-300
            ${(summary?.total_pnl ?? 0) >= 0
              ? "bg-emerald-500/[0.02] hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]"
              : "bg-red-500/[0.02] hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]"}`}>
            <div className="flex items-start justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-sm font-black uppercase text-slate-500">{t("paper.total_pnl")}</p>
                <p className={`text-base sm:text-2xl font-mono font-black leading-none drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]
                  ${(summary?.total_pnl ?? 0) >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {formatPnl(summary?.total_pnl ?? 0)}
                </p>
              </div>
              <div className="relative shrink-0">
                <div className={`absolute inset-0 blur-xl rounded-full ${(summary?.total_pnl ?? 0) >= 0 ? "bg-emerald-500/20" : "bg-red-500/20"}`} />
                <div className={`relative p-2 rounded-lg border ${(summary?.total_pnl ?? 0) >= 0
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                  {(summary?.total_pnl ?? 0) >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                </div>
              </div>
            </div>
            <div className={`mt-4 sm:mt-6 inline-flex items-center gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-black tracking-widest border
              ${overallReturn >= 0 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
              {overallReturn >= 0 ? <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
              {formatPercent(overallReturnPct)}
            </div>
          </div>
        </div>

        {/* Positions Tabs */}
        <Tabs defaultValue="open" className="w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl h-12 w-fit">
              <TabsTrigger value="open" className="flex items-center gap-2 px-6 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-black text-xs uppercase tracking-widest">
                <Clock className="h-4 w-4" />
                {t("paper.open_trades")}
                <span className="ml-1 opacity-50">{openPositions.length}</span>
              </TabsTrigger>
              <TabsTrigger value="closed" className="flex items-center gap-2 px-6 rounded-xl data-[state=active]:bg-white data-[state=active]:text-black transition-all font-black text-xs uppercase tracking-widest">
                <History className="h-4 w-4" />
                {t("paper.closed_trades")}
                <span className="ml-1 opacity-50">{closedPositions.length}</span>
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-white/[0.02] px-4 py-2 rounded-xl border border-white/5">
              <Info className="h-3.5 w-3.5 text-primary" />
              {t("paper.real_time_sim")}
            </div>
          </div>

          {/* Open Trades */}
          <TabsContent value="open" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-white/5 bg-white/[0.02] rounded-lg overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                {openPositions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
                    <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center text-slate-500 animate-pulse border border-white/5">
                      <Briefcase className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-white font-black text-xl uppercase tracking-tighter">{t("paper.no_open_trades")}</p>
                      <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium">{t("paper.first_trade_prompt")}</p>
                    </div>
                    <Button variant="link" className="text-primary font-black uppercase tracking-widest text-xs group" asChild>
                      <a href="/guess-buy" className="flex items-center">
                        {t("paper.go_guess_buy")}
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                          <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.stock")}</TableHead>
                          <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.invested")}</TableHead>
                          <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.entry")}</TableHead>
                          <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.current")}</TableHead>
                          <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.shares")}</TableHead>
                          <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.value")}</TableHead>
                          <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.pnl")}</TableHead>
                          <TableHead className="text-center text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.action")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {openPositions.map((pos) => (
                          <TableRow key={pos.id} className="border-white/5 hover:bg-white/[0.03] transition-all group">
                            <TableCell className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-black border border-white/5 group-hover:border-primary/20 group-hover:text-primary transition-all">
                                  {pos.symbol?.slice(0, 2) || "?"}
                                </div>
                                <div className="min-w-0">
                                  <SymbolDisplay symbol={pos.symbol} showSymbol={pos.show_symbol} className="text-sm block" />
                                  <p className="text-[10px] font-bold text-slate-500 uppercase truncate max-w-[120px]">
                                    {pos.name}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm font-black text-blue-400/80">
                              {formatCurrency(pos.investment_amount)}
                            </TableCell>
                            <TableCell className="text-right font-mono text-xs text-slate-500">
                              ${pos.entry_price.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm font-black text-white">
                              ${pos.current_price.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right font-mono text-xs text-slate-500">
                              {pos.shares_bought.toFixed(4)}
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm font-black text-purple-400/90">
                              {formatCurrency(pos.current_value)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex flex-col items-end">
                                <span className={`font-black font-mono text-sm ${pos.is_profit ? "text-emerald-400" : "text-red-400"}`}>
                                  {formatPnl(pos.unrealized_pnl)}
                                </span>
                                <Badge variant="outline" className={`text-[9px] mt-1 font-black tracking-widest px-1.5 py-0 border-0 ${pos.is_profit ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                                  {formatPercent(pos.pnl_percent)}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 rounded-lg border-white/10 text-red-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all active:scale-90"
                                onClick={() => {
                                  setSelectedTrade(pos)
                                  setShowCloseConfirm(true)
                                }}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Closed Trades */}
          <TabsContent value="closed" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-white/5 bg-white/[0.02] rounded-3xl overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                {closedPositions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
                    <div className="h-20 w-20 rounded-3xl bg-white/5 flex items-center justify-center text-slate-500 border border-white/5">
                      <History className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-white font-black text-xl uppercase tracking-tighter">{t("paper.no_closed_trades")}</p>
                      <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium">{t("paper.close_trade_prompt")}</p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                          <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.stock")}</TableHead>
                          <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.invested")}</TableHead>
                          <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.entry")}</TableHead>
                          <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.close_price")}</TableHead>
                          <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.realized_pnl")}</TableHead>
                          <TableHead className="text-right text-[10px] font-black uppercase tracking-widest text-slate-500 h-14">{t("paper.closed_at")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {closedPositions.map((pos) => (
                          <TableRow key={pos.id} className="border-white/5 hover:bg-white/[0.03] transition-all group">
                            <TableCell className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-black border border-white/5 transition-all">
                                  {pos.symbol?.slice(0, 2) || "?"}
                                </div>
                                <div>
                                  <SymbolDisplay symbol={pos.symbol} showSymbol={pos.show_symbol} className="text-sm block" />
                                  <p className="text-[10px] font-bold text-slate-500 uppercase truncate max-w-[120px]">
                                    {pos.name}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm font-bold text-slate-300">
                              {formatCurrency(pos.investment_amount)}
                            </TableCell>
                            <TableCell className="text-right font-mono text-xs text-slate-500">
                              ${pos.entry_price.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm font-black text-white">
                              ${pos.close_price.toFixed(2)}
                            </TableCell>
                            <TableCell className="text-right">
                              <span className={`font-black font-mono text-sm ${pos.is_profit ? "text-emerald-400" : "text-red-400"}`}>
                                {formatPnl(pos.realized_pnl)}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex flex-col items-end">
                                <span className="text-xs font-bold text-slate-300">{formatDate(pos.closed_at).split(',')[0]}</span>
                                <span className="text-[10px] text-slate-500">{formatDate(pos.closed_at).split(',')[1]}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Close Trade Confirmation */}
        <Dialog open={showCloseConfirm} onOpenChange={setShowCloseConfirm}>
          <DialogContent className="bg-[#0a0a0a] border-white/10 text-white rounded-3xl overflow-hidden sm:max-w-md">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
            <DialogHeader className="pt-4">
              <DialogTitle className="flex items-center gap-3 text-2xl font-black tracking-tight uppercase">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                {t("paper.close_trade")}
              </DialogTitle>
              <DialogDescription className="text-slate-400 font-medium">
                {t("paper.close_desc")}
              </DialogDescription>
            </DialogHeader>
            {selectedTrade && (
              <div className="space-y-6 py-6">
                <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 space-y-4 shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t("paper.stock")}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{selectedTrade.name}</span>
                      <SymbolDisplay symbol={selectedTrade.symbol} showSymbol={selectedTrade.show_symbol} className="text-xs" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t("paper.entry")}</span>
                    <span className="font-mono text-xs text-slate-300">${selectedTrade.entry_price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t("paper.current")}</span>
                    <span className="font-mono text-xs text-white font-bold">${selectedTrade.current_price.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t("paper.unrealized_pnl")}</span>
                    <div className="flex flex-col items-end">
                      <span className={`font-black font-mono text-lg ${selectedTrade.is_profit ? "text-emerald-400" : "text-red-400"}`}>
                        {formatPnl(selectedTrade.unrealized_pnl)}
                      </span>
                      <span className={`text-[10px] font-black tracking-widest ${selectedTrade.is_profit ? "text-emerald-500" : "text-red-500"}`}>
                        {formatPercent(selectedTrade.pnl_percent)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-[10px] text-slate-500 font-bold bg-white/[0.02] p-3 rounded-xl border border-white/5">
                  <Info className="h-4 w-4 text-primary shrink-0" />
                  {t("paper.close_warn")}
                </div>
              </div>
            )}
            <DialogFooter className="flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={() => setShowCloseConfirm(false)}
                className="flex-1 h-12 rounded-xl border-white/10 bg-transparent text-slate-400 hover:bg-white/5"
              >
                {t("paper.cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={handleCloseTrade}
                disabled={closing}
                className="flex-1 h-12 rounded-xl bg-red-600 text-white font-black uppercase tracking-widest hover:bg-red-700 shadow-lg shadow-red-600/10"
              >
                {closing ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  t("paper.close_trade")
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
