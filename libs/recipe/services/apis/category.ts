import { getSupabase } from "@/libs/common/utils/network"

import { categories } from "../../dummy-data"
import { CategoryType, mapCategory } from "../../types"

const byName = (a: CategoryType, b: CategoryType) =>
  a.name.localeCompare(b.name)

const localCategories = () => [...categories].sort(byName)

const getCategories = async (): Promise<CategoryType[]> => {
  const supabase = getSupabase()
  if (!supabase) return localCategories()

  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name, type, image_path, description")
      .order("name", { ascending: true })

    if (error || !data) return localCategories()
    return data.map(mapCategory)
  } catch {
    return localCategories()
  }
}

export const categoryAPI = { getCategories }
