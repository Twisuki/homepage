"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function Index() {
  const TITLE = "Full-Stack Enthusiast | Frontend Engineer"
  const [title, setTitle] = useState("")

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setTitle(TITLE.slice(0, index))
      index++
      if (index > TITLE.length)
        clearInterval(interval)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-48 h-48 animate-fadeInUp">
        <Image
          src="/avatar.png"
          alt="avatar"
          fill
          priority
          className="object-cover rounded-full"
        />
      </div>
      <div className="text-3xl animate-fadeInUp">
        你好, 这里是
        {" "}
        <span className="font-semibold">Twisuki</span>
        {" "}
        ~
      </div>
      <div className="text-xl animate-fadeInUp">
        &lt;
        {" "}
        {title}
        {" "}
        &gt;
      </div>
    </div>
  )
}
