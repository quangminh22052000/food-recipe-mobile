import React from "react"

import { StyleSheet } from "react-native"
import { Text } from "react-native-paper"

import { ScreenWrapper } from "@/libs/common/design-system/components"

export const Home = () => {
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <Text>Home</Text>
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
})
