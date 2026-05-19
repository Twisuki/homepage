"use client"

import type { useTranslations } from "next-intl"
import { IconBrandGithub, IconMail } from "@tabler/icons-react"
import Button from "@/app/components/button"
import LiquidGlass from "@/app/components/liquid-glass"
import { useBreakpoint } from "@/hooks/breakpoint"
import { useMounted } from "@/hooks/mounted"
import { cn } from "@/lib/cn"

export default function ContactCard({
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
