"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  RefreshCw,
  BarChart3,
  ArrowRight,
  TrendingUp,
  Globe,
  Building2,
  Zap
} from 'lucide-react'
import { useTranslation } from "@/lib/i18n"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Pagination from "@/components/ui/pagination"
import { queryData } from "@/app/api/api"
import { formatUSD } from "@/app/utils/functions/format-currency"

export default function StocksListPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [stocks, setStocks] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [search, setSearch] = useState('')

  const fetchStocks = useCallback(async () => {
    try {
      setLoading(true)
      let url = `/stocks?page=${page}&limit=${limit}&is_demo=false`
      if (search) {
        url += `&search=${encodeURIComponent(search)}`
      }
      const response = await queryData({ url })
      if (response && response.data) {
        setStocks(response.data)
        setTotal(response.total)
        setTotalPages(response.totalPages || Math.ceil(response.total / limit))
      }
    } catch (error) {
      console.error('Failed to fetch stocks:', error)
    } finally {
      setLoading(false)
    }
  }, [page, limit, search])

  useEffect(() => {
    fetchStocks()
  }, [fetchStocks])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header Section with Glassmorphism Effect */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-background to-secondary/10 p-4 sm:p-8 border border-primary/10 shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                  <Zap className="h-3 w-3" />
                  {t("stocks_list.market_intelligence")}
                </div>
                {/* <h1 className="text-2xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  {t("header.stocks")}
                </h1> */}
                <p className="text-sm sm:text-md text-muted-foreground max-w-xl leading-relaxed">
                  {t("stocks_list.hero_description")}
                </p>
              </div>

              {/* <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder={t("stocks_list.search_placeholder")}
                    value={search}
                    onChange={handleSearch}
                    className="text-md h-12 w-full sm:w-72 bg-background/50 backdrop-blur-md border-primary/20 focus:border-primary transition-all rounded-lg shadow-inner"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchStocks}
                  disabled={loading}
                  className="h-12 w-12 rounded-xl bg-background/50 backdrop-blur-md border-primary/20 hover:bg-primary/10 transition-all"
                >
                  <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div> */}
            </div>
          </div>

          {/* Market Stats Grid */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-md transition-all group">
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t("stocks_list.total_assets")}</CardTitle>
                  <Building2 className="h-4 w-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="text-3xl font-black text-foreground">{total}</div>
                <div className="text-[10px] text-green-500 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {t("stocks_list.live_database")}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-md transition-all group">
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t("stocks_list.exchanges")}</CardTitle>
                  <Globe className="h-4 w-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="text-3xl font-black text-foreground">{t("stocks_list.global")}</div>
                <div className="text-[10px] text-muted-foreground font-bold mt-1 uppercase">{t("stocks_list.markets_desc")}</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-md transition-all group">
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t("stocks_list.analysis_mode")}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="text-3xl font-black text-foreground">{t("stocks_list.active")}</div>
                <div className="text-[10px] text-primary font-bold mt-1 uppercase tracking-tighter">{t("stocks_list.support_resistance_live")}</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 shadow-sm hover:shadow-md transition-all group">
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t("stocks_list.update_freq")}</CardTitle>
                  <RefreshCw className="h-4 w-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="text-3xl font-black text-foreground">{t("stocks_list.real_time")}</div>
                <div className="text-[10px] text-muted-foreground font-bold mt-1 uppercase">{t("stocks_list.instant_price")}</div>
              </CardContent>
            </Card>
          </div> */}

          {/* Stocks Table Container */}
          <Card className="shadow-2xl border-primary/5 bg-card/30 backdrop-blur-xl overflow-hidden rounded-lg">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex h-96 flex-col items-center justify-center space-y-4">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BarChart3 className="h-5 w-5 text-primary/50" />
                    </div>
                  </div>
                  <p className="text-muted-foreground font-medium animate-pulse uppercase tracking-widest text-xs">{t("stocks_list.syncing")}</p>
                </div>
              ) : stocks.length === 0 ? (
                <div className="flex h-96 flex-col items-center justify-center text-muted-foreground text-center p-12 space-y-6">
                  <div className="p-6 bg-muted/20 rounded-full border border-muted/30">
                    <Search className="h-16 w-16 opacity-10" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-foreground">{t("stocks_list.no_assets")}</p>
                    <p className="text-sm max-w-xs mx-auto text-muted-foreground leading-relaxed">
                      {t("stocks_list.no_assets_desc")}
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => setSearch('')} className="rounded-xl">{t("stocks_list.clear_filters")}</Button>
                </div>
              ) : (
                <>
                  {/* Mobile card layout */}
                  <div className="md:hidden divide-y divide-primary/50 space-y-4">
                    {stocks.map((stock) => (
                      <div key={stock.id} className="p-4 space-y-4">
                        {/* Top row: symbol + price */}
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col">
                            <span className="font-black text-xl tracking-tighter text-foreground">
                              {stock.show_symbol ? stock.symbol : '*****'}
                            </span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Badge variant="outline" className="text-[9px] h-4 py-0 px-1 border-primary/20 text-primary uppercase font-black bg-primary/5">
                                {stock.exchange || t("stocks_list.live")}
                              </Badge>
                              <Badge className="text-white font-bold text-[9px] h-4 py-0 px-1 bg-muted/50 border border-border/20 uppercase">
                                {stock.sector || t("stocks_list.na")}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-black text-xl font-mono tracking-tighter text-foreground">
                              {stock.last_price ? formatUSD(stock.last_price) : '-'}
                            </div>
                            {stock.change_percent !== undefined && (
                              <div className={`text-[11px] font-bold ${stock.change_percent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {stock.change_percent >= 0 ? '▲' : '▼'} {Math.abs(stock.change_percent).toFixed(2)}%
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Support & Resistance */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <div className="flex flex-row sm:flex-col items-center justify-start gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg border border-green-500/20">
                              <span className="text-[12px] text-green-600/80 font-bold block leading-none">{t("stocks_list.primary_support")}:</span>
                              <span className="text-sm text-green-600 font-black font-mono tracking-tight">{stock.support1 ? formatUSD(stock.support1) : '-'}</span>
                            </div>
                            <div className="flex flex-row sm:flex-col items-center justify-start gap-2 px-3 py-1.5 bg-green-500/5 rounded-lg border border-green-500/10">
                              <span className="text-[12px] text-green-600/80 font-bold block leading-none">{t("stocks_list.secondary")}:</span>
                              <span className="text-sm text-green-600/70 font-bold font-mono tracking-tight">{stock.support2 ? formatUSD(stock.support2) : '-'}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex flex-row sm:flex-col items-center justify-start gap-2 px-3 py-1.5 bg-red-500/10 rounded-lg border border-red-500/20">
                              <span className="text-[12px] text-red-600/80 font-bold block leading-none">{t("stocks_list.primary_target")}:</span>
                              <span className="text-sm text-red-600 font-black font-mono tracking-tight">{stock.resistance1 ? formatUSD(stock.resistance1) : '-'}</span>
                            </div>
                            <div className="flex flex-row sm:flex-col items-center justify-start gap-2 px-3 py-1.5 bg-red-500/5 rounded-lg border border-red-500/10">
                              <span className="text-[12px] text-red-600/80 font-bold block leading-none">{t("stocks_list.secondary")}:</span>
                              <span className="text-sm text-red-600 font-bold font-mono tracking-tight">{stock.resistance2 ? formatUSD(stock.resistance2) : '-'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action button */}
                        <div className='w-full flex justify-end mt-8'>
                          <Button
                            variant="default"
                            size="sm"
                            className="w-auto rounded-lg font-bold bg-primary-foreground text-primary transition-all active:scale-95 border border-primary/30"
                            onClick={() => router.push(`/protected-routes/stock-result/${stock.symbol}`)}
                          >
                            {t("stocks_list.analysis_btn")}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop table layout */}
                  <div className="hidden md:block overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-muted/30 backdrop-blur-md">
                        <TableRow className="border-primary/5 hover:bg-transparent text-md">
                          <TableHead className="w-[140px] font-bold text-foreground h-14 pl-8 uppercase tracking-wider">{t("stocks_list.symbol")}</TableHead>
                          <TableHead className="font-bold text-foreground uppercase tracking-wider">{t("stocks_list.company_name")}</TableHead>
                          <TableHead className="font-bold text-foreground uppercase tracking-wider">{t("stocks_list.sector")}</TableHead>
                          <TableHead className="text-right font-bold text-foreground uppercase tracking-wider">{t("stocks_list.price_usd")}</TableHead>
                          <TableHead className="text-center font-bold text-foreground uppercase tracking-wider">{t("stocks_list.technical_support")}</TableHead>
                          <TableHead className="text-center font-bold text-foreground uppercase tracking-wider">{t("stocks_list.price_resistance")}</TableHead>
                          <TableHead className="text-right pr-8 font-bold text-foreground uppercase tracking-wider">{t("stocks_list.actions")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stocks.map((stock) => (
                          <TableRow key={stock.id} className="border-primary/5 hover:bg-primary/[0.03] transition-all group h-20">
                            <TableCell className="pl-8">
                              <div className="flex flex-col">
                                <span className="font-black text-lg tracking-tighter text-foreground group-hover:text-primary transition-colors">
                                  {stock.show_symbol ? stock.symbol : '*****'}
                                </span>
                                <Badge variant="outline" className="w-fit text-[9px] h-4 py-0 px-1 border-primary/20 text-primary uppercase font-black bg-primary/5">
                                  {stock.exchange || t("stocks_list.live")}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-bold text-foreground line-clamp-1 group-hover:underline underline-offset-4 decoration-primary/30">
                                  {stock.name}
                                </span>
                                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{stock.country || t("stocks_list.global_market")}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="text-white font-bold text-[10px] bg-muted/50 border border-border/20 uppercase">
                                {stock.sector || t("stocks_list.na")}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="font-black text-xl font-mono tracking-tighter text-foreground">
                                {stock.last_price ? formatUSD(stock.last_price) : '-'}
                              </div>
                              {stock.change_percent !== undefined && (
                                <div className={`text-[10px] font-bold ${stock.change_percent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                  {stock.change_percent >= 0 ? '▲' : '▼'} {Math.abs(stock.change_percent).toFixed(2)}%
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex flex-col items-center justify-center space-y-1">
                                <div className="px-3 py-1 bg-green-500/10 rounded-lg border border-green-500/20 w-32">
                                  <span className="text-[10px] text-green-600/70 font-bold block leading-none">{t("stocks_list.primary_support")}</span>
                                  <span className="text-[11px] text-green-600 font-black font-mono tracking-tight">{stock.support1 ? formatUSD(stock.support1) : '-'}</span>
                                </div>
                                <div className="px-3 py-1 bg-green-500/5 rounded-lg border border-green-500/10 w-32">
                                  <span className="text-[11px] text-green-600/50 font-bold block leading-none text-[8px]">{t("stocks_list.secondary")}</span>
                                  <span className="text-[11px] text-green-600/70 font-bold font-mono tracking-tight">{stock.support2 ? formatUSD(stock.support2) : '-'}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex flex-col items-center justify-center space-y-1">
                                <div className="px-3 py-1 bg-red-500/10 rounded-lg border border-red-500/20 w-32">
                                  <span className="text-[11px] text-red-600/70 font-bold block leading-none">{t("stocks_list.primary_target")}</span>
                                  <span className="text-[11px] text-red-600 font-black font-mono tracking-tight">{stock.resistance1 ? formatUSD(stock.resistance1) : '-'}</span>
                                </div>
                                <div className="px-3 py-1 bg-red-500/5 rounded-lg border border-red-500/10 w-32">
                                  <span className="text-[11px] text-red-600/50 font-bold block leading-none text-[8px]">{t("stocks_list.secondary")}</span>
                                  <span className="text-[11px] text-red-600/70 font-bold font-mono tracking-tight">{stock.resistance2 ? formatUSD(stock.resistance2) : '-'}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right pr-8">
                              <Button
                                variant="default"
                                size="sm"
                                className="rounded-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 px-4"
                                onClick={() => router.push(`/protected-routes/stock-result/${stock.symbol}`)}
                              >
                                {t("stocks_list.analysis_btn")}
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Luxury Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center mt-12 mb-8 scale-110">
              <Pagination
                filter={{ page, limit }}
                totalPage={totalPages}
                onPageChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
