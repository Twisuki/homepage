import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

import semesterDatas from "~/semester"

dayjs.extend(isBetween)

/**
 * 学期数据接口
 *
 * @property{string} startDate - 学期开始日期
 * @property{"autumn" | "winter" | "spring" | "summer" | "holiday"} type - 学期类型
 *   - "autumn": 秋季学期
 *   - "winter": 寒假
 *   - "spring": 春季学期
 *   - "summer1": 夏季学期 - 1
 *   - "holiday": 暑假
 *   - "summer2": 夏季学期 - 2
 * @property{number} weeks - 总周数
 *
 * 学期将会被生成如下命名: "2025-2026秋季学期", "2025-2026春季学期", 以开始时间和学期类型为标记
 */
export interface SemesterData {
  startDate: string
  type: "autumn" | "winter" | "spring" | "summer1" | "holiday" | "summer2"
  weeks: number
}

/**
 * 当前学期接口
 *
 * @property{string} year - 学期年份
 *   @example "2025-2026"
 * @property{"autumn" | "winter" | "spring" | "summer1" | "holiday" | "summer2"} type - 学期类型
 * @property{number} day - 当前天数
 * @property{number} weeks - 总周数
 */
export interface Semester {
  year: string
  type: "autumn" | "winter" | "spring" | "summer1" | "holiday" | "summer2"
  day: number
  weeks: number
}

export const getSemester = (): Semester | null => {
  const today = dayjs("2026-2-25")
  for (const semeter of semesterDatas) {
    const startDate = dayjs(semeter.startDate)
    const endDate = startDate.add(semeter.weeks * 7, "day")

    if (today.isBetween(startDate, endDate, "day", "[]")) {
      const day = today.diff(startDate, "day", true)

      const year = startDate.year()

      return {
        year: `${year}-${year + 1}`,
        type: semeter.type,
        day: day,
        weeks: semeter.weeks,
      }
    }
  }

  return null
}
