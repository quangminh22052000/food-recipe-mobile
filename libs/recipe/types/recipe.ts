/* eslint-disable @typescript-eslint/no-explicit-any */
import { LevelOfDifficulties, RecipeCategories } from "../enums"

export type RecipeProps = {
  id: string
  name: string
  typeName: RecipeCategories
  image: string | any | null
  description: string
  cookingTime: number
  numberOfServing: number
  numberOfCalories: number
  levelOfDifficulty: LevelOfDifficulties
  ingredients: {
    name: string
    quantity: string
  }[]
  instructions: string[]
  recipeVideoUrl: string | null
}
