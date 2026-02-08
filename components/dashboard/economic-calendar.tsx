"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, AlertCircle } from "lucide-react"

const economicEvents = [
  {
    id: "1",
    time: "08:30 AM",
    event: "Non-Farm Payrolls",
    country: "US",
    impact: "high",
    forecast: "185K",
    previous: "199K",
    date: "Today",
  },
  {
    id: "2",
    time: "10:00 AM",
    event: "Consumer Price Index",
    country: "US",
    impact: "high",
    forecast: "3.2%",
    previous: "3.1%",
    date: "Today",
  },
  {
    id: "3",
    time: "02:00 PM",
    event: "Federal Reserve Speech",
    country: "US",
    impact: "medium",
    forecast: "-",
    previous: "-",
    date: "Today",
  },
  {
    id: "4",
    time: "09:00 AM",
    event: "GDP Growth Rate",
    country: "EU",
    impact: "high",
    forecast: "0.8%",
    previous: "0.6%",
    date: "Tomorrow",
  },
]

export function EconomicCalendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Economic Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {economicEvents.map((event) => (
            <div key={event.id} className="p-4 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium">{event.event}</span>
                    <Badge
                      variant={
                        event.impact === "high" ? "destructive" : event.impact === "medium" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {event.impact}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {event.country} • {event.date} at {event.time}
                  </div>
                </div>
                {event.impact === "high" && <AlertCircle className="h-4 w-4 text-red-500" />}
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Forecast:</span>
                  <span className="ml-1 font-medium">{event.forecast}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Previous:</span>
                  <span className="ml-1 font-medium">{event.previous}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
