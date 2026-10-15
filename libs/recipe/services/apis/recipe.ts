import { getSupabase } from "@/libs/common/utils/network"

import { cookingRecipeData } from "../../dummy-data"
import { mapRecipe, RecipeProps } from "../../types"

const RECIPE_LIST_COLUMNS =
  "id, category_id, name, description, image_path, cooking_time, number_of_servings, number_of_calories, level_of_difficulty, recipe_video_url"

const byName = (a: RecipeProps, b: RecipeProps) => a.name.localeCompare(b.name)

const localRecipes = () => [...cookingRecipeData].sort(byName)

const getRecipes = async (): Promise<RecipeProps[]> => {
  const supabase = getSupabase()
  if (!supabase) return localRecipes()

  try {
    const { data, error } = await supabase
      .from("recipes")
      .select(RECIPE_LIST_COLUMNS)
      .order("name", { ascending: true })

    if (error || !data) return localRecipes()
    return data.map(mapRecipe)
  } catch {
    return localRecipes()
  }
}

const getRecipeById = async (id: string): Promise<RecipeProps | null> => {
  const localRecipe = () =>
    cookingRecipeData.find(recipe => recipe.id === id) ?? null

  const supabase = getSupabase()
  if (!supabase) return localRecipe()

  try {
    const { data, error } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", id)
      .maybeSingle()

    if (error || !data) return localRecipe()
    return mapRecipe(data)
  } catch {
    return localRecipe()
  }
}

export const recipeAPI = { getRecipes, getRecipeById }
