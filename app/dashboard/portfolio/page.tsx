import { PortfolioChart } from "@/components/dashboard/portfolio-chart"
import { PortfolioHoldings } from "@/components/dashboard/portfolio-holdings"
import { PortfolioAnalytics } from "@/components/dashboard/portfolio-analytics"
import { AssetAllocation } from "@/components/dashboard/asset-allocation"

export default function PortfolioPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Portfolio</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PortfolioChart />
          <PortfolioHoldings />
        </div>
        <div className="space-y-6">
          <PortfolioAnalytics />
          <AssetAllocation />
        </div>
      </div>
    </div>
  )
}
