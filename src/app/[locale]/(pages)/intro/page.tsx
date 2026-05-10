"use client"

import { IconBrandBilibili, IconBrandGithub, IconBrandX, IconMail } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Button from "@/app/components/button"
import LiquidGlass from "@/app/components/liquid-glass"
import { useAnimate } from "@/hooks/navigate"
import { cn } from "@/lib/cn"

export default function Intro() {
  const t = useTranslations("IntroPage")
  const { animateClass } = useAnimate()

  return (
    <div className="flex items-center gap-4 cursor-default">
      <LiquidGlass
        rounded="3xl"
        className={cn("w-60 h-90 md:w-64 md:h-96", animateClass)}
      >
        <div className="w-full h-full flex flex-col">
          <div className="relative w-full h-24 p-[2px]">
            <Image
              src="/banner.png"
              alt="Banner"
              fill
              priority
            />
          </div>
          <div className="w-full flex-1 p-4 pt-12 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-2xl">{t("card1.name")}</span>
              <span className="text-sm">{t("card1.account")}</span>
            </div>

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
          <div className="absolute w-20 h-20 top-14 left-4">
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

      <div className="h-90 md:h-96 flex flex-col gap-4">
        <LiquidGlass
          rounded="3xl"
          className={cn("w-90 h-54 md:w-96 md:h-56", animateClass)}
        >
          <div className="w-full h-full p-4 flex flex-col">
            <span>
              {t("card2.greeting")}
              <span className="text-xl">{t("card2.name")}</span>
            </span>
            <span className="text-xs">
              &lt;
              {" "}
              {t("card2.tagline")}
              {" "}
              &gt;
            </span>

            <span>{t("card2.description")}</span>
            <span className="text-xs">&nbsp;</span>
            <span>{t("card2.star")}</span>
            <Button to={t("card2.link")}>
              <div className="w-full h-full p1 flex items-center gap-1 text-xs md:text-sm">
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

        <LiquidGlass
          rounded="3xl"
          className={cn("w-90 md:w-96 flex-1", animateClass)}
        >
          <div className="w-full h-full p-4 flex flex-col justify-evenly gap-1">
            <span className="text-sm md:text-md">{t("card3.welcome")}</span>
            <div className="w-full flex items-center gap-1 text-sm">
              <Button to="https://github.com/Twisuki">
                <div className="w-full h-full p-1">
                  <IconBrandGithub className="w-4 h-4" />
                </div>
              </Button>
              {t("card3.github")}
            </div>
            <div className="w-full flex items-center gap-1 text-sm">
              <Button to="mailto://suyang233@hotmail.com">
                <div className="w-full h-full p-1">
                  <IconMail className="w-4 h-4" />
                </div>
              </Button>
              {t("card3.email")}
            </div>
          </div>
        </LiquidGlass>
      </div>
    </div>
  )
}
