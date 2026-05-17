"use client"

import Avatar from "@/app/[locale]/(pages)/state/components/avatar"
import Date from "@/app/[locale]/(pages)/state/components/date"
import Hitokoto from "@/app/[locale]/(pages)/state/components/hitokoto"
import Holiday from "@/app/[locale]/(pages)/state/components/holiday"
import Semester from "@/app/[locale]/(pages)/state/components/semester"
import Time from "@/app/[locale]/(pages)/state/components/time"
import Waka from "@/app/[locale]/(pages)/state/components/waka"
import Responsive from "@/app/components/responsive"

function MobileContent() {
  return (
    <>
      移动端适配开发中...
    </>
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
  return (
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
  )
}
