import type { ReactNode } from "react"
import { Children, isValidElement } from "react"

const Desktop = ({ children }: Readonly<{ children: ReactNode }>) => <>{children}</>
const Tablet = ({ children }: Readonly<{ children: ReactNode }>) => <>{children}</>

export default function Responsive({
  children,
  breakpoint = "md",
}: Readonly<{
  children: ReactNode
  breakpoint?: "sm" | "md" | "lg" | "xl"
}>) {
  const desktopClasses = {
    sm: "hidden sm:block",
    md: "hidden md:block",
    lg: "hidden lg:block",
    xl: "hidden xl:block",
  }[breakpoint]

  const tabletClasses = {
    sm: "block sm:hidden",
    md: "block md:hidden",
    lg: "block lg:hidden",
    xl: "block xl:hidden",
  }[breakpoint]

  return (
    <>
      {Children.map(children, (child) => {
        if (!isValidElement(child))
          return null

        if (child.type === Desktop) {
          return <div className={desktopClasses}>{child}</div>
        }
        if (child.type === Tablet) {
          return <div className={tabletClasses}>{child}</div>
        }
        return child
      })}
    </>
  )
}

Responsive.Desktop = Desktop
Responsive.Tablet = Tablet
