"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { BarChart3 } from "lucide-react"

export function TradingPreferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          Trading Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">Default Order Type</Label>
          <Select defaultValue="market">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market">Market Order</SelectItem>
              <SelectItem value="limit">Limit Order</SelectItem>
              <SelectItem value="stop">Stop Order</SelectItem>
              <SelectItem value="stop-limit">Stop-Limit Order</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Default Order Duration</Label>
          <Select defaultValue="day">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day Order</SelectItem>
              <SelectItem value="gtc">Good Till Cancelled</SelectItem>
              <SelectItem value="ioc">Immediate or Cancel</SelectItem>
              <SelectItem value="fok">Fill or Kill</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="default-quantity" className="text-sm">
            Default Quantity
          </Label>
          <Input id="default-quantity" type="number" defaultValue="100" className="text-sm" />
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex-1">
              <Label htmlFor="confirm-orders" className="text-sm font-medium">
                Confirm Orders
              </Label>
              <p className="text-xs text-muted-foreground">Require confirmation before placing orders</p>
            </div>
            <Switch id="confirm-orders" defaultChecked={true} />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex-1">
              <Label htmlFor="auto-refresh" className="text-sm font-medium">
                Auto-refresh Quotes
              </Label>
              <p className="text-xs text-muted-foreground">Automatically update stock prices</p>
            </div>
            <Switch id="auto-refresh" defaultChecked={true} />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex-1">
              <Label htmlFor="extended-hours" className="text-sm font-medium">
                Extended Hours Trading
              </Label>
              <p className="text-xs text-muted-foreground">Allow trading outside regular market hours</p>
            </div>
            <Switch id="extended-hours" defaultChecked={false} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
