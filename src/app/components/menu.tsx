import type { ReactNode } from "react"
import { IconLanguage, IconSun } from "@tabler/icons-react"

function MenuItem({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 active:scale-90 active:bg-white/20">
      {children}
    </div>
  )
}

export default function Menu() {
  return (
    <div className="absolute top-12 right-12 flex flex-col gap-2 z-500">
      <MenuItem>
        <IconLanguage />
      </MenuItem>
      <MenuItem>
        <IconSun />
      </MenuItem>
    </div>
  )
}
