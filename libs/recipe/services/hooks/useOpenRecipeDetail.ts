import { useCallback, useRef } from "react"

import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

import { recipeAPI } from "../apis"
import { recipeKeys } from "../query-keys"

export const useOpenRecipeDetail = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const isOpeningRef = useRef(false)

  const openRecipe = useCallback(
    (id: string) => {
      if (!id || isOpeningRef.current) return

      isOpeningRef.current = true

      queryClient.removeQueries({
        queryKey: recipeKeys.detail(id),
        exact: true,
      })

      router.push({
        pathname: "/recipe-detail",
        params: { id },
      })

      void queryClient.fetchQuery({
        queryKey: recipeKeys.detail(id),
        queryFn: () => recipeAPI.getRecipeById(id),
        staleTime: 5 * 60 * 1000,
      })

      isOpeningRef.current = false
    },
    [queryClient, router],
  )

  return { openRecipe }
}
