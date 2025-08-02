import React from "react"

import { useLocalSearchParams } from "expo-router"
import { StyleSheet } from "react-native"

import { ScreenWrapper } from "@/libs/common/design-system/components"
import { cookingRecipeData } from "@/libs/common/dummy-data"

import { RecipeBody, RecipeHeader } from "./components"

export const RecipeDetail = () => {
  const { id } = useLocalSearchParams()

  const recipe = cookingRecipeData.find(item => item.id === id)

  if (!recipe) return null

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <RecipeHeader id={`${id}`} image={recipe.image} />
      <RecipeBody
        id={recipe.id}
        name={recipe.name}
        description={recipe.description}
      />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
})
