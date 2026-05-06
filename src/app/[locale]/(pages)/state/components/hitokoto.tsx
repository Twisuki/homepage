"use client"

import type { HitokotoData } from "@/app/api/hitokoto/route"
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import Base from "@/app/[locale]/(pages)/state/components/base"
import { cn } from "@/lib/cn"

type HitokotoStatus = "init" | "printing" | "printed" | "deleting" | "failed"

export default function Hitokoto() {
  const t = useTranslations("StatePage.hitokoto")

  const [data, setData] = useState<HitokotoData | null>(null)
  const [hitokoto, setHitokoto] = useState("")
  const [from, setFrom] = useState("")
  const [status, setStatus] = useState<HitokotoStatus>("init")

  const getHitokoto = async () => {
    try {
      const response = await fetch("/api/hitokoto")
      const data: HitokotoData = await response.json()
      setData(data)
      setStatus("printing")
    }
    catch (error) {
      setStatus("failed")
      console.error("Failed to fetch hitokoto:", error)
    }
  }

  useEffect(() => {
    if (status === "printing" && data) {
      setFrom(data.from)

      let index = 0
      const interval = setInterval(() => {
        setHitokoto(data.hitokoto.slice(0, index))
        index++

        if (index > data.hitokoto.length) {
          clearInterval(interval)
          setStatus("printed")
        }
      }, 100)

      return () => clearInterval(interval)
    }
    else if (status === "deleting") {
      let index = hitokoto.length
      const interval = setInterval(() => {
        setHitokoto(hitokoto.slice(0, index))
        index--

        if (index < 0) {
          clearInterval(interval)
        }
      }, 50)

      return () => clearInterval(interval)
    }
  }, [status])

  useEffect(() => {
    void getHitokoto()
  }, [])

  const handleClick = () => {
    if (status === "printed") {
      setStatus("deleting")
      void getHitokoto()
    }
  }

  return (
    <Base
      x={5}
      y={1}
      click={status === "printed"}
      className={cn(
        "flex flex-col items-center justify-center gap-1",
        { "cursor-pointer": status === "printed" },
        { "cursor-wait": status === "deleting" || status === "init" },
      )}
      onClick={handleClick}
    >
      {status === "failed"
        ? <span>{t("failed")}</span>
        : (
            <>
              <div className="flex items-center justify-center">
                <IconChevronsLeft />
                {hitokoto}
                <IconChevronsRight />
              </div>
              <div className="w-full h-4">
                <div className={cn(
                  "w-full flex px-2 justify-end",
                  { "animate-fadeInUp": status === "printing" && from },
                  { "animate-fadeOutDown": status === "deleting" },
                )}
                >
                  ---
                  {" "}
                  {from}
                </div>
              </div>
            </>
          )}
    </Base>
  )
}
