/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"

import { useRouter } from "expo-router"
import { MotiView } from "moti"
import { StyleSheet } from "react-native"
import { Text } from "react-native-paper"

import { ScreenWrapper } from "@/libs/common/design-system/components"

export const NotFound = () => {
  const router = useRouter()

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}>
        <Text variant="displayLarge" style={styles.title}>
          404
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Oops! Trang này không tồn tại.
        </Text>
      </MotiView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
  },
})
