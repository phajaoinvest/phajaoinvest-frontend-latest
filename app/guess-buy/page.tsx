"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Crosshair,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  Loader2,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  EyeOff,
  Zap,
  Info,
  ChevronRight,
  Target,
  BarChart4,
  BarChart3,
  Activity,
  Loader,
} from "lucide-react"
import { queryData, postAPI } from "@/app/api/api"
import * as ga from "@/lib/ga"
import { useCustomerStore } from "@/app/store/useCustomerStore"
import { useTranslation } from "@/lib/i18n"
import Header from "@/components/header"

// ============================================================================
// Types
// ============================================================================

interface AvailableStock {
  id: string
  symbol: string | null
  show_symbol: boolean
  name: string
  last_price: number | null
  change: number | null
  change_percent: number | null
  max_investment: number | null
  sector: string | null
  exchange: string | null
}

interface BalanceInfo {
  demo_balance: number
  total_invested: number
  total_demo_value: number
  initial_demo_balance: number
}

// ============================================================================
// Page
// ============================================================================

export default function GuessBuyLandingPage() {
  const router = useRouter()
  const customer = useCustomerStore((state) => state.customer)
  const { t } = useTranslation()

  const [stocks, setStocks] = useState<AvailableStock[]>([])
  const [balance, setBalance] = useState<BalanceInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedStockId, setSelectedStockId] = useState("")
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Auth Guard
  useEffect(() => {
    // Check if we are in the browser and if the customer is not logged in
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null
    if (!token && !customer) {
      router.push("/auth/login")
    }
  }, [customer, router])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [stocksRes, balanceRes] = await Promise.all([
        queryData({ url: "/paper-trades/available-stocks" }),
        queryData({ url: "/paper-trades/balance" }),
      ])
      if (stocksRes?.data) setStocks(stocksRes.data)
      if (balanceRes?.data) setBalance(balanceRes.data)
    } catch (err) {
      console.error("Failed to load data:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const selectedStock = stocks.find((s) => s.id === selectedStockId)
  const amount = parseFloat(investmentAmount) || 0
  const maxAllowed = selectedStock?.max_investment || Infinity
  const isOverMax = amount > maxAllowed
  const isOverBalance = balance ? amount > balance.demo_balance : false
  const estimatedShares = selectedStock?.last_price ? amount / selectedStock.last_price : 0
  const canSubmit = selectedStockId && amount > 0 && !isOverMax && !isOverBalance && !submitting

  const handlePlaceTrade = async () => {
    setShowConfirm(false)
    setSubmitting(true)
    try {
      const res = await postAPI({
        url: "/paper-trades",
        body: { stock_id: selectedStockId, investment_amount: amount },
      })
      if (res?.data) {
        ga.event({
          action: "place_paper_trade",
          category: "trading",
          label: selectedStock?.symbol || "hidden_stock",
          value: amount,
        });
        setShowSuccess(true)
        setInvestmentAmount("")
        setSelectedStockId("")
        fetchData()
      }
    } catch (err: any) {
      console.error("Trade failed:", err)
    } finally {
      setSubmitting(false)
    }
  }

  // Format helpers
  const fmtCurrency = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const fmtPct = (v: number | null) => {
    if (v == null) return null
    return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`
  }

  // Calculate demo performance %
  const initialBalance = balance?.initial_demo_balance || 100000
  const totalDemoValue = balance?.total_demo_value || 0
  const overallReturn = totalDemoValue - initialBalance
  const overallReturnPct = initialBalance > 0 ? ((overallReturn / initialBalance) * 100) : 0

  if (loading && !stocks.length) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground animate-pulse font-medium">{t("common.loading")}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-primary/30">
      <Header />

      {/* Hero / Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full" />
      </div>

      <main className="container relative z-10 pt-24 pb-20 px-4 sm:px-6">
        {/* ================================================================ */}
        {/* Header Section */}
        {/* ================================================================ */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                <Activity className="h-4 w-4" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {t("guess.title")}
              </h1>
            </div>
            <p className="text-slate-400 text-sm md:text-base max-w-lg">
              {t("guess.subtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchData}
              className="h-10 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all active:scale-95"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin text-primary" : ""}`} />
              {t("guess.refresh")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Stocks and Stats */}
          <div className="lg:col-span-8 space-y-8">
            {/* ================================================================ */}
            {/* Balance Stats Bar */}
            {/* ================================================================ */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="group relative rounded-xl border border-white/5 bg-white/[0.03] p-3 sm:p-4 backdrop-blur-2xl transition-all duration-300 hover:border-primary/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(var(--primary),0.1)]">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-slate-500">{t("guess.demo_balance")}</p>
                    <p className="text-base sm:text-xl font-mono font-black text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.3)]">
                      {fmtCurrency(balance?.demo_balance ?? 0)}
                    </p>
                  </div>
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                    <div className="relative p-2 rounded-lg rounded-md bg-primary/10 text-primary border border-primary/20">
                      <Wallet className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 h-1 sm:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary/50 to-primary transition-all duration-1000 shadow-[0_0_8px_rgba(var(--primary),0.5)]" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="group relative rounded-xl border border-white/5 bg-white/[0.03] p-3 sm:p-4 backdrop-blur-2xl transition-all duration-300 hover:border-blue-500/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-slate-500">{t("guess.invested")}</p>
                    <p className="text-base sm:text-xl font-mono font-black text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                      {fmtCurrency(balance?.total_invested ?? 0)}
                    </p>
                  </div>
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                    <div className="relative p-2 rounded-lg rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-blue-500/10 border border-blue-500/20 w-fit">
                    <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-[8px] sm:text-[10px] font-black text-blue-400 uppercase tracking-wider">{t("guess.active")}</span>
                  </div>
                  <span className="text-[8px] sm:text-[10px] font-bold text-slate-500">{t("guess.in_assets").replace("{count}", stocks.length.toString())}</span>
                </div>
              </div>

              {/* Total Value Card */}
              <div className="group relative rounded-xl border border-white/5 bg-white/[0.03] p-3 sm:p-4 backdrop-blur-2xl transition-all duration-300 hover:border-purple-500/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 sm:space-y-2">
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.2em] text-slate-500">{t("guess.total_value")}</p>
                    <p className="text-base sm:text-xl font-mono font-black text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                      {fmtCurrency(balance?.total_demo_value ?? 0)}
                    </p>
                  </div>
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
                    <div className="relative p-2 rounded-lg rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6">
                  <div className={`inline-flex items-center gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-black tracking-widest border
                    ${overallReturn >= 0
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                    {overallReturn >= 0 ? <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
                    {overallReturn >= 0 ? "+" : ""}{overallReturnPct.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>

            {/* ================================================================ */}
            {/* Stock Selection Grid */}
            {/* ================================================================ */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold flex items-center gap-2 text-white">
                  <Zap className="h-5 w-5 text-primary" />
                  {t("guess.select_stock")}
                  <Badge variant="outline" className="ml-2 border-white/10 bg-white/5 text-slate-400 text-[10px] font-black tracking-widest px-2.5 py-1 rounded-lg">
                    {stocks.length} {t("guess.available")}
                  </Badge>
                </h2>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                {stocks.map((stock) => {
                  const isHidden = !stock.show_symbol
                  const isSelected = selectedStockId === stock.id
                  const pct = fmtPct(stock.change_percent)
                  const isUp = (stock.change_percent ?? 0) >= 0

                  return (
                    <button
                      key={stock.id}
                      onClick={() => setSelectedStockId(stock.id)}
                      className={`group relative rounded-xl border p-3 text-left transition-all duration-300 overflow-hidden backdrop-blur-sm
                        ${isSelected
                          ? "border-primary bg-primary/[0.08] shadow-[0_0_40px_rgba(var(--primary),0.15)] ring-1 ring-primary/30 -translate-y-1"
                          : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 hover:-translate-y-1"
                        }`}
                    >
                      {/* Selection indicator */}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1">
                          <div className="h-6 w-6 sm:h-8 sm:w-8 bg-primary text-white flex items-center justify-center rounded-bl-xl">
                            <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </div>
                        </div>
                      )}

                      {/* Stock Identity */}
                      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                        <div className={`h-8 w-8 rounded-lg rounded-md flex items-center justify-center border transition-all duration-500
                          ${isSelected ? "bg-primary text-white border-primary/50 rotate-6" : "bg-white/5 text-slate-400 border-white/10 group-hover:border-primary/30 group-hover:text-primary"}
                        `}>
                          {isHidden ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <span className="text-[10px] sm:text-sm font-black tracking-tighter">
                              {stock.symbol?.slice(0, 2) || "?"}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          {isHidden ? (
                            <div className="space-y-0.5 sm:space-y-1">
                              <p className="text-[10px] sm:text-sm font-bold text-slate-600 blur-[2px] sm:blur-[3px] select-none">HIDDEN</p>
                              <p className="text-[8px] sm:text-[10px] font-bold text-slate-500/50 uppercase tracking-tighter truncate">{t("guess.hidden_company")}</p>
                            </div>
                          ) : (
                            <div className="space-y-0.5">
                              <p className={`text-xs sm:text-base font-black tracking-tight transition-colors leading-tight ${isSelected ? "text-primary" : "text-white"}`}>{stock.symbol}</p>
                              <p className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase truncate max-w-[60px] sm:max-w-[120px]">{stock.name}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price & Change */}
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mt-auto">
                        <div className="space-y-0.5 sm:space-y-1">
                          <p className="text-[8px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Price</p>
                          <p className="text-xs sm:text-lg font-mono font-bold tracking-tight text-white leading-none">
                            {stock.last_price ? `$${stock.last_price.toFixed(2)}` : "—"}
                          </p>
                        </div>
                        {pct && (
                          <div className={`flex items-center gap-1 text-[9px] sm:text-xs font-black px-1.5 py-0.5 rounded-lg w-fit ${isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                            {isUp ? <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : <TrendingDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
                            {pct}
                          </div>
                        )}
                      </div>

                      {/* Decoration */}
                      <div className="absolute -bottom-6 -right-6 h-12 w-12 sm:h-16 sm:w-16 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-primary/5 transition-all duration-500" />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Investment Form */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className={`rounded-xl border transition-all duration-500 p-4 shadow-2xl backdrop-blur-2xl
              ${selectedStock
                ? "border-primary/20 bg-white/[0.05] shadow-primary/5"
                : "border-white/5 bg-white/[0.02] opacity-60"}`}
            >
              {!selectedStock ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 animate-in fade-in zoom-in duration-700">
                  <div className="space-y-2 max-w-[200px]">
                    <p className="text-white font-black text-xl uppercase tracking-tighter">{t("guess.select_stock_prompt")}</p>
                    <p className="text-slate-500 text-[11px] font-medium leading-relaxed">{t("guess.select_stock_desc")}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{t("guess.investment_amount")}</h3>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          {t("guess.trading")} {selectedStock.symbol || "Asset"} <ChevronRight className="h-3 w-3" /> {t("guess.demo_mode")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Amount input */}
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-lg">$</div>
                      <Input
                        type="number"
                        min={1}
                        step={0.01}
                        placeholder="0.00"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="pl-10 h-12 font-mono rounded-lg border-white/10 bg-white/5 text-white focus:border-primary focus:ring-primary/20 transition-all placeholder:text-slate-600"
                      />
                    </div>

                    {/* Warnings */}
                    {isOverMax && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold animate-in slide-in-from-top-2">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {t("guess.exceeds_max")} {fmtCurrency(maxAllowed)}
                      </div>
                    )}
                    {isOverBalance && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold animate-in slide-in-from-top-2">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {t("guess.exceeds_balance")} {fmtCurrency(balance?.demo_balance ?? 0)}
                      </div>
                    )}

                    {/* Quick amounts */}
                    <div className="grid grid-cols-3 gap-2">
                      {[100, 500, 1000, 5000, 10000, 25000].map((val) => (
                        <button
                          key={val}
                          onClick={() => setInvestmentAmount(val.toString())}
                          className={`h-9 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all border
                            ${amount === val
                              ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                              : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20"}`}
                        >
                          ${val >= 1000 ? `${val / 1000}k` : val}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trade preview */}
                  {amount > 0 && selectedStock.last_price && (
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 space-y-3">
                      <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        <span>{t("guess.entry_price")}</span>
                        <span className="text-slate-300 font-mono">${selectedStock.last_price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        <span>{t("guess.est_shares")}</span>
                        <span className="text-slate-300 font-mono">{estimatedShares.toFixed(4)}</span>
                      </div>
                      <div className="h-px bg-white/5 my-1" />
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-sm font-bold text-white">{t("guess.total_demo")}</span>
                        <span className="text-xl font-mono font-black text-primary">{fmtCurrency(amount)}</span>
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <Button
                    className={`w-full h-12 text-base rounded-lg font-black uppercase tracking-widest transition-all
                      ${canSubmit
                        ? "bg-primary text-white hover:bg-primary/90 shadow-[0_8px_30px_rgb(var(--primary),0.3)] hover:-translate-y-1"
                        : "bg-white/5 text-slate-500 cursor-not-allowed border-white/5"}`}
                    disabled={!canSubmit}
                    onClick={() => setShowConfirm(true)}
                  >
                    {submitting ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <DollarSign className="h-4 w-4" />
                        {t("guess.place_trade")}
                      </>
                    )}
                  </Button>

                  <p className="text-center text-[10px] text-slate-500 px-4">
                    {t("guess.disclaimer")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ================================================================ */}
      {/* Confirmation Dialog */}
      {/* ================================================================ */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md bg-[#0a0a0a] border-white/10 text-white rounded-3xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-amber-500" />
          <DialogHeader className="pt-4">
            <DialogTitle className="flex items-center gap-3 text-xl font-black tracking-tight">
              {t("guess.confirm_trade")}
            </DialogTitle>
            <DialogDescription className="text-slate-400 font-medium">
              {t("guess.confirm_desc")}
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{t("guess.stock")}</span>
                <div className="flex items-center gap-2">
                  {!selectedStock?.show_symbol && <EyeOff className="h-4 w-4 text-slate-500" />}
                  <span className="font-black text-primary text-md">
                    {selectedStock?.show_symbol ? selectedStock.symbol : "HIDDEN"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{t("guess.entry_price")}</span>
                <span className="font-mono font-bold text-slate-300">${selectedStock?.last_price?.toFixed(2)}</span>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{t("guess.investment")}</span>
                <span className="font-black text-lg text-white font-mono">{fmtCurrency(amount)}</span>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-row sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              className="flex-1 h-10 rounded-md border-white/10 bg-transparent text-slate-400 hover:bg-white/5"
            >
              {t("guess.cancel")}
            </Button>
            <Button
              className="flex-1 h-10 rounded-md bg-primary text-white font-bold hover:bg-primary/90"
              onClick={handlePlaceTrade}
              disabled={submitting}
            >
              {submitting ? <Loader className="h-5 w-5 animate-spin" /> : t("guess.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================================================================ */}
      {/* Success Dialog */}
      {/* ================================================================ */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-sm bg-[#0a0a0a] border-white/10 text-white rounded-3xl overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />
          <div className="py-8 space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-black text-white">{t("guess.trade_placed")}</DialogTitle>
              <p className="text-slate-400 text-sm font-medium">
                {t("guess.track_pnl")}{" "}
                <button onClick={() => router.push("/paper-portfolio")} className="text-primary hover:underline font-bold">
                  {t("guess.paper_portfolio")}
                </button>
              </p>
            </div>
            <div className="flex flex-row sm:flex-row gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowSuccess(false)}
                className="border w-full rounded-md text-slate-500 hover:text-white hover:bg-white/5"
              >
                {t("guess.place_another")}
              </Button>
              <Button
                onClick={() => router.push("/paper-portfolio")}
                className="w-full rounded-md bg-white text-black font-black uppercase tracking-widest bg-primary"
              >
                {t("guess.view_portfolio")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
