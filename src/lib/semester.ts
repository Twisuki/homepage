import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import { semesterList } from "@/data/semester"

dayjs.extend(isBetween)

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
