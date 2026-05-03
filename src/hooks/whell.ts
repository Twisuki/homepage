import { useEffect, useRef } from "react"

export function useWheel(
  onScrollUp: () => void,
  onScrollDown: () => void,
  threshold: number = 50,
) {
  const accumulatedDelta = useRef(0)
  const lastDirection = useRef<number | null>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const currentDirection = Math.sign(e.deltaY)

      if (lastDirection.current !== null && lastDirection.current !== currentDirection) {
        accumulatedDelta.current = 0
      }

      lastDirection.current = currentDirection
      accumulatedDelta.current += e.deltaY

      if (Math.abs(accumulatedDelta.current) >= threshold) {
        if (accumulatedDelta.current > 0) {
          onScrollDown()
        }
        else {
          onScrollUp()
        }
        accumulatedDelta.current = 0
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [onScrollUp, onScrollDown, threshold])
}
