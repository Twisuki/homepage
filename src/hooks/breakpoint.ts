import { useEffect, useState } from "react"

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl"
export type DeviceType = "mobile" | "tablet" | "desktop"

const BREAKPOINTS = {
  xs: 425,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

function getBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS.xl)
    return "xl"
  if (width >= BREAKPOINTS.lg)
    return "lg"
  if (width >= BREAKPOINTS.md)
    return "md"
  if (width >= BREAKPOINTS.sm)
    return "sm"
  if (width >= BREAKPOINTS.xs)
    return "xs"
  return "xs"
}

function getDeviceType(breakpoint: Breakpoint): DeviceType {
  if (breakpoint === "xs")
    return "mobile"
  if (breakpoint === "sm" || breakpoint === "md")
    return "tablet"
  return "desktop"
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window !== "undefined"
      ? getBreakpoint(window.innerWidth)
      : "lg",
  )

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth))
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const size = breakpoint
  const type = getDeviceType(breakpoint)
  const isMobile = type === "mobile"
  const isTablet = type === "tablet"
  const isDesktop = type === "desktop"

  return {
    size,
    type,
    isMobile,
    isTablet,
    isDesktop,
  }
}
