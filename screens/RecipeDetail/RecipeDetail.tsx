import React from "react"

import { useLocalSearchParams } from "expo-router"
import { ActivityIndicator, StyleSheet, View } from "react-native"

import {
  QueryState,
  ScreenWrapper,
} from "@/libs/common/design-system/components"
import { useThemeContext } from "@/libs/common/design-system/theme"
import { useRecipeAPI } from "@/libs/recipe/services/hooks/useRecipeAPI"

import { RecipeBody, RecipeHeader } from "./components"

export const RecipeDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { theme } = useThemeContext()

  const {
    data: recipe,
    isLoading,
    isPlaceholderData,
    isError,
    refetch,
  } = useRecipeAPI.useRecipe(id)

  return (
    <ScreenWrapper
      style={styles.screen}
      contentContainerStyle={styles.container}>
      <QueryState
        isLoading={isLoading && !recipe}
        isError={isError}
        isEmpty={!isLoading && !isError && !recipe}
        errorMessage="Couldn't load this recipe."
        emptyMessage="Recipe not found"
        onRetry={refetch}>
        {recipe ? (
          <>
            <RecipeHeader id={recipe.id} image={recipe.image as string} />
            <RecipeBody recipe={recipe} />
            {isPlaceholderData ? (
              <View style={styles.detailLoading}>
                <ActivityIndicator color={theme.colors.primary} />
              </View>
            ) : null}
          </>
        ) : null}
      </QueryState>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  screen: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "transparent",
  },
  container: {
    alignItems: "stretch",
    flexGrow: 1,
    width: "100%",
  },
  detailLoading: {
    paddingVertical: 16,
    alignItems: "center",
    width: "100%",
  },
})
