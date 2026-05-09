export interface SemesterItem {
  startDate: string
  type: "autumn" | "winter" | "spring" | "summer1" | "holiday" | "summer2"
  weeks: number
}

export const semesterList: SemesterItem[] = [
  { startDate: "2025-09-21", type: "autumn", weeks: 18 },
  { startDate: "2026-01-25", type: "winter", weeks: 5 },
  { startDate: "2026-03-01", type: "spring", weeks: 18 },
  { startDate: "2026-07-05", type: "summer1", weeks: 2 },
  { startDate: "2026-07-19", type: "holiday", weeks: 6 },
  { startDate: "2026-08-30", type: "summer2", weeks: 2 },
]
