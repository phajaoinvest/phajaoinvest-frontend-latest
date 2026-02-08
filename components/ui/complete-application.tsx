"use client"

import Link from "next/link";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { AlertCircle, FileText } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface IncompleteApplicationViewProps {
   url: string;
}

export function IncompleteApplicationView({ url }: IncompleteApplicationViewProps) {
   const { t } = useTranslation()

   return (
      <div className="flex items-center justify-center min-h-[500px]">
         <Card className="w-full border-0 shadow-lg">
            <CardContent className="text-center space-y-3">
               <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                  <FileText className="h-4 w-4 text-amber-600" />
               </div>
               <h2 className="text-md font-bold">{t("invest.complete_app_title")}</h2>
               <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
                  {t("invest.complete_app_des")}
               </p>
               <div className="flex items-start space-x-3 border border-blue-200 rounded-lg p-4 mb-8 text-left max-w-md mx-auto">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                     <p className="font-medium mb-1">{t("invest.what_you_need")}</p>
                     <ul className="list-disc list-inside space-y-1">
                        <li>{t("invest.need_id")}</li>
                        <li>{t("invest.need_address")}</li>
                        <li>{t("invest.need_employment")}</li>
                        <li>{t("invest.need_tax")}</li>
                     </ul>
                  </div>
               </div>
               <Button size="lg" className="px-8" asChild>
                  <Link href={url}>
                     <FileText className="h-4 w-4 mr-2" />
                     {t("invest.complete_now")}
                  </Link>
               </Button>
               <p className="text-sm text-muted-foreground mt-4">{t("invest.review_time")}</p>
            </CardContent>
         </Card>
      </div>
   )
}
