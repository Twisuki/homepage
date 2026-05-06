"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useState } from "react"
import LiquidGlass from "@/app/components/liquid-glass"
import { useAnimate } from "@/hooks/navigate"
import { cn } from "@/lib/cn"

export default function Index() {
  const t = useTranslations("HomePage")
  const DESCRIPTION = t("description")
  const [description, setDescription] = useState("")
  const { animateClass } = useAnimate()

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        setDescription(DESCRIPTION.slice(0, index))
        index++
        if (index > DESCRIPTION.length)
          clearInterval(interval)
      }, 50)

      return () => clearInterval(interval)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <LiquidGlass
        rounded="full"
        edge="lg"
        className={cn("w-48 h-48", animateClass)}
      >
        <div className="relative w-full h-full">
          <Image
            src="/avatar.png"
            alt="avatar"
            fill
            priority
            className="object-cover rounded-full"
          />
        </div>
      </LiquidGlass>
      <div className={cn("text-3xl cursor-default", animateClass)}>
        {t("welcome")}
        {" "}
        <span className="font-semibold">Twisuki</span>
        {" "}
        ~
      </div>
      <LiquidGlass
        rounded="full"
        className={cn("text-xl cursor-default", animateClass)}
      >
        <div className="w-full px-2 py-1">
          &lt;
          {" "}
          {description}
          {" "}
          &gt;
        </div>
      </LiquidGlass>
    </div>
  )
}
