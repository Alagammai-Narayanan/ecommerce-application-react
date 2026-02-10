import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"

interface ThemeType {
  theme: string
  setTheme: Dispatch<SetStateAction<string>>
  switchTheme: () => void
}

export const ThemeContext = createContext<ThemeType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"
  })
  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.classList.add(theme)
    return () => document.documentElement.classList.remove(theme)
  }, [theme])
  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
