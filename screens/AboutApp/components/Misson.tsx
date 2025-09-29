import React from "react"

import { StyleSheet } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"
import { Text } from "react-native-paper"

export const Misson = () => {
  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(800)}
      style={styles.section}>
      <Text style={styles.sectionTitle}>App Mission</Text>
      <Text style={styles.sectionText}>
        We believe that cooking brings people closer. Our app helps you explore
        recipes from around the world, crafted with love and shared with
        passion.
      </Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    // color: "#333",
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    // color: "#666",
  },
})
