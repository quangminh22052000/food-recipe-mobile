/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react"

import Constants from "expo-constants"
import { useRouter } from "expo-router"
import { MotiView } from "moti"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

const apiUrl = Constants.expoConfig?.extra?.authApiUrl
console.log(`API URL: ${apiUrl}`)

export default function NotFoundScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Oops! Trang này không tồn tại.</Text>
      </MotiView>
    </View>
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
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
})
