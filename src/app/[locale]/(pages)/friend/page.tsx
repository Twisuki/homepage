"use client"

import type { FriendData } from "@/app/api/friend/route"
import { IconArrowRight, IconCircleX, IconLoader2 } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import Button from "@/app/components/button"
import LiquidGlass from "@/app/components/liquid-glass"
import { useAnimate } from "@/hooks/navigate"
import { cn } from "@/lib/cn"

const CIRCLE_SIZE = 12
const CIRCLE_UPDATE_INDEX = 5

type AvatarStatus = "loading" | "loaded" | "error"

export default function friend() {
  const { animateClass } = useAnimate()
  const t = useTranslations("FriendPage")

  const [data, setData] = useState<FriendData[]>([])
  const [friends, setFriends] = useState<FriendData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFailed, setIsFailed] = useState(false)

  const [avatarStatus, setAvatarStatus] = useState<AvatarStatus[]>(
    Array.from({ length: CIRCLE_SIZE }).map(_ => "loading"),
  )
  const [current, setCurrent] = useState<number | null>(null)
  const [hovered, setHovered] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const iRef = useRef(CIRCLE_UPDATE_INDEX)
  const jRef = useRef(CIRCLE_SIZE)

  const paused = useMemo(() => hovered || current !== null, [hovered, current])
  const friend = useMemo<FriendData | null>(() => current !== null && friends[current] ? friends[current] : null, [current, friends])

  const getFriendData = async () => {
    setIsLoading(true)

    try {
      const res = await fetch("/api/friend")
      const data: FriendData[] = await res.json()
      setData(data)
    }
    catch (error) {
      console.error("Failed to fetch friend data:", error)
      setIsFailed(true)
    }
    finally {
      setIsLoading(false)
    }
  }

  const startInterval = () => {
    if (intervalRef.current)
      return

    intervalRef.current = setInterval(() => {
      setFriends((prev) => {
        const newFriends = [...prev]
        newFriends[iRef.current % CIRCLE_SIZE] = data[jRef.current % data.length]
        return newFriends
      })

      iRef.current = (iRef.current - 1 + CIRCLE_SIZE) % CIRCLE_SIZE
      jRef.current = (jRef.current + 1) % data.length
    }, 20 * 1000 / CIRCLE_SIZE)
  }

  const handleAvatarStatusChange = (status: AvatarStatus, index: number) => {
    setAvatarStatus((prev) => {
      const newStatus = [...prev]
      newStatus[index] = status
      return newStatus
    })
  }

  const handleClick = (index: number) => {
    if (current === index) {
      setCurrent(null)
    }
    else {
      setCurrent(index)
    }
  }

  useEffect(() => {
    void getFriendData()
  }, [])

  useEffect(() => {
    if (paused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
    else {
      if (data.length > CIRCLE_SIZE && !intervalRef.current) {
        startInterval()
      }
    }
  }, [paused])

  useEffect(() => {
    if (data.length === 0) {
      return
    }
    if (data.length <= CIRCLE_SIZE) {
      setFriends(Array.from({ length: CIRCLE_SIZE }).map((_, i) => data[i % data.length]))
    }
    else if (!intervalRef.current) {
      setFriends(data.slice(0, CIRCLE_SIZE))
      iRef.current = CIRCLE_UPDATE_INDEX
      jRef.current = (CIRCLE_SIZE + 1) % data.length
      startInterval()
    }
  }, [data])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  return (
    <LiquidGlass
      rounded="3xl"
      className={cn("w-164 h-96", animateClass)}
    >
      <div className="w-full h-full flex items-center justify-center">
        {isLoading
          ? t("loading")
          : isFailed
            ? t("failed")
            : friends.length > 0 && (
              <>
                <div
                  className={cn(
                    "absolute left-24 bottom-12 animate-spin animate-infinite animate-duration-[20s]",
                    { "animate-paused": paused },
                  )}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {friends.map((friend, i) => {
                    const angle = (360 / CIRCLE_SIZE) * i
                    return (
                      <LiquidGlass
                        key={i}
                        hover
                        lighted={current === i}
                        rounded="full"
                        className={cn(
                          "absolute w-16 h-16 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounceIn",
                          { "scale-110": current === i },
                        )}
                        style={{
                          transform: `rotate(${angle}deg) translateY(-10rem)`,
                        }}
                      >
                        <div
                          className="relative p-2 w-full h-full flex items-center justify-center"
                          style={{
                            transform: `rotate(-${angle}deg)`,
                          }}
                        >
                          <div
                            className={cn(
                              "animate-spin animate-infinite animate-reverse animate-duration-[20s] cursor-pointer",
                              { "animate-paused": paused },
                            )}
                            onClick={() => handleClick(i)}
                          >
                            {/* eslint-disable-next-line next/no-img-element */}
                            <img
                              src={friend.avatar}
                              alt={friend.title}
                              onLoad={() => handleAvatarStatusChange("loaded", i)}
                              onError={() => handleAvatarStatusChange("error", i)}
                              className={cn(
                                "w-full h-full object-cover rounded-full",
                                { "opacity-0": avatarStatus[i] === "error" },
                              )}
                              loading="lazy"
                            />
                            {avatarStatus[i] === "loading" && (
                              <div className="absolute inset-0 z-10 flex items-center justify-center">
                                <IconLoader2 className="w-8 h-8 animate-spin animate-infinite" />
                              </div>
                            )}
                            {avatarStatus[i] === "error" && (
                              <div className="absolute inset-0 z-20 flex items-center justify-center">
                                <IconCircleX className="w-8 h-8" />
                              </div>
                            )}
                          </div>
                        </div>
                      </LiquidGlass>
                    )
                  })}
                  <div className="absolute rounded-full w-48 h-48 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounceIn">
                    <Image
                      src="/avatar.png"
                      alt="Avatar"
                      fill
                      className={cn(
                        "object-cover rounded-full animate-spin animate-infinite animate-reverse animate-duration-[20s]",
                        { "animate-paused": paused },
                      )}
                    />
                  </div>
                </div>

                <LiquidGlass
                  rounded="2xl"
                  className="absolute top-4 right-4 w-96 min-h-48 animate-bounceIn"
                >
                  <div className="w-full h-full p-4 flex flex-col">
                    <div>{t("label")}</div>
                    <div>{"{"}</div>
                    <div className="pl-4">
                      title:
                      {" "}
                      "
                      {friend ? friend.title : t("title")}
                      ",
                    </div>
                    <div className="pl-4 flex items-center gap-2">
                      url:
                      {friend
                        ? (
                            <Button
                              to={friend.url}
                            >
                              <div className="w-6 h-6 flex items-center justify-center">
                                <IconArrowRight />
                              </div>
                            </Button>
                          )
                        : (
                            <span>
                              "
                              {t("url")}
                              "
                            </span>
                          )}
                      ,
                    </div>
                    <div className="pl-4">
                      avatar:
                      {" "}
                      "
                      {t("avatar")}
                      ",
                    </div>
                    <div className="flex flex-col">
                      <div className="pl-4">
                        description: "
                      </div>
                      <div className="pl-12">
                        {friend ? friend.description : t("description")}
                      </div>
                      <div className="pl-4">",</div>
                    </div>
                    <div>{"} "}</div>
                  </div>
                </LiquidGlass>
              </>
            )}
      </div>
    </LiquidGlass>
  )
}
