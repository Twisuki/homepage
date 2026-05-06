import { load } from "cheerio"

export interface FriendData {
  title: string
  url: string
  avatar: string
  description: string
}

const BLOG_BASE = "https://blog.twis.uk"

export async function GET() {
  try {
    const url = `${BLOG_BASE}/friend`
    const res = await fetch(url)
    const html = await res.text()

    const $ = load(html)

    const friends: FriendData[] = []

    $("a.vp-project-card").each((_, card) => {
      const title = $(card).find(".vp-project-name").text()
      const url = $(card).attr("href") || ""
      const avatar = $(card).find("img").attr("src") || ""
      const description = $(card).find(".vp-project-desc").text()

      const friend: FriendData = {
        title,
        url,
        avatar: avatar.startsWith("/") ? BLOG_BASE + avatar : avatar,
        description,
      }

      friends.push(friend)
    })

    return Response.json(friends)
  }
  catch (error) {
    console.error("Failed to fetch friend data:", error)
    return new Response("Failed to fetch friend data.", { status: 500 })
  }
}
