import React from "react"

import { Dimensions, Image, StyleSheet } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"
import { Text } from "react-native-paper"
import { images } from "@/libs/common/design-system/assets/images"

const { width } = Dimensions.get("window")

export const Hero = () => {
  return (
    <Animated.View
      entering={FadeInDown.duration(800)}
      style={styles.heroSection}>
      <Image source={images.restaurant} style={styles.heroImage} />
      <Text style={styles.heroTitle}>Introduce</Text>
      <Text style={styles.heroSubtitle}>
        Sharing recipes, inspiring kitchens, connecting food lovers.
      </Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  heroSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  heroImage: {
    width: width * 0.9,
    height: 250,
    borderRadius: 20,
    marginBottom: 15,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    // color: "#222",
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 8,
    // color: "#555",
  },
})
