import type { ReactNode } from "react"

export default function Main({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div>
      {children}
    </div>
  )
}
