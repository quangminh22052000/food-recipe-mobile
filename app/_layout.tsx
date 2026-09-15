import React from "react"

import * as Sentry from "@sentry/react-native"
import { QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import FlashMessage from "react-native-flash-message"

import {
  GlobalDialog,
  GlobalLoading,
  Header,
} from "@/libs/common/design-system/components"
import {
  ThemeProvider,
  useThemeContext,
} from "@/libs/common/design-system/theme"
import { queryClient } from "@/libs/common/utils/network"
import {
  initSentry,
  useSentryNavigationTracking,
} from "@/libs/common/utils/sentry"

import "../libs/common/utils/i18n"

initSentry()

function RootStack() {
  useSentryNavigationTracking()
  const { theme } = useThemeContext()

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: theme.colors.background },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="not-found"
          options={{
            headerShown: true,
            header: () => <Header title="Not Found" mode="small" />,
          }}
        />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="about-app/index" />
        <Stack.Screen
          name="recipe-detail/index"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            gestureEnabled: true,
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        />
      </Stack>
      <FlashMessage position="top" />
      <GlobalLoading />
      <GlobalDialog />
    </>
  )
}

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Sentry.wrap(RootLayout)
