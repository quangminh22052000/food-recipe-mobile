import { images } from "@/libs/common/design-system/assets/images"

import { RecipeCategories } from "../enums"
import { CategoryType } from "../types"

export const categories: CategoryType[] = [
  {
    id: "C-1",
    name: "Noodle",
    image: images.noodle,
    type: RecipeCategories.NOODLE,
  },
  {
    id: "C-2",
    name: "Rice",
    image: images.rice,
    type: RecipeCategories.RICE,
  },
]
