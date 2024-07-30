 "use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "./calendar" 
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RANGE_OPTIONS } from "@/utils/rangeOptions"
import { subDays } from "date-fns"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ReactNode, useState } from "react"
import { DateRange } from "react-day-picker"

type ChartCardProps = {
  title: string
  queryKey: string
  selectedRangeLabel: string
  children: ReactNode
}

export function ChartCard({
  title,
  children,
  queryKey,
  selectedRangeLabel,
}: ChartCardProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 29),
    to: new Date(),
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  function setRange(range: keyof typeof RANGE_OPTIONS | DateRange) {
    const params = new URLSearchParams(searchParams)
    if (typeof range === "string") {
      params.set(queryKey, range)
      params.delete(`${queryKey}From`)
      params.delete(`${queryKey}To`)
    } else {
      if (range.from == null || range.to == null) return
      params.delete(queryKey)
      params.set(`${queryKey}From`, range.from.toISOString())
      params.set(`${queryKey}To`, range.to.toISOString())
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="bg-white rounded-md border border-gray-200">
      <CardHeader>
        <div className="bg-orange flex gap-4 justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedRangeLabel}
            </Button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {Object.entries(RANGE_OPTIONS).map(([key, value]) => (
                  <div
                    key={key}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setRange(key as keyof typeof RANGE_OPTIONS)
                      setIsDropdownOpen(false)
                    }}
                  >
                    {value.label}
                  </div>
                ))}
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <div
                    onClick={() => {
                      setIsDropdownOpen(false)
                    }}
                  >
                    <Calendar
                      mode="range"
                      disabled={{ after: new Date() }}
                      selected={dateRange}
                      defaultMonth={dateRange?.from}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                    <Button
                      onClick={() => {
                        if (dateRange == null) return
                        setRange(dateRange)
                        setIsDropdownOpen(false)
                      }}
                      disabled={dateRange == null}
                      className="w-full "
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </div>
  )
}
