import dayjs from "dayjs"

export interface Article {
  title: string
  date: string
  url: string
}

const BLOG_BASE = "https://blog.twis.uk/"

export const getBlogArticles = async (n: number): Promise<Article[]> => {
  // 从 timeline 页面获取文章列表
  const url = `${BLOG_BASE}/timeline`
  const res = await fetch(url)
  const html = await res.text()

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, "text/html")

  const articles: Article[] = (
    Array
      // 获取 li.timeline-item 列表
      .from(doc.querySelectorAll("li.timeline-item"))
      // 提取标题、日期和链接
      .map((item) => {
        const a = item.querySelector("a")
        const title = a?.innerHTML
        const route = a?.getAttribute("href")

        if (!title || !route) return null

        // 正则从路由中匹配日期
        const regex = /\/(\d{8})-\d+\.html/
        const match = route.match(regex)

        if (!match || !match[1]) return null

        const date = match[1]
        return {
          title: title,
          date: dayjs(date).format("YYYY-MM-DD"),
          url: `${BLOG_BASE}${route}`,
        }
      })
      // 移除 null 项
      .filter(item => item !== null)
      // 按日期降序排序
      .sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
      // 保留前 n 项
      .filter((_, index) => index < n)
  )

  return articles
}
