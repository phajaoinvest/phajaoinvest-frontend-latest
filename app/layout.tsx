import Link from "next/link"
import type React from "react"
import type { Metadata, Viewport } from "next"
import { Headset } from "lucide-react"
import { Inter } from "next/font/google"
import { TranslationProvider } from "@/lib/i18n"

import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import ToastProvider from "@/components/toastProvider"
import { ThemeProvider } from "@/components/theme-provider"
import { ServiceWorkerRegistration } from "@/components/service-worker-registration"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F59E0B",
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: "Phajaoinvest - Advanced Stock Trading Platform",
  description: "Professional stock trading platform with real-time data, portfolio management, and advanced analytics.",
  generator: "v0.app",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Phajaoinvest",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Phajaoinvest" />
      </head>
      <body className={inter.className}>
        <ServiceWorkerRegistration />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <TranslationProvider>{children}</TranslationProvider>
            <ToastProvider />

            <Link
              href="/support"
              className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-50 flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-white shadow-lg hover:bg-primary transition-all"
            >
              <Headset size={18} className="animate-bounce" />
              <span className="text-sm hidden sm:block">Support</span>
            </Link>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
