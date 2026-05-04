"use client"

import { IconBrandGithub, IconBrandX, IconLoader2 } from "@tabler/icons-react"
import Image from "next/image"
import LiquidGlass from "@/app/components/liquid-glass"
import { useAnimate } from "@/hooks/navigate"
import { cn } from "@/lib/cn"

export default function Intro() {
  const { animateClass } = useAnimate()

  const handleClick = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="flex items-center gap-4">
      <LiquidGlass className={cn("w-64 h-96 rounded-3xl overflow-hidden", animateClass)}>
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-24 p-[2px]">
            <div className="relative w-full h-full rounded-t-3xl overflow-hidden">
              <Image
                src="/banner.png"
                alt="Banner"
                fill
                priority
              />
            </div>
          </div>
          <div className="w-full flex-1 p-4 pt-12 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-2xl">Twisuki</span>
              <span className="text-sm">@suyang233 @Nya_Twisuki</span>
            </div>

            <div className="flex w-full gap-2">
              <LiquidGlass
                className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90"
                onClick={() => handleClick("https://github.com/Twisuki")}
                asChild
              >
                <div className="hover:bg-white/20">
                  <IconBrandGithub />
                </div>
              </LiquidGlass>
              <LiquidGlass
                className="w-10 h-10 rounded-full flex items-center justify-center active:scale-90"
                onClick={() => handleClick("https://x.com/suyang_233")}
                asChild
              >
                <div className="hover:bg-white/20">
                  <IconBrandX />
                </div>
              </LiquidGlass>
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
      <div className="h-96 flex flex-col gap-4">
        <LiquidGlass className={cn("w-96 h-56 rounded-3xl overflow-hidden p-4", animateClass)}>
          还没想好写什么呢...
          <IconLoader2 className="animate-spin" />
        </LiquidGlass>
        <LiquidGlass className={cn("w-96 flex-1 rounded-3xl overflow-hidden p-4", animateClass)}>
          还没想好写什么呢...
          <IconLoader2 className="animate-spin" />
        </LiquidGlass>
      </div>
    </div>
  )
}
