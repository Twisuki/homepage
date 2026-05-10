"use client"

import { IconBrandBilibili, IconBrandGithub, IconBrandX, IconMail } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useState } from "react"
import Button from "@/app/components/button"
import LiquidGlass from "@/app/components/liquid-glass"
import Responsive from "@/app/components/responsive"
import { useBreakpoint } from "@/hooks/breakpoint"
import { useMounted } from "@/hooks/mounted"
import { useAnimate } from "@/hooks/navigate"
import { useSwipe } from "@/hooks/swipe"
import { cn } from "@/lib/cn"

function Card1({
  animateClass,
  t,
}: Readonly<{
  animateClass: string
  t: ReturnType<typeof useTranslations>
}>) {
  const [index, setIndex] = useState(0)

  useSwipe(
    null,
    null,
    () => setIndex(0),
    () => setIndex(1),
  )

  return (
    <LiquidGlass
      rounded="3xl"
      className={cn("w-64 h-96 sm:w-60 sm:h-90 md:w-64 md:h-96", animateClass)}
    >
      <div className="w-full h-full flex flex-col">
        <div className="relative w-full h-20 sm:h-24 p-[2px]">
          <Image
            src="/banner.png"
            alt="Banner"
            fill
            priority
          />
        </div>
        <div className="w-full flex-1 p-2 sm:p-4 pt-8 sm:pt-12 flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xl sm:text-2xl">{t("card1.name")}</span>
            <span className="text-xs sm:text-sm">{t("card1.account")}</span>
          </div>

          <Responsive>
            <Responsive.Mobile>
              <div className="w-full h-36">
                {index === 0
                  ? <Card2 animateClass="" t={t} />
                  : <Card3 animateClass="" t={t} />}
              </div>
              <div className="w-full h-1 flex items-center justify-center gap-1">
                <div
                  className={cn(
                    "w-1 h-1 rounded-full",
                    index === 0 ? "bg-white" : "bg-gray-500",
                  )}
                  onClick={() => setIndex(0)}
                />
                <div
                  className={cn(
                    "w-1 h-1 rounded-full",
                    index === 1 ? "bg-white" : "bg-gray-500",
                  )}
                  onClick={() => setIndex(1)}
                />
              </div>
            </Responsive.Mobile>
          </Responsive>

          <div className="flex w-full gap-2">
            <Button
              className="w-10 h-10"
              to="https://space.bilibili.com/317707977"
            >
              <div className="w-full h-full flex justify-center items-center">
                <IconBrandBilibili />
              </div>
            </Button>
            <Button
              className="w-10 h-10"
              to="https://x.com/suyang_233"
            >
              <div className="w-full h-full flex justify-center items-center">
                <IconBrandX />
              </div>
            </Button>
          </div>
        </div>
        <div className="absolute w-16 h-16 sm:w-20 sm:h-20 top-12 sm:top-14 left-4">
          <Image
            src="/avatar.png"
            alt="Avatar"
            fill
            priority
            className="object-cover rounded-full"
          />
        </div>
      </div>
    </LiquidGlass>
  )
}

function Card2({
  animateClass,
  t,
}: Readonly<{
  animateClass: string
  t: ReturnType<typeof useTranslations>
}>) {
  const { mounted } = useMounted()
  const { isMobile } = useBreakpoint()

  if (!mounted)
    return null

  return (
    <LiquidGlass
      rounded={isMobile ? "xl" : "3xl"}
      className={cn("w-full h-full sm:w-90 sm:h-54 md:w-96 md:h-56", animateClass)}
    >
      <div className="w-full h-full p-1 sm:p-4 flex flex-col justify-evenly">
        <span className="text-xs sm:text-sm md:text-base">
          {t("card2.greeting")}
          <span className="text-md sm:text-xl">{t("card2.name")}</span>
        </span>
        <span className="hidden sm:inline text-xs">
          &lt;
          {" "}
          {t("card2.tagline")}
          {" "}
          &gt;
        </span>

        <span className="text-xs sm:text-sm md:text-base">{t("card2.description")}</span>
        <span className="text-xs">&nbsp;</span>
        <span className="text-xs sm:tetxt-sm md:text-base">{t("card2.star")}</span>
        <Button to={t("card2.link")}>
          <div className="w-full h-full p1 flex items-center gap-1 text-xs md:text-base">
            <Button>
              <div className="w-full h-full p-1">
                <IconBrandGithub className="w-4 h-4" />
              </div>
            </Button>
            {t("card2.link")}
          </div>
        </Button>
      </div>
    </LiquidGlass>
  )
}

function Card3({
  animateClass,
  t,
}: Readonly<{
  animateClass: string
  t: ReturnType<typeof useTranslations>
}>) {
  const { mounted } = useMounted()
  const { isMobile } = useBreakpoint()

  if (!mounted)
    return null

  return (
    <LiquidGlass
      rounded={isMobile ? "xl" : "3xl"}
      className={cn("w-full h-full sm:w-90 md:w-96 sm:flex-1", animateClass)}
    >
      <div className="w-full h-full p-2 sm:p-4 flex flex-col justify-evenly gap-1">
        <span className="text-xs sm:text-sm md:text-base">{t("card3.welcome")}</span>
        <div className="w-full flex items-center gap-1 text-xs sm:text-sm">
          <Button to="https://github.com/Twisuki">
            <div className="w-full h-full p-1">
              <IconBrandGithub className="w-4 h-4" />
            </div>
          </Button>
          {t("card3.github")}
        </div>
        <div className="w-full flex items-center gap-1 text-xs sm:text-sm">
          <Button to="mailto://suyang233@hotmail.com">
            <div className="w-full h-full p-1">
              <IconMail className="w-4 h-4" />
            </div>
          </Button>
          {t("card3.email")}
        </div>
      </div>
    </LiquidGlass>
  )
}

export default function Intro() {
  const t = useTranslations("IntroPage")
  const { animateClass } = useAnimate()

  return (
    <div className="flex items-center gap-4 cursor-default">
      <Card1 animateClass={animateClass} t={t} />

      <div className="hidden h-90 md:h-96 sm:flex flex-col gap-4">
        <Card2 animateClass={animateClass} t={t} />
        <Card3 animateClass={animateClass} t={t} />
      </div>
    </div>
  )
}
