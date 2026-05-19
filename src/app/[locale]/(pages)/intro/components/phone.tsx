"use client"

import type { useTranslations } from "next-intl"
import { IconBrandBilibili, IconBrandX } from "@tabler/icons-react"
import Image from "next/image"
import { useState } from "react"
import ContactCard from "@/app/[locale]/(pages)/intro/components/contact"
import IntroCard from "@/app/[locale]/(pages)/intro/components/intro"
import Button from "@/app/components/button"
import LiquidGlass from "@/app/components/liquid-glass"
import Responsive from "@/app/components/responsive"
import { useMounted } from "@/hooks/mounted"
import { useSwipe } from "@/hooks/swipe"
import { cn } from "@/lib/cn"

export default function PhoneCard({
  animateClass,
  t,
}: Readonly<{
  animateClass: string
  t: ReturnType<typeof useTranslations>
}>) {
  const { mounted } = useMounted()
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

          {mounted && (
            <Responsive>
              <Responsive.Mobile>
                <div className="w-full h-36">
                  {index === 0
                    ? <IntroCard animateClass="" t={t} />
                    : <ContactCard animateClass="" t={t} />}
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
          )}

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
