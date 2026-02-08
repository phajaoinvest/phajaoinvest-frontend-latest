import { NewsFilters } from "@/components/dashboard/news-filters"
import { NewsFeed } from "@/components/dashboard/news-feed"
import { TrendingNews } from "@/components/dashboard/trending-news"

export default function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Market News</h1>
      </div>

      <NewsFilters />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <NewsFeed />
        </div>
        <div>
          <TrendingNews />
        </div>
      </div>
    </div>
  )
}
