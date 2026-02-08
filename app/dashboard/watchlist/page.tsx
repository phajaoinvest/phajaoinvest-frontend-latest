import { WatchlistTable } from "@/components/dashboard/watchlist-table"
import { WatchlistStats } from "@/components/dashboard/watchlist-stats"
import { AddToWatchlist } from "@/components/dashboard/add-to-watchlist"

export default function WatchlistPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Watchlist</h1>
        <AddToWatchlist />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <WatchlistTable />
        </div>
        <div>
          <WatchlistStats />
        </div>
      </div>
    </div>
  )
}
