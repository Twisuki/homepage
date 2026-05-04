import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import { useTranslations } from "next-intl"
import Base from "@/app/[locale]/(pages)/state/components/base"
import { semesterList } from "@/data/semester"

dayjs.extend(isBetween)

interface SemesterData {
  year: number
  type: "autumn" | "winter" | "spring" | "summer1" | "holiday" | "summer2"
  weeks: number
  startDate: Dayjs
  endDate: Dayjs
}

function Title({
  semester,
}: Readonly<{
  semester: SemesterData
}>) {
  const t = useTranslations("StatePage.semester")

  const SEMESTER_NAMES: Record<string, string> = {
    autumn: t("autumn"),
    winter: t("winter"),
    spring: t("spring"),
    summer1: t("summer1"),
    holiday: t("holiday"),
    summer2: t("summer2"),
  }

  const year = `${semester.year} - ${semester.year + 1}`
  const name = SEMESTER_NAMES[semester.type] || semester.type

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm">{year}</span>
      <span>{name}</span>
    </div>
  )
}

function Progress({
  semester,
}: Readonly<{
  semester: SemesterData
}>) {
  const passedDays = dayjs().diff(semester.startDate, "day", true)
  const totalDays = semester.weeks * 7
  const label = `[${Math.ceil(passedDays / 7)}/${semester.weeks}]`

  return (
    <div className="w-full flex items-center gap-1">
      <div className="flex-1 h-2 bg-green-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500"
          style={{
            width: `${(passedDays / totalDays) * 100}%`,
          }}
        />
      </div>
      <span className="text-xs">
        {label}
      </span>
    </div>
  )
}

export default function Semester() {
  const semesters: SemesterData[] = semesterList.map(s => ({
    year: dayjs(s.startDate).year(),
    type: s.type,
    weeks: s.weeks,
    startDate: dayjs(s.startDate),
    endDate: dayjs(s.startDate).add(s.weeks * 7, "day"),
  }))

  const semester = semesters.find(s => dayjs().isBetween(s.startDate, s.endDate, "day", "[]"))

  if (!semester) {
    throw new Error("No semester found for this page")
  }

  return (
    <Base
      x={2}
      y={1}
      className="flex flex-col items-center justify-center gap-2"
    >
      <Title semester={semester} />
      <Progress semester={semester} />
    </Base>
  )
}
