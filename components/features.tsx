"use client"

import Link from "next/link"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { Users, Globe, TrendingUp, Star } from "lucide-react"

// hooks and components:
import { useStaggeredAnimation } from "@/hooks/use-scroll-animation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/lib/i18n"


export function Features() {
  const { t } = useTranslation()

  const features = [
    {
      icon: Users,
      title: t("service.title1"),
      description: t("service.description1"),
      href: "/services?tab=membership",
    },
    {
      icon: Globe,
      title: t("service.title2"),
      description: t("service.description2"),
      href: "/services?tab=international",
    },
    {
      icon: TrendingUp,
      title: t("service.title3"),
      description: t("service.description3"),
      href: "/services?tab=returns",
    },
    {
      icon: Star,
      title: t("service.title4"),
      description: t("service.description4"),
      href: "/services?tab=picks",
    },
  ]
  const { ref, visibleItems } = useStaggeredAnimation(features.length, 200)

  return (
    <section id="features" className="py-16 px-2 sm:px-4 bg-muted/30">
      <div className="sm:container mx-auto space-y-8 spacey-y-12">
        <div className="text-center">
          <h2 className="text-primary text-lg sm:text-2xl font-bold mb-2">{t("service.title")}</h2>
          <p className="text-md text-muted-foreground w-full sm:max-w-2xl mx-auto font-light">
            {t("service.description")}
          </p>
        </div>

        <div className="block md:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="services-swiper"
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <Link href={feature.href}>
                  <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                    <CardHeader className="pb-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div ref={ref} className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href}>
              <Card
                className={`hover:shadow-lg transition-all duration-700 hover:scale-105 cursor-pointer transform ${visibleItems.includes(index) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
              >
                <CardHeader className="pb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
