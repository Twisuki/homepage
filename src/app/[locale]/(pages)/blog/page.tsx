"use client"

import type { BlogData } from "@/app/api/blog/route"
import { useTranslations } from "next-intl"
import { useEffect, useMemo, useState } from "react"
import BlogContent from "@/app/[locale]/(pages)/blog/components/content"
import BlogList from "@/app/[locale]/(pages)/blog/components/list"
import BlogTag from "@/app/[locale]/(pages)/blog/components/tag"
import LiquidGlass from "@/app/components/liquid-glass"
import { useAnimate } from "@/hooks/navigate"
import { cn } from "@/lib/cn"

export default function Blog() {
  const { animateClass } = useAnimate()
  const t = useTranslations("BlogPage")

  const [data, setData] = useState<BlogData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFailed, setIsFailed] = useState(false)
  const [index, setIndex] = useState(0)

  const blogs = useMemo<BlogData[]>(() => {
    if (data.length > 4) {
      return data.slice(0, 4)
    }
    return [] as BlogData[]
  }, [data])

  const activeBlog = useMemo<BlogData | null>(() => {
    if (data.length > 0 && index < data.length) {
      return data[index]
    }
    return null
  }, [data, index])

  const getBlogData = async () => {
    setIsLoading(true)

    try {
      const res = await fetch("/api/blog")
      const data: BlogData[] = await res.json()
      setData(data)
    }
    catch (error) {
      console.error("Failed to fetch blog data:", error)
      setIsFailed(true)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void getBlogData()
  }, [])

  return (
    <div className="flex items-center gap-4">
      <LiquidGlass
        rounded="3xl"
        className={cn("w-64 h-96", animateClass)}
      >
        <BlogList
          t={t}
          isLoading={isLoading}
          isFailed={isFailed}
          blogs={blogs}
          index={index}
          onSetIndex={setIndex}
        />
      </LiquidGlass>

      <div className="h-96 flex flex-col gap-4">
        <LiquidGlass
          rounded="3xl"
          className={cn("w-96 h-80", animateClass)}
        >
          <BlogContent
            t={t}
            isLoading={isLoading}
            isFailed={isFailed}
            blog={activeBlog}
          />
        </LiquidGlass>

        <LiquidGlass
          rounded="3xl"
          className={cn("w-96 flex-1 cursor-default", animateClass)}
        >
          <BlogTag
            t={t}
            isLoading={isLoading}
            isFailed={isFailed}
            blog={activeBlog}
          />
        </LiquidGlass>
      </div>
    </div>
  )
}
