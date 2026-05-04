"use client"

import type { WakaInfo } from "@/app/api/waka/route"
import { IconCode, IconLoader2, IconPencilCode } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import Base from "@/app/[locale]/(pages)/state/components/base"

function WakaContent() {
  const t = useTranslations("StatePage.waka")

  const [waka, setWaka] = useState<WakaInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFailed, setIsFailed] = useState(false)

  const getWakaData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/waka")
      const data: WakaInfo = await response.json()
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
        {waka.time}
      </div>
      <div className="w-full flex items-center justify-center gap-2 animate-fadeInDown">
        {waka.lines}
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
      className="flex flex-col items-center justify-center gap-2 text-md"
    >
      <WakaContent />
    </Base>
  )
}
