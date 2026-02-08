"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function FAQ() {
  const { t } = useTranslation()
  const [openItems, setOpenItems] = useState<number[]>([])
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 })

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: t("faq.question1"),
      answer: t("faq.answer1")
    },
    {
      question: t("faq.question2"),
      answer: t("faq.answer2")
    },
    {
      question: t("faq.question3"),
      answer: t("faq.answer3")
    },
    {
      question: t("faq.question4"),
      answer: t("faq.answer4")
    },
    {
      question: t("faq.question5"),
      answer: t("faq.answer5")
    },
    {
      question: t("faq.question6"),
      answer: t("faq.answer6")
    },
    {
      question: t("faq.question7"),
      answer: t("faq.answer7")
    },
    {
      question: t("faq.question8"),
      answer: t("faq.answer8")
    },
    {
      question: t("faq.question9"),
      answer: t("faq.answer9")
    },
    {
      question: t("faq.question10"),
      answer: t("faq.answer10")
    },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 space-y-8 sm:space-y-12">
        <div className="text-center mb-8">
          <h2 className="text-lg md:text-2xl font-bold text-foreground mb-2 text-primary">{t("faq.question")}</h2>
          <p className="text-md text-muted-foreground max-w-4xl mx-auto font-light">
            {t("faq.description")}
          </p>
        </div>

        <div
          ref={ref}
          className={`max-w-4xl mx-auto space-y-1 sm:space-y-2 transition-all duration-1000 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}
        >
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={`border border-border/50 hover:border-border transition-all duration-500 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <h3 className="text-sm md:text-md font-semibold text-foreground pr-4 font-light">{faq.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {openItems.includes(index) && (
                  <div className="p-6">
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
