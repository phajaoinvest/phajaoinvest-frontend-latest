"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, RefreshCw, Rss } from "lucide-react"

export function NewsFilters() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search news..." className="pl-8 text-sm" />
            </div>

            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="earnings">Earnings</SelectItem>
                <SelectItem value="economic">Economic Policy</SelectItem>
                <SelectItem value="corporate">Corporate News</SelectItem>
                <SelectItem value="market">Market Analysis</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="crypto">Cryptocurrency</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="marketwatch">MarketWatch</SelectItem>
                <SelectItem value="reuters">Reuters</SelectItem>
                <SelectItem value="bloomberg">Bloomberg</SelectItem>
                <SelectItem value="cnbc">CNBC</SelectItem>
                <SelectItem value="wsj">Wall Street Journal</SelectItem>
                <SelectItem value="ft">Financial Times</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="today">
              <SelectTrigger>
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              More Filters
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Rss className="h-4 w-4 mr-1" />
              RSS Feed
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <span className="text-sm text-muted-foreground">Active Filters:</span>
          <Badge variant="secondary" className="text-xs">
            All Categories
          </Badge>
          <Badge variant="secondary" className="text-xs">
            Today
          </Badge>
          <Badge variant="secondary" className="text-xs">
            All Sources
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
