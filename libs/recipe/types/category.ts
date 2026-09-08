import { RecipeCategories } from "../enums"

export type CategoryType = {
  id: string
  name: string
  type: RecipeCategories
  image: string | null // map từ image_path
  description?: string | null
}

type CategoryRow = {
  id: string
  name: string
  type: string
  image_path: string | null
  description: string | null
}

export const mapCategory = (row: CategoryRow): CategoryType => ({
  id: row.id,
  name: row.name,
  type: row.type as RecipeCategories,
  image: row.image_path
    ? `${process.env.EXPO_PUBLIC_SUPABASE_URL}${row.image_path}`
    : null,
  description: row.description,
})
