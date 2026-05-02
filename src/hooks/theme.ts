"use client"

import { useEffect, useRef } from "react"
import { useThemeStore } from "@/stores/theme"

export function useTheme() {
  const { theme, mode, setTheme, setMode } = useThemeStore()
  const modeRef = useRef(mode)

  useEffect(() => {
    modeRef.current = mode
  }, [mode])

  useEffect(() => {
    const sync = () => {
      if (modeRef.current === "auto")
        setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", sync)
    return () => mediaQuery.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (mode === "auto")
      setTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    else
      setTheme(mode)
  }, [mode])

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    if (mode === "auto")
      setMode(nextTheme)
    else
      setTheme(nextTheme)
  }

  const toggleMode = () => {
    const CYCLE: Array<"auto" | "light" | "dark"> = ["auto", "light", "dark"]
    const nextIndex = (CYCLE.indexOf(mode) + 1) % CYCLE.length
    setMode(CYCLE[nextIndex])
  }

  const isDark = theme === "dark"
  const isAuto = mode === "auto"

  return {
    theme,
    mode,
    isDark,
    isAuto,
    toggleTheme,
    toggleMode,
  }
}
