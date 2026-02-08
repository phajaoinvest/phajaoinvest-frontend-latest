"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, User, TrendingUp, CreditCard, Calendar, FileText, Clock } from "lucide-react"

export default function BillingPage() {
  const [isDownloading, setIsDownloading] = useState(false)

  // Mock data - in real app this would come from the form submission
  const billingData = {
    transactionId: "TXN-" + Date.now(),
    applicationDate: new Date().toLocaleDateString(),
    status: "Pending Review",

    // User Information
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+856 2078856194",
      address: "123 Main Street, Vientiane, Laos",
      nationality: "Laos",
    },

    // Investment Information
    investment: {
      amount: "$50,000 - $99,999",
      tier: "Silver",
      expectedReturns: "18%",
      period: "3 Years",
      riskTolerance: "Moderate",
      goals: "Long-term Wealth Building",
    },

    // Payment Information
    payment: {
      method: "Bank Transfer",
      reference: "INV-John-" + Date.now(),
      bankName: "Banque Pour Le Commerce Exterieur Lao",
      accountNumber: "1234567890",
    },
  }

  const handleDownloadPDF = () => {
    setIsDownloading(true)
    // Simulate PDF generation
    setTimeout(() => {
      setIsDownloading(false)
      // In real app, this would generate and download actual PDF
      const element = document.createElement("a")
      element.href =
        "data:text/plain;charset=utf-8," +
        encodeURIComponent("Investment Application Receipt - " + billingData.transactionId)
      element.download = `investment-receipt-${billingData.transactionId}.txt`
      element.click()
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Success Header */}
        <section className="py-12 px-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-green-900 dark:text-green-100 mb-2">
              Application Submitted Successfully!
            </h1>
            <p className="text-xl text-green-700 dark:text-green-300 max-w-2xl mx-auto">
              Your guaranteed returns investment application has been received and is under review
            </p>
            <Badge
              variant="secondary"
              className="mt-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
            >
              <Clock className="h-4 w-4 mr-1" />
              {billingData.status}
            </Badge>
          </div>
        </section>

        {/* Billing Details */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Transaction Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Transaction Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transaction ID:</span>
                        <span className="font-mono font-semibold">{billingData.transactionId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Application Date:</span>
                        <span>{billingData.applicationDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          {billingData.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Processing Time:</span>
                        <span>24-48 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Investment Tier:</span>
                        <Badge className="bg-gradient-to-r from-gray-400 to-gray-600 text-white">
                          {billingData.investment.tier}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expected Returns:</span>
                        <span className="font-semibold text-green-600">
                          {billingData.investment.expectedReturns} annually
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block">Full Name</span>
                        <span className="font-semibold">{billingData.user.name}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Email Address</span>
                        <span>{billingData.user.email}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Phone Number</span>
                        <span>{billingData.user.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block">Nationality</span>
                        <span className="capitalize">{billingData.user.nationality}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Address</span>
                        <span>{billingData.user.address}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Investment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Investment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block">Investment Amount</span>
                        <span className="font-semibold text-lg">{billingData.investment.amount}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Investment Period</span>
                        <span>{billingData.investment.period}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Risk Tolerance</span>
                        <span className="capitalize">{billingData.investment.riskTolerance}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block">Investment Goals</span>
                        <span>{billingData.investment.goals}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Guaranteed Returns</span>
                        <span className="font-semibold text-green-600 text-lg">
                          {billingData.investment.expectedReturns} per year
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Investment Tier</span>
                        <Badge className="bg-gradient-to-r from-gray-400 to-gray-600 text-white">
                          {billingData.investment.tier} Plan
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block">Payment Method</span>
                        <span className="font-semibold">{billingData.payment.method}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Bank Name</span>
                        <span>{billingData.payment.bankName}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground block">Account Number</span>
                        <span className="font-mono">{billingData.payment.accountNumber}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Payment Reference</span>
                        <span className="font-mono text-sm">{billingData.payment.reference}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                    <Calendar className="h-5 w-5" />
                    What Happens Next?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-blue-800 dark:text-blue-200">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold mt-0.5">
                        1
                      </div>
                      <div>
                        <p className="font-semibold">Application Review (24-48 hours)</p>
                        <p className="text-sm">Our investment team will review your application and payment proof</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold mt-0.5">
                        2
                      </div>
                      <div>
                        <p className="font-semibold">Account Setup & Confirmation</p>
                        <p className="text-sm">
                          You'll receive login credentials and investment account details via email
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold mt-0.5">
                        3
                      </div>
                      <div>
                        <p className="font-semibold">Investment Activation</p>
                        <p className="text-sm">
                          Your guaranteed returns investment will begin generating profits immediately
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download Receipt */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <FileText className="h-5 w-5" />
                      <span>Download your application receipt for your records</span>
                    </div>
                    <Button
                      onClick={handleDownloadPDF}
                      disabled={isDownloading}
                      className="flex items-center gap-2"
                      size="lg"
                    >
                      <Download className="h-4 w-4" />
                      {isDownloading ? "Generating PDF..." : "Download Receipt (PDF)"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
