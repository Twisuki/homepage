const HITOKOTO_API_URL = "https://v1.hitokoto.cn/"

interface HitokotoResponse {
  id: number
  uuid: string
  hitokoto: string
  type: string
  from: string
  from_who: string
  creator: string
  creator_uid: number
  receiver: string
  commit_from: string
  created_at: string
  length: number
}

export interface HitokotoData {
  hitokoto: string
  from: string
}

export async function GET() {
  try {
    const response = await fetch(`${HITOKOTO_API_URL}?c=a&c=b&c=d&c=e&c=i&c=j`)
    const data: HitokotoResponse = await response.json()

    const res: HitokotoData = {
      hitokoto: data.hitokoto,
      from: data.from,
    }

    return Response.json(res)
  }
  catch (error) {
    console.error("Failed to fetch hitokoto:", error)
    return new Response("Failed to fetch hitokoto.", { status: 500 })
  }
}
