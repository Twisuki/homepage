"use client"

import type { useTranslations } from "next-intl"
import { IconBrandGithub } from "@tabler/icons-react"
import Button from "@/app/components/button"
import LiquidGlass from "@/app/components/liquid-glass"
import { useBreakpoint } from "@/hooks/breakpoint"
import { useMounted } from "@/hooks/mounted"
import { cn } from "@/lib/cn"

export default function IntroCard({
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
