"use client"

import type { ReactNode } from "react"
import { IconLanguage, IconMoon, IconMoonStars, IconSun, IconSunElectricity } from "@tabler/icons-react"
import { useLocale, useTranslations } from "next-intl"
import LiquidGlass from "@/app/components/liquid-glass"
import { useTheme } from "@/hooks/theme"
import { usePathname, useRouter } from "@/i18n/navigation"

function MenuItem({
  children,
  label,
  onClick,
}: Readonly<{
  children: ReactNode
  label: string
  onClick?: () => void
}>) {
  return (
    <LiquidGlass
      className="w-12 h-12 rounded-full active:scale-90"
      onClick={onClick}
      asChild
    >
      <div className="group relative flex items-center justify-center hover:bg-white/20">
        {children}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap select-none opacity-0 group-hover:-translate-x-full group-hover:opacity-100 transition-all duration-200">
          {label}
        </div>
      </div>
    </LiquidGlass>
  )
}

export default function Menu() {
  const { isAuto, isDark, toggleMode } = useTheme()
  const t = useTranslations("Menu")
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const themeLabel = isAuto
    ? t("theme.auto")
    : isDark ? t("theme.dark") : t("theme.light")

  const Icon = isAuto
    ? (isDark ? IconMoonStars : IconSunElectricity)
    : (isDark ? IconMoon : IconSun)

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "zh" : "en"
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="absolute top-12 right-12 flex flex-col gap-2 z-500">
      <MenuItem
        label={t("lang")}
        onClick={toggleLocale}
      >
        <IconLanguage />
      </MenuItem>
      <MenuItem
        label={themeLabel}
        onClick={toggleMode}
      >
        <Icon />
      </MenuItem>
    </div>
  )
}
