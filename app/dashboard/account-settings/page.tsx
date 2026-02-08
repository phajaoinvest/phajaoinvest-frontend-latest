"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Bell, CreditCard } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

export default function AccountSettingsPage() {
  const { t } = useTranslation()

  const settingsItems = [
    {
      id: "profile",
      title: t("as.profile_title"),
      description: t("as.profile_des"),
      icon: User,
      status: t("as.status_complete"),
      isComplete: true,
      editLink: "/dashboard/account-settings/edit-profile",
    },
    {
      id: "security",
      title: t("as.security_title"),
      description: t("as.security_des"),
      icon: Shield,
      status: t("as.status_action_required"),
      isComplete: false,
      editLink: "/dashboard/account-settings/security",
    },
    // {
    //   id: "notifications",
    //   title: t("as.notifications_title"),
    //   description: t("as.notifications_des"),
    //   icon: Bell,
    //   status: t("as.status_complete"),
    //   isComplete: true,
    //   editLink: "/dashboard/account-settings/notifications",
    // },
    // {
    //   id: "billing",
    //   title: t("as.billing_title"),
    //   description: t("as.billing_des"),
    //   icon: CreditCard,
    //   status: t("as.status_complete"),
    //   isComplete: true,
    //   editLink: "/dashboard/account-settings/billing",
    // },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">{t("as.title")}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {settingsItems.map((setting, index) => {
              const IconComponent = setting.icon
              return (
                <div
                  key={setting.id}
                  className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors border-b last:border-b-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{setting.title}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{setting.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant="default"
                        className={
                          setting.isComplete
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }
                      >
                        {setting.status}
                      </Badge>
                      {setting.editLink ? (
                        <Link href={setting.editLink}>
                          <Button variant="ghost" size="sm">
                            {t("as.edit")}
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="ghost" size="sm">
                          {t("as.edit")}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
