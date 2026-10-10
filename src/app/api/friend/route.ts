interface FriendResponse {
  name: string
  icon: string
  desc: string
  link: string
}

export interface FriendData {
  title: string
  url: string
  avatar: string
  description: string
}

const FRIEND_API = "https://blog.twis.uk/friends.json"

export async function GET() {
  try {
    const res = await fetch(FRIEND_API)
    const data: FriendResponse[] = await res.json()

    const friends = data.map((friend: FriendResponse) => ({
      title: friend.name,
      url: friend.link,
      avatar: friend.icon,
      description: friend.desc,
    } as FriendData))

    return Response.json(friends)
  }
  catch (error) {
    console.error("Failed to fetch friend data:", error)
    return new Response("Failed to fetch friend data.", { status: 500 })
  }
}
