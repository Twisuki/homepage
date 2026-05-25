import type { ReactNode } from "react"
import Background from "@/app/components/background"
import Main from "@/app/components/main"
import Menu from "@/app/components/menu"
import { NavigateProvider } from "@/contexts/navigate"

export default function MainLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="relative h-dvh w-screen overflow-hidden text-white/90">
      <Background />

      <div className="relative w-full h-full z-100">
        <Menu />

        <NavigateProvider>
          <Main>
            {children}
          </Main>
        </NavigateProvider>
      </div>
    </div>
  )
}
