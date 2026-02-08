"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useTranslation } from "@/lib/i18n"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, LoaderCircle } from "lucide-react"

// libs and utils
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/app/utils/toast"

// components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function LoginPage() {
  const { login } = useAuth()
  const { t } = useTranslation()
  const { isErrorMessage, isSuccessMessage } = useToast();
  const searchParams = useSearchParams()
  const redirectParam = searchParams.get("redirect")

  console.log("redirectParam:", redirectParam);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const success = await login(email, password)
      if (success) {
        isSuccessMessage(t("login.success_message"), 1000)
        // Small delay to ensure cookie is set before redirect
        await new Promise(resolve => setTimeout(resolve, 100))
        if (redirectParam) {
          window.location.href = redirectParam
        } else {
          window.location.href = "/dashboard"
        }
      } else {
        isErrorMessage(t("login.error_message"), 1000)
      }
    } catch (error) {
      isErrorMessage(t("login.error_message"), 1000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-md">{t("login.title")}</CardTitle>
              <CardDescription className="text-sm">{t("login.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">
                    {t("login.email")} <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    required
                    id="email"
                    type="email"
                    placeholder={t("login.email_placeholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm">
                    {t("login.password")} <span className="text-rose-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      required
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder={t("login.password_placeholder")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-sm pr-10"
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
                </div>

                <div className="flex items-center justify-between">
                  <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                    {t("login.forgot_password")}
                  </Link>
                </div>

                <Button type="submit" className="flex items-center justify-center w-full text-sm text-white" disabled={isLoading}>
                  {isLoading && <LoaderCircle className="w-4 h-4 animate-spin" />}
                  {isLoading ? t("login.loging_in") : t("login.login")}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  {t("login.no_account")}{" "}&nbsp;
                  <Link href="/auth/register" className="text-primary hover:underline">
                    {t("login.sign_up")}
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
