"use client"

import type { FriendData } from "@/app/api/friend/route"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import Button from "@/app/components/button"
import LiquidGlass from "@/app/components/liquid-glass"
import { useAnimate } from "@/hooks/navigate"
import { cn } from "@/lib/cn"

export default function friend() {
  const { animateClass } = useAnimate()

  const [data, setData] = useState<FriendData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFailed, setIsFailed] = useState(false)

  const total = useMemo(() => data.length, [data])

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

  useEffect(() => {
    void getFriendData()
  }, [])

  return (
    <LiquidGlass
      rounded="3xl"
      className={cn("w-164 h-96", animateClass)}
    >
      <div className="w-full h-full flex items-center justify-center">
        {isLoading
          ? "加载中..."
          : isFailed
            ? "加载失败"
            : data && data.length > 0 && (
              <div className="relative w-64 h-64 animate-spin animate-infinite animate-duration-[20s]">
                {data.map((friend, i) => {
                  const angle = (360 / total) * i
                  return (
                    <Button
                      key={i}
                      className="absolute w-16 h-16 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translateY(-10rem)`,
                      }}
                    >
                      <div
                        className="relative w-full h-full flex items-center justify-center"
                        style={{
                          transform: `rotate(-${angle}deg)`,
                        }}
                      >
                        {/* eslint-disable-next-line next/no-img-element */}
                        <img
                          src={friend.avatar}
                          alt={friend.title}
                          className="w-full h-full object-cover rounded-full animate-spin animate-infinite animate-reverse animate-duration-[20s]"
                          loading="lazy"
                        />
                      </div>
                    </Button>
                  )
                })}
                <div className="absolute rounded-full w-32 h-32 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Image
                    src="/avatar.png"
                    alt="Avatar"
                    fill
                    className="object-cover rounded-full animate-spin animate-infinite animate-reverse animate-duration-[20s]"
                  />
                </div>
              </div>
            )}
      </div>
    </LiquidGlass>
  )
}
