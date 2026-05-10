import { useEffect, useRef } from "react"

export function useSwipe(
  onSwipeUp: () => void,
  onSwipeDown: () => void,
  threshold: number = 50,
) {
  const accumulatedDelta = useRef(0)
  const startY = useRef<number | null>(null)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY
      accumulatedDelta.current = 0
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (startY.current === null)
        return

      const currentY = e.touches[0].clientY
      const delta = startY.current - currentY
      accumulatedDelta.current += delta
      startY.current = currentY

      if (Math.abs(accumulatedDelta.current) >= threshold) {
        if (accumulatedDelta.current > 0) {
          onSwipeDown()
        }
        else {
          onSwipeUp()
        }
        accumulatedDelta.current = 0
      }
    }

    const handleTouchEnd = () => {
      startY.current = null
      accumulatedDelta.current = 0
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [onSwipeUp, onSwipeDown, threshold])
}
