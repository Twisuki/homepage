"use client"

import type { ReactNode } from "react"
import { IconChevronsDown, IconChevronsUp } from "@tabler/icons-react"
import { usePathname, useRouter } from "@/i18n/navigation"

export default function Main({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const PAGE_LIST = ["/", "/intro", "/state", "/blog", "/friend"]

  const pathname = usePathname()
  const router = useRouter()

  const index = PAGE_LIST.indexOf(pathname)

  const handleNavigatePrev = () => {
    if (index > 0) {
      router.push(PAGE_LIST[index - 1])
    }
  }

  const handleNavigateNext = () => {
    if (index < PAGE_LIST.length - 1) {
      router.push(PAGE_LIST[index + 1])
    }
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      { index > 0 && (
        <div className="absolute w-full h-12 top-0 left-0 flex items-center justify-center z-500">
          <IconChevronsUp
            className="w-8 h-8 animate-twBounce animate-infinite hover:animate-paused"
            onClick={handleNavigatePrev}
          />
        </div>
      )}
      {children}

      { index < 4 && (
        <div className="absolute w-full h-12 bottom-0 left-0 flex items-center justify-center z-500">
          <IconChevronsDown
            className="w-8 h-8 animate-twBounce animate-infinite hover:animate-paused"
            onClick={handleNavigateNext}
          />
        </div>
      )}
    </div>
  )
}
