"use client"

import type { HolidayData } from "@/app/api/holiday/route"
import { IconLoader2, IconMapPin } from "@tabler/icons-react"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import Base from "@/app/[locale]/(pages)/state/components/base"
import { cn } from "@/lib/cn"

function Message({
  holidays,
}: Readonly<{
  holidays: HolidayData[]
}>) {
  const t = useTranslations("StatePage.holiday")

  const currentHoliday = holidays.find(h => h.daysLeft === 0)
  if (currentHoliday) {
    return (
      <>
        {t("current.prefix") + currentHoliday.name + t("current.suffix")}
      </>
    )
  }

  const nextHoliday = holidays.find(h => h.daysLeft > 0)
  if (nextHoliday) {
    return (
      <>
        {t("next.prefix") + nextHoliday.name + t("next.infix") + nextHoliday.daysLeft + t("next.suffix")}
      </>
    )
  }

  return (
    <>{t("end")}</>
  )
}

function Progress({
  holidays,
}: Readonly<{
  holidays: HolidayData[]
}>) {
  const holidaySet = new Set(holidays.map(h => h.name))
  const mergedHolidays = Array.from(holidaySet).map(name => holidays.find(h => h.name === name)).filter(Boolean) as HolidayData[]

  const [isActive, setIsActive] = useState(new Map(mergedHolidays.map(h => [h.name, false])))

  const yearStart = dayjs().startOf("year")
  const totalLength = dayjs().endOf("year").diff(yearStart, "day")

  const handleClick = (name: string) => {
    setIsActive(prev => new Map(prev).set(name, !prev.get(name)))
  }

  return (
    <div className="w-full px-2">
      <div className="relative w-full h-6">
        {mergedHolidays.map(h => (
          <div
            key={h.date}
            className={cn(
              "absolute w-6 h-6 top-0 -translate-x-1/2 flex items-center justify-center",
              h.daysLeft > 0 ? "text-white/90" : "text-white/50",
              { "text-white/90": isActive.get(h.name) },
            )}
            style={{
              left: `${(dayjs(h.date).diff(yearStart, "day") / totalLength) * 100}%`,
            }}
          >
            <div className={cn(
              "absolute w-max bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-sm text-white/90 opacity-0 transition-all duration-300 pointer-events-none",
              { "opacity-100 translate-y-full": isActive.get(h.name) },
            )}
            >
              <span>{h.name}</span>
            </div>
            <IconMapPin
              className="w-6 h-6 cursor-pointer z-500"
              onClick={() => handleClick(h.name)}
            />
          </div>
        ))}
      </div>
      <div className="w-full h-2 bg-green-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{
            width: `${(dayjs().diff(yearStart, "day") / totalLength) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}

function HolidayContent() {
  const t = useTranslations("StatePage.holiday")

  const [holidays, setHolidays] = useState<HolidayData[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFailed, setIsFailed] = useState(false)

  const getHolidayData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/holiday")
      const data: HolidayData[] = await response.json()
      setHolidays(data)
    }
    catch (error) {
      console.error("Failed to fetch holiday data:", error)
      setIsFailed(true)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void getHolidayData()
  }, [])

  if (isLoading) {
    return (
      <>
        {t("loading")}
        <IconLoader2 className="animate-spin" />
      </>
    )
  }

  if (isFailed || !holidays) {
    return (
      <>
        {t("failed")}
      </>
    )
  }

  return (
    <>
      <div className="w-full flex justify-center animate-fadeInUp">
        <Message holidays={holidays} />
      </div>
      <div className="w-full flex justify-center animate-fadeInDown">
        <Progress holidays={holidays} />
      </div>
    </>
  )
}

export default function Holiday() {
  return (
    <Base
      x={4}
      y={1}
      hover
      className="flex flex-col items-center justify-center gap-1"
    >
      <HolidayContent />
    </Base>
  )
}
