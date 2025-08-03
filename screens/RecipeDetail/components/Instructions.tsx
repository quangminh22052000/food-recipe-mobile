import React, { useMemo } from "react"

import { StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import Animated, { FadeInDown } from "react-native-reanimated"

import { cookingRecipeData } from "@/libs/common/dummy-data"
import { RecipeProps } from "@/libs/common/types/recipe"
import { hp } from "@/libs/common/utils/device/responsive"

type InstructionsProps = {
  recipeId: string
}

export const Instructions = (props: InstructionsProps) => {
  const { recipeId } = props

  const recipe = useMemo(() => {
    return cookingRecipeData.find((item: RecipeProps) => item.id === recipeId)
  }, [recipeId])

  return (
    <Animated.View
      entering={FadeInDown.delay(300).duration(700).springify().damping(12)}
      style={styles.main}>
      <Text style={[styles.textBold, { fontSize: hp(2) }]}>Instructions</Text>
      {recipe?.instructions.map((instruction, index) => (
        <Text key={index} style={{ fontSize: hp(1.7) }}>
          {index + 1}. {instruction}
        </Text>
      ))}
    </Animated.View>
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
