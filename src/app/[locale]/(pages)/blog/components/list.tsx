"use client"

import type { useTranslations } from "next-intl"
import type { BlogData } from "@/app/api/blog/route"
import { IconPlayerPlay, IconPlayerPlayFilled } from "@tabler/icons-react"
import Button from "@/app/components/button"
import LiquidGlass from "@/app/components/liquid-glass"

export default function BlogList({
  t,
  isLoading,
  isFailed,
  blogs,
  index,
  onSetIndex,
}: Readonly<{
  t: ReturnType<typeof useTranslations>
  isLoading: boolean
  isFailed: boolean
  blogs: BlogData[]
  index: number
  onSetIndex: (index: number) => void
}>) {
  if (isLoading) {
    return <div className="w-full h-full flex items-center justify-center">{t("loading")}</div>
  }
  else if (isFailed) {
    return <div className="w-full h-full flex items-center justify-center">{t("failed1")}</div>
  }

  return (
    <div className="w-full h-full p-4 flex flex-col gap-2 flex-nowrap overflow-hidden">
      {blogs.length === 4 && blogs.map((blog, i) => (
        <LiquidGlass
          key={i}
          rounded="2xl"
          hover
          lighted={index === i}
          className="w-full h-16 shrink-0 animate-fadeIn cursor-pointer"
          onClick={() => onSetIndex(i)}
        >
          <div className="w-full h-full p-2 flex">
            <div className="w-full pr-2 h-full flex flex-col">
              <div className="w-full flex items-center gap-2">
                {index === i ? <IconPlayerPlayFilled className="w-4 h-4" /> : <IconPlayerPlay className="w-4 h-4" />}
                <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {blog.title}
                </span>
              </div>
              <span className="text-sm text-right">
                {blog.date}
              </span>
            </div>
          </div>
        </LiquidGlass>
      ))}

      <div className="w-full flex-1 flex items-end justify-center gap-4">
        <Button
          className="w-full h-8"
          to="https://blog.twis.uk"
        >
          <div className="w-full h-full flex items-center justify-center">
            {t("site")}
          </div>
        </Button>
      </div>
    </div>
  )
}
