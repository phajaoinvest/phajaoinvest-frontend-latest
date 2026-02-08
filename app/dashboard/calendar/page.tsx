import { EconomicCalendar } from "@/components/dashboard/economic-calendar"
import { EarningsCalendar } from "@/components/dashboard/earnings-calendar"
import { CalendarFilters } from "@/components/dashboard/calendar-filters"

export default function CalendarPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Market Calendar</h1>
      </div>

      <CalendarFilters />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EconomicCalendar />
        <EarningsCalendar />
      </div>
    </div>
  )
}
