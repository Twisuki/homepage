"use client"

import type { ReactNode } from "react"
import { IconChevronsDown, IconChevronsUp } from "@tabler/icons-react"
import { useNavigate } from "@/hooks/navigate"
import { useWheel } from "@/hooks/whell"

export default function Main({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { navigatePrev, navigateNext, isFirst, isLast } = useNavigate()

  useWheel(navigatePrev, navigateNext, 500)

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {!isFirst && (
        <div className="absolute w-full h-12 top-0 left-0 flex items-center justify-center z-500">
          <IconChevronsUp
            className="w-8 h-8 animate-twBounce animate-infinite hover:animate-paused"
            onClick={navigatePrev}
          />
        </div>
      )}
      {children}

      {!isLast && (
        <div className="absolute w-full h-12 bottom-0 left-0 flex items-center justify-center z-500">
          <IconChevronsDown
            className="w-8 h-8 animate-twBounce animate-infinite hover:animate-paused"
            onClick={navigateNext}
          />
        </div>
      )}
    </div>
  )
}
