"use client"

import Link from "next/link"
import { useTranslation } from "@/lib/i18n"
import { Phone, MessageCircle, Mail, MessageSquare, Send, Clock } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function SupportPage() {
  const { t } = useTranslation()
  const contacts = [
    {
      id: "phone",
      icon: <Phone className="h-4 w-4 text-primary" />,
      title: "020 78856194",
      link: "tel:+85620555501234",
      buttonText: t("support.phone_action"),
      buttonClass:
        "w-full border bg-transparent text-white cursor-pointer hover:bg-white hover:text-primary",
    },
    {
      id: "whatsapp",
      icon: <MessageCircle className="h-4 w-4 text-primary" />,
      title: "+856 2078856194",
      link: "https://wa.me/85620555501234",
      buttonText: t("support.whatsapp_action"),
      buttonClass:
        "w-full border bg-transparent text-white cursor-pointer hover:bg-white hover:text-primary",
      target: "_blank",
    },
    {
      id: "email",
      icon: <Mail className="h-4 w-4 text-primary" />,
      title: "Phajaoinvest@gmail.com",
      link: "mailto:Phajaoinvest@gmail.com",
      buttonText: t("support.email_action"),
      buttonClass:
        "w-full border bg-transparent text-white cursor-pointer hover:bg-white hover:text-primary",
    },
    {
      id: "line",
      icon: <MessageSquare className="h-4 w-4 text-primary" />,
      title: "@Phajaoinvest",
      link: "https://line.me/ti/p/u5Me6t-iwC",
      buttonText: t("support.line_action"),
      buttonClass:
        "w-full border bg-transparent text-white cursor-pointer hover:bg-white hover:text-primary",
      target: "_blank",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-6 sm:py-16 px-0 sm:px-4 mt-16">
        <div className="container mx-auto max-w-10xl max-w-6xl p-0">
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-2 text-primary">
              {t("support.title")}
            </h1>
            <p className="text-md text-muted-foreground max-w-2xl mx-auto text-light">
              {t("support.des")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
            {contacts.map((c) => (
              <Card key={c.id} className="text-center border">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center justify-center gap-2">
                    {c.icon}
                    {c.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className={c.buttonClass} asChild>
                    <Link href={c.link} target={c.target || undefined}>
                      {c.buttonText}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-12">
            <Card className="border">
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  {t("support.office_hours")}
                </CardTitle>
                <CardDescription>{t("support.office_hours_des")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-primary/5 rounded-lg p-4 text-center border">
                    <h4 className="font-semibold mb-2 text-sm">{t("support.office_days")}</h4>
                    <p className="text-xs font-bold text-primary">8:00 AM - 6:00 PM</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4 text-center border">
                    <h4 className="font-semibold mb-2 text-sm">{t("support.saturday")}</h4>
                    <p className="text-lg font-bold text-primary text-xs">9:00 AM - 4:00 PM</p>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4 text-center border">
                    <h4 className="font-semibold mb-2 text-sm">{t("support.sunday")}</h4>
                    <p className="text-lg font-bold text-muted-foreground text-xs">{t('support.sunday_close')}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-6 text-center">
                  {t("support.timezone")}
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader>
                <CardTitle className="text-md flex items-center gap-2">
                  <Send className="h-4 w-4 text-primary" />
                  {t("support.message_title")}
                </CardTitle>
                <CardDescription>
                  {t("support.message_des")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="fullName">{t("support.full_name")}</Label>
                  <Input id="fullName" placeholder={t("support.full_name_placeholder")} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="phone">{t("support.phone_number")}</Label>
                  <Input id="phone" placeholder={t('support.phone_number_placeholder')} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="subject">{t("support.subject")}</Label>
                  <Input id="subject" placeholder={t("support.subject_placeholder")} />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="message">{t("support.message")}</Label>
                  <Textarea
                    id="message"
                    placeholder={t("support.message_description")}
                    className="min-h-[120px]"
                  />
                </div>

                <Button className="w-auto" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  {t("support.send_message")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
