import od from "@/lib/ohday"

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

export interface HolidayData {
  name: string
  date: string
  daysLeft: number
}

const HOLIDAY_API_URL = "https://holiday.ailcc.com/api/holiday/year"

export async function GET() {
  try {
    const year = od().p("YYYY")

    const response = await fetch(`${HOLIDAY_API_URL}/${year}`)
    const data: Response = await response.json()

    const holidayList = Object.entries(data.holiday).map(([_k, v]) => v)
    const sortedHolidayList = holidayList.toSorted((a, b) => od(a.date).ts - od(b.date).ts)
    const holidays: HolidayData[] = sortedHolidayList.map(h => ({
      name: h.name.replace("（休）", ""),
      date: od(h.date).p("YYYY-MM-DD"),
      daysLeft: od(h.date).diff(od(), "d"),
    }))

    return Response.json(holidays)
  }
  catch (error) {
    console.error("Failed to fetch holiday data:", error)
    return new Response("Failed to fetch holiday data.", { status: 500 })
  }
}
