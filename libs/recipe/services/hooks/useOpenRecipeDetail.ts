import { useCallback, useRef } from "react"

import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "expo-router"

import { useAppStore } from "@/libs/common/store"
import { errorHandling } from "@/libs/common/utils/notification"

import { recipeAPI } from "../apis"
import { recipeKeys } from "../query-keys"

export const useOpenRecipeDetail = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const setLoading = useAppStore(state => state.setLoading)
  const isOpeningRef = useRef(false) // cờ khóa, chống double-tap khi openRecipe đang chạy, một lần mở một detail tại một thời điểm.

  const openRecipe = useCallback(
    async (id: string) => {
      if (!id || isOpeningRef.current) return

      isOpeningRef.current = true

      const cachedRecipe = queryClient.getQueryData(recipeKeys.detail(id))

      if (cachedRecipe) {
        router.push({
          pathname: "/recipe-detail",
          params: { id },
        })
        isOpeningRef.current = false
        return
      }

      setLoading(true)

      try {
        const recipe = await queryClient.ensureQueryData({
          queryKey: recipeKeys.detail(id),
          queryFn: () => recipeAPI.getRecipeById(id),
          staleTime: 5 * 60 * 1000,
        })

        if (!recipe) {
          throw new Error("Recipe not found")
        }

        router.push({
          pathname: "/recipe-detail",
          params: { id },
        })
      } catch (error) {
        errorHandling(error, "useOpenRecipeDetail")
        setLoading(false)
      } finally {
        isOpeningRef.current = false
      }
    },
    [queryClient, router, setLoading],
  )

  return { openRecipe }
}
