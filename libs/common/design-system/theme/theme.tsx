import React, { createContext, useContext, useState } from "react"

import {
  DefaultTheme as NavigationLight,
  DarkTheme as NavigationDark,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native"
import merge from "deepmerge"
import { StatusBar } from "expo-status-bar"
import {
  MD3LightTheme as PaperLight,
  MD3DarkTheme as PaperDark,
  PaperProvider,
} from "react-native-paper"

import { lightColors, darkColors } from "../colors"

const CombinedLightTheme = merge(PaperLight, NavigationLight)
const CombinedDarkTheme = merge(PaperDark, NavigationDark)

const withNavigationSurfaces = (
  base: typeof CombinedLightTheme,
  colors: {
    primary: string
    background: string
    text: string
    headerBackground: string
    tabBarBackground: string
  },
) => ({
  ...base,
  colors: {
    ...base.colors,
    ...colors,
    card: colors.background,
    border: base.colors.border,
  },
})

const lightTheme = withNavigationSurfaces(CombinedLightTheme, {
  primary: lightColors.primary,
  background: lightColors.lightModeBackground,
  text: lightColors.dark,
  headerBackground: lightColors.headerLightBackground,
  tabBarBackground: lightColors.tabBarLightBackground,
})

const darkTheme = withNavigationSurfaces(CombinedDarkTheme, {
  primary: darkColors.primary,
  background: darkColors.darkModeBackground,
  text: darkColors.white,
  headerBackground: darkColors.headerDarkBackground,
  tabBarBackground: darkColors.tabBarDarkBackground,
})

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
      <NavigationThemeProvider value={theme}>
        <PaperProvider theme={theme}>
          <StatusBar style={isDarkMode ? "light" : "dark"} />
          {children}
        </PaperProvider>
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  )
}
