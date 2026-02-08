"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Plus, Download, Calendar } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

export default function BillingPaymentPage() {
   const { t } = useTranslation()

   const paymentMethods = [
      {
         id: 1,
         type: "Visa",
         last4: "4242",
         expiry: "12/25",
         isDefault: true,
      },
      {
         id: 2,
         type: "Mastercard",
         last4: "8888",
         expiry: "08/26",
         isDefault: false,
      },
   ]

   const billingHistory = [
      {
         id: "INV-2024-001",
         date: "Jan 15, 2024",
         description: "Premium Membership - Monthly",
         amount: "$29.99",
         status: "Paid",
      },
      {
         id: "INV-2023-012",
         date: "Dec 15, 2023",
         description: "Premium Membership - Monthly",
         amount: "$29.99",
         status: "Paid",
      },
      {
         id: "INV-2023-011",
         date: "Nov 15, 2023",
         description: "Premium Membership - Monthly",
         amount: "$29.99",
         status: "Paid",
      },
      {
         id: "INV-2023-010",
         date: "Oct 15, 2023",
         description: "Stock Analysis Report",
         amount: "$49.99",
         status: "Paid",
      },
   ]

   return (
      <div className="space-y-6">
         <div className="flex items-center space-x-4">
            <Link href="/dashboard/account-settings">
               <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
               </Button>
            </Link>
            <div>
               <h1 className="text-2xl font-semibold">{t("bill.title")}</h1>
               <p className="text-sm text-muted-foreground">{t("bill.subtitle")}</p>
            </div>
         </div>

         {/* Current Plan */}
         <Card>
            <CardHeader>
               <div className="flex items-center justify-between">
                  <div>
                     <CardTitle>{t("bill.current_plan")}</CardTitle>
                     <CardDescription>{t("bill.subscription_details")}</CardDescription>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">{t("bill.active")}</Badge>
               </div>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                     <div>
                        <div className="font-semibold text-lg">{t("bill.premium_membership")}</div>
                        <div className="text-sm text-muted-foreground">{t("bill.billed_monthly")}</div>
                     </div>
                     <div className="text-right">
                        <div className="font-semibold text-2xl">$29.99</div>
                        <div className="text-sm text-muted-foreground">{t("bill.per_month")}</div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{t("bill.next_billing")}</span>
                     </div>
                     <Button variant="outline" size="sm">
                        {t("bill.change_plan")}
                     </Button>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Payment Methods */}
         <Card>
            <CardHeader>
               <div className="flex items-center justify-between">
                  <div>
                     <CardTitle>{t("bill.payment_methods")}</CardTitle>
                     <CardDescription>{t("bill.manage_payments")}</CardDescription>
                  </div>
                  <Button size="sm">
                     <Plus className="h-4 w-4 mr-2" />
                     {t("bill.add_new")}
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="space-y-3">
               {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                     <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                           <CreditCard className="h-6 w-6 text-white" />
                        </div>
                        <div>
                           <div className="font-medium flex items-center space-x-2">
                              <span>
                                 {method.type} •••• {method.last4}
                              </span>
                              {method.isDefault && (
                                 <Badge variant="outline" className="text-xs">
                                    {t("bill.default")}
                                 </Badge>
                              )}
                           </div>
                           <div className="text-sm text-muted-foreground">{t("bill.expires")} {method.expiry}</div>
                        </div>
                     </div>
                     <div className="flex items-center space-x-2">
                        {!method.isDefault && (
                           <Button variant="ghost" size="sm">
                              {t("bill.set_default")}
                           </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-destructive">
                           {t("bill.remove")}
                        </Button>
                     </div>
                  </div>
               ))}
            </CardContent>
         </Card>

         {/* Billing History */}
         <Card>
            <CardHeader>
               <CardTitle>{t("bill.billing_history")}</CardTitle>
               <CardDescription>{t("bill.history_des")}</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-3">
                  {billingHistory.map((invoice) => (
                     <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                           <div className="font-medium">{invoice.description}</div>
                           <div className="text-sm text-muted-foreground">
                              {invoice.date} • {invoice.id}
                           </div>
                        </div>
                        <div className="flex items-center space-x-4">
                           <div className="text-right">
                              <div className="font-semibold">{invoice.amount}</div>
                              <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                                 {invoice.status}
                              </Badge>
                           </div>
                           <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Billing Address */}
         <Card>
            <CardHeader>
               <CardTitle>{t("bill.billing_address")}</CardTitle>
               <CardDescription>{t("bill.address_des")}</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="p-4 border rounded-lg space-y-1">
                  <div className="font-medium">John Smith</div>
                  <div className="text-sm text-muted-foreground">123 Main Street</div>
                  <div className="text-sm text-muted-foreground">New York, NY 10001</div>
                  <div className="text-sm text-muted-foreground">United States</div>
               </div>
               <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  {t("bill.update_address")}
               </Button>
            </CardContent>
         </Card>

         <div className="flex justify-end space-x-3">
            <Link href="/dashboard/account-settings">
               <Button variant="outline">{t("bill.back_to_settings")}</Button>
            </Link>
         </div>
      </div>
   )
}
