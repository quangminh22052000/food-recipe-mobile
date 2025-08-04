import React from "react"

import MasonryList from "@react-native-seoul/masonry-list"
import { useRouter } from "expo-router"
import { StyleSheet, View } from "react-native"

import { cookingRecipeData } from "@/libs/common/dummy-data"
import { RecipeProps } from "@/libs/common/types/recipe"
import { wp } from "@/libs/common/utils/device/responsive"

import { FavoriteCard } from "./FavoriteCard"

export const FavoritesList = () => {
  const router = useRouter()

  const handleNavigate = (recipeId: string) => {
    router.push({
      pathname: "/recipe-detail",
      params: {
        id: recipeId,
      },
    })
  }
  return (
    <View style={styles.container}>
      <MasonryList
        data={cookingRecipeData}
        keyExtractor={(item: RecipeProps) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, i }) => (
          <FavoriteCard
            index={i}
            favoritesRecipe={item as RecipeProps}
            handleNavigate={handleNavigate}
          />
        )}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 16,
  },
  list: {
    paddingHorizontal: wp(2.5),
  },
})
