import React, { useMemo } from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import Animated, { FadeInDown } from "react-native-reanimated"

import { useThemeContext } from "@/libs/common/design-system/theme"
import { cookingRecipeData } from "@/libs/common/dummy-data"
import { RecipeProps } from "@/libs/common/types/recipe"
import { hp } from "@/libs/common/utils/device/responsive"

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
    <Animated.View
      entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
      style={styles.main}>
      <Text style={[styles.textBold, { fontSize: hp(2) }]}>Ingredients</Text>
      <View style={styles.ingredientContainer}>
        {recipe?.ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientsItem}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor: theme.colors.primary,
                  width: hp(1.2),
                  height: hp(1.2),
                },
              ]}
            />
            <Text style={[styles.textBold, { fontSize: hp(1.7) }]}>
              {ingredient.quantity}
            </Text>
            <Text style={{ fontSize: hp(1.7) }}>{ingredient.name}</Text>
          </View>
        ))}
      </View>
    </Animated.View>
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
