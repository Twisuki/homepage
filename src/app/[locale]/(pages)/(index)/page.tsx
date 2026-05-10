"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useState } from "react"
import LiquidGlass from "@/app/components/liquid-glass"
import { useBreakpoint } from "@/hooks/breakpoint"
import { useMounted } from "@/hooks/mounted"
import { useAnimate } from "@/hooks/navigate"
import { cn } from "@/lib/cn"

function Typing({
  text,
  className,
  speed = "slow",
}: Readonly<{
  text: string
  className?: string
  speed?: "slow" | "fast"
}>) {
  const [message, setMessage] = useState("")
  const interval = speed === "fast" ? 50 : 100

  useEffect(() => {
    let index = 0
    const id = setInterval(() => {
      setMessage(text.slice(0, index + 1))
      index++
      if (index >= text.length)
        clearInterval(id)
    }, interval)
    return () => clearInterval(id)
  }, [text, interval])

  return (
    <LiquidGlass
      rounded="full"
      className={cn("cursor-default", className)}
    >
      <div className="px-2 py-1 whitespace-nowrap">
        &lt;
        {" "}
        {message}
        {" "}
        &gt;
      </div>
    </LiquidGlass>
  )
}

export default function Index() {
  const t = useTranslations("HomePage")
  const DESCRIPTION1 = t("description1")
  const DESCRIPTION2 = t("description2")
  const FULL_DESCRIPTION = `${DESCRIPTION1} | ${DESCRIPTION2}`
  const { animateClass } = useAnimate()
  const { isMobile } = useBreakpoint()
  const { mounted } = useMounted()

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <LiquidGlass
        rounded="full"
        edge="lg"
        className={cn("w-32 h-32 sm:w-48 sm:h-48", animateClass)}
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
      <div className={cn("text-xl sm:text-3xl cursor-default", animateClass)}>
        {t("welcome")}
        {" "}
        <span className="font-semibold">Twisuki</span>
        {" "}
        ~
      </div>
      {mounted && isMobile
        ? (
            <div className="flex flex-col gap-2 items-center">
              <Typing text={DESCRIPTION1} className={cn("text-md", animateClass)} />
              <Typing text={DESCRIPTION2} className={cn("text-md", animateClass)} />
            </div>
          )
        : (
            <Typing
              text={FULL_DESCRIPTION}
              className={cn("text-md sm:text-xl", animateClass)}
              speed="fast"
            />
          )}
    </div>
  )
}
