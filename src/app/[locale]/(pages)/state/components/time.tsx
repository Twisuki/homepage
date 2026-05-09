"use client"

import dayjs from "dayjs"
import { useEffect, useMemo, useState } from "react"
import Base from "@/app/[locale]/(pages)/state/components/base"
import LiquidGlass from "@/app/components/liquid-glass"
import { classList, scheduleList } from "@/data/schedule"
import { getNowSemester } from "@/lib/semester"

function Clock({
  hour,
  minute,
  second,
}: Readonly<{
  hour: number
  minute: number
  second: number
}>) {
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

function getMessage() {
  const semester = getNowSemester()

  if (!semester) {
    throw new Error("No semester found for this page")
  }

  const now = dayjs()

  const week = Math.floor(now.diff(semester.startDate, "day") / 7) + 1
  const day = now.day()

  const classes = classList.filter(item => item.week.includes(week) && item.day === day).toSorted((a, b) => a.schedule[0] - b.schedule[0])

  if (classes.length === 0)
    return "今日无课"

  const getTime = (schedules: number[]) => {
    const startTime = scheduleList[schedules[0]].start
    const endTime = scheduleList[schedules[schedules.length - 1]].end

    const start = dayjs(startTime, "HH:mm")
    const end = dayjs(endTime, "HH:mm")

    return { start, end }
  }

  const { start } = getTime(classes[0].schedule)
  const { end } = getTime(classes[classes.length - 1].schedule)

  if (now.isBefore(start))
    return "今天的课还没开始"
  if (now.isAfter(end))
    return "今天的课已经结束"

  if (classes.some((item) => {
    const { start, end } = getTime(item.schedule)
    return now.isBetween(start, end, "minute", "[]")
  })) {
    return "正在上课"
  }
  return "下课了"
}

export default function Time() {
  const [hour, setHour] = useState(dayjs().hour())
  const [minute, setMinute] = useState(dayjs().minute())
  const [second, setSecond] = useState(dayjs().second())

  const message = useMemo(getMessage, [hour, minute])

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
    <Base
      x={2}
      y={3}
      hover
      className="flex flex-col items-center justify-center gap-2"
    >
      <Clock hour={hour} minute={minute} second={second} />
      {message}
    </Base>
  )
}
