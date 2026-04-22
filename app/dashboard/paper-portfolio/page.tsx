"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  TrendingDown,
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
} from "lucide-react"
import { queryData, postAPI } from "@/app/api/api"

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

import { useTranslation } from "@/lib/i18n"

// ============================================================================
// Symbol Display Component — blurs when hidden
// ============================================================================

function SymbolDisplay({ symbol, showSymbol, className = "" }: { symbol: string | null; showSymbol: boolean; className?: string }) {
  if (showSymbol && symbol) {
    return <span className={`font-bold text-amber-600 ${className}`}>{symbol}</span>
  }
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="font-bold text-slate-400 blur-[5px] select-none pointer-events-none" aria-hidden>
        XXXX
      </span>
      <EyeOff className="h-3 w-3 text-slate-400 shrink-0" />
    </span>
  )
}

// ============================================================================
// Page Component
// ============================================================================

export default function PaperPortfolioPage() {
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

  const { t, language } = useTranslation()

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
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-amber-500" />
            {t("paper.title")}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t("paper.subtitle")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            {t("paper.refresh")}
          </Button>
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-bold" asChild>
            <a href="/dashboard/guess-buy">
              <TrendingUp className="mr-2 h-4 w-4" />
              {t("paper.new_trade")}
            </a>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Demo Balance */}
        <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-amber-700 uppercase tracking-wider">
                  {t("paper.demo_balance")}
                </p>
                <p className="text-xl font-bold text-amber-900 mt-1 font-mono">
                  {formatCurrency(balance?.demo_balance ?? 0)}
                </p>
                <p className="text-xs text-amber-600 mt-0.5">{t("paper.virtual_money")}</p>
              </div>
              <Wallet className="h-8 w-8 text-amber-400" />
            </div>
          </CardContent>
        </Card>

        {/* Total Invested */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("paper.active_positions")}
                </p>
                <p className="text-xl font-bold mt-1 font-mono">
                  {formatCurrency(summary?.total_invested ?? 0)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        {/* Current Value */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("paper.current_value")}
                </p>
                <p className="text-xl font-bold mt-1 font-mono">
                  {formatCurrency(summary?.total_current_value ?? 0)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        {/* Total PnL */}
        <Card
          className={`${
            (summary?.total_pnl ?? 0) >= 0
              ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50"
              : "border-red-200 bg-gradient-to-br from-red-50 to-rose-50"
          }`}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-xs font-medium uppercase tracking-wider ${
                    (summary?.total_pnl ?? 0) >= 0 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {t("paper.total_pnl")}
                </p>
                <p
                  className={`text-xl font-bold mt-1 font-mono ${
                    (summary?.total_pnl ?? 0) >= 0 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {formatPnl(summary?.total_pnl ?? 0)}
                </p>
                <p className={`text-xs mt-0.5 ${overallReturn >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatPercent(overallReturnPct)} {t("paper.overall")}
                </p>
              </div>
              {(summary?.total_pnl ?? 0) >= 0 ? (
                <ArrowUpRight className="h-8 w-8 text-green-400" />
              ) : (
                <ArrowDownRight className="h-8 w-8 text-red-400" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Positions Tabs */}
      <Tabs defaultValue="open" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="open" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {t("paper.open_trades")} ({openPositions.length})
          </TabsTrigger>
          <TabsTrigger value="closed" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            {t("paper.closed_trades")} ({closedPositions.length})
          </TabsTrigger>
        </TabsList>

        {/* Open Trades */}
        <TabsContent value="open">
          <Card>
            <CardContent className="pt-6">
              {openPositions.length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center text-muted-foreground">
                  <BarChart3 className="mb-3 h-10 w-10" />
                  <p className="font-medium">{t("paper.no_open_trades")}</p>
                  <p className="text-sm">{t("paper.first_trade_prompt")}</p>
                  <Button variant="link" className="mt-2 text-amber-600" asChild>
                    <a href="/dashboard/guess-buy">{t("paper.go_guess_buy")}</a>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("paper.stock")}</TableHead>
                        <TableHead className="text-right">{t("paper.invested")}</TableHead>
                        <TableHead className="text-right">{t("paper.entry")}</TableHead>
                        <TableHead className="text-right">{t("paper.current")}</TableHead>
                        <TableHead className="text-right">{t("paper.shares")}</TableHead>
                        <TableHead className="text-right">{t("paper.value")}</TableHead>
                        <TableHead className="text-right">{t("paper.pnl")}</TableHead>
                        <TableHead className="text-center">{t("paper.action")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {openPositions.map((pos) => (
                        <TableRow key={pos.id} className="group">
                          <TableCell>
                            <div>
                              <SymbolDisplay
                                symbol={pos.symbol}
                                showSymbol={pos.show_symbol}
                              />
                              <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                                {pos.name}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm">
                            {formatCurrency(pos.investment_amount)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm">
                            ${pos.entry_price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm font-medium">
                            ${pos.current_price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm">
                            {pos.shares_bought.toFixed(4)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm">
                            {formatCurrency(pos.current_value)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex flex-col items-end">
                              <span
                                className={`font-bold font-mono text-sm ${
                                  pos.is_profit ? "text-green-600" : "text-red-600"
                                }`}
                              >
                                {formatPnl(pos.unrealized_pnl)}
                              </span>
                              <Badge
                                variant="outline"
                                className={`text-xs mt-0.5 ${
                                  pos.is_profit
                                    ? "text-green-600 border-green-200 bg-green-50"
                                    : "text-red-600 border-red-200 bg-red-50"
                                }`}
                              >
                                {formatPercent(pos.pnl_percent)}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                              onClick={() => {
                                setSelectedTrade(pos)
                                setShowCloseConfirm(true)
                              }}
                            >
                              <XCircle className="mr-1 h-3 w-3" />
                              {t("paper.close")}
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
        <TabsContent value="closed">
          <Card>
            <CardContent className="pt-6">
              {closedPositions.length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center text-muted-foreground">
                  <CheckCircle2 className="mb-3 h-10 w-10" />
                  <p className="font-medium">{t("paper.no_closed_trades")}</p>
                  <p className="text-sm">{t("paper.close_trade_prompt")}</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("paper.stock")}</TableHead>
                        <TableHead className="text-right">{t("paper.invested")}</TableHead>
                        <TableHead className="text-right">{t("paper.entry")}</TableHead>
                        <TableHead className="text-right">{t("paper.close_price")}</TableHead>
                        <TableHead className="text-right">{t("paper.shares")}</TableHead>
                        <TableHead className="text-right">{t("paper.realized_pnl")}</TableHead>
                        <TableHead className="text-right">{t("paper.closed_at")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {closedPositions.map((pos) => (
                        <TableRow key={pos.id}>
                          <TableCell>
                            <div>
                              <SymbolDisplay
                                symbol={pos.symbol}
                                showSymbol={pos.show_symbol}
                              />
                              <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                                {pos.name}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm">
                            {formatCurrency(pos.investment_amount)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm">
                            ${pos.entry_price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm">
                            ${pos.close_price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-mono text-sm">
                            {pos.shares_bought.toFixed(4)}
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className={`font-bold font-mono ${
                                pos.is_profit ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {formatPnl(pos.realized_pnl)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right text-xs text-muted-foreground">
                            {formatDate(pos.closed_at)}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              {t("paper.close_trade")}
            </DialogTitle>
            <DialogDescription>
              {t("paper.close_desc")}
            </DialogDescription>
          </DialogHeader>
          {selectedTrade && (
            <div className="space-y-4 py-4">
              <div className="rounded-lg bg-slate-50 p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t("paper.stock")}</span>
                  <span className="font-bold flex items-center gap-2">
                    {selectedTrade.name}
                    <SymbolDisplay symbol={selectedTrade.symbol} showSymbol={selectedTrade.show_symbol} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("paper.entry")}</span>
                  <span className="font-mono">${selectedTrade.entry_price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("paper.current")}</span>
                  <span className="font-mono">${selectedTrade.current_price.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-muted-foreground">{t("paper.unrealized_pnl")}</span>
                  <span
                    className={`font-bold font-mono ${
                      selectedTrade.is_profit ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formatPnl(selectedTrade.unrealized_pnl)} ({formatPercent(selectedTrade.pnl_percent)})
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("paper.close_warn")}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCloseConfirm(false)}>
              {t("paper.cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={handleCloseTrade}
              disabled={closing}
            >
              {closing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                t("paper.close_trade")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
