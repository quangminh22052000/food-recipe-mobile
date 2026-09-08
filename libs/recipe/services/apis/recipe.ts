import { supabase } from "@/libs/common/utils/network"

import { mapRecipe, RecipeProps } from "../../types"

const getRecipes = async (): Promise<RecipeProps[]> => {
  const { data, error } = await supabase
    .from("recipes") // đổi đúng tên bảng
    .select("*")
    .order("name", { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapRecipe)
}

const getRecipeById = async (id: string): Promise<RecipeProps | null> => {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) throw error
  return data ? mapRecipe(data) : null
}

export const recipeAPI = { getRecipes, getRecipeById }
