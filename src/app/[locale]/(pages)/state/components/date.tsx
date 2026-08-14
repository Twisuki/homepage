import type { OhDay } from "@/lib/ohday"
import { useTranslations } from "next-intl"
import Base from "@/app/[locale]/(pages)/state/components/base"
import { dateList } from "@/data/date"
import { cn } from "@/lib/cn"
import od from "@/lib/ohday"
import { getClasses } from "@/lib/schedule"

function Calendar() {
  const days: OhDay[] = []

  for (let i = od().cs("M").day; i > 0; i--) {
    days.push(od().cs("M").sub("d", i))
  }

  for (let i = 0; i < od().len("M", "d"); i++) {
    days.push(od().cs("M").add("d", i))
  }

  const remaining = 42 - days.length
  for (let i = 0; i < remaining; i++) {
    days.push(od().ce("M").add("d", i + 1))
  }

  const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"]

  return (
    <div className="w-full grid grid-cols-7 grid-rows-7">
      {WEEKDAYS.map(d => (
        <div
          key={d}
          className="flex items-center justify-center"
        >
          {d}
        </div>
      ))}
      {days.map(day => (
        <div
          key={day.p("YYYY-MM-DD")}
          className={cn(
            "flex items-center justify-center hover:bg-white/20 rounded-lg",
            { "bg-blue-500 text-white rounded-lg hover:bg-blue-600": day.eq(od(), "d") },
            { "text-white/30": !day.eq(od(), "M") },
          )}
        >
          {day.date}
        </div>
      ))}
    </div>
  )
}

function Message() {
  const t = useTranslations("StatePage.date")

  const message = dateList.find(d => d.date === od().p("MM-DD"))?.message

  if (message) {
    return (
      <>
        {message}
      </>
    )
  }

  const classes = getClasses()

  if (classes.length === 0) {
    return (
      <>
        {t("off")}
      </>
    )
  }

  return (
    <>
      {t("work")}
    </>
  )
}

export default function Date() {
  return (
    <Base
      x={2}
      y={2}
      hover
      className="flex flex-col justify-center items-center gap-2 text-sm"
    >
      <Calendar />
      <Message />
    </Base>
  )
}
