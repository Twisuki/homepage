import type { ReactNode } from "react"
import { Children, isValidElement } from "react"
import { useBreakpoint } from "@/hooks/breakpoint"

const Desktop = ({ children }: Readonly<{ children: ReactNode }>) => <>{children}</>
const Tablet = ({ children }: Readonly<{ children: ReactNode }>) => <>{children}</>
const Mobile = ({ children }: Readonly<{ children: ReactNode }>) => <>{children}</>

export default function Responsive({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { isMobile, isTablet, isDesktop } = useBreakpoint()

  return (
    <>
      {Children.map(children, (child) => {
        if (!isValidElement(child))
          return null

        if (child.type === Desktop && isDesktop)
          return child
        if (child.type === Tablet && isTablet)
          return child
        if (child.type === Mobile && isMobile)
          return child
        return null
      })}
    </>
  )
}

Responsive.Desktop = Desktop
Responsive.Tablet = Tablet
Responsive.Mobile = Mobile
