import Image from "next/image"
import Base from "@/app/[locale]/(pages)/state/components/base"

export default function Avatar() {
  return (
    <Base
      x={1}
      y={1}
      rounded
      hover
      className="p-[2px]"
    >
      <div className="relative w-full h-full rounded-full">
        <Image
          src="/avatar.png"
          alt="Avatar"
          fill
          className="object-cover rounded-full animate-spin animate-slower hover:animate-paused"
        />
      </div>
    </Base>
  )
}
