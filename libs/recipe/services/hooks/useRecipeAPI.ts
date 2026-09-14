import { useQuery, useQueryClient } from "@tanstack/react-query"

import { RecipeProps } from "@/libs/recipe/types"

import { recipeAPI } from "../apis"
import { recipeKeys } from "../query-keys"

const useRecipes = () =>
  useQuery({
    queryKey: recipeKeys.lists(),
    queryFn: recipeAPI.getRecipes,
    staleTime: 5 * 60 * 1000,
  })

const useRecipe = (id: string) => {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => recipeAPI.getRecipeById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    placeholderData: previousData => {
      if (previousData) return previousData
      const list =
        queryClient.getQueryData<RecipeProps[]>(recipeKeys.lists()) ?? []
      return list.find(recipe => recipe.id === id)
    },
  })
}

export const useRecipeAPI = { useRecipes, useRecipe }
