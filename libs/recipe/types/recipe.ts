/* eslint-disable @typescript-eslint/no-explicit-any */
import { LevelOfDifficulties } from "../enums"

export type RecipeProps = {
  id: string
  categoryId: string
  name: string
  description: string
  image: string | any | null
  cookingTime: number
  numberOfServings: number | null
  numberOfCalories: number | null
  levelOfDifficulty: LevelOfDifficulties
  ingredients: {
    name: string
    quantity: string
  }[]
  instructions: string[]
  recipeVideoUrl: string | null
}

type RecipeRow = {
  id: string
  category_id: string
  name: string
  description: string
  image_path: string | null
  cooking_time: number
  number_of_servings: number
  number_of_calories: number | null
  level_of_difficulty: string
  ingredients: {
    name: string
    quantity: string
  }[]
  instructions: string[]
  recipe_video_url: string | null
}

export const mapRecipe = (row: RecipeRow): RecipeProps => ({
  id: row.id,
  categoryId: row.category_id,
  name: row.name,
  description: row.description,
  image: row.image_path
    ? `${process.env.EXPO_PUBLIC_SUPABASE_URL}${row.image_path}`
    : null,
  cookingTime: row.cooking_time,
  numberOfServings: row.number_of_servings,
  numberOfCalories: row.number_of_calories,
  levelOfDifficulty: row.level_of_difficulty as LevelOfDifficulties,
  ingredients: row.ingredients,
  instructions: row.instructions,
  recipeVideoUrl: row.recipe_video_url,
})
