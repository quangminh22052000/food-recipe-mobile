import React, { useMemo } from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { useThemeContext } from "@/libs/common/design-system/theme"
import { cookingRecipeData } from "@/libs/common/dummy-data"
import { RecipeProps } from "@/libs/common/types/recipe"

type IngredientsProps = {
  recipeId: string
}

export const Ingredients = (props: IngredientsProps) => {
  const { recipeId } = props

  const { theme } = useThemeContext()

  const recipe = useMemo(() => {
    return cookingRecipeData.find((item: RecipeProps) => item.id === recipeId)
  }, [recipeId])

  return (
    <View style={styles.main}>
      <Text variant="titleMedium" style={styles.textBold}>
        Ingredients
      </Text>
      <View style={styles.ingredientContainer}>
        {recipe?.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientsItem}>
            <View
              style={[styles.dot, { backgroundColor: theme.colors.primary }]}
            />
            <Text variant="bodyLarge" style={styles.textBold}>
              {ingredient.quantity}
            </Text>
            <Text variant="bodyLarge">{ingredient.name}</Text>
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
