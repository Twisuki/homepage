export interface WakaInfo {
  time: string
  lines: string
}

const BLOG_BASE = "/api/blog/"
const WAKA_START = "<!--START_SECTION:waka-->"
const WAKA_END = "<!--END_SECTION:waka-->"

export const getWakaInfo = async (): Promise<WakaInfo> => {
  const url = `${BLOG_BASE}/intro.html`
  const res = await fetch(url)
  const html = await res.text()

  const escapeRegex = (str: string) => str.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
  const regex = new RegExp(
    `${escapeRegex(WAKA_START)}([\\s\\S]*?)${escapeRegex(WAKA_END)}`,
  )

  const match = html.match(regex)
  if (!match || !match[1]) throw new Error("Waka 匹配失败!")

  const parser = new DOMParser()
  const doc = parser.parseFromString(match[1], "text/html")

  // 从图片中获取 times 和 lines
  const [time, lines] = (
    Array.from(doc.querySelectorAll("figure"))
      .map((figure, index) => {
        const src = figure.querySelector("img")?.src
        if (!src) return ""

        if (index === 0) {
          const regex = /Code%20Time-(\d+)%20hrs%20(\d+)%20mins-blue/
          const match = src.match(regex)
          if (match && match[1] && match[2]) {
            const hours = match[1]
            const minutes = match[2]
            return `${hours} h ${minutes} min`
          }
        }
        else if (index === 1) {
          const regex = /-(\d+\.\d+)%20thousand%20lines%20of%20code-blue/
          const match = src.match(regex)
          if (match && match[0]) {
            const lines = match[1]
            return `${lines}k`
          }
        }

        return ""
      })
  )

  return {
    time: time || "",
    lines: lines || "",
  }
}
