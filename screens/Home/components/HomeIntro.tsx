import React from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { useThemeContext } from "@/libs/common/design-system/theme"

export const HomeIntro = () => {
  const { theme } = useThemeContext()
  return (
    <View style={styles.main}>
      <Text variant="titleSmall">Hello, Noman!</Text>
      <Text variant="displaySmall" style={styles.textBold}>
        Make your own food, &nbsp; stay at{" "}
        <Text style={[styles.textBold, { color: theme.colors.primary }]}>
          home
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: 40,
  },
  textBold: {
    fontWeight: "bold",
  },
})
