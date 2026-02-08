import { ProfileSettings } from "@/components/dashboard/profile-settings"
import { NotificationSettings } from "@/components/dashboard/notification-settings"
import { TradingPreferences } from "@/components/dashboard/trading-preferences"
import { AccountSettings } from "@/components/dashboard/account-settings"

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileSettings />
        <NotificationSettings />
        <TradingPreferences />
        <AccountSettings />
      </div>
    </div>
  )
}
