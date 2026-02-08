"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bell } from "lucide-react"

const notificationSettings = [
  {
    id: "price-alerts",
    title: "Price Alerts",
    description: "Get notified when stocks reach your target prices",
    enabled: true,
    category: "Trading",
  },
  {
    id: "order-updates",
    title: "Order Updates",
    description: "Notifications for order executions and status changes",
    enabled: true,
    category: "Trading",
  },
  {
    id: "market-news",
    title: "Market News",
    description: "Breaking news and market updates",
    enabled: false,
    category: "News",
  },
  {
    id: "earnings-reports",
    title: "Earnings Reports",
    description: "Earnings announcements for your watchlist stocks",
    enabled: true,
    category: "News",
  },
  {
    id: "account-security",
    title: "Account Security",
    description: "Login attempts and security-related notifications",
    enabled: true,
    category: "Security",
  },
  {
    id: "promotional",
    title: "Promotional Offers",
    description: "Special offers and platform updates",
    enabled: false,
    category: "Marketing",
  },
]

const categories = ["Trading", "News", "Security", "Marketing"]

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map((category) => (
          <div key={category} className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{category}</h3>
            <div className="space-y-4">
              {notificationSettings
                .filter((setting) => setting.category === category)
                .map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between space-x-2">
                    <div className="flex-1">
                      <Label htmlFor={setting.id} className="text-sm font-medium">
                        {setting.title}
                      </Label>
                      <p className="text-xs text-muted-foreground">{setting.description}</p>
                    </div>
                    <Switch id={setting.id} defaultChecked={setting.enabled} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
