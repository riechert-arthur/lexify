import { createContext } from "react"
import type { FC, ReactNode } from "react"

interface ThemeContextProviderProps {
  children: Readonly<ReactNode> 
}

interface ThemeContextType {
  isDarkMode: boolean
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children }) => { 
  const themeContextValue: ThemeContextType = { isDarkMode: false } 

  return (
    <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>
  )
}
