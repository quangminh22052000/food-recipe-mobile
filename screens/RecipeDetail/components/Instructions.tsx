import React, { useMemo } from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { cookingRecipeData } from "@/libs/common/dummy-data"
import { RecipeProps } from "@/libs/common/types/recipe"

type InstructionsProps = {
  recipeId: string
}

export const Instructions = (props: InstructionsProps) => {
  const { recipeId } = props

  const recipe = useMemo(() => {
    return cookingRecipeData.find((item: RecipeProps) => item.id === recipeId)
  }, [recipeId])

  return (
    <View style={styles.main}>
      <Text variant="titleMedium" style={styles.textBold}>
        Instructions
      </Text>
      {recipe?.instructions.map((instruction, index) => (
        <Text key={index} variant="bodyLarge">
          {index + 1}. {instruction}
        </Text>
      ))}
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
