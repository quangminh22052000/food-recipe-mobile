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
import { ThemeProvider } from "@/libs/common/design-system/theme"
import { queryClient } from "@/libs/common/utils/network"
import {
  initSentry,
  useSentryNavigationTracking,
} from "@/libs/common/utils/sentry"

import "../libs/common/utils/i18n"

initSentry()

function RootLayout() {
  useSentryNavigationTracking()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Stack
          screenOptions={() => ({
            headerShown: false,
            animation: "slide_from_right",
          })}>
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
          <Stack.Screen name="recipe-detail/index" />
        </Stack>
        <FlashMessage position="top" />
        <GlobalLoading />
        <GlobalDialog />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Sentry.wrap(RootLayout)
