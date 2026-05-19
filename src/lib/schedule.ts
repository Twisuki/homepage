import type { Dayjs } from "@/lib/dayjs"
import { classList } from "@/data/schedule"
import { semesterList } from "@/data/semester"
import dayjs from "@/lib/dayjs"

export interface SemesterData {
  year: number
  type: "autumn" | "winter" | "spring" | "summer1" | "holiday" | "summer2"
  weeks: number
  startDate: Dayjs
  endDate: Dayjs
}

export function getNowSemester() {
  const semesters: SemesterData[] = semesterList.map(s => ({
    year: dayjs(s.startDate).year(),
    type: s.type,
    weeks: s.weeks,
    startDate: dayjs(s.startDate),
    endDate: dayjs(s.startDate).add(s.weeks * 7, "day"),
  }))

  return semesters.find(s => dayjs().isBetween(s.startDate, s.endDate, "day", "[]"))
}

export function getClasses() {
  const semester = getNowSemester()

  if (!semester) {
    throw new Error("No semester found for this page")
  }

  const now = dayjs()

  const week = Math.floor(now.diff(semester.startDate, "day") / 7) + 1
  const day = now.day()

  return classList.filter(item => item.week.includes(week) && item.day === day).toSorted((a, b) => a.schedule[0] - b.schedule[0])
}
