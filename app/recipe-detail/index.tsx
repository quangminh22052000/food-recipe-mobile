/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecipeDetail } from "@/screens/RecipeDetail"

export const sharedElements = (route: any) => {
  const { id } = route.params
  return [`recipe-${id}`]
}

export default RecipeDetail
