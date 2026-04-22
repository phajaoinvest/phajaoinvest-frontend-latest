"use client"

import { useState, useEffect, useCallback } from "react"
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
  Eye,
  EyeOff,
  Zap,
  Lock,
} from "lucide-react"
import { queryData, postAPI } from "@/app/api/api"
import * as ga from "@/lib/ga"

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

import { useTranslation } from "@/lib/i18n"

// ============================================================================
// Page
// ============================================================================

export default function GuessBuyPage() {
  const [stocks, setStocks] = useState<AvailableStock[]>([])
  const [balance, setBalance] = useState<BalanceInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedStockId, setSelectedStockId] = useState("")
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const { t, language } = useTranslation()

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

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10">

      {/* ================================================================ */}
      {/* Header */}
      {/* ================================================================ */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Crosshair className="h-5 w-5 text-white" />
            </div>
            {t("guess.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-2 ml-[52px]">
            {t("guess.subtitle")}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchData} className="shrink-0">
          <RefreshCw className="mr-2 h-4 w-4" />
          {t("guess.refresh")}
        </Button>
      </div>

      {/* ================================================================ */}
      {/* Balance Bar */}
      {/* ================================================================ */}
      <div className="rounded-2xl border bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-rose-500/5 p-5">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("guess.demo_balance")}</p>
              <p className="text-2xl font-black font-mono text-amber-600">
                {fmtCurrency(balance?.demo_balance ?? 0)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("guess.invested")}</p>
              <p className="text-xl font-bold font-mono">
                {fmtCurrency(balance?.total_invested ?? 0)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("guess.total_value")}</p>
              <p className="text-xl font-bold font-mono">
                {fmtCurrency(balance?.total_demo_value ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Stock Selection Grid */}
      {/* ================================================================ */}
      <div>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          {t("guess.select_stock")}
          <span className="text-xs font-normal text-muted-foreground ml-1">
            ({stocks.length} {t("guess.available")})
          </span>
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stocks.map((stock) => {
            const isHidden = !stock.show_symbol
            const isSelected = selectedStockId === stock.id
            const pct = fmtPct(stock.change_percent)
            const isUp = (stock.change_percent ?? 0) >= 0

            return (
              <button
                key={stock.id}
                onClick={() => setSelectedStockId(stock.id)}
                className={`group relative rounded-2xl border-2 p-5 text-left transition-all duration-200 overflow-hidden
                  ${isSelected
                    ? "border-amber-400 bg-amber-500/5 ring-2 ring-amber-400/30 shadow-lg shadow-amber-500/10"
                    : "border-border hover:border-amber-300/50 hover:shadow-md"
                  }`}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3">
                    <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Stock Identity — hidden when show_symbol is false */}
                <div className="mb-4">
                  {isHidden ? (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-muted/30 flex items-center justify-center border border-border">
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-base font-bold text-slate-400 blur-[5px] select-none pointer-events-none">XXXX</p>
                          <EyeOff className="h-3 w-3 text-slate-400 shrink-0" />
                        </div>
                        <p className="text-xs text-slate-400 blur-[4px] select-none pointer-events-none mt-0.5">{t("guess.hidden_company")}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-400/20 flex items-center justify-center border border-amber-200/30">
                        <span className="text-sm font-black text-amber-600">
                          {stock.symbol?.charAt(0) || "?"}
                        </span>
                      </div>
                      <div>
                        <p className="text-base font-bold text-amber-600">{stock.symbol}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[160px]">{stock.name}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Price & Change — ALWAYS visible */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black font-mono tracking-tight">
                      {stock.last_price ? `$${stock.last_price.toFixed(2)}` : "—"}
                    </p>
                  </div>
                  {pct && (
                    <Badge
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border-0 ${
                        isUp
                          ? "bg-emerald-500/15 text-emerald-600"
                          : "bg-red-500/15 text-red-600"
                      }`}
                    >
                      {isUp ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {pct}
                    </Badge>
                  )}
                </div>

                {/* Max investment hint */}
                {stock.max_investment && !isHidden && (
                  <p className="text-[11px] text-muted-foreground/50 mt-3">
                    {t("guess.max_investment")} {fmtCurrency(stock.max_investment)}
                  </p>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ================================================================ */}
      {/* Investment Form */}
      {/* ================================================================ */}
      {selectedStock && (
        <div className="rounded-2xl border-2 border-dashed border-amber-300/40 bg-gradient-to-br from-amber-500/[.03] to-orange-500/[.03] p-6 space-y-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-lg bg-amber-500 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{t("guess.investment_amount")}</h3>
              <p className="text-xs text-muted-foreground">
                {t("guess.trading")}{" "}
                {selectedStock.show_symbol && selectedStock.symbol ? (
                  <span className="font-bold text-amber-600">{selectedStock.symbol}</span>
                ) : (
                  <span className="inline-flex items-center gap-1 align-bottom">
                    <span className="font-bold text-slate-400 blur-[4px] select-none pointer-events-none">XXXX</span>
                    <EyeOff className="h-3 w-3 text-slate-400" />
                  </span>
                )}
                {" "}· {t("guess.demo_balance_only")}
              </p>
            </div>
          </div>

          {/* Amount input */}
          <div className="space-y-3">
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="number"
                min={1}
                step={0.01}
                placeholder={t("guess.enter_amount")}
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="pl-12 h-14 text-xl font-mono rounded-xl border-2 focus:border-amber-400"
              />
            </div>
            {isOverMax && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {t("guess.exceeds_max")} {fmtCurrency(maxAllowed)}
              </p>
            )}
            {isOverBalance && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {t("guess.exceeds_balance")} {fmtCurrency(balance?.demo_balance ?? 0)}
              </p>
            )}

            {/* Quick amounts */}
            <div className="flex gap-2 flex-wrap">
              {[100, 500, 1000, 5000, 10000].map((val) => (
                <Button
                  key={val}
                  variant="outline"
                  size="sm"
                  className={`text-xs rounded-lg ${
                    amount === val ? "border-amber-400 bg-amber-500/10 text-amber-600" : ""
                  }`}
                  onClick={() => setInvestmentAmount(val.toString())}
                >
                  ${val.toLocaleString()}
                </Button>
              ))}
            </div>
          </div>

          {/* Trade preview */}
          {amount > 0 && selectedStock.last_price && (
            <div className="rounded-xl border bg-background/50 p-4 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("guess.entry_price")}</span>
                <span className="font-bold font-mono">${selectedStock.last_price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("guess.est_shares")}</span>
                <span className="font-bold font-mono">{estimatedShares.toFixed(4)}</span>
              </div>
              <div className="border-t pt-2.5 flex justify-between text-sm">
                <span className="text-muted-foreground">{t("guess.total_demo")}</span>
                <span className="font-black text-amber-600 font-mono text-base">{fmtCurrency(amount)}</span>
              </div>
            </div>
          )}

          {/* Submit */}
          <Button
            className="w-full h-14 text-base rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg shadow-amber-500/20 transition-all"
            disabled={!canSubmit}
            onClick={() => setShowConfirm(true)}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("guess.placing_trade")}
              </>
            ) : (
              <>
                <Crosshair className="mr-2 h-5 w-5" />
                {t("guess.place_trade")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* ================================================================ */}
      {/* Confirmation Dialog */}
      {/* ================================================================ */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crosshair className="h-5 w-5 text-amber-500" />
              {t("guess.confirm_trade")}
            </DialogTitle>
            <DialogDescription>
              {t("guess.confirm_desc")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="rounded-xl bg-muted/30 p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">{t("guess.stock")}</span>
                <span className="font-bold">
                  {selectedStock?.show_symbol && selectedStock?.symbol
                    ? selectedStock.symbol
                    : (
                      <span className="inline-flex items-center gap-1">
                        <span className="font-bold text-slate-400 blur-[4px] select-none pointer-events-none">XXXX</span>
                        <EyeOff className="h-3 w-3 text-slate-400" />
                      </span>
                    )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">{t("guess.entry_price")}</span>
                <span className="font-mono font-bold">${selectedStock?.last_price?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">{t("guess.investment")}</span>
                <span className="font-black text-amber-600 font-mono">{fmtCurrency(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">{t("guess.est_shares")}</span>
                <span className="font-mono">{estimatedShares.toFixed(4)}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)} className="rounded-xl">
              {t("guess.cancel")}
            </Button>
            <Button
              className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold"
              onClick={handlePlaceTrade}
              disabled={submitting}
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : t("guess.confirm")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ================================================================ */}
      {/* Success Dialog */}
      {/* ================================================================ */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="rounded-2xl text-center">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
              {t("guess.trade_placed")}
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400/20 to-green-400/20">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>
            <p className="text-muted-foreground text-sm">
              {t("guess.track_pnl")}{" "}
              <a href="/dashboard/paper-portfolio" className="text-amber-600 font-semibold underline underline-offset-2">
                {t("guess.paper_portfolio")}
              </a>
              .
            </p>
          </div>
          <DialogFooter className="sm:justify-center gap-2">
            <Button variant="outline" onClick={() => setShowSuccess(false)} className="rounded-xl">
              {t("guess.place_another")}
            </Button>
            <Button
              asChild
              className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold"
            >
              <a href="/dashboard/paper-portfolio">{t("guess.view_portfolio")}</a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
