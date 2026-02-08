"use client"

import * as Yup from "yup"
import Link from "next/link"
import { useState } from "react"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import { useToast } from "@/app/utils/toast"
import { useTranslation } from "@/lib/i18n"
import { ArrowLeft, Building2, CheckCircle2, Loader, Plus, QrCode, Send, Upload } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { uploadFileToBunnyCDN } from "@/app/utils/upload"
import { postAPI } from "@/app/api/api"

export default function TopUpPage() {
   const router = useRouter()
   const { t } = useTranslation()
   const { errorMessage, successMessage } = useToast();
   const [isUpload, setIsUpload] = useState<boolean>(true);
   const [isSuccess, setIsSuccess] = useState<boolean>(false);
   const [paymentMethod, setPaymentMethod] = useState<string>("qr");
   const quickAmounts = [100, 500, 1000, 5000, 10000]

   const formik = useFormik({
      initialValues: {
         payment_amount: 0,
         payment_slip_url: null as File | null,
      },
      validationSchema: Yup.object({
         payment_amount: Yup.string().required(t("topup.amount_required")),
         payment_slip_url: Yup.mixed<File>()
            .required(t("topup.voucher_required"))
            .test("fileType", t("topup.file_type_error"), (value) => {
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

            let formattedData;
            formattedData = {
               amount: Number(values.payment_amount),
               payment_slip: url,
            };

            console.log("Amount::", values.payment_amount);
            console.log("Payment voucher:::", url);

            const res = await postAPI({
               url: "/wallets/topup",
               body: formattedData,
            });

            if (res?.status_code === 200 && res?.is_error === false) {
               successMessage(t("topup.success_toast"), 2000);
               resetForm();
               setIsSuccess(true)
            } else {
               errorMessage(t("topup.error_toast"), 2000);
            }

         } catch (err) {
            errorMessage(t("topup.submit_failed"), 2000);
         } finally {
            setSubmitting(false);
         }
      },
   });

   const handleFileUpload = (field: string, file: File | null) => {
      formik.setFieldValue(field, file);
   };

   if (isSuccess) {
      return (
         <div className="flex items-center justify-center min-h-[500px]">
            <Card className="max-w-3xl w-full border-0 shadow-lg">
               <CardContent className="p-12 text-center space-y-4 border">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                     <CheckCircle2 className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h2 className="text-md font-bold">{t("topup.success_title")}</h2>
                  <div>
                     <p className="text-sm text-muted-foreground mb-2">
                        {t("topup.success_des")}
                     </p>
                     <p className="text-sm text-muted-foreground mb-2">
                        {t("topup.success_note")}
                     </p>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                     <Button
                        size="lg"
                        variant="outline"
                        type="button"
                        className="border border-primary hover:bg-primary"
                        onClick={() => router.push("/dashboard/international-portfolio")}
                     >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        {t("topup.back_to_stock")}
                     </Button>
                     <Button
                        size="lg"
                        type="button"
                        variant="default"
                        onClick={() => setIsSuccess(false)}
                     >
                        <Plus className="h-4 w-4 mr-1" />
                        {t("topup.add_more")}
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      )
   }

   return (
      <form onSubmit={formik.handleSubmit} className="max-w-3xl mx-auto">
         <div className="hidden sm:block mb-6">
            <Button variant="ghost" size="sm" asChild>
               <Link href="/dashboard/international-portfolio">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {t("topup.back_to_portfolio")}
               </Link>
            </Button>
         </div>

         <Card className="border-0 shadow-sm">
            <CardHeader className="p-0">
               <CardTitle className="text-sm sm:text-md">{t("topup.title")}</CardTitle>
               <p className="text-xs sm:text-sm text-muted-foreground">{t("topup.subtitle")}</p>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
               <div className="space-y-2">
                  <Label htmlFor="amount">{t("topup.amount_label")} <span className="text-rose-500">*</span></Label>
                  <Input
                     id="amount"
                     type="string"
                     placeholder={t("topup.amount_placeholder")}
                     value={formik.values.payment_amount}
                     onChange={formik.handleChange}
                     className="text-lg"
                  />
                  {formik.errors.payment_amount && (
                     <label className="text-xs text-red-500">{formik.errors.payment_amount}</label>
                  )}
               </div>
               <div className="flex gap-2 my-4">
                  {quickAmounts.map((quickAmount) => {
                     const isActive = formik.values.payment_amount === quickAmount;

                     return (
                        <Button
                           key={quickAmount}
                           size="sm"
                           type="button"
                           variant={isActive ? "default" : "outline"}
                           className={`flex-1 border ${isActive
                              ? "bg-primary text-white border-primary"
                              : "border-primary text-primary hover:bg-primary/10"
                              }`}
                           onClick={() => formik.setFieldValue("payment_amount", quickAmount)}
                        >
                           ${quickAmount}
                        </Button>
                     );
                  })}
               </div>

               {!isUpload ?
                  <Card>
                     <CardHeader>
                        <CardTitle className="text-sm font-light flex items-center gap-2">
                           <Upload className="w-5 h-5" />
                           {t("topup.upload_proof")}
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="space-y-4">
                           <div className="space-y-1">
                              <Label htmlFor="payment_slip_url">
                                 {t("topup.slip_label")} <span className="text-rose-500">*</span>
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
                                 {t("topup.slip_hint")}
                              </p>
                              {formik.errors.payment_slip_url && (
                                 <label className="text-xs text-red-500">{formik.errors.payment_slip_url}</label>
                              )}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
                  :
                  <div>
                     <div className="grid grid-cols-2 gap-4">
                        <Card
                           className={`p-0 cursor-pointer transition-all ${paymentMethod === "qr" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                              }`}
                           onClick={() => setPaymentMethod("qr")}
                        >
                           <CardContent className="py-3 text-center">
                              <QrCode className="w-4 sm:w-5 h-4 sm:h-5 mx-auto text-primary mb-2" />
                              <h3 className="text-xs sm:text-sm font-semibold">{t("topup.qr_title")}</h3>
                              <p className="hidden sm:block text-xs text-foreground/70">{t("topup.qr_des")}</p>
                           </CardContent>
                        </Card>

                        <Card
                           className={`cursor-pointer transition-all ${paymentMethod === "bank" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                              }`}
                           onClick={() => setPaymentMethod("bank")}
                        >
                           <CardContent className="py-3 text-center">
                              <Building2 className="w-4 sm:w-5 h-4 sm:h-5 mx-auto mb-2 text-primary" />
                              <h3 className="text-xs sm:text-sm font-semibold">{t("topup.bank_title")}</h3>
                              <p className="hidden sm:block text-xs text-foreground/70">{t("topup.bank_des")}</p>
                           </CardContent>
                        </Card>
                     </div>

                     {paymentMethod === "qr" && (
                        <div className="text-center p-6 bg-muted/30 rounded-lg">
                           <div className="w-52 h-52 mx-auto mb-4 rounded-lg flex items-center justify-center border">
                              <img src="/images/dollar-qr.jpeg" alt="" className="rounded-md" />
                           </div>
                           <p className="text-sm mb-2">{t("topup.scan_qr")}</p>
                           <p className="text-sm text-muted-foreground">
                              {t("topup.total_amount")} <span className="font-semibold text-primary">${formik.values.payment_amount}</span>
                           </p>
                           <p className="text-sm text-muted-foreground">
                              {t("topup.fee")} <span className="font-semibold text-primary">$6</span>
                           </p>
                        </div>
                     )}

                     {paymentMethod === "bank" && (
                        <div className="p-6 bg-muted/30 rounded-lg">
                           <h3 className="text-sm font-semibold mb-4">{t("topup.bank_details")}</h3>
                           <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                 <span className="text-sm text-muted-foreground">{t("topup.bank_name")}</span>
                                 <span className="font-semibold">Lao Development Bank (LDB)</span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-sm text-muted-foreground">{t("topup.account_number")}</span>
                                 <span className="font-semibold">0351001410000168</span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-sm text-muted-foreground">{t("topup.account_name")}</span>
                                 <span className="font-semibold">PAOKUE SAOLONG</span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-sm text-muted-foreground">{t("topup.amount")}</span>
                                 <span className="font-semibold text-primary">${formik.values.payment_amount}</span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-sm text-muted-foreground">{t("topup.fee")}</span>
                                 <span className="font-semibold text-primary">$6</span>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               }

               <div className="flex items-center justify-end">
                  {isUpload && <Button
                     onClick={() => setIsUpload(false)}
                     disabled={!formik.values.payment_amount}
                     size="lg"
                  >
                     {t("topup.upload_proof")}
                  </Button>
                  }
                  {!isUpload &&
                     <Button
                        type="submit"
                        disabled={!formik.values.payment_amount
                           || !formik.values.payment_slip_url || formik.isSubmitting}
                        size="lg"
                        className="flex text-white"
                     >
                        {formik.isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        {formik.isSubmitting ? t("topup.submitting") : t("topup.submit")}
                     </Button>
                  }
               </div>
            </CardContent>
         </Card>
      </form>
   )
}
