"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Shield, QrCode } from "lucide-react"

export function TwoFactorAuth() {
  const [isEnabled, setIsEnabled] = useState(true)
  const [showSetup, setShowSetup] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Smartphone className="h-5 w-5 mr-2" />
          Two-Factor Authentication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm">Authenticator App</div>
            <div className="text-xs text-muted-foreground">Google Authenticator, Authy, etc.</div>
          </div>
          <Badge variant={isEnabled ? "default" : "secondary"} className="text-xs">
            {isEnabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm">SMS Authentication</div>
            <div className="text-xs text-muted-foreground">+1 (555) ***-**89</div>
          </div>
          <Badge variant="default" className="text-xs">
            Enabled
          </Badge>
        </div>

        {!showSetup ? (
          <div className="space-y-2">
            <Button variant="outline" size="sm" onClick={() => setShowSetup(true)} className="w-full">
              <QrCode className="h-4 w-4 mr-2" />
              Setup New Device
            </Button>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View Recovery Codes
            </Button>
          </div>
        ) : (
          <div className="space-y-4 p-4 border border-border rounded-lg">
            <div className="text-center">
              <div className="w-32 h-32 bg-muted mx-auto rounded-lg flex items-center justify-center mb-4">
                <QrCode className="h-16 w-16 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">Scan this QR code with your authenticator app</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verification-code" className="text-sm">
                Verification Code
              </Label>
              <Input
                id="verification-code"
                placeholder="Enter 6-digit code"
                className="text-center text-sm"
                maxLength={6}
              />
            </div>

            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">
                Verify & Enable
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowSetup(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Security Tip</span>
          </div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
            Enable 2FA on all your accounts for maximum security. Keep your recovery codes in a safe place.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
