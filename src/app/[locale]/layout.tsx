import type { Metadata } from "next"
import type { ReactNode } from "react"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import ThemeProvider from "@/app/components/theme-provider"
import { routing } from "@/i18n/routing"
import "@fontsource/maple-mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "苏阳 ♡ | 主页",
  description: "Twisuki's new homepage.",
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

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
        <NextIntlClientProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
