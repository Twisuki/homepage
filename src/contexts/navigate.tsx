"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

interface NavigateContextType {
  direction: "up" | "down" | null
  setDirection: (direction: "up" | "down" | null) => void
}

const NavigateContext = createContext<NavigateContextType | null>(null)

export function NavigateProvider({ children }: { children: ReactNode }) {
  const [direction, setDirection] = useState<"up" | "down" | null>(null)

  return (
    <NavigateContext.Provider value={{ direction, setDirection }}>
      {children}
    </NavigateContext.Provider>
  )
}

export function useNavigateContext() {
  const context = useContext(NavigateContext)
  if (!context) {
    throw new Error("useNavigateContext must be used within a NavigateProvider")
  }
  return context
}
