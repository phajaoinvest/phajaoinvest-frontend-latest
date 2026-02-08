"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Bell, Mail, Smartphone, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useTranslation } from "@/lib/i18n"

export default function NotificationPreferencesPage() {
   const { t } = useTranslation()

   const [emailNotifications, setEmailNotifications] = useState({
      transactions: true,
      portfolio: true,
      news: false,
      promotions: false,
   })

   const [pushNotifications, setPushNotifications] = useState({
      priceAlerts: true,
      trades: true,
      news: true,
      system: true,
   })

   const [smsNotifications, setSmsNotifications] = useState({
      security: true,
      trades: false,
   })

   return (
      <div className="space-y-6">
         <div className="flex items-center space-x-4">
            <Link href="/dashboard/account-settings">
               <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
               </Button>
            </Link>
            <div>
               <h1 className="text-2xl font-semibold">{t("notif.title")}</h1>
               <p className="text-sm text-muted-foreground">{t("notif.subtitle")}</p>
            </div>
         </div>

         {/* Email Notifications */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>{t("notif.email_title")}</CardTitle>
                     <CardDescription>{t("notif.email_des")}</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">{t("notif.transaction_confirmations")}</div>
                     <div className="text-sm text-muted-foreground">{t("notif.transaction_confirmations_des")}</div>
                  </div>
                  <Switch
                     checked={emailNotifications.transactions}
                     onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, transactions: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">{t("notif.portfolio_updates")}</div>
                     <div className="text-sm text-muted-foreground">{t("notif.portfolio_updates_des")}</div>
                  </div>
                  <Switch
                     checked={emailNotifications.portfolio}
                     onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, portfolio: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">{t("notif.market_news")}</div>
                     <div className="text-sm text-muted-foreground">{t("notif.market_news_des")}</div>
                  </div>
                  <Switch
                     checked={emailNotifications.news}
                     onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, news: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">{t("notif.promotions")}</div>
                     <div className="text-sm text-muted-foreground">{t("notif.promotions_des")}</div>
                  </div>
                  <Switch
                     checked={emailNotifications.promotions}
                     onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, promotions: checked })}
                  />
               </div>
            </CardContent>
         </Card>

         {/* Push Notifications */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>{t("notif.push_title")}</CardTitle>
                     <CardDescription>{t("notif.push_des")}</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">{t("notif.price_alerts")}</div>
                     <div className="text-sm text-muted-foreground">{t("notif.price_alerts_des")}</div>
                  </div>
                  <Switch
                     checked={pushNotifications.priceAlerts}
                     onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, priceAlerts: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">{t("notif.trade_executions")}</div>
                     <div className="text-sm text-muted-foreground">{t("notif.trade_executions_des")}</div>
                  </div>
                  <Switch
                     checked={pushNotifications.trades}
                     onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, trades: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">{t("notif.breaking_news")}</div>
                     <div className="text-sm text-muted-foreground">{t("notif.breaking_news_des")}</div>
                  </div>
                  <Switch
                     checked={pushNotifications.news}
                     onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, news: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">{t("notif.system_notifications")}</div>
                     <div className="text-sm text-muted-foreground">{t("notif.system_notifications_des")}</div>
                  </div>
                  <Switch
                     checked={pushNotifications.system}
                     onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, system: checked })}
                  />
               </div>
            </CardContent>
         </Card>

         {/* SMS Notifications */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>{t("notif.sms_title")}</CardTitle>
                     <CardDescription>{t("notif.sms_des")}</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">{t("notif.security_alerts")}</div>
                     <div className="text-sm text-muted-foreground">{t("notif.security_alerts_des")}</div>
                  </div>
                  <Switch
                     checked={smsNotifications.security}
                     onCheckedChange={(checked) => setSmsNotifications({ ...smsNotifications, security: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">{t("notif.large_trades")}</div>
                     <div className="text-sm text-muted-foreground">{t("notif.large_trades_des")}</div>
                  </div>
                  <Switch
                     checked={smsNotifications.trades}
                     onCheckedChange={(checked) => setSmsNotifications({ ...smsNotifications, trades: checked })}
                  />
               </div>
            </CardContent>
         </Card>

         {/* Notification Schedule */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>{t("notif.quiet_hours")}</CardTitle>
                     <CardDescription>{t("notif.quiet_hours_des")}</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">{t("notif.enable_quiet_hours")}</div>
                     <div className="text-sm text-muted-foreground">{t("notif.enable_quiet_hours_des")}</div>
                  </div>
                  <Switch />
               </div>
            </CardContent>
         </Card>

         <div className="flex justify-end space-x-3">
            <Link href="/dashboard/account-settings">
               <Button variant="outline">{t("notif.cancel")}</Button>
            </Link>
            <Button>{t("notif.save")}</Button>
         </div>
      </div>
   )
}
