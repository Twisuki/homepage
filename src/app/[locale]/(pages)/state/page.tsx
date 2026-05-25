"use client"

import { useState } from "react"
import Avatar from "@/app/[locale]/(pages)/state/components/avatar"
import Date from "@/app/[locale]/(pages)/state/components/date"
import Hitokoto from "@/app/[locale]/(pages)/state/components/hitokoto"
import Holiday from "@/app/[locale]/(pages)/state/components/holiday"
import Semester from "@/app/[locale]/(pages)/state/components/semester"
import Time from "@/app/[locale]/(pages)/state/components/time"
import Waka from "@/app/[locale]/(pages)/state/components/waka"
import Responsive from "@/app/components/responsive"
import { useMounted } from "@/hooks/mounted"
import { useAnimate } from "@/hooks/navigate"
import { useSwipe } from "@/hooks/swipe"
import { cn } from "@/lib/cn"

function MobileContent() {
  const { animateClass } = useAnimate()
  const [index, setIndex] = useState(0)

  useSwipe(
    null,
    null,
    () => setIndex((index + 2) % 3),
    () => setIndex((index + 1) % 3),
  )

  const Content = () => {
    switch (index) {
      case 0:
        return <Time />
      case 1:
        return (
          <>
            <Date />
            <div className="relative col-span-2 row-span-1 flex items-center justify-center">
              <div className="grid grid-cols-[repeat(4,4rem)] xs:grid-cols-[repeat(4,5rem)] grid-rows-[repeat(1,6rem)] gap-2">
                <Holiday />
              </div>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <Semester />
            <div className="relative col-span-2 row-span-1 flex items-center justify-center">
              <div className="grid grid-cols-[repeat(4,4rem)] xs:grid-cols-[repeat(4,5rem)] grid-rows-[repeat(1,6rem)] gap-2">
                <Hitokoto />
              </div>
            </div>
            <Waka />
          </>
        )
    }
  }

  return (
    <div className={cn("flex flex-col gap-2", animateClass)}>
      <div className="grid grid-cols-[repeat(2,6rem)] grid-rows-[repeat(3,6rem)] gap-2">
        <Content />
      </div>
      <div className="w-full h-1 flex items-center justify-center gap-1">
        <div
          className={cn(
            "w-1 h-1 rounded-full",
            index === 0 ? "bg-white" : "bg-gray-500",
          )}
          onClick={() => setIndex(0)}
        />
        <div
          className={cn(
            "w-1 h-1 rounded-full",
            index === 1 ? "bg-white" : "bg-gray-500",
          )}
          onClick={() => setIndex(1)}
        />
        <div
          className={cn(
            "w-1 h-1 rounded-full",
            index === 2 ? "bg-white" : "bg-gray-500",
          )}
          onClick={() => setIndex(2)}
        />
      </div>
    </div>
  )
}

function DesktopContent() {
  return (
    <div className="grid grid-cols-[repeat(6,6rem)] grid-rows-[repeat(4,6rem)] gap-2">
      <Avatar />
      <Hitokoto />
      <Time />
      <Date />
      <Semester />
      <Waka />
      <Holiday />
    </div>
  )
}

export default function State() {
  const { mounted } = useMounted()

  return (
    <div>
      {mounted && (
        <Responsive>
          <Responsive.Desktop>
            <DesktopContent />
          </Responsive.Desktop>
          <Responsive.Tablet>
            <DesktopContent />
          </Responsive.Tablet>
          <Responsive.Mobile>
            <MobileContent />
          </Responsive.Mobile>
        </Responsive>
      )}
    </div>
  )
}
