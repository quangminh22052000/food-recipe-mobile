import { supabase } from "@/libs/common/utils/network"

import { mapRecipe, RecipeProps } from "../../types"

const RECIPE_LIST_COLUMNS =
  "id, category_id, name, description, image_path, cooking_time, number_of_servings, number_of_calories, level_of_difficulty, recipe_video_url"

const getRecipes = async (): Promise<RecipeProps[]> => {
  const { data, error } = await supabase
    .from("recipes")
    .select(RECIPE_LIST_COLUMNS)
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
