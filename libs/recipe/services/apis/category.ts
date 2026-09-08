import { supabase } from "@/libs/common/utils/network"

import { CategoryType, mapCategory } from "../../types"

const getCategories = async (): Promise<CategoryType[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, type, image_path, description")
    .order("name", { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapCategory)
}

export const categoryAPI = { getCategories }
