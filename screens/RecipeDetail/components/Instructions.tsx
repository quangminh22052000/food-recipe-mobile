import React from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

export const Instructions = () => {
  return (
    <View style={styles.main}>
      <Text variant="titleMedium" style={styles.textBold}>
        Instructions
      </Text>
      <Text>mua thịt bò</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    marginVertical: 10,
    gap: 10,
  },
  textBold: {
    fontWeight: "bold",
  },
})
