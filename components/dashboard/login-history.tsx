"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, MapPin, Clock, Shield } from "lucide-react"

const loginHistory = [
  {
    id: "1",
    device: "MacBook Pro",
    location: "New York, NY",
    ip: "192.168.1.1",
    time: "2024-01-15 09:30 AM",
    status: "success",
    current: true,
    deviceType: "desktop",
  },
  {
    id: "2",
    device: "iPhone 15 Pro",
    location: "New York, NY",
    ip: "192.168.1.2",
    time: "2024-01-14 06:45 PM",
    status: "success",
    current: false,
    deviceType: "mobile",
  },
  {
    id: "3",
    device: "Chrome Browser",
    location: "San Francisco, CA",
    ip: "203.0.113.1",
    time: "2024-01-12 02:15 PM",
    status: "failed",
    current: false,
    deviceType: "desktop",
  },
  {
    id: "4",
    device: "Safari Browser",
    location: "New York, NY",
    ip: "192.168.1.1",
    time: "2024-01-10 11:20 AM",
    status: "success",
    current: false,
    deviceType: "desktop",
  },
]

export function LoginHistory() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Login History
          </CardTitle>
          <Button variant="outline" size="sm">
            <Shield className="h-4 w-4 mr-1" />
            Security Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loginHistory.map((login) => (
            <div key={login.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-muted rounded-lg">
                  {login.deviceType === "mobile" ? (
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Monitor className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{login.device}</span>
                    {login.current && (
                      <Badge variant="default" className="text-xs">
                        Current Session
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {login.location}
                    </div>
                    <span>IP: {login.ip}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm">{login.time}</div>
                <Badge variant={login.status === "success" ? "default" : "destructive"} className="text-xs mt-1">
                  {login.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Security Notice</span>
          </div>
          <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
            If you notice any suspicious login attempts, please change your password immediately and contact support.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
