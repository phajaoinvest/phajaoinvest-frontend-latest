"use client"

import * as Yup from "yup"
import { useState } from "react"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import { CreditCard, CheckCircle, TrendingUp, Calendar, Upload, Clock, Check, Download, ArrowLeft, ChevronRight, Send, QrCode, Building2, HandCoins, Loader } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// api and utils
import { postAPI } from "@/app/api/api"
import { useToast } from "@/app/utils/toast"
import { useTranslation } from "@/lib/i18n"
import { uploadFileToBunnyCDN } from "@/app/utils/upload"

export default function GuaranteedReturnsPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { errorMessage, successMessage } = useToast();
  const [currentStep, setCurrentStep] = useState(1)
  const [isDownloading, setIsDownloading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "bank">("qr")

  const steps = [
    {
      id: 1,
      title: t("invest.step1_title"),
      description: t("invest.step1_des"),
      icon: TrendingUp,
    },
    {
      id: 2,
      title: t("invest.step2_title"),
      description: t("invest.step2_des"),
      icon: CreditCard,
    },
    {
      id: 3,
      title: t("invest.step3_title"),
      description: t("invest.step3_des"),
      icon: Check,
    },
  ]

  const billingData = {
    transactionId: "TXN-" + Date.now(),
    applicationDate: new Date().toLocaleDateString(),
    status: t("invest.pending_review"),
    investment: {
      amount: "$50,000 - $99,999",
      tier: "Silver",
      expectedReturns: "18%",
      period: "3 Years",
      riskTolerance: "Moderate",
      goals: "Long-term Wealth Building",
    }
  }

  const handleFileUpload = (field: string, file: File | null) => {
    formik.setFieldValue(field, file);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDownloadPDF = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      const element = document.createElement("a")
      element.href =
        "data:text/plain;charset=utf-8," +
        encodeURIComponent("Investment Application Receipt - " + billingData.transactionId)
      element.download = `investment-receipt-${billingData.transactionId}.txt`
      element.click()
    }, 2000)
  }

  const formik = useFormik({
    initialValues: {
      amount: 0,
      investmentPeriod: "",
      riskTolerance: "",
      investmentGoals: "",
      additionalNotes: "",
      payment_slip: null as File | null,
    },
    validationSchema: Yup.object({
      amount: Yup.number().required("Investment amount is required!"),
      investmentPeriod: Yup.string().required("Investment period is required!"),
      riskTolerance: Yup.string().required("Risk tolerance is required!"),
      investmentGoals: Yup.string().required("Investment goals is required!"),
      payment_slip: Yup.mixed<File>()
        .required("Payment slip/voucher is required!")
        .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
          if (!value) return false;
          return ["application/pdf", "image/jpeg", "image/png"].includes((value as File).type);
        }),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const payment_slip = values.payment_slip;
        if (!(payment_slip instanceof File)) {
          throw new Error("Payment slip must be a file.");
        }

        const buffer = Buffer.from(await payment_slip.arrayBuffer());
        const url = await uploadFileToBunnyCDN(buffer, payment_slip.name, payment_slip.type);

        let formattedData;
        formattedData = {
          amount: Number(values.amount),
          requested_investment_period: values.investmentPeriod,
          requested_risk_tolerance: values.riskTolerance,
          requested_investment_goal: values.investmentGoals,
          payment_slip_url: url,
          customer_notes: values.additionalNotes,
        };
        const res = await postAPI({
          url: "/investment-requests",
          body: formattedData,
        });

        if (res?.status_code === 200 && res?.is_error === false) {
          successMessage(t("invest.submit_success"), 2000);
          resetForm();
          setCurrentStep(3);
        } else {
          errorMessage(res?.message, 2000);
        }
      } catch (err) {
        errorMessage(t("invest.submit_failed"), 2000);
      } finally {
        setSubmitting(false);
      }
    },
  });


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center flex-col p-4 rounded-lg space-y-2">
        <div className="flex items-center justify-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-lg font-bold">{t("invest.new_title")}</h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          {t("invest.new_des")}
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center justify-center space-x-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border ${currentStep >= step.id
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-muted-foreground text-muted-foreground"
                  }`}
              >
                {currentStep > step.id ? <CheckCircle className="text-black h-4 w-4" /> : <step.icon className="text-white h-4 w-4" />}
              </div>
              <h2
                className={`text-sm font-normal flex items-center justify-center gap-2 ${currentStep === step.id ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}
              >
                {step.title}
              </h2>
            </div>
          ))}
        </div>
        <Progress value={(currentStep / steps.length) * 100} className="mb-4" />
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {currentStep === 1 && (
          <Card>
            <CardContent className="space-y-6 py-8">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="amount">
                    {t("invest.amount_label")} <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    placeholder={t("invest.amount_placeholder")}
                  />
                  <Input
                    type="hidden"
                    name="service_type"
                    value="guaranteed_returns"
                  />
                  {formik.errors.amount && (
                    <label className="text-xs text-red-500">{formik.errors.amount}</label>
                  )}
                </div>
                <div>
                  <Label htmlFor="investmentPeriod">{t("invest.period_label")} <span className="text-rose-500">*</span></Label>
                  <Select
                    name="investmentPeriod"
                    value={formik.values.investmentPeriod}
                    onValueChange={(value) => formik.setFieldValue("investmentPeriod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("invest.period_placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{t("invest.period_1")}</SelectItem>
                      <SelectItem value="2">{t("invest.period_2")}</SelectItem>
                      <SelectItem value="3">{t("invest.period_3")}</SelectItem>
                      <SelectItem value="5">{t("invest.period_5")}</SelectItem>
                      <SelectItem value="10">{t("invest.period_10")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.errors.investmentPeriod && (
                    <label className="text-xs text-red-500">{formik.errors.investmentPeriod}</label>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="riskTolerance">{t("invest.risk_label")} <span className="text-rose-500">*</span></Label>
                  <Select
                    name="riskTolerance"
                    value={formik.values.riskTolerance}
                    onValueChange={(value) => formik.setFieldValue("riskTolerance", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("invest.risk_placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">{t("invest.risk_conservative")}</SelectItem>
                      <SelectItem value="moderate">{t("invest.risk_moderate")}</SelectItem>
                      <SelectItem value="aggressive">{t("invest.risk_aggressive")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.errors.riskTolerance && (
                    <label className="text-xs text-red-500">{formik.errors.riskTolerance}</label>
                  )}
                </div>
                <div>
                  <Label htmlFor="investmentGoals">{t("invest.goals_label")} <span className="text-rose-500">*</span></Label>
                  <Select
                    name="investmentGoals"
                    value={formik.values.investmentGoals}
                    onValueChange={(value) => formik.setFieldValue("investmentGoals", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t("invest.goals_placeholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wealth-building">{t("invest.goal_wealth")}</SelectItem>
                      <SelectItem value="retirement">{t("invest.goal_retirement")}</SelectItem>
                      <SelectItem value="income">{t("invest.goal_income")}</SelectItem>
                      <SelectItem value="preservation">{t("invest.goal_preservation")}</SelectItem>
                      <SelectItem value="education">{t("invest.goal_education")}</SelectItem>
                      <SelectItem value="other">{t("invest.goal_other")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.errors.investmentGoals && (
                    <label className="text-xs text-red-500">{formik.errors.investmentGoals}</label>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="additionalNotes">{t("invest.notes_label")}</Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formik.values.additionalNotes}
                  onChange={formik.handleChange}
                  placeholder={t("invest.notes_placeholder")}
                  rows={4}
                  className="text-xs"
                />
                {formik.errors.additionalNotes && (
                  <label className="text-xs text-red-500">{formik.errors.additionalNotes}</label>
                )}
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-3">
                  <HandCoins className="h-8 w-8 text-yellow-600 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="text-md font-semibold text-primary">{t("invest.rates_title")}</h4>
                    <ul className="text-sm text-white space-y-2">
                      <li>{t("invest.rate_bronze")}</li>
                      <li>{t("invest.rate_silver")}</li>
                      <li>{t("invest.rate_gold")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardContent className="space-y-6 py-8">
              <div className="grid grid-cols-2 gap-4">
                <Card
                  className={`p-0 cursor-pointer transition-all ${paymentMethod === "qr" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                  onClick={() => setPaymentMethod("qr")}
                >
                  <CardContent className="py-3 text-center">
                    <QrCode className="w-4 sm:w-5 h-4 sm:h-5 mx-auto text-primary mb-2" />
                    <h3 className="text-xs sm:text-sm font-semibold">{t("invest.qr_payment")}</h3>
                    <p className="hidden sm:block text-xs text-foreground/70">{t("invest.qr_des")}</p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${paymentMethod === "bank" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                  onClick={() => setPaymentMethod("bank")}
                >
                  <CardContent className="py-3 text-center">
                    <Building2 className="w-4 sm:w-5 h-4 sm:h-5 mx-auto mb-2 text-primary" />
                    <h3 className="text-xs sm:text-sm font-semibold">{t("invest.bank_transfer")}</h3>
                    <p className="hidden sm:block text-xs text-foreground/70">{t("invest.bank_des")}</p>
                  </CardContent>
                </Card>
              </div>

              {paymentMethod === "qr" && (
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <div className="w-52 h-52 mx-auto mb-4 rounded-lg flex items-center justify-center border">
                    <img src="/images/dollar-qr.jpeg" alt="" className="rounded-md" />
                  </div>
                  <p className="text-sm mb-2">{t("invest.scan_qr")}</p>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="p-6 bg-muted/30 rounded-lg">
                  <h3 className="text-sm font-semibold mb-4">{t("invest.bank_details")}</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{t("invest.bank_name_label")}</span>
                      <span className="font-semibold">Lao Development Bank (LDB)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{t("invest.account_number_label")}</span>
                      <span className="font-semibold">0351001410000168</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">{t("invest.account_name_label")}</span>
                      <span className="font-semibold">PAOKUE SAOLONG</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="paymentProof">{t("invest.upload_proof")} *</Label>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-5 h-5 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">{t("invest.click_upload")}</span> {t("invest.payment_receipt")}
                        </p>
                        <p className="text-xs text-muted-foreground">{t("invest.file_types")}</p>
                      </div>
                      <Input
                        id="payment_slip"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload(
                            "payment_slip",
                            e.target.files?.[0] || null
                          )
                        }
                        className="hidden cursor-pointer"
                      />
                    </label>
                  </div>
                  {formik.errors.payment_slip && (
                    <label className="text-xs text-red-500 mt-6">{formik.errors.payment_slip}</label>
                  )}
                </div>
              </div>


              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-md font-semibold text-blue-900 dark:text-blue-100">{t("invest.timeline_title")}</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      {t("invest.timeline_des")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <div className="border rounded-md">
            <section className="py-4 px-4 dark:to-emerald-950/20">
              <div className="container mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h1 className="text-sm font-bold text-green-900 dark:text-green-500 mb-2">
                  {t("invest.success_title")}
                </h1>
                <p className="text-sm text-green-700 dark:text-green-400 max-w-2xl mx-auto">
                  {t("invest.success_des")}
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

            <section className="py-12 px-4 space-y-4">
              <div className="space-y-8">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    onClick={() => router.push("/dashboard/guaranteed-returns")}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft />{t("invest.back_to_invest")}
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {isDownloading ? t("invest.generating_pdf") : t("invest.download_receipt")}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("invest.previous")}
          </Button>

          {currentStep < 2 ? (
            <Button
              onClick={handleNext} className="flex items-center gap-2"
              disabled={!formik.values.amount || !formik.values.investmentPeriod || !formik.values.riskTolerance || !formik.values.investmentGoals}
            >
              {t("invest.next")}
              <ChevronRight />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!formik.values.payment_slip || formik.isSubmitting}
              className="flex items-center gap-2"
            >
              {formik.isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {formik.isSubmitting ? t("invest.submitting") : t("invest.submit")}
            </Button>
          )}
        </div>
      </form>
    </div >
  )
}
