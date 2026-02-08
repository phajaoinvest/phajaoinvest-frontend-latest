"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const allocations = [
  { category: "Technology", value: 45.2, color: "bg-blue-500" },
  { category: "Healthcare", value: 18.7, color: "bg-green-500" },
  { category: "Financial", value: 15.3, color: "bg-yellow-500" },
  { category: "Consumer", value: 12.1, color: "bg-purple-500" },
  { category: "Energy", value: 5.4, color: "bg-red-500" },
  { category: "Other", value: 3.3, color: "bg-gray-500" },
]

export function AssetAllocation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allocations.map((allocation) => (
            <div key={allocation.category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{allocation.category}</span>
                <span className="font-medium">{allocation.value}%</span>
              </div>
              <Progress value={allocation.value} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-muted/30 rounded-lg">
          <div className="text-xs text-muted-foreground mb-2">Recommendation</div>
          <div className="text-sm">
            Consider rebalancing your technology allocation. Current exposure is above recommended 40% threshold.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
