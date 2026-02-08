"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings, Mail, Bell, Lock } from "lucide-react"

const securitySettings = [
  {
    id: "login-notifications",
    title: "Login Notifications",
    description: "Get notified when someone logs into your account",
    enabled: true,
  },
  {
    id: "suspicious-activity",
    title: "Suspicious Activity Alerts",
    description: "Alert me of unusual account activity",
    enabled: true,
  },
  {
    id: "password-expiry",
    title: "Password Expiry Reminders",
    description: "Remind me to change my password every 90 days",
    enabled: false,
  },
  {
    id: "device-notifications",
    title: "New Device Notifications",
    description: "Notify me when a new device is used to access my account",
    enabled: true,
  },
]

export function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {securitySettings.map((setting) => (
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

        <div className="space-y-3 pt-4 border-t border-border">
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            <Mail className="h-4 w-4 mr-2" />
            Update Email Address
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            <Bell className="h-4 w-4 mr-2" />
            Notification Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
