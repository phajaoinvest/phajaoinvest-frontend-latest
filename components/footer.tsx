"use client"

import Link from "next/link"
import { useTranslation } from "@/lib/i18n"
import { TrendingUp, Twitter, Linkedin, Github, Facebook } from "lucide-react"

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center justify-start space-x-2">
              <img src="/images/logo.png" alt="logo" width={28} height={36} />
              <span className="text-md sm:text-lg font-bold text-white">Phajaoinvest</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {t("footer.description")}
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-sm text-primary">{t("footer.service_title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/stock-analysis" className="text-muted-foreground hover:text-primary">
                  {t("footer.service_title1")}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary">
                  {t("footer.service_title2")}
                </Link>
              </li>
              <li>
                <Link href="/protected-routes/news" className="text-muted-foreground hover:text-primary">
                  {t("footer.service_title3")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  {t("footer.service_title4")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-sm text-primary">{t("footer.company_title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/protected-routes/news" className="text-muted-foreground hover:text-primary">
                  {t("footer.company_title1")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  {t("footer.company_title2")}
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-primary">
                  {t("footer.company_title3")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-primary font-semibold mb-2 text-sm">{t("footer.legal_title")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  {t("footer.legal_title1")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary">
                  {t("footer.legal_title2")}
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary">
                  {t("footer.legal_title3")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Phajaoinvest. {t("footer.description2")}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
