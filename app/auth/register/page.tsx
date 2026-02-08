"use client"

import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n"
import { Eye, EyeOff, LoaderCircle } from "lucide-react"

// libs and utils
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/app/utils/toast"

// components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { IRegisterCredentials } from "@/interfaces/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"

export default function RegisterPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { register } = useAuth()
  const { isErrorMessage, isSuccessMessage } = useToast();

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [formData, setFormData] = useState<IRegisterCredentials>({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    address: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== confirmPassword) {
      isErrorMessage(t("register.error_message1"), 2000)
      return
    }
    try {
      setIsLoading(true)
      const success = await register(formData);
      if (success) {
        isSuccessMessage(t("register.success_message"), 2000)
        router.push("/auth/login")
      } else {
        isErrorMessage(t("register.error_message2"), 2000)
      }
    } catch (error) {
      isErrorMessage(t("register.error_message2"), 2000)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
        <div className="w-full max-w-xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="hidden sm:block text-md">{t("register.title")}</CardTitle>
              <CardDescription className="hidden sm:block text-sm">{t("register.description")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-sm">
                      {t("register.first_name")} <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="first_name"
                      placeholder={t("register.first_name_placeholder")}
                      value={formData.first_name}
                      onChange={(e) => handleInputChange("first_name", e.target.value)}
                      required
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-sm">
                      {t("register.last_name")} <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="last_name"
                      placeholder={t("register.last_name_placeholder")}
                      value={formData.last_name}
                      onChange={(e) => handleInputChange("last_name", e.target.value)}
                      required
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm">
                      {t("register.username")}<span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="username"
                      type="username"
                      placeholder={t("register.username_placeholder")}
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      required
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm">
                      {t("login.email")}<span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("login.email_placeholder")}
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm">
                      {t("login.password")} <span className="text-rose-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("login.password_placeholder")}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
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

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm">
                      {t("register.confirm_password")}<span className="text-rose-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t("register.confirm_password_placeholder")}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="text-sm pr-10"
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm">
                    {t("register.address")}<span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    type="address"
                    placeholder={t("register.address_placeholder")}
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    className="text-sm"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={() => setAgreeToTerms(!agreeToTerms)}
                  />
                  <Label htmlFor="terms" className="text-xs text-muted-foreground">
                    {t("register.agree")}{" "}
                    <Link href="/terms" className="text-primary underline">
                      {t("register.terms_service")}
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary underline">
                      {t("register.privacy_policy")}
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="flex items-center justify-center w-full text-sm text-white" disabled={!agreeToTerms || isLoading}>
                  {isLoading && <LoaderCircle className="w-4 h-4 animate-spin" />}
                  {isLoading ? t("register.creating") : t("register.create_account")}
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  {t("register.already_has_account")}{" "}&nbsp;
                  <Link href="/auth/login" className="text-primary hover:underline">
                    {t("login.login")}
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
