import { load } from "cheerio"

export interface WakaData {
  time: string
  lines: string
}

const BLOG_BASE = "https://blog.twis.uk"
const WAKA_START = "<!--START_SECTION:waka-->"
const WAKA_END = "<!--END_SECTION:waka-->"

export async function GET() {
  try {
    const url = `${BLOG_BASE}/intro.html`
    const res = await fetch(url)
    const html = await res.text()

    const escapeRegex = (str: string) => str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
    const regex = new RegExp(
      `${escapeRegex(WAKA_START)}([\\s\\S]*?)${escapeRegex(WAKA_END)}`,
    )

    const match = html.match(regex)
    if (!match || !match[1])
      throw new Error("Waka 匹配失败!")

    const $ = load(match[1])

    let time = ""
    let lines = ""

    $("figure").each((_, figure) => {
      const src = $(figure).find("img").attr("src")
      if (!src)
        return

      // 解析时间
      const timeRegex = /Code Time-(\d+(?:%2C\d+)?)\s*hrs\s*(\d+)\s*mins-blue/
      const timeMatch = src.match(timeRegex)
      if (timeMatch && timeMatch[1] && timeMatch[2]) {
        const hours = timeMatch[1].replace(/%2C/g, "")
        time = `${hours}h ${timeMatch[2]}min`
      }

      // 解析代码行数
      const linesRegex = /Written-([\d.]+) thousand lines of code-blue/
      const linesMatch = src.match(linesRegex)
      if (linesMatch && linesMatch[1]) {
        lines = `${linesMatch[1]}k`
      }
    })

    const response: WakaData = {
      time,
      lines,
    }

    return Response.json(response)
  }
  catch (error) {
    console.error("Failed to fetch waka data:", error)
    return new Response("Failed to fetch waka data.", { status: 500 })
  }
}
