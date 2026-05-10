import { useEffect, useRef } from "react"

export function useSwipe(
  onSwipeUp: (() => void) | null,
  onSwipeDown: (() => void) | null,
  onSwipeLeft: (() => void) | null,
  onSwipeRight: (() => void) | null,
  threshold: number = 50,
) {
  const accumulatedDelta = useRef(0)
  const startX = useRef<number | null>(null)
  const startY = useRef<number | null>(null)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX
      startY.current = e.touches[0].clientY
      accumulatedDelta.current = 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (startX.current === null || startY.current === null)
        return

      const currentX = e.touches[0].clientX
      const currentY = e.touches[0].clientY
      const deltaX = startX.current - currentX
      const deltaY = startY.current - currentY
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      if (absX > threshold || absY > threshold) {
        e.preventDefault()
        if (absX > absY) {
          if (deltaX > 0) {
            onSwipeRight?.()
          }
          else {
            onSwipeLeft?.()
          }
          startX.current = currentX
        }
        else {
          if (deltaY > 0) {
            onSwipeDown?.()
          }
          else {
            onSwipeUp?.()
          }
          startY.current = currentY
        }
        accumulatedDelta.current = 0
      }
    }

    const handleTouchEnd = () => {
      startX.current = null
      startY.current = null
      accumulatedDelta.current = 0
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd, { passive: false })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight, threshold])
}
