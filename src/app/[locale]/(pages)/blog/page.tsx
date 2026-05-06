"use client"

import type { BlogData } from "@/app/api/blog/route"
import { IconArrowRight, IconLoader2, IconPlayerPlay, IconPlayerPlayFilled, IconTag } from "@tabler/icons-react"
import { useTranslations } from "next-intl"
import { useEffect, useMemo, useState } from "react"
import Button from "@/app/components/button"
import LiquidGlass from "@/app/components/liquid-glass"
import { useAnimate } from "@/hooks/navigate"
import { cn } from "@/lib/cn"

export default function Blog() {
  const { animateClass } = useAnimate()
  const t = useTranslations("BlogPage")

  const [data, setData] = useState<BlogData[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [isFailed, setIsFailed] = useState(false)
  const [index, setIndex] = useState(0)

  const blogs = useMemo<BlogData[]>(() => {
    if (data && data.length > 4) {
      return data.slice(0, 4)
    }
    return [] as BlogData[]
  }, [data])

  const activeBlog = useMemo<BlogData | null>(() => {
    if (data && data.length > 0 && index < data.length) {
      return data[index]
    }
    return null
  }, [data, index])

  const getBlogData = async () => {
    setIsLoading(true)

    try {
      const res = await fetch("/api/blog")
      const data = await res.json()
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
        {isLoading
          ? (<div className="w-full h-full flex items-center justify-center">{t("loading")}</div>)
          : isFailed
            ? (<div className="w-full h-full flex items-center justify-center">{t("failed1")}</div>)
            : (
                <div className="w-full h-full p-4 flex flex-col gap-2 flex-nowrap overflow-hidden">
                  {blogs.length === 4 && blogs.map((blog, i) => (
                    <LiquidGlass
                      key={i}
                      rounded="2xl"
                      hover
                      lighted={index === i}
                      className="w-full h-16 shrink-0 animate-fadeIn cursor-pointer"
                      onClick={() => setIndex(i)}
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
              )}
      </LiquidGlass>

      <div className="h-96 flex flex-col gap-4">
        <LiquidGlass
          rounded="3xl"
          className={cn("w-96 h-80", animateClass)}
        >
          {isLoading
            ? (
                <div className="w-full h-full flex items-center justify-center">
                  <IconLoader2 className="animate-spin animate-infinite" />
                </div>
              )
            : (isFailed || !activeBlog)
                ? (<div className="w-full h-full flex items-center justify-center">{t("failed2")}</div>)
                : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-full p-4 flex flex-col gap-4 cursor-default">
                        <div className="w-full flex flex-col gap-2 animate-fadeIn">
                          <div className="w-full">
                            &lt;
                            {" "}
                            {activeBlog.title}
                            {" "}
                            &gt;
                          </div>
                          <div className="w-full text-sm text-right">{activeBlog.date}</div>
                        </div>
                        <div className="w-full max-h-40 overflow-hidden text-sm animate-fadeIn">
                          {activeBlog.excerpt.map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                        <div className="w-full flex items-center justify-end">
                          <Button
                            className="w-32 h-8 group"
                            to={activeBlog.url}
                          >
                            <div className="w-full h-full flex items-center justify-center text-sm">
                              {t("link")}
                              <IconArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-all duration-200" />
                            </div>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
        </LiquidGlass>

        <LiquidGlass
          rounded="3xl"
          className={cn("w-96 flex-1 cursor-default", animateClass)}
        >
          {isLoading
            ? (<div className="w-full h-full flex items-center justify-center">{t("loading")}</div>)
            : (isFailed || !activeBlog)
                ? (<div className="w-full h-full flex items-center justify-center">{t("failed2")}</div>)
                : (
                    <div className="w-full h-full p-2 flex items-center gap-2">
                      <Button className="w-8 h-8">
                        <div className="w-full h-full flex items-center justify-center">
                          <IconTag />
                        </div>
                      </Button>
                      <div className="text-sm animate-fadeIn">
                        {activeBlog.tags.join(", ")}
                      </div>
                    </div>
                  )}
        </LiquidGlass>
      </div>
    </div>
  )
}
