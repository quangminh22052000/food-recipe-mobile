import { useQuery } from "@tanstack/react-query"

import { categoryAPI } from "../apis"
import { categoryKeys } from "../query-keys"

const useCategories = () =>
  useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: categoryAPI.getCategories,
    staleTime: 10 * 60 * 1000,
  })

export const useCategoryAPI = { useCategories }
