/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecipeCategories } from "../enums"

export type CategoryType = {
  id: string
  name: string
  image: any
  type: RecipeCategories
}
