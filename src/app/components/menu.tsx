"use client"

import type { ReactNode } from "react"
import { IconLanguage, IconLoader2, IconMoon, IconMoonStars, IconSun, IconSunElectricity } from "@tabler/icons-react"
import { useLocale, useTranslations } from "next-intl"
import Button from "@/app/components/button"
import { useMounted } from "@/hooks/mounted"
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
    <div className="relative w-12 h-12 rounded-full group active:scale-90 animate-bounceIn">
      <Button
        onClick={onClick}
        className="w-full h-full z-200"
      >
        <div className="w-full h-full flex justify-center items-center">
          {children}
        </div>
      </Button>
      <div className="absolute -left-4 top-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap select-none opacity-0 group-hover:-translate-x-full group-hover:opacity-100 transition-all duration-200 z-100">
        {label}
      </div>
    </div>
  )
}

export default function Menu() {
  const { isAuto, isDark, toggleMode } = useTheme()
  const { mounted } = useMounted()
  const t = useTranslations("Menu")
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const themeLabel = isAuto
    ? t("theme.auto")
    : isDark ? t("theme.dark") : t("theme.light")

  const ThemeIcon = isAuto
    ? (isDark ? IconMoonStars : IconSunElectricity)
    : (isDark ? IconMoon : IconSun)

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "zh" : "en"
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="absolute top-4 right-4 sm:top-8 sm:right-8 md:top-12 md:right-12 flex md:flex-col gap-2 z-500">
      <MenuItem
        label={t("lang")}
        onClick={toggleLocale}
      >
        <IconLanguage />
      </MenuItem>
      {mounted
        ? (
            <MenuItem
              label={themeLabel}
              onClick={toggleMode}
            >
              <ThemeIcon />
            </MenuItem>
          )
        : (
            <MenuItem label={t("theme.loading")}>
              <IconLoader2 className="animate-twSpin" />
            </MenuItem>
          )}
    </div>
  )
}
