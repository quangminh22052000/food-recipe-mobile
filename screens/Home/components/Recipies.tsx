import React from "react"

import { MasonryFlashList } from "@shopify/flash-list"
import { useRouter } from "expo-router"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { cookingRecipeData } from "@/libs/common/dummy-data"
import { RecipeProps } from "@/libs/common/types/recipe"

import { RecipeCard } from "./RecipeCard"

export const Recipies = () => {
  const router = useRouter()

  const handleNavigate = (recipe: RecipeProps) => {
    router.push({
      pathname: "/recipe-detail",
      params: {
        id: recipe.id,
        image: recipe.image,
        name: recipe.name,
        description: recipe.description,
      },
    })
  }
  return (
    <View style={styles.main}>
      <Text variant="titleLarge" style={[styles.title, styles.textBold]}>
        Recipies
      </Text>
      <MasonryFlashList
        data={cookingRecipeData}
        numColumns={2}
        estimatedItemSize={200}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <RecipeCard
            index={index}
            recipe={item}
            handleNavigate={handleNavigate}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    marginVertical: 10,
  },
  title: {
    marginBottom: 10,
  },
  textBold: {
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
})
