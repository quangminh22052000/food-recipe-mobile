import React, { createContext, useContext, useState } from "react"

import { StatusBar } from "expo-status-bar"
import { MD3LightTheme, MD3DarkTheme, PaperProvider } from "react-native-paper"

import { colors } from "../colors"

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#6200ee",
    background: colors.lightModeBackground, // Light Mode Background
    text: colors.dark,
  },
}

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#bb86fc",
    background: colors.darkModeBackground, // Dark Mode Background
    text: colors.white,
  },
}

// 🟢 Tạo Context để lưu theme
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  theme: lightTheme,
})

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => setIsDarkMode(prev => !prev)

  const theme = isDarkMode ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      <PaperProvider theme={theme}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  )
}
