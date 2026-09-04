import { load } from "cheerio"

export interface WakaData {
  time: string
  lines: string
}

const BLOG_BASE = "https://blog.twis.uk"
const WAKA_START = "<!--WAKA_BLOG_SYNC_START-->"
const WAKA_END = "<!--WAKA_BLOG_SYNC_END-->"

// 严格依据 Twisuki/profile.md CUSTOM_WAKA_START 内 formatTime / formatLines：
//   - 时间: en-US 千分位整数 + 0/1 特殊单位(hr/min, 其它一律 hrs/mins), URL 编码
//   - 行数: en-US 千分位 + 强制两位小数 + k, URL 编码
//   - This Week badge 颜色: time=blue / lines=aqua
//   - From Hello World badge 颜色: time=green / lines=lime  ← 我们要这套
// URL 解码后是字面字符, 这里只用字面空格; src 在循环里会先 decodeURIComponent 归一化
const ALL_TIME_REGEX
  = /Code Time-(\d{1,3}(?:,\d{3})*) hrs? (\d+) mins?-green/

const ALL_LINES_REGEX
  = /Lines of Code-(\d{1,3}(?:,\d{3})*\.\d{2})k-lime/

function escapeRegex(s: string) {
  return s.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
}

export async function GET() {
  try {
    const url = `${BLOG_BASE}/intro.html`
    const res = await fetch(url)
    const html = await res.text()

    const section = html.match(
      new RegExp(`${escapeRegex(WAKA_START)}([\\s\\S]*?)${escapeRegex(WAKA_END)}`),
    )?.[1]

    if (!section)
      throw new Error("Waka section not found")

    const $ = load(section)

    let time = ""
    let lines = ""

    $("img").each((_, img) => {
      const raw = $(img).attr("src") ?? ""
      // vuepress 对 src 中的 %20 已部分解码为字面空格, 但 %2C(逗号)还是编码形态
      // 这里统一 decode 一遍, 让正则只吃字面字符
      let src = raw
      try {
        src = decodeURIComponent(raw)
      }
      catch {
        // 极少数非法 %xx 时保留原串走兜底匹配
      }

      const t = src.match(ALL_TIME_REGEX)
      if (t && t[1] && t[2]) {
        // 去千分位逗号
        const hours = (t[1] as string).replace(/,/g, "")
        time = `${hours}h ${t[2]}min`
      }

      const l = src.match(ALL_LINES_REGEX)
      if (l && l[1]) {
        lines = `${l[1]}k`
      }

      if (time && lines)
        return false
    })

    if (!time && !lines)
      throw new Error("Waka 匹配失败!")

    return Response.json({ time, lines })
  }
  catch (error) {
    console.error("Failed to fetch waka data:", error)
    return new Response("Failed to fetch waka data.", { status: 500 })
  }
}
