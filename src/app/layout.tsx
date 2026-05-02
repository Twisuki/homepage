import type { Metadata } from "next"
import type { ReactNode } from "react"
import ThemeProvider from "@/app/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "苏阳 ♡ | 主页",
  description: "Twisuki's new homepage.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
