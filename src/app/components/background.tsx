import Image from "next/image"

export default function Background() {
  return (
    <div className="absolute w-full h-full overflow-hidden z-10">
      <Image
        src="/shizuku.png"
        alt="background"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
    </div>
  )
}
