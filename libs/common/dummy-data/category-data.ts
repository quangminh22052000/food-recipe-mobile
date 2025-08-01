import { images } from "../design-system/assets/images"
import { RecipeCategories } from "../enums/recipeCategories"
import { CategoryType } from "../types/category"

export const categories: CategoryType[] = [
  {
    id: "C-1",
    name: "Noodle",
    image: images.noodle,
    type: RecipeCategories.NOODLE,
  },
]
