import React from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { useThemeContext } from "@/libs/common/design-system/theme"

const ingrediantsList = ["1 cup of flour", "1 cup of sugar", "1 cup of butter"]

export const Ingredients = () => {
  const { theme } = useThemeContext()
  return (
    <View style={styles.main}>
      <Text variant="titleMedium" style={styles.textBold}>
        Ingredients
      </Text>
      <View style={styles.ingredientContainer}>
        {ingrediantsList.map((ingredient, index) => (
          <View key={index} style={styles.ingredientsItem}>
            <View
              style={[styles.dot, { backgroundColor: theme.colors.primary }]}
            />
            <Text key={index} variant="bodyLarge">
              {ingredient}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    marginVertical: 10,
    gap: 10,
  },
  ingredientContainer: {
    gap: 5,
  },
  ingredientsItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  textBold: {
    fontWeight: "bold",
  },
})
