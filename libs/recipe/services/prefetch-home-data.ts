import { queryClient } from "@/libs/common/utils/network"

import { categoryAPI } from "./apis/category"
import { recipeAPI } from "./apis/recipe"
import { categoryKeys, recipeKeys } from "./query-keys"

export const prefetchHomeData = () =>
  Promise.all([
    queryClient.prefetchQuery({
      queryKey: categoryKeys.lists(),
      queryFn: categoryAPI.getCategories,
      staleTime: 10 * 60 * 1000,
    }),
    queryClient.prefetchQuery({
      queryKey: recipeKeys.lists(),
      queryFn: recipeAPI.getRecipes,
      staleTime: 5 * 60 * 1000,
    }),
  ])
