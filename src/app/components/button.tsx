import type { ComponentProps } from "react"
import LiquidGlass from "@/app/components/liquid-glass"
import { useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/cn"

interface ButtonProps {
  onClick?: () => void
  to?: string
}

export default function Button({
  children,
  className,
  onClick,
  to = "",
  ...props
}: Readonly<ComponentProps<"div"> & ButtonProps>) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    else if (to) {
      if (to.startsWith("/")) {
        router.push(to)
      }
      else {
        window.open(to, "_blank")
      }
    }
  }

  const disabled = !onClick && !to

  return (
    <LiquidGlass
      rounded="full"
      click={!disabled}
      className={cn(
        "animate-bounceIn",
        { "active:scale-90": !disabled },
        disabled ? "cursor-default" : "cursor-pointer",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </LiquidGlass>
  )
}
