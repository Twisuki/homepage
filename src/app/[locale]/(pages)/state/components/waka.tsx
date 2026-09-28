"use client"

import type { WakaData } from "@/app/api/waka/route"
import { IconCode, IconLoader2, IconPencilCode } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import Base from "@/app/[locale]/(pages)/state/components/base"

function WakaContent() {
  const t = useTranslations("StatePage.waka")

  const [waka, setWaka] = useState<WakaData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFailed, setIsFailed] = useState(false)

  const getWakaData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/waka")
      const data: WakaData = await response.json()
      setWaka(data)
    }
    catch (error) {
      console.error("Failed to fetch waka data:", error)
      setIsFailed(true)
    }
    finally {
      setIsLoading(false)
    }
  }

  function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    return `${h.toLocaleString("en-US")}h ${m}min`
  }

  function formatLines(total: number) {
    const v = (total / 1000).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    return `${v}k`
  }

  useEffect(() => {
    void getWakaData()
  }, [])

  if (isLoading) {
    return (
      <>
        {t("loading")}
        <IconLoader2 className="animate-spin" />
      </>
    )
  }

  if (isFailed || !waka) {
    return (
      <>
        {t("failed")}
      </>
    )
  }

  return (
    <>
      <div className="w-full flex items-center justify-between animate-fadeInUp">
        <IconPencilCode />
        {formatTime(waka.time)}
      </div>
      <div className="w-full flex items-center justify-center gap-2 animate-fadeInDown">
        {formatLines(waka.lines)}
        <span>Lines</span>
        <IconCode />
      </div>
    </>
  )
}

export default function Waka() {
  return (
    <Base
      x={2}
      y={1}
      hover
      className="flex flex-col items-center justify-center gap-2 text-md"
    >
      <WakaContent />
    </Base>
  )
}
