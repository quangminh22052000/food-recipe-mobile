import { cookingRecipeData } from "../../dummy-data"
import { RecipeProps } from "../../types"

const byName = (a: RecipeProps, b: RecipeProps) => a.name.localeCompare(b.name)

const getRecipes = async (): Promise<RecipeProps[]> => {
  return [...cookingRecipeData].sort(byName)
}

const getRecipeById = async (id: string): Promise<RecipeProps | null> => {
  return cookingRecipeData.find(recipe => recipe.id === id) ?? null
}

export const recipeAPI = { getRecipes, getRecipeById }
