import React, { useLayoutEffect } from "react"

import { useLocalSearchParams } from "expo-router"
import { StyleSheet } from "react-native"

import {
  QueryState,
  ScreenWrapper,
} from "@/libs/common/design-system/components"
import { useAppStore } from "@/libs/common/store"
import { useRecipeAPI } from "@/libs/recipe/services/hooks/useRecipeAPI"

import { RecipeBody, RecipeHeader } from "./components"

export const RecipeDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const setLoading = useAppStore(state => state.setLoading)

  const {
    data: recipe,
    isLoading,
    isError,
    refetch,
  } = useRecipeAPI.useRecipe(id)

  useLayoutEffect(() => {
    if (!isLoading) {
      setLoading(false)
    }
  }, [isLoading, setLoading])

  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!isLoading && !isError && !recipe}
        errorMessage="Couldn't load this recipe."
        emptyMessage="Recipe not found"
        onRetry={refetch}>
        {recipe ? (
          <>
            <RecipeHeader id={recipe.id} image={recipe.image} />
            <RecipeBody recipe={recipe} />
          </>
        ) : null}
      </QueryState>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
  },
})
