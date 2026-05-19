"use client"

import type { useTranslations } from "next-intl"
import type { BlogData } from "@/app/api/blog/route"
import { IconTag } from "@tabler/icons-react"
import Button from "@/app/components/button"

export default function BlogTag({
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
    return <div className="w-full h-full flex items-center justify-center">{t("loading")}</div>
  }
  else if (isFailed || !blog) {
    return <div className="w-full h-full flex items-center justify-center">{t("failed2")}</div>
  }

  return (
    <div className="w-full h-full p-2 flex items-center gap-2">
      <Button className="w-8 h-8">
        <div className="w-full h-full flex items-center justify-center">
          <IconTag />
        </div>
      </Button>
      <div className="text-sm animate-fadeIn">
        {blog.tags.join(", ")}
      </div>
    </div>
  )
}
