import React, { useMemo } from "react"

import MasonryList from "@react-native-seoul/masonry-list"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { QueryState } from "@/libs/common/design-system/components"
import { useAppStore } from "@/libs/common/store"
import { hp } from "@/libs/common/utils/device/responsive"
import { useOpenRecipeDetail } from "@/libs/recipe/services/hooks/useOpenRecipeDetail"
import { useRecipeAPI } from "@/libs/recipe/services/hooks/useRecipeAPI"
import { RecipeProps } from "@/libs/recipe/types"

import { RecipeCard } from "./RecipeCard"

export const Recipies = () => {
  const { selectedRecipeType } = useAppStore()
  const { openRecipe } = useOpenRecipeDetail()

  const {
    data: recipes = [],
    isLoading,
    isError,
    refetch,
  } = useRecipeAPI.useRecipes()

  const filteredRecipes = useMemo(() => {
    return selectedRecipeType
      ? recipes.filter(recipe => recipe.categoryId === selectedRecipeType)
      : recipes
  }, [selectedRecipeType, recipes])

  const handleNavigate = (recipeId: string) => {
    void openRecipe(recipeId)
  }

  return (
    <View style={styles.main}>
      <Text style={[styles.title, styles.textBold, { fontSize: hp(3) }]}>
        Recipies
      </Text>
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!isLoading && !isError && filteredRecipes.length === 0}
        errorMessage="Couldn't load recipes."
        emptyMessage={
          selectedRecipeType ? "No recipes in this category" : "No recipes"
        }
        onRetry={refetch}>
        <MasonryList
          data={filteredRecipes}
          key={selectedRecipeType || "all"}
          keyExtractor={(item: RecipeProps) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
            <RecipeCard
              index={i}
              recipe={item as RecipeProps}
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
  main: {
    flexGrow: 1,
    width: "100%",
    minHeight: hp(50),
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
