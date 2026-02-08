"use client"

import * as Yup from "yup"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useFormik } from "formik"
import { useRouter, useSearchParams } from "next/navigation"
import { TrendingUp, Eye, EyeOff, CheckCircle2, Lock, Loader } from "lucide-react"

// components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// API and utils
import { postAPI } from "@/app/api/api"
import { useToast } from "@/app/utils/toast"
import { useTranslation } from "@/lib/i18n"
import Header from "@/components/header"

export default function ResetPasswordPage() {
   const router = useRouter()
   const { t } = useTranslation()
   const searchParams = useSearchParams()
   const email = searchParams.get("email")
   const { errorMessage, successMessage } = useToast();

   const [isSuccess, setIsSuccess] = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const [confirmPassword, setConfirmPassword] = useState("")
   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

   const formik = useFormik({
      initialValues: {
         otp: "",
         password: "",
         email: email,
      },
      validationSchema: Yup.object({
         otp: Yup.string()
            .required("OTP is required!")
            .length(6, "OTP must be exactly 6 digits"),
         password: Yup.string()
            .required("New password is required!")
            .test(
               "is-strong",
               "Password must be at least 10 characters, include one uppercase, one lowercase, and one number.",
               (value) => {
                  if (!value) return false;
                  return (
                     value.length >= 10 &&
                     /[a-z]/.test(value) &&
                     /[A-Z]/.test(value) &&
                     /\d/.test(value)
                  );
               }
            ),
      }),
      onSubmit: async (values, { resetForm, setSubmitting }) => {
         if (values.password !== confirmPassword) {
            errorMessage("Your passwords do not match!", 2000);
            return;
         }
         try {
            const formattedData = {
               new_password: values.password,
               otp: values.otp.toString(),
               email: email,
            };
            const res = await postAPI({
               url: "/customers/reset-password/otp",
               body: formattedData,
            });

            if (res?.status_code === 200 && res?.is_error === false) {
               successMessage(t("reset.success_title"), 2000);
               resetForm();
               setIsSuccess(true);
               router.push("/auth/login");
            } else {
               errorMessage(res?.message, 2000);
            }
         } catch (err) {
            errorMessage(t("reset.error_message"), 2000);
         } finally {
            setSubmitting(false);
         }
      },
   });


   if (isSuccess) {
      return (
         <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
               <div className="w-full max-w-md">
                  <div className="text-center mb-8">
                     <Link href="/" className="inline-flex items-center space-x-2 mb-6">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">Phajaoinvest</span>
                     </Link>
                  </div>

                  <Card>
                     <CardHeader className="text-center">
                        <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                           <CheckCircle2 className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-md">{t("reset.success_title")}</CardTitle>
                        <CardDescription className="text-sm">
                           {t("reset.success_description")}
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <Button asChild className="w-full text-sm">
                           <Link href="/auth/login">{t("reset.continue_login")}</Link>
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
                        <Lock className="h-6 w-6 text-primary" />
                     </div>
                     <CardTitle className="text-md">{t("reset.title1")}</CardTitle>
                     <CardDescription className="text-sm">{t("reset.description")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="otp" className="text-sm">
                              {t("reset.otp")} <span className="text-rose-500">*</span>
                           </Label>
                           <div className="relative">
                              <Input
                                 required
                                 id="otp"
                                 type="number"
                                 name="otp"
                                 className="text-sm pr-10"
                                 value={formik.values.otp}
                                 onChange={formik.handleChange}
                                 placeholder={t("reset.otp_placeholder")}
                              />
                           </div>
                           {formik.errors.otp && (
                              <label className="text-xs text-red-500">{formik.errors.otp}</label>
                           )}
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="password" className="text-sm">
                              {t("reset.new_password")} <span className="text-rose-500">*</span>
                           </Label>
                           <div className="relative">
                              <Input
                                 required
                                 id="password"
                                 name="password"
                                 className="text-sm pr-10"
                                 value={formik.values.password}
                                 onChange={formik.handleChange}
                                 type={showPassword ? "text" : "password"}
                                 placeholder="Passw0rd!#"
                              />
                              <Button
                                 type="button"
                                 variant="ghost"
                                 size="sm"
                                 className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                 onClick={() => setShowPassword(!showPassword)}
                              >
                                 {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                 ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                 )}
                              </Button>
                           </div>
                           {formik.errors.password && (
                              <label className="text-xs text-red-500">{formik.errors.password}</label>
                           )}
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="confirmPassword" className="text-sm">
                              {t("reset.con_new_password")} <span className="text-rose-500">*</span>
                           </Label>
                           <div className="relative">
                              <Input
                                 required
                                 id="confirmPassword"
                                 value={confirmPassword}
                                 className="text-sm pr-10"
                                 placeholder="Passw0rd!#"
                                 type={showConfirmPassword ? "text" : "password"}
                                 onChange={(e) => setConfirmPassword(e.target.value)}
                              />
                              <Button
                                 type="button"
                                 variant="ghost"
                                 size="sm"
                                 className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                 {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                 ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                 )}
                              </Button>
                           </div>
                        </div>

                        <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                           <p className="text-xs font-medium">{t("reset.password_warning_title")}:</p>
                           <ul className="text-xs text-muted-foreground space-y-1">
                              <li className="flex items-center gap-2">
                                 <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                                 {t("reset.password_warning1")}
                              </li>
                              <li className="flex items-center gap-2">
                                 <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                                 {t("reset.password_warning2")}
                              </li>
                              <li className="flex items-center gap-2">
                                 <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                                 {t('reset.password_warning3')}
                              </li>
                           </ul>
                        </div>

                        <Button type="submit" className="w-full text-sm" disabled={formik.isSubmitting}>
                           {formik.isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : ""}
                           {formik.isSubmitting ? t("reset.reseting") : t("reset.reset")}
                        </Button>

                        <div className="text-center">
                           <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                              {t("reset.send_otp")}
                           </Link>
                        </div>
                     </form>
                  </CardContent>
               </Card>
            </div>
         </div >
      </>
   )
}
