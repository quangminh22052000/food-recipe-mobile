import React, { createContext, useContext, useState } from "react"

import {
  DefaultTheme as NavigationLight,
  DarkTheme as NavigationDark,
} from "@react-navigation/native"
import merge from "deepmerge"
import { StatusBar } from "expo-status-bar"
import {
  MD3LightTheme as PaperLight,
  MD3DarkTheme as PaperDark,
  PaperProvider,
} from "react-native-paper"

import { colors } from "../colors"

const CombinedLightTheme = merge(PaperLight, NavigationLight)
const CombinedDarkTheme = merge(PaperDark, NavigationDark)

const lightTheme = {
  ...CombinedLightTheme,
  colors: {
    ...CombinedLightTheme.colors,
    primary: "#6200ee",
    background: colors.lightModeBackground,
    text: colors.dark,
    headerBackground: colors.headerLightBackground,
    tabBarBackground: colors.tabBarLightBackground,
  },
}

const darkTheme = {
  ...CombinedDarkTheme,
  colors: {
    ...CombinedDarkTheme.colors,
    primary: "#bb86fc",
    background: colors.darkModeBackground,
    text: colors.white,
    headerBackground: colors.headerDarkBackground,
    tabBarBackground: colors.tabBarDarkBackground,
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
