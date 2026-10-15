import { categories } from "../../dummy-data"
import { CategoryType } from "../../types"

const byName = (a: CategoryType, b: CategoryType) => a.name.localeCompare(b.name)

const getCategories = async (): Promise<CategoryType[]> => {
  return [...categories].sort(byName)
}

export const categoryAPI = { getCategories }
