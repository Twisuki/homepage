"use client"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { useTheme } from "@/hooks/theme"

export default function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  const { theme } = useTheme()

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  return (
    <div className="w-full h-full transition-colors duration-200">
      {children}
    </div>
  )
}
