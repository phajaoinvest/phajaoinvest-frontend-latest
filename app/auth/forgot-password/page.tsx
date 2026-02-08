"use client"

import * as Yup from "yup"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useFormik } from "formik"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, ArrowLeft, Mail, CheckCircle2, Loader, PlusIcon } from "lucide-react"

// API and utils
import { postAPI } from "@/app/api/api";
import { useToast } from "@/app/utils/toast";
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n"
import Header from "@/components/header"

export default function ForgotPasswordPage() {
   const router = useRouter();
   const { t } = useTranslation()
   const [isSubmitted, setIsSubmitted] = useState(false)
   const { errorMessage, successMessage } = useToast();

   const formik = useFormik({
      initialValues: {
         email: "",
      },
      validationSchema: Yup.object({
         email: Yup.string().email("Invalid email").required("Email is required"),
      }),
      onSubmit: async (values, { resetForm, setSubmitting }) => {
         try {
            let formattedData;
            formattedData = {
               email: values.email,
            };
            const res = await postAPI({
               url: "/customers/forgot-password",
               body: formattedData,
            });

            if (res?.status_code === 200 && res?.is_error === false) {
               successMessage(t("forgot.success_message"), 2000);
               resetForm();
               setIsSubmitted(true);
               router.push("/auth/reset-password?email=" + values.email);
            } else {
               errorMessage(res?.message, 2000);
            }
         } catch (err) {
            errorMessage(t("forgot.error_message"), 2000);
         } finally {
            setSubmitting(false);
         }
      },
   });

   if (isSubmitted) {
      return (
         <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
               <div className="w-full max-w-md">
                  <Card>
                     <CardHeader className="text-center">
                        <div className="text-center">
                           <Link href="/" className="inline-flex items-center space-x-2">
                              <TrendingUp className="h-8 w-8 text-primary" />
                              <span className="text-xl font-bold">Pha Jao Invest</span>
                           </Link>
                        </div>
                        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                           <CheckCircle2 className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-md">{t("forgot.success_title")}</CardTitle>
                        <CardDescription className="text-sm">
                           {t("forgot.success_description")} <span className="font-medium text-foreground">{formik.values.email}</span>
                        </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                           <p className="text-sm text-muted-foreground">
                              {t("forgot.success_description1")}
                           </p>
                           <p className="text-sm text-muted-foreground">
                              {t("forgot.success_description2")}{" "}
                              <button onClick={() => setIsSubmitted(false)} className="text-primary hover:underline font-medium">
                                 {t("forgot.success_try_again")}
                              </button>
                              .
                           </p>
                        </div>

                        <Button asChild className="w-full text-sm">
                           <Link href="/auth/login">
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              {t("forgot.back_login")}
                           </Link>
                        </Button>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </>
      )
   }

   return (
      <>
         <Header />
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
            <div className="w-full max-w-md">
               <Card>
                  <CardHeader className="text-center">
                     <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary" />
                     </div>
                     <CardTitle className="text-md">{t("forgot.title")}</CardTitle>
                     <CardDescription className="text-sm">{t("forgot.description")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                           <Label className="text-sm">
                              {t("login.email")} <span className="text-rose-500">*</span>
                           </Label>
                           <Input
                              type="email"
                              name="email"
                              placeholder={t("login.email_placeholder")}
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              required
                              className="text-sm"
                           />
                        </div>
                        {formik.errors.email && (
                           <label className="text-xs text-red-500">{formik.errors.email}</label>
                        )}
                        <Button
                           type="submit"
                           disabled={formik.isSubmitting}
                           className="flex items-center gap-2 w-full text-sm"
                        >
                           {formik.isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <PlusIcon className="h-4 w-4" />}
                           {formik.isSubmitting ? t("forgot.sending") : t("forgot._get_link")}
                        </Button>

                        <Button asChild variant="ghost" className="w-full text-sm">
                           <Link href="/auth/login">
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              {t("forgot.back_login")}
                           </Link>
                        </Button>
                     </form>
                  </CardContent>
               </Card>
            </div>
         </div>
      </>
   )
}
