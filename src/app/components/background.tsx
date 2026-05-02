import Image from "next/image"

export default function Background() {
  return (
    <div className="absolute w-full h-full overflow-hidden z-10">
      <Image
        src="/shizuku.png"
        alt="background"
        fill
        priority
        className="object-cover blur-[2px] scale-105"
      />

      <div className="absolute inset-0 bg-black/30"></div>
    </div>
  )
}
