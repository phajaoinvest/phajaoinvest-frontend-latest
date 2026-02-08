"use client"

import * as Yup from "yup"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import {
  Clock,
  QrCode,
  Upload,
  Loader,
  Download,
  ArrowLeft,
  Building2,
  ArrowRight,
  CreditCard,
  CheckCircle,
} from "lucide-react"
import { useFormik } from "formik"

// components
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// API and utils
import { postAPI } from "../api/api"
import { useToast } from "../utils/toast"
import { useTranslation } from "@/lib/i18n"
import { uploadFileToBunnyCDN } from "../utils/upload"

export default function PaymentPage() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const { errorMessage, successMessage } = useToast();

  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "bank">("qr")

  const steps = [
    { id: 1, title: t("stock_pick.step1_title"), description: t("stock_pick.step1_des") },
    { id: 2, title: t("stock_pick.step2_title"), description: t("stock_pick.step2_des") },
    { id: 3, title: t("stock_pick.step3_title"), description: t("stock_pick.step3_des") },
  ]

  const planId = searchParams.get("id") || ""
  const renew = searchParams.get("renew") || ""
  const planPrice = Number(searchParams.get("price")) || 99
  const planName = searchParams.get("plan") || "Premium Plan"
  const duration = Number(searchParams.get("duration_months")) || ""

  const handleFileUpload = (field: string, file: File | null) => {
    formik.setFieldValue(field, file);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const downloadReceipt = () => {
    const receiptContent = `
      PAYMENT RECEIPT
      ================

      Plan: ${planName}
      Price: ${planPrice}
      Status: Pending Approval
      Date: ${new Date().toLocaleDateString()}

      Thank you for your payment!
      Your subscription will be activated once approved by our admin team.
    `

    const blob = new Blob([receiptContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `receipt-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formik = useFormik({
    initialValues: {
      service_type: "premium_membership",
      package_id: "",
      payment_slip_url: null as File | null,
      payment_slip_filename: "",
      payment_amount: 0,
      payment_reference: ""
    },
    validationSchema: Yup.object({
      payment_slip_url: Yup.mixed<File>()
        .required(t("stock_pick.voucher_require"))
        .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
          if (!value) return false;
          return ["application/pdf", "image/jpeg", "image/png"].includes((value as File).type);
        }),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const payment_slip_url = values.payment_slip_url;
        if (!(payment_slip_url instanceof File)) {
          throw new Error("Files are not valid");
        }

        const buffer = Buffer.from(await payment_slip_url.arrayBuffer());
        const url = await uploadFileToBunnyCDN(buffer, payment_slip_url.name, payment_slip_url.type);

        const payment_slip = {
          payment_slip_url: url,
          payment_slip_filename: payment_slip_url.name,
          payment_amount: planPrice,
          payment_reference: payment_slip_url.name
        }

        let formattedData;
        if (renew && duration) {
          formattedData = {
            duration: duration,
            fee: planPrice,
          }
        } else {
          formattedData = {
            service_type: "premium_membership",
            package_id: planId,
            payment_slip,
          };
        }
        const res = await postAPI({
          url: renew && duration ? "/customers/services/subscriptions/renew" : "/customers/services/premium-membership/apply",
          body: formattedData,
        });

        if (res?.status_code === 200 && res?.is_error === false) {
          setCurrentStep(currentStep + 1)
          successMessage(t("stock_pick.payment_success"), 2000);
          resetForm();
        } else {
          errorMessage(res?.message, 2000);
        }
      } catch (err) {
        errorMessage(t("stock_pick.payment_failed"), 2000);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-0 sm:px-4 py-6 sm:py-16 mt-16">
          <div className="text-center mb-6 space-y-1">
            <h1 className="text-md font-bold text-primary">{t("stock_pick.payment_title")}</h1>
          </div>

          <div className="flex justify-center mb-6 sm:mb-12">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center justify-between">
                  <div className="flex items-center flex-col sm:flex-row">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border ${currentStep >= step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground text-muted-foreground"
                        }`}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-semibold">{step.id}</span>
                      )}
                    </div>
                    <div className="ml-0 sm:ml-3 mt-2 sm:mt-0">
                      <p
                        className={`text-xs sm:text-sm font-medium ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                          }`}
                      >
                        {step.title}
                      </p>
                      <p className="hidden sm:block text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && <ArrowRight className="w-5 h-5 text-muted-foreground mx-4" />}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="max-w-4xl mx-auto space-y-4">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-light flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    {t("stock_pick.choose_pay_method")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card
                      className={`p-0 cursor-pointer transition-all ${paymentMethod === "qr" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                      onClick={() => setPaymentMethod("qr")}
                    >
                      <CardContent className="py-3 text-center">
                        <QrCode className="w-4 sm:w-5 h-4 sm:h-5 mx-auto text-primary mb-2" />
                        <h3 className="text-xs sm:text-sm font-semibold">{t("stock_pick.qr_method")}</h3>
                        <p className="hidden sm:block text-xs text-foreground/70">{t("stock_pick.qr_method_des")}</p>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all ${paymentMethod === "bank" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                        }`}
                      onClick={() => setPaymentMethod("bank")}
                    >
                      <CardContent className="py-3 text-center">
                        <Building2 className="w-4 sm:w-5 h-4 sm:h-5 mx-auto mb-2 text-primary" />
                        <h3 className="text-xs sm:text-sm font-semibold">{t("stock_pick.bank_method")}</h3>
                        <p className="hidden sm:block text-xs text-foreground/70">{t("stock_pick.bank_method_des")}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {paymentMethod === "qr" && (
                    <div className="text-center p-6 bg-muted/30 rounded-lg">
                      <div className="w-52 h-52 mx-auto mb-4 rounded-lg flex items-center justify-center border">
                        <img src="/images/dollar-qr.jpeg" alt="" className="rounded-md" />
                      </div>
                      <p className="text-sm mb-2">{t("stock_pick.qr_method_des2")}</p>
                      <p className="text-sm text-muted-foreground">
                        {t("stock_pick.total_amount")}: <span className="font-semibold text-primary">${planPrice}</span>
                      </p>
                    </div>
                  )}

                  {paymentMethod === "bank" && (
                    <div className="p-6 bg-muted/30 rounded-lg">
                      <h3 className="text-sm font-semibold mb-4">{t("stock_pick.bank_account_detail")}</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{t("stock_pick.bank_name")}:</span>
                          <span className="font-semibold">Lao Development Bank (LDB) </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{t("stock_pick.bank_account_number")}:</span>
                          <span className="font-semibold">0351001410000168</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{t("stock_pick.bank_account_name")}:</span>
                          <span className="font-semibold">PAOKUE SAOLONG</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">{t("stock_pick.amount")}:</span>
                          <span className="font-semibold text-primary">${planPrice}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-light flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    {t("stock_pick.payment_upload_title")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="payment_slip_url">
                        {t("stock_pick.payment_voucher_title")} <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        id="payment_slip_url"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload(
                            "payment_slip_url",
                            e.target.files?.[0] || null
                          )
                        }
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("stock_pick.payment_voucher_des")}
                      </p>
                      {formik.errors.payment_slip_url && (
                        <label className="text-xs text-red-500">{formik.errors.payment_slip_url}</label>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader className="text-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-2 border border-primary">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-sm">{t("stock_pick.payment_success_title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-4 py-2 px-4">
                      <Clock className="w-4 h-4 mr-2" />
                      {t("stock_pick.payment_status")}
                    </Badge>
                    <p className="text-sm font-light text-muted-foreground">
                      {t("stock_pick.payment_status_des")}
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-full gap-4">
                    <div className="flex items-center jsutify-center gap-2 w-full sm:w-1/2">
                      <Button variant="outline" asChild className="w-auto flex-1 hover:border hover:border-primary hover:bg-transparent">
                        <Link href="/"><ArrowLeft className="w-4 h-4" />&nbsp;{t("stock_pick.return_to_home")}</Link>
                      </Button>
                      <Button onClick={downloadReceipt} className="w-auto flex items-center gap-2 flex-1">
                        <Download className="w-4 h-4" />
                        {t("stock_pick.download_receipt")}
                      </Button>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-center text-sm text-muted-foreground gap-2">
                    <p>
                      {t("stock_pick.need_help")}{" "}
                    </p>
                    <Link href="/support" className="text-primary hover:underline">
                      {t("stock_pick.contact_support")}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-end gap-4">
              {currentStep === 2 &&
                <Button variant="outline" onClick={handleBack} className="flex items-center gap-2 bg-transparent">
                  <ArrowLeft className="w-4 h-4" />
                  {t("stock_pick.back")}
                </Button>
              }
              {currentStep === 1 && <Button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2"
              >
                {t("stock_pick.next")}
                <ArrowRight className="w-4 h-4" />
              </Button>
              }

              {currentStep === 2 &&
                <Button
                  type="submit"
                  disabled={formik.isSubmitting || !formik.values.payment_slip_url}
                  className="text-white flex items-center gap-2"
                >
                  {formik.isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : ""}
                  {formik.isSubmitting ? t("stock_pick.sending") : t("stock_pick.submit")}
                </Button>
              }
            </div>
          </form>
        </div>
      </main >
      <Footer />
    </div >
  )
}
