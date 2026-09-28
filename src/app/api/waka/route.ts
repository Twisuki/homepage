const BLOG_WAKA_FILE = "https://blog.twis.uk/waka.json"

interface WakaResponse {
  all: {
    time: number | null
    lines: number | null
  }
  week: {
    time: number | null
    lines: number | null
  }
  updated: string | null
}

export interface WakaData {
  time: number
  lines: number
}

export async function GET() {
  try {
    const response = await fetch(BLOG_WAKA_FILE)
    const data: WakaResponse = await response.json()

    if (!data || !data.all || !data.all.time || !data.all.lines) {
      throw new Error("Failed to looad waka data")
    }

    const res: WakaData = {
      time: data.all.time ?? 0,
      lines: data.all.lines ?? 0,
    }

    return Response.json(res)
  }
  catch (error) {
    console.error("Failed to fetch waka data:", error)
    return new Response("Failed to fetch waka data.", { status: 500 })
  }
}
