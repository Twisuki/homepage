import type { ReactNode } from "react"
import Background from "@/app/components/background"
import Main from "@/app/components/main"
import Menu from "@/app/components/menu"

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="h-screen w-screen">
      <Background />

      <Menu />

      <Main>
        {children}
      </Main>
    </div>
  )
}
