import React, { useMemo } from "react"

import MasonryList from "@react-native-seoul/masonry-list"
import LottieView from "lottie-react-native"
import { StyleSheet, useWindowDimensions, View } from "react-native"
import { Text } from "react-native-paper"

import { animations } from "@/libs/common/design-system/assets/animations"
import { QueryState } from "@/libs/common/design-system/components"
import { hp, wp } from "@/libs/common/utils/device/responsive"
import { useOpenRecipeDetail } from "@/libs/recipe/services/hooks/useOpenRecipeDetail"
import { useRecipeAPI } from "@/libs/recipe/services/hooks/useRecipeAPI"
import { useFavoriteStore } from "@/libs/recipe/store"
import { RecipeProps } from "@/libs/recipe/types"

import { FavoriteCard } from "./FavoriteCard"

export const FavoritesList = () => {
  const { favoriteIds } = useFavoriteStore()
  const { openRecipe } = useOpenRecipeDetail()

  const { width, height } = useWindowDimensions()
  const isPortrait = height >= width
  const numColumns = isPortrait ? 2 : 3

  const {
    data: recipes = [],
    isLoading,
    isError,
    refetch,
  } = useRecipeAPI.useRecipes()

  const favoriteRecipes = useMemo(() => {
    return recipes
      .filter(item => favoriteIds.includes(item.id))
      .sort((a, b) => favoriteIds.indexOf(a.id) - favoriteIds.indexOf(b.id))
  }, [recipes, favoriteIds])

  const handleNavigate = (recipeId: string) => {
    void openRecipe(recipeId)
  }

  if (favoriteIds.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.noDataContainer}>
          <LottieView
            source={animations.noData}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
          <Text>No favorite recipes yet</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!isLoading && !isError && favoriteRecipes.length === 0}
        errorMessage="Couldn't load favorite recipes."
        emptyMessage="No favorite recipes yet"
        onRetry={refetch}>
        <MasonryList
          data={favoriteRecipes}
          keyExtractor={(item: RecipeProps) => item.id}
          numColumns={numColumns}
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
      </QueryState>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    minHeight: hp(50),
    marginTop: 16,
  },
  list: {
    paddingHorizontal: wp(2.5),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 200,
    height: 200,
  },
})
