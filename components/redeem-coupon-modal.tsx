"use client"

import { useState } from "react"
import { Crown, Loader, Ticket, Gift, Sparkles } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { postAPI } from "@/app/api/api"
import * as ga from "@/lib/ga"
import { useToast } from "@/app/utils/toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface RedeemCouponModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RedeemCouponModal({ isOpen, onClose }: RedeemCouponModalProps) {
  const { t } = useTranslation()
  const { successMessage, errorMessage } = useToast()
  const [couponCode, setCouponCode] = useState("")
  const [isRedeeming, setIsRedeeming] = useState(false)

  const handleRedeem = async () => {
    if (!couponCode.trim()) return

    try {
      setIsRedeeming(true)
      const res = await postAPI({
        url: "/customers/services/premium-membership/redeem-coupon",
        body: { code: couponCode.trim() },
      })

      if (!res.is_error) {
        ga.event({
          action: "redeem_coupon",
          category: "engagement",
          label: couponCode.trim(),
        });
        successMessage(t("membership.coupon_success"), 5000)
        setCouponCode("")
        onClose()
        // Optionally refresh the page or state if needed
        // window.location.reload()
      } else {
        errorMessage(res.message || t("membership.coupon_error"), 5000)
      }
    } catch (error: any) {
      console.error("Redeem coupon failed:", error)
      errorMessage(
        error?.response?.data?.message || t("membership.coupon_error"),
        5000
      )
    } finally {
      setIsRedeeming(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-background to-background/95 border-primary/20 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Sparkles className="h-32 w-32 rotate-12 text-primary" />
        </div>

        <DialogHeader className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 shadow-inner">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent">
              {t("membership.coupon_title")}
            </DialogTitle>
          </div>
          <DialogDescription className="text-base text-muted-foreground/80 leading-relaxed">
            {t("membership.coupon_description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 relative z-10">
          <div className="space-y-2">
            <div className="relative group">
              <Input
                placeholder={t("membership.coupon_placeholder")}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={isRedeeming}
                className="pl-4 pr-10 h-14 bg-muted/30 border-primary/10 focus:border-primary/40 focus:ring-primary/10 transition-all text-lg font-medium tracking-wider"
                onKeyDown={(e) => e.key === "Enter" && handleRedeem()}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/30 transition-colors group-focus-within:text-primary/50">
                <Ticket className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              onClick={handleRedeem}
              disabled={isRedeeming || !couponCode.trim()}
              className="h-14 font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all bg-gradient-to-r from-primary to-yellow-600 hover:opacity-90"
            >
              {isRedeeming ? (
                <Loader className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <Crown className="h-5 w-5 mr-3" />
                  {t("membership.coupon_button")}
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="h-12 hover:bg-muted/50 text-muted-foreground font-medium"
            >
              {t("stock_pick.back")}
            </Button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </DialogContent>
    </Dialog>
  )
}
