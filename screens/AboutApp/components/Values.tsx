import React from "react"

import { StyleSheet, View } from "react-native"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { Text } from "react-native-paper"

export const Values = () => {
  return (
    <Animated.View
      entering={FadeInDown.delay(400).duration(800)}
      style={styles.section}>
      <Text style={styles.sectionTitle}>Values</Text>
      <View style={styles.cardContainer}>
        <Animated.View
          entering={FadeInUp.delay(600)}
          style={[styles.valueCard, { backgroundColor: "#fce8e6" }]}>
          <Text style={styles.valueTitle}> Fresh</Text>
          <Text style={styles.valueText}>Always natural, real taste.</Text>
        </Animated.View>
        <Animated.View
          entering={FadeInUp.delay(700)}
          style={[styles.valueCard, { backgroundColor: "#e6f7f1" }]}>
          <Text style={styles.valueTitle}>Community</Text>
          <Text style={styles.valueText}>Cook, share, and learn together.</Text>
        </Animated.View>
        <Animated.View
          entering={FadeInUp.delay(800)}
          style={[styles.valueCard, { backgroundColor: "#fff4e6" }]}>
          <Text style={styles.valueTitle}> Creativity</Text>
          <Text style={styles.valueText}>
            Inspire kitchens with unique recipes.
          </Text>
        </Animated.View>
      </View>
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
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  valueCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#444",
  },
  valueText: {
    fontSize: 13,
    color: "#444",
  },
  textCenter: {
    textAlign: "center",
  },
})
