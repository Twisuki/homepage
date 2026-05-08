"use client"

import dayjs from "dayjs"
import { useEffect, useState } from "react"
import Base from "@/app/[locale]/(pages)/state/components/base"
import LiquidGlass from "@/app/components/liquid-glass"

function Clock() {
  const [hour, setHour] = useState(dayjs().hour())
  const [minute, setMinute] = useState(dayjs().minute())
  const [second, setSecond] = useState(dayjs().second())

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs()
      setHour(now.hour())
      setMinute(now.minute())
      setSecond(now.second())
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full flex flex-col items-center gap-4">

      <div className="w-full aspect-square">
        <LiquidGlass
          rounded="full"
          className="w-full h-full"
        >
          <svg width="100%" height="100%" viewBox="0 0 120 120">
            {Array.from({ length: 12 }).map((_, i) => {
              const isMain = i % 3 === 0
              return (
                <line
                  key={i}
                  x1="60"
                  y1="8"
                  x2="60"
                  y2={isMain ? "14" : "12"}
                  stroke="white"
                  strokeWidth={isMain ? "2" : "1"}
                  strokeLinecap="round"
                  transform={`rotate(${i * 30} 60 60)`}
                />
              )
            })}
            <line
              x1="60"
              y1="60"
              x2="60"
              y2="32"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(${hour / 12 * 360 + minute / 60 * 360} 60 60)`}
            />
            <line
              x1="60"
              y1="60"
              x2="60"
              y2="20"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${minute / 60 * 360} 60 60)`}
            />
            <line
              x1="60"
              y1="60"
              x2="60"
              y2="12"
              stroke="#f44"
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${second / 60 * 360} 60 60)`}
            />
            <circle cx="60" cy="60" r="3" fill="white" />
          </svg>
        </LiquidGlass>
      </div>

      <div>
        {hour}
        :
        {minute.toString().padStart(2, "0")}
        :
        {second.toString().padStart(2, "0")}
      </div>
    </div>
  )
}

function Message() {
  return (
    <>
      大概率在上课
    </>
  )
}

export default function Time() {
  return (
    <Base
      x={2}
      y={3}
      hover
      className="flex flex-col items-center justify-center gap-2"
    >
      <Clock />
      <Message />
    </Base>
  )
}
