import Clock from "@/app/[locale]/(pages)/state/components/clock"
import Code from "@/app/[locale]/(pages)/state/components/code"
import Date from "@/app/[locale]/(pages)/state/components/date"
import Hitokoto from "@/app/[locale]/(pages)/state/components/hitokoto"
import Holiday from "@/app/[locale]/(pages)/state/components/holiday"
import Progress from "@/app/[locale]/(pages)/state/components/progress"

export default function State() {
  return (
    <div className="grid grid-cols-[repeat(6,6rem)] grid-rows-[repeat(4,6rem)] gap-2">
      <Hitokoto />
      <Clock />
      <Date />
      <Progress />
      <Code />
      <Holiday />
    </div>
  )
}
