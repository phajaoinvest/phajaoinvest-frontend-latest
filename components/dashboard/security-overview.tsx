"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, Lock, Smartphone } from "lucide-react"

const securityItems = [
  {
    title: "Two-Factor Authentication",
    status: "enabled",
    description: "SMS and authenticator app enabled",
    icon: Smartphone,
  },
  {
    title: "Password Strength",
    status: "strong",
    description: "Last updated 30 days ago",
    icon: Lock,
  },
  {
    title: "Login Notifications",
    status: "enabled",
    description: "Email alerts for new device logins",
    icon: CheckCircle,
  },
  {
    title: "Account Verification",
    status: "verified",
    description: "Identity and bank account verified",
    icon: Shield,
  },
]

export function SecurityOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Security Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {securityItems.map((item) => (
            <div key={item.title} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
              <div className="p-2 bg-primary/10 rounded-lg">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{item.title}</span>
                  <Badge
                    variant={
                      item.status === "enabled" || item.status === "verified" || item.status === "strong"
                        ? "default"
                        : "destructive"
                    }
                    className="text-xs"
                  >
                    {item.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">Security Score: Excellent</span>
          </div>
          <p className="text-xs text-green-700 dark:text-green-300 mt-1">
            Your account has strong security measures in place. Keep up the good work!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
