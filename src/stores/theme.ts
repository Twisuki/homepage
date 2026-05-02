import { create } from "zustand"

interface ThemeStore {
  theme: "light" | "dark"
  mode: "auto" | "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
  setMode: (mode: "auto" | "light" | "dark") => void
}

const STORAGE_KEY = "theme-mode"

function getStoredMode(): "auto" | "light" | "dark" {
  if (typeof window === "undefined")
    return "auto"
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === "light" || stored === "dark" || stored === "auto")
    return stored
  return "auto"
}

export const useThemeStore = create<ThemeStore>(set => ({
  theme: typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    : "light",
  mode: getStoredMode(),
  setTheme: theme => set({ theme }),
  setMode: (mode) => {
    localStorage.setItem(STORAGE_KEY, mode)
    set({ mode })
  },
}))
