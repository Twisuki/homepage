"use client"

import type { ComponentProps } from "react"
import LiquidGlass from "@/app/components/liquid-glass"
import { useAnimate } from "@/hooks/navigate"
import { cn } from "@/lib/cn"

export default function Base({
  children,
  className,
  x = 1,
  y = 1,
  ...props
}: Readonly<ComponentProps<"div"> & { x?: number, y?: number }>) {
  if (x < 1 || x > 6 || y < 1 || y > 4) {
    throw new Error("Invalid span values")
  }

  const { animateClass } = useAnimate()

  const colSpanClasses = ["col-span-1", "col-span-2", "col-span-3", "col-span-4", "col-span-5", "col-span-6"]
  const rowSpanClasses = ["row-span-1", "row-span-2", "row-span-3", "row-span-4"]

  const colSpanClass = colSpanClasses[x - 1]
  const rowSpanClass = rowSpanClasses[y - 1]

  return (
    <LiquidGlass
      className={cn("rounded-2xl p-4", className, colSpanClass, rowSpanClass, animateClass)}
      {...props}
    >
      {children}
    </LiquidGlass>
  )
}
