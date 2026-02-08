import { SecurityOverview } from "@/components/dashboard/security-overview"
import { TwoFactorAuth } from "@/components/dashboard/two-factor-auth"
import { SecuritySettings } from "@/components/dashboard/security-settings"
import { LoginHistory } from "@/components/dashboard/login-history"

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Security</h1>
      </div>

      <SecurityOverview />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TwoFactorAuth />
        <SecuritySettings />
      </div>

      <LoginHistory />
    </div>
  )
}
