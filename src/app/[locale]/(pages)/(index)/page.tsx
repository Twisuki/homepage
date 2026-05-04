"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useAnimate } from "@/hooks/navigate"
import { cn } from "@/lib/cn"

export default function Index() {
  const t = useTranslations("HomePage")
  const DESCRIPTION = t("description")
  const [description, setDescription] = useState("")
  const { animateClass } = useAnimate()

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setDescription(DESCRIPTION.slice(0, index))
      index++
      if (index > DESCRIPTION.length)
        clearInterval(interval)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={cn("relative w-48 h-48", animateClass)}>
        <Image
          src="/avatar.png"
          alt="avatar"
          fill
          priority
          className="object-cover rounded-full"
        />
      </div>
      <div className={cn("text-3xl", animateClass)}>
        {t("welcome")}
        {" "}
        <span className="font-semibold">Twisuki</span>
        {" "}
        ~
      </div>
      <div className={cn("text-xl", animateClass)}>
        &lt;
        {" "}
        {description}
        {" "}
        &gt;
      </div>
    </div>
  )
}
