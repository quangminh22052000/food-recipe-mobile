import React from "react"

import { useLocalSearchParams } from "expo-router"
import { StyleSheet } from "react-native"

import { ScreenWrapper } from "@/libs/common/design-system/components"

import { RecipeBody, RecipeHeader } from "./components"

export const RecipeDetail = () => {
  const { id, image, name, description } = useLocalSearchParams()

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <RecipeHeader id={`${id}`} image={+image} />
      <RecipeBody
        id={`${id}`}
        name={`${name}`}
        description={`${description}`}
      />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
})
