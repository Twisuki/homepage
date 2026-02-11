import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

dayjs.extend(isBetween)

export interface HolidayData {
  name: string
  daysLeft: number
}

// 旧节假日 APi: https://jiejiariapi.com/, 由于乱打广告问题, 已废弃

// interface HolidayAPI {
//   date: string
//   name: string
//   isOffDay: boolean
// }

// const HOLIDAY_API = "api/holiday/"
//
// const getNextHoliday = (data: { [key: string]: HolidayAPI }): HolidayData | 0 => {
//   const holidays = (
//     Object.entries(data).map(([_key, value]) => value)
//       // 过滤非节假日
//       .filter(item => item.isOffDay)
//       // 升序排序
//       .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())
//       // 过滤掉已过的节假日
//       .filter(holiday => dayjs(holiday.date).isAfter(dayjs()))
//   )
//
//   if (holidays.length > 0 && holidays[0]) {
//     return {
//       name: holidays[0].name,
//       daysLeft: dayjs().diff(dayjs(holidays[0].date), "day") * -1,
//     }
//   }
//   return 0
// }

interface HolidayItem {
  holiday: true
  name: string
  wage: number
  date: string
  cnLunar: string
  extra_info: string
  rest: number
}

interface Response {
  code: 0 | -1
  holiday: { [key: string]: HolidayItem }
}

const HOLIDAY_API = "api/holiday/year/"

const getNextHoliday = (data: { [key: string]: HolidayItem }): HolidayData | 0 => {
  const holidays = (
    Object.entries(data).map(([_key, value]) => value)
      // 升序排序
      .sort((a, b) => dayjs(a.date).unix() - dayjs(b.date).unix())
      // 过滤掉已过的节假日
      .filter(holiday => dayjs(holiday.date).isAfter(dayjs()))
      // 格式化为 HolidayData
      .map(item => ({ name: item.name.replace("（休）", ""), daysLeft: item.rest } as HolidayData))
  )

  if (holidays.length > 0 && holidays[0]) {
    return {
      name: holidays[0].name,
      daysLeft: holidays[0].daysLeft,
    }
  }
  return 0
}

// 获取数据
export const getHoliday = async () => {
  const year = dayjs().format("YYYY")
  const res = await fetch(`${HOLIDAY_API}${year}`)
  const data = await res.json() as Response
  return getNextHoliday(data.holiday)
}
