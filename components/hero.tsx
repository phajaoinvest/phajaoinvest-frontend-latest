"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

import { Button } from "@/components/ui/button"
import { TypingAnimation } from "./typing-animation"

const heroImages = [
  "https://i.pinimg.com/1200x/f4/83/d1/f483d17ed6cbb57ee5d9f6ac21d7d78e.jpg",
  "https://i.pinimg.com/736x/0a/8c/d6/0a8cd6f014fe649522842c02ed3063fe.jpg",
  "https://i.pinimg.com/1200x/93/c0/ab/93c0aba8b2526cec4725f7e998731a4f.jpg",
  "https://i.pinimg.com/1200x/84/69/4d/84694d7f6bfaeaa9f6133324ae457ffb.jpg",
  "https://i.pinimg.com/1200x/d4/f6/ef/d4f6efbd319d25c1ee62cf68c96b6e2c.jpg",
]

export function Hero() {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const getTypingPhrases = () => {
    const lang = typeof window !== "undefined" ? localStorage.getItem("language") || "en" : "en"

    switch (lang) {
      case "lo":
        return ["ໄດ້ຮັບຫຼາຍ", "ສ້າງຄວາມຮັ່ງມີ", "ອະນາຄົດແຈ້ມໃສ", "ປະສົບຜົນສຳເລັດ"]
      case "th":
        return ["ได้กำไรมากขึ้น", "สร้างความมั่งคั่ง", "อนาคตที่สดใส", "ประสบความสำเร็จ"]
      default:
        return ["Earn More", "Build Wealth", "Bright Future", "Succeed Tomorrow"]
    }
  }

  const getStaticText = () => {
    const lang = typeof window !== "undefined" ? localStorage.getItem("language") || "en" : "en"

    switch (lang) {
      case "lo":
        return "ເລີ່ມລົງທຶນ,"
      case "th":
        return "เริ่มลงทุน,"
      default:
        return "Start Invest,"
    }
  }

  // 🔥 Auto-slide background
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 10000) // slide every 5s

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="h-[100vh] px-2 sm:px-4 bg-gradient-to-br from-background to-muted/20 flex items-center">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Hero slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white/75"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex items-center w-full">
        <div className="sm:container mx-auto text-center -mt-10">
          <div className="w-full sm:max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <h1 className="text-xl sm:text-5xl font-bold text-white text-shadow-lg">
              <TypingAnimation staticText={getStaticText()} phrases={getTypingPhrases()} className="text-primary text-shadow-lg" />
            </h1>
            <p className="text-md sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-shadow-lg">
              {t("hero.description")}
            </p>

            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild className="text-sm">
                <Link href="/pricing">
                  {t("hero.becomeMember")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-sm bg-transparent text-white hover:border-yellow-400 hover:bg-transparent hover:text-white border-white/50"
                asChild
              >
                <Link href="/support">{t("hero.learnMore")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
