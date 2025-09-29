import React from "react"

import { StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "react-native-paper"
import Animated, { FadeInDown } from "react-native-reanimated"
import { useRouter } from "expo-router"

export const Explore = () => {
  const router = useRouter()

  const handleNavigateHome = () => {
    router.push({
      pathname: "(tabs)/home",
    })
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(1000).duration(800)}
      style={styles.ctaSection}>
      <Text style={styles.ctaText}>Ready to start cooking?</Text>
      <TouchableOpacity onPress={handleNavigateHome} style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Explore Recipes</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default Explore

const styles = StyleSheet.create({
  ctaSection: {
    alignItems: "center",
    marginTop: 30,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  ctaButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  ctaButtonText: {
    // color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
})
