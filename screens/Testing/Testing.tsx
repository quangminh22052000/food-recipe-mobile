/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from "expo-router"
import { useTranslation } from "react-i18next"
import { StyleSheet } from "react-native"
import { Button, Text } from "react-native-paper"

import { LoginForm } from "@/libs/auth/components"
import {
  ScreenWrapper,
  SwitchLanguage,
} from "@/libs/common/design-system/components"
import { useThemeContext } from "@/libs/common/design-system/theme"
import { useAppStore } from "@/libs/common/store"
import {
  errorHandling,
  successHandling,
} from "@/libs/common/utils/notification"

export const Testing = () => {
  const { t } = useTranslation("common")

  const router = useRouter()

  const { count, increase, decrease, reset } = useAppStore()

  const { toggleTheme, theme } = useThemeContext()

  const handleSuccess = () => {
    successHandling("Success", "RootLayout")
  }

  const handleError = () => {
    errorHandling("Error", "RootLayout")
  }

  const handleNotfound = () => {
    router.push("/not-found")
  }

  return (
    <ScreenWrapper contentContainerStyle={styles.mainContainer}>
      <Text>{t("appName.full")}</Text>
      <SwitchLanguage />
      <LoginForm />
      <Button mode="contained" onPress={handleSuccess}>
        {"Success"}
      </Button>
      <Button mode="contained" onPress={handleError}>
        {"Error"}
      </Button>
      <Text variant="titleLarge">Count: {count}</Text>
      <Button mode="contained" onPress={increase}>
        {"Increase"}
      </Button>
      <Button mode="contained" onPress={decrease}>
        {"Decrease"}
      </Button>
      <Button mode="contained" onPress={reset}>
        {"Reset"}
      </Button>
      <Button mode="contained" onPress={toggleTheme}>
        {"Toggle Theme"}
      </Button>
      <Button mode="contained" onPress={handleNotfound}>
        {"Not Found"}
      </Button>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
})
