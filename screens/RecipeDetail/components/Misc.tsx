import React, { useMemo } from "react"

import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import { StyleSheet } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

import { cookingRecipeData } from "@/libs/common/dummy-data"
import { RecipeProps } from "@/libs/common/types/recipe"

import { MiscItem } from "./MiscItem"

type MiscDataProps = {
  recipeId: string
}

export const Misc = (props: MiscDataProps) => {
  const { recipeId } = props

  const recipe = useMemo(() => {
    return cookingRecipeData.find((item: RecipeProps) => item.id === recipeId)
  }, [recipeId])

  const micsData = [
    {
      figure: recipe?.cookingTime || "0",
      unit: "mins",
      icon: () => (
        <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
      ),
    },
    {
      figure: recipe?.numberOfServing || "1",
      unit: "servings",
      icon: () => <FontAwesome5 name="users" size={24} color="black" />,
    },
    {
      figure: recipe?.numberOfCalories || "0",
      unit: "cal",
      icon: () => (
        <MaterialCommunityIcons name="fire" size={24} color="black" />
      ),
    },
    {
      figure: recipe?.levelOfDifficulty || "Easy",
      unit: "",
      icon: () => <Feather name="layers" size={24} color="black" />,
    },
  ]

  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(700).springify().damping(12)}
      style={styles.main}>
      {micsData.map((item, index) => (
        <MiscItem key={index} {...item} />
      ))}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
})
