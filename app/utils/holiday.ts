import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(isBetween)

interface HolidayAPI {
  date: string
  name: string
  isOffDay: boolean
}

export interface HolidayData {
  name: string
  daysLeft: number
}

const HOLIDAY_API = "api/holiday/"

const getNextHoliday = (data: { [key: string]: HolidayAPI }): HolidayData | 0 => {
  const holidays = (
    Object.entries(data).map(([_key, value]) => value)
      // 过滤非节假日
      .filter(item => item.isOffDay)
      // 升序排序
      .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())
      // 过滤掉已过的节假日
      .filter(holiday => dayjs(holiday.date).isAfter(dayjs()))
  )

  if (holidays.length > 0 && holidays[0]) {
    return {
      name: holidays[0].name,
      daysLeft: dayjs().diff(dayjs(holidays[0].date), "day") * -1,
    }
  }
  return 0
}

// 获取数据
export const getHolidayData = async () => {
  const year = dayjs().format("YYYY")
  const res = await fetch(`${HOLIDAY_API}${year}`)
  const data = await res.json()
  return getNextHoliday(data)
}
