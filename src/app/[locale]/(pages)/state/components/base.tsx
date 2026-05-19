"use client"

import type { ComponentProps } from "react"
import LiquidGlass from "@/app/components/liquid-glass"
import { useBreakpoint } from "@/hooks/breakpoint"
import { useMounted } from "@/hooks/mounted"
import { useAnimate } from "@/hooks/navigate"
import { cn } from "@/lib/cn"

export default function Base({
  children,
  className,
  x = 1,
  y = 1,
  rounded = false,
  hover = false,
  click = false,
  ...props
}: Readonly<ComponentProps<"div"> & {
  x?: number
  y?: number
  rounded?: boolean
  hover?: boolean
  click?: boolean
}>) {
  if (x < 1 || x > 6 || y < 1 || y > 4) {
    throw new Error("Invalid span values")
  }

  const { mounted } = useMounted()
  const { isMobile } = useBreakpoint()
  const { animateClass } = useAnimate()

  const widthClasses = ["w-16", "w-32", "w-48", "w-64", "w-80", "w-96"]
  const heightClasses = ["h-16", "h-32", "h-48", "h-64"]
  const colSpanClasses = ["sm:col-span-1", "sm:col-span-2", "sm:col-span-3", "sm:col-span-4", "sm:col-span-5", "sm:col-span-6"]
  const rowSpanClasses = ["sm:row-span-1", "sm:row-span-2", "sm:row-span-3", "sm:row-span-4"]

  const widthClass = widthClasses[x - 1]
  const heightClass = heightClasses[y - 1]
  const colSpanClass = colSpanClasses[x - 1]
  const rowSpanClass = rowSpanClasses[y - 1]

  if (!mounted)
    return null

  return (
    <LiquidGlass
      rounded={rounded ? "full" : "2xl"}
      hover={hover}
      click={click}
      className={cn(
        widthClass,
        heightClass,
        "sm:w-auto sm:h-auto",
        colSpanClass,
        rowSpanClass,
        !isMobile ? animateClass : "",
      )}
      {...props}
    >
      <div className={cn(
        "w-full h-full p-4 cursor-default",
        className,
        { "rounded-full": rounded },
      )}
      >
        {children}
      </div>
    </LiquidGlass>
  )
}
