import { WalletOverview } from "@/components/dashboard/wallet-overview"
import { TransactionHistory } from "@/components/dashboard/transaction-history"
import { DepositWithdraw } from "@/components/dashboard/deposit-withdraw"

export default function WalletPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Wallet</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WalletOverview />
          <TransactionHistory />
        </div>
        <div>
          <DepositWithdraw />
        </div>
      </div>
    </div>
  )
}
