import type { Metadata } from "next"
import type { ReactNode } from "react"
import ThemeProvider from "@/app/components/theme-provider"
import "@fontsource/maple-mono"
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
      <head>
        <link
          rel="stylesheet"
          href="https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-Regular/result.css?display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
