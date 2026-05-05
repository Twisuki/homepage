"use client"

import type { ReactNode } from "react"
import { IconBrandGithub, IconBrandX, IconLoader2 } from "@tabler/icons-react"
import Image from "next/image"
import LiquidGlass from "@/app/components/liquid-glass"
import { useAnimate } from "@/hooks/navigate"
import { cn } from "@/lib/cn"

function Button({
  children,
  to,
}: Readonly<{
  children: ReactNode
  to: string
}>) {
  const handleClick = () => {
    window.open(to, "_blank")
  }

  return (
    <LiquidGlass
      rounded="full"
      click
      onClick={handleClick}
      className="w-10 h-10 active:scale-90"
    >
      <div className="w-full h-full flex justify-center items-center">
        {children}
      </div>
    </LiquidGlass>
  )
}

export default function Intro() {
  const { animateClass } = useAnimate()

  return (
    <div className="flex items-center gap-4">
      <LiquidGlass
        rounded="3xl"
        className={cn("w-64 h-96", animateClass)}
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
              <span className="text-2xl">Twisuki</span>
              <span className="text-sm">@suyang233 @Nya_Twisuki</span>
            </div>

            <div className="flex w-full gap-2">
              <Button to="https://github.com/Twisuki">
                <IconBrandGithub />
              </Button>
              <Button to="https://x.com/suyang_233">
                <IconBrandX />
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
      <div className="h-96 flex flex-col gap-4">
        <LiquidGlass
          rounded="3xl"
          className={cn("w-96 h-56", animateClass)}
        >
          <div className="w-full h-full p-4">
            还没想好写什么呢...
            <IconLoader2 className="animate-spin" />
          </div>
        </LiquidGlass>
        <LiquidGlass
          rounded="3xl"
          className={cn("w-96 flex-1", animateClass)}
        >
          <div className="w-full h-full p-4">
            还没想好写什么呢...
            <IconLoader2 className="animate-spin" />
          </div>
        </LiquidGlass>
      </div>
    </div>
  )
}
