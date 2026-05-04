import { useEffect, useMemo, useState } from "react"
import { useNavigateContext } from "@/contexts/navigate"
import { usePathname, useRouter } from "@/i18n/navigation"

const PAGE_LIST = ["/", "/intro", "/state", "/blog", "/friend"]

// 导航及动画 hook
// 运行逻辑
// useNavigate: 翻页函数 => 设置方向 => 计时等待动画完毕 => 路由跳转 / 侦测路由变化 => 计时等待动画完毕 => 重置方向
// useAnimate:             侦测方向变化, 播放翻出动画               侦测 [] 挂载, 播放翻入动画

export function useNavigate() {
  const { direction, setDirection } = useNavigateContext()
  const router = useRouter()
  const pathanme = usePathname()

  const index = PAGE_LIST.indexOf(pathanme)

  const isFirst = index === 0
  const isLast = index === PAGE_LIST.length - 1

  useEffect(() => {
    if (!PAGE_LIST.includes(pathanme)) {
      router.push("/")
    }

    if (direction !== null) {
      const timer = setTimeout(() => {
        setDirection(null)
        clearTimeout(timer)
      }, 300)
    }
  }, [pathanme])

  const navigatePrev = () => {
    if (!isFirst && direction === null) {
      setDirection("up")
      const timer = setTimeout(() => {
        router.push(PAGE_LIST[index - 1])
        clearTimeout(timer)
      }, 300)
    }
  }

  const navigateNext = () => {
    if (!isLast && direction === null) {
      setDirection("down")
      const timer = setTimeout(() => {
        router.push(PAGE_LIST[index + 1])
        clearTimeout(timer)
      }, 300)
    }
  }

  return {
    index,
    isFirst,
    isLast,
    navigatePrev,
    navigateNext,
  }
}

export function useAnimate() {
  const { direction } = useNavigateContext()
  const [animateType, setAnimateType] = useState("animate-fadeInUp")

  useEffect(() => {
    if (direction !== null) {
      if (direction === "up") {
        setAnimateType("animate-fadeOutDown")
      }
      else if (direction === "down") {
        setAnimateType("animate-fadeOutUp")
      }
    }
  }, [direction])

  useEffect(() => {
    if (direction !== null) {
      if (direction === "up") {
        setAnimateType("animate-fadeInDown")
      }
      else if (direction === "down") {
        setAnimateType("animate-fadeInUp")
      }
    }
  }, [])

  const animateClass = useMemo(() => `${animateType} animate-fast`, [animateType])

  return {
    animateClass,
  }
}
