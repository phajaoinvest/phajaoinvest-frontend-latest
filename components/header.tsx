"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/i18n"
import { usePathname } from "next/navigation"
import { TrendingUp, Menu, X, User } from "lucide-react"

// components
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"

import { useCustomerStore } from "@/app/store/useCustomerStore"

export function Header() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const customer = useCustomerStore((state) => state.customer);

  console.log("User:::", user)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/protected-routes/stock-analysis", label: t("header.tool") },
    { href: "/pricing", label: t("header.pricing") },
    { href: "/stock-picks", label: t("services.stock_pick") },
    // { href: "/protected-routes/news", label: t("header.news") },
  ]

  return (
    <header
      className={`px-2 fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 uppercase ${isScrolled
        ? "border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95"
        : "border-transparent bg-transparent"
        }`}
    >
      <div className="sm:container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-yellow-600" />
          <span className="text-lg font-bold text-white">Phajaoinvest</span>
        </Link>

        <nav className="hidden md:flex ml-8 space-x-6">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`relative text-sm font-medium transition-colors pb-1 ${isActive
                  ? "text-primary after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-[30%] after:h-[2px] after:bg-primary after:rounded-full"
                  : "text-white hover:text-primary after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-[0%] hover:after:w-[30%] after:h-[2px] after:bg-yellow-600 after:rounded-full after:transition-all after:duration-300"
                  }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
          <LanguageSwitcher />

          <div className="hidden md:flex space-x-2">
            {customer ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-white hover:text-yellow-600 hover:bg-white/10"
                  >
                    <User className="h-4 w-4" />
                    <span className="uppercase">{t("header.my_account")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">{t("header.dashboard")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>{t("header.sign_out")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-white hover:text-yellow-600 hover:bg-white/10"
                >
                  <Link href="/auth/login">{t("header.login")}</Link>
                </Button>
                <Button size="sm" asChild className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Link href="/auth/register">{t("header.register")}</Link>
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="md:hidden text-white border-white/30 hover:bg-yellow-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="h-[50vh] w-full md:hidden border rounded-md bg-background p-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-medium transition-colors ${isActive
                    ? "text-yellow-600 underline underline-offset-4"
                    : "hover:text-yellow-600"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              )
            })}

            <div className="flex flex-col space-y-2 pt-2">
              {user ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard">{t("header.dashboard")}</Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    {t("header.sign_out")}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="border border-yellow-600 hover:bg-yellow-600 hover:text-white"
                  >
                    <Link href="/auth/login">{t("header.login")}</Link>
                  </Button>
                  <Button size="sm" asChild className="bg-yellow-600 hover:bg-yellow-700 text-white">
                    <Link href="/auth/register">{t("header.register")}</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
