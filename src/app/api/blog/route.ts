import od from "@/lib/ohday"

interface BlogResponse {
  title: string
  path: string
  date: string
  excerpt: string[]
  tags: string[]
}

export interface BlogData {
  title: string
  url: string
  date: string
  excerpt: string[]
  tags: string[]
}

const BLOG_BASE = "https://blog.twis.uk"
const BLOG_API = "https://blog.twis.uk/blogs.json"

export async function GET() {
  try {
    const res = await fetch(BLOG_API)
    const data: BlogResponse[] = await res.json()

    const blogs = data.map((blog: BlogResponse) => ({
      ...blog,
      date: od(blog.date).p("YYYY-MM-DD"),
      url: `${BLOG_BASE}${blog.path}`,
    } as BlogData))

    return Response.json(blogs)
  }
  catch (error) {
    console.error("Failed to fetch blog data:", error)
    return new Response("Failed to fetch blog data.", { status: 500 })
  }
}
