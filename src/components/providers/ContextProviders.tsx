import type { FC, ReactNode } from "react"
import { ThemeContextProvider } from "@/components/providers/ThemeContextProvider"

interface ContextProvidersProps {
  children: Readonly<ReactNode>
}

export const ContextProviders: FC<ContextProvidersProps> = ({ children }) => {
  return (
    <ThemeContextProvider>
      {children}
    </ThemeContextProvider>
  )
}
