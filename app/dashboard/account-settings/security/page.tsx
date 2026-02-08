"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Key, Smartphone } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "@/lib/i18n"

export default function SecuritySettingsPage() {
   const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
   const [biometricEnabled, setBiometricEnabled] = useState(true)
   const { t } = useTranslation()

   return (
      <div className="space-y-6">
         <div className="flex items-center space-x-4">
            <Link href="/dashboard/account-settings" className="border border-yellow-500 rounded-md hover:border hover:border-green-500">
               <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
               </Button>
            </Link>
            <div>
               <h1 className="text-lg font-semibold">{t("sec.title")}</h1>
               <p className="text-sm text-muted-foreground">{t("sec.subtitle")}</p>
            </div>
         </div>

         {/* Change Password */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Key className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle className="text-md">{t("sec.change_password")}</CardTitle>
                     <CardDescription>{t("sec.change_password_des")}</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="current-password">{t("sec.current_password")}</Label>
                  <Input id="current-password" type="password" placeholder={t("sec.current_password_placeholder")} />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="new-password">{t("sec.new_password")}</Label>
                  <Input id="new-password" type="password" placeholder={t("sec.new_password_placeholder")} />
                  <p className="text-xs text-muted-foreground">
                     {t("sec.password_hint")}
                  </p>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t("sec.confirm_password")}</Label>
                  <Input id="confirm-password" type="password" placeholder={t("sec.confirm_password_placeholder")} />
               </div>
               <Button className="w-full sm:w-auto">{t("sec.update_password")}</Button>
            </CardContent>
         </Card>

         {/* Two-Factor Authentication */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                     <CardTitle className="text-md">{t("sec.two_factor")}</CardTitle>
                     <CardDescription>{t("sec.two_factor_des")}</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="text-sm font-medium">{t("sec.authenticator_app")}</div>
                     <div className="text-sm text-muted-foreground">
                        {t("sec.authenticator_app_des")}
                     </div>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
               </div>

               {twoFactorEnabled && (
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                     <p className="text-sm font-medium">{t("sec.setup_instructions")}</p>
                     <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                        <li>{t("sec.setup_step_1")}</li>
                        <li>{t("sec.setup_step_2")}</li>
                        <li>{t("sec.setup_step_3")}</li>
                     </ol>
                     <div className="flex justify-center py-4">
                        <div className="w-48 h-48 bg-white border-2 rounded-lg flex items-center justify-center">
                           <p className="text-xs text-muted-foreground">{t("sec.qr_placeholder")}</p>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="verification-code">{t("sec.verification_code")}</Label>
                        <Input id="verification-code" placeholder={t("sec.verification_code_placeholder")} maxLength={6} />
                     </div>
                     <Button className="w-full">{t("sec.verify_enable")}</Button>
                  </div>
               )}

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium text-sm">{t("sec.sms_auth")}</div>
                     <div className="text-sm text-muted-foreground">{t("sec.sms_auth_des")}</div>
                  </div>
                  <Switch />
               </div>
            </CardContent>
         </Card>

         {/* Biometric Authentication */}
         {/* <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>Biometric Authentication</CardTitle>
                     <CardDescription>Use fingerprint or face recognition for quick access</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Enable Biometric Login</div>
                     <div className="text-sm text-muted-foreground">Use your device's biometric features to log in</div>
                  </div>
                  <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
               </div>
            </CardContent>
         </Card> */}

         {/* Login History */}
         {/* <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>Recent Login Activity</CardTitle>
                     <CardDescription>Monitor your account access history</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="space-y-3">
                  {[
                     { device: "Chrome on Windows", location: "New York, USA", time: "2 hours ago", current: true },
                     { device: "Safari on iPhone", location: "New York, USA", time: "1 day ago", current: false },
                     { device: "Chrome on MacOS", location: "Los Angeles, USA", time: "3 days ago", current: false },
                  ].map((login, index) => (
                     <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                           <div className="font-medium flex items-center space-x-2">
                              <span>{login.device}</span>
                              {login.current && (
                                 <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Current</span>
                              )}
                           </div>
                           <div className="text-sm text-muted-foreground">
                              {login.location} • {login.time}
                           </div>
                        </div>
                        {!login.current && (
                           <Button variant="ghost" size="sm" className="text-destructive">
                              Revoke
                           </Button>
                        )}
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card> */}

         <div className="flex justify-end space-x-3">
            <Link href="/dashboard/account-settings">
               <Button variant="outline">{t("sec.cancel")}</Button>
            </Link>
            <Button>{t("sec.save")}</Button>
         </div>
      </div>
   )
}
