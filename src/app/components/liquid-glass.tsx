"use client"

import type { ComponentProps } from "react"
import { useState } from "react"
import { cn } from "@/lib/cn"

interface LiquidGlassProps {
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
  edge?: "md" | "lg" | "xl"
  hover?: boolean
  click?: boolean
}

export default function LiquidGlass({
  children,
  className,
  rounded = "none",
  edge = "md",
  hover = false,
  click = false,
  ...props
}: Readonly<ComponentProps<"div"> & LiquidGlassProps>) {
  const ROUNDED_CLASSES: Record<string, string> = {
    "none": "",
    "sm": "rounded-sm",
    "md": "rounded-md",
    "lg": "rounded-lg",
    "xl": "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    "full": "rounded-full",
  }

  const EDGE_VALUES: Record<string, number> = {
    md: 1,
    lg: 2,
    xl: 3,
  }

  const roundedClass = ROUNDED_CLASSES[rounded] ?? ""
  const edgeValue = EDGE_VALUES[edge] ?? 1

  const [hovered, setHovered] = useState(false)
  const [isActived, setIsActived] = useState<boolean>(false)

  return (
    <div
      className={cn("relative flex overflow-hidden", roundedClass, className)}
      style={{
        padding: `${edgeValue}px`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setIsActived(true)}
      onMouseUp={() => setIsActived(false)}
      {...props}
    >
      <div
        className={cn("absolute inset-0 z-1", roundedClass)}
        style={{
          backdropFilter: "url(#lq)",
          maskImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect x="0" y="0" width="100%" height="100%" rx="0" ry="0" fill="white"/></svg>'), url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect x="5" y="5" width="calc(100% - 10px)" height="calc(100% - 10px)" rx="21" ry="21" fill="white"/></svg>')`,
          maskComposite: "exclude",
        }}
      />

      <div
        className={cn(
          "absolute inset-0 bg-black/10 z-2",
          roundedClass,
          { "bg-transparent": (hover || click) && hovered },
          { "bg-black/10": click && isActived },
        )}
        style={{
          backdropFilter: "blur(2px)",
        }}
      />

      <div
        className={cn("absolute inset-0 z-3", roundedClass)}
        style={{
          boxShadow: `inset ${edgeValue}px ${edgeValue}px 0px 0px rgba(255, 255, 255, 0.5), 
                inset -${edgeValue}px -${edgeValue}px 0px 0px rgba(255, 255, 255, 0.6)`,
        }}
      />

      <div
        className={cn("absolute z-4", roundedClass)}
        style={{
          inset: `${edgeValue}px`,
          boxShadow: `inset ${edgeValue * 2}px ${edgeValue * 2}px ${edgeValue * 3}px ${edgeValue}px rgba(255, 255, 255, 0.2), 
                inset -${edgeValue * 2}px -${edgeValue * 2}px ${edgeValue * 2}px -1px rgba(255, 255, 255, 0.2)`,
        }}
      />

      <div className={cn("w-full h-full z-5", roundedClass)}>
        {children}
      </div>
    </div>
  )
}
