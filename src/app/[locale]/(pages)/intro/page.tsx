"use client"

import { useTranslations } from "next-intl"
import ContactCard from "@/app/[locale]/(pages)/intro/components/contact"
import IntroCard from "@/app/[locale]/(pages)/intro/components/intro"
import PhoneCard from "@/app/[locale]/(pages)/intro/components/phone"
import { useAnimate } from "@/hooks/navigate"

export default function Intro() {
  const t = useTranslations("IntroPage")
  const { animateClass } = useAnimate()

  return (
    <div className="flex items-center gap-4 cursor-default">
      <PhoneCard animateClass={animateClass} t={t} />

      <div className="hidden h-90 md:h-96 sm:flex flex-col gap-4">
        <IntroCard animateClass={animateClass} t={t} />
        <ContactCard animateClass={animateClass} t={t} />
      </div>
    </div>
  )
}
