import type { ReactNode } from "react"
import { Children, isValidElement } from "react"

const Desktop = ({ children }: Readonly<{ children: ReactNode }>) => <>{children}</>
const Tablet = ({ children }: Readonly<{ children: ReactNode }>) => <>{children}</>
const Mobile = ({ children }: Readonly<{ children: ReactNode }>) => <>{children}</>

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl"

export default function Responsive({
  children,
  breakpoint = ["xs", "md"],
}: Readonly<{
  children: ReactNode
  breakpoint?: Array<Breakpoint>
}>) {
  const childArray = Children.toArray(children)
  const hasMobile = childArray.some(child => isValidElement(child) && child.type === Mobile)

  const [breakpoint1, breakpoint2] = breakpoint

  const getClasses = (breakpoint: Breakpoint) => ({
    xs: { hide: "hidden xs:block", show: "block xs:hidden" },
    sm: { hide: "hidden sm:block", show: "block sm:hidden" },
    md: { hide: "hidden md:block", show: "block md:hidden" },
    lg: { hide: "hidden lg:block", show: "block lg:hidden" },
    xl: { hide: "hidden xl:block", show: "block xl:hidden" },
  }[breakpoint])

  const desktopHide = getClasses(breakpoint2).hide
  const tabletHide = hasMobile ? getClasses(breakpoint1).show : getClasses(breakpoint1).show
  const mobileHide = getClasses(breakpoint1).hide

  return (
    <>
      {childArray.map((child, index) => {
        if (!isValidElement(child))
          return null

        if (child.type === Desktop) {
          return <div key={index} className={desktopHide}>{child}</div>
        }
        if (child.type === Tablet) {
          return <div key={index} className={tabletHide}>{child}</div>
        }
        if (child.type === Mobile) {
          return <div key={index} className={mobileHide}>{child}</div>
        }
        return child
      })}
    </>
  )
}

Responsive.Desktop = Desktop
Responsive.Tablet = Tablet
Responsive.Mobile = Mobile
