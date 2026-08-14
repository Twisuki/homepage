import type { OhDay } from "@/lib/ohday"
import { classList } from "@/data/schedule"
import { semesterList } from "@/data/semester"
import od from "@/lib/ohday"

export interface SemesterData {
  year: number
  type: "autumn" | "winter" | "spring" | "summer1" | "holiday" | "summer2"
  weeks: number
  startDate: OhDay
  endDate: OhDay
}

export function getNowSemester() {
  const semesters: SemesterData[] = semesterList.map(s => ({
    year: od(s.startDate).year,
    type: s.type,
    weeks: s.weeks,
    startDate: od(s.startDate),
    endDate: od(s.startDate).add("w", s.weeks),
  }))

  return semesters.find(s => od().bt(s.startDate, s.endDate.add("d", 1), "d"))
}

export function getClasses() {
  const semester = getNowSemester()

  if (!semester) {
    throw new Error("No semester found for this page")
  }

  const now = od()

  const week = now.diff(semester.startDate, "w") + 1
  const day = now.day

  return classList.filter(item => item.week.includes(week) && item.day === day).toSorted((a, b) => a.schedule[0] - b.schedule[0])
}
