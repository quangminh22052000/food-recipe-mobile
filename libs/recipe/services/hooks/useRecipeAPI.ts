import { useQuery } from "@tanstack/react-query"

import { recipeAPI } from "../apis"
import { recipeKeys } from "../query-keys"

const useRecipes = () =>
  useQuery({
    queryKey: recipeKeys.lists(),
    queryFn: recipeAPI.getRecipes,
    staleTime: 5 * 60 * 1000,
  })

const useRecipe = (id: string) =>
  useQuery({
    queryKey: recipeKeys.detail(id),
    queryFn: () => recipeAPI.getRecipeById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })

export const useRecipeAPI = { useRecipes, useRecipe }
