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
 * @property{string} name - 学期名称
 * @property{Date} startDate - 学期开始日期
 * @property{"autumn" | "winter" | "spring" | "summer1" | "holiday" | "summer2"} type - 学期类型
 * @property{number} weeks - 总周数
 * @property{number} currentWeek - 当前周数
 */
export interface Semester {
  name: string
  startDate: string
  type: "autumn" | "winter" | "spring" | "summer1" | "holiday" | "summer2"
  weeks: number
  currentWeek: number
}

const SemesterTypeMap = new Map([
  ["autumn", "秋季学期"],
  ["winter", "寒假"],
  ["spring", "春季学期"],
  ["summer1", "夏季学期"],
  ["holiday", "暑假"],
  ["summer2", "夏季学期"],
])

export const getSemester = (): Semester | null => {
  const today = dayjs()
  for (const semeter of semesterDatas) {
    const startDate = dayjs(semeter.startDate)
    const endDate = startDate.add(semeter.weeks * 7, "day")

    if (today.isBetween(startDate, endDate, "day", "[]")) {
      const daysSinceStart = today.diff(startDate, "day", true)
      const currentWeek = Math.ceil(daysSinceStart / 7) || 1

      const year = startDate.year()
      const type = SemesterTypeMap.get(semeter.type)

      return {
        name: `${year}-${year + 1}年${type}`,
        startDate: startDate.format("YYYY-MM-DD"),
        type: semeter.type,
        weeks: semeter.weeks,
        currentWeek: currentWeek,
      }
    }
  }

  return null
}
