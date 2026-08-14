import { load } from "cheerio"
import od from "@/lib/ohday"

export interface BlogData {
  title: string
  url: string
  date: string
  excerpt: string[]
  tags: string[]
}

const BLOG_BASE = "https://blog.twis.uk"

export async function GET() {
  try {
    const res = await fetch(BLOG_BASE)
    const html = await res.text()

    const $ = load(html)

    const blogs: BlogData[] = []

    $("article.vp-article-item").each((_, article) => {
      const title = $(article).find("header").find("span").text()
      const url = $(article).find("a.route-link").attr("href") || ""
      const date = $(article).find("span.page-date-info").find("meta").attr("content") || ""
      const categorys = $(article).find("span.page-category-info").find("span.page-category-item").map((_, span) => $(span).text()).get()
      const tags = $(article).find("span.page-tag-info").find("span.page-tag-item").map((_, span) => $(span).text()).get()
      const excerpt = $(article).find("div.vp-article-excerpt").find("p").map((_, p) => $(p).text()).get()

      const blog: BlogData = {
        title,
        url: BLOG_BASE + url,
        date: od(date).p("YYYY-MM-DD"),
        excerpt,
        tags: Array.from(new Set([...categorys, ...tags])),
      }

      blogs.push(blog)
    })

    return Response.json(blogs)
  }
  catch (error) {
    console.error("Failed to fetch blog data:", error)
    return new Response("Failed to fetch blog data.", { status: 500 })
  }
}
