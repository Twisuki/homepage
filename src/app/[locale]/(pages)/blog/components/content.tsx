"use client"

import type { useTranslations } from "next-intl"
import type { BlogData } from "@/app/api/blog/route"
import { IconArrowRight, IconLoader2 } from "@tabler/icons-react"
import Button from "@/app/components/button"

export default function BlogContent({
  t,
  isLoading,
  isFailed,
  blog,
}: Readonly<{
  t: ReturnType<typeof useTranslations>
  isLoading: boolean
  isFailed: boolean
  blog: BlogData | null
}>) {
  if (isLoading || (!isFailed && !blog)) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <IconLoader2 className="animate-spin animate-infinite" />
      </div>
    )
  }
  else if (isFailed || !blog) {
    return <div className="w-full h-full flex items-center justify-center">{t("failed2")}</div>
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full p-4 flex flex-col gap-4 cursor-default">
        <div className="w-full flex flex-col gap-2 animate-fadeIn">
          <div className="w-full">
            &lt;
            {" "}
            {blog.title}
            {" "}
            &gt;
          </div>
          <div className="w-full text-sm text-right">{blog.date}</div>
        </div>
        <div className="w-full max-h-40 overflow-hidden text-sm animate-fadeIn">
          {blog.excerpt.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        <div className="w-full flex items-center justify-end">
          <Button
            className="w-32 h-8 group"
            to={blog.url}
          >
            <div className="w-full h-full flex items-center justify-center text-sm">
              {t("link")}
              <IconArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-all duration-200" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}
