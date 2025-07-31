import React from "react"

import { useLocalSearchParams } from "expo-router"
import { StyleSheet } from "react-native"

import { ScreenWrapper } from "@/libs/common/design-system/components"

import { RecipeBody, RecipeHeader } from "./components"

export const RecipeDetail = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, image, name, description } = useLocalSearchParams()

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <RecipeHeader image={+image} />
      <RecipeBody name={`${name}`} description={`${description}`} />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
})
