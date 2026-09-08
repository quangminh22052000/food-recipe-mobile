import React from "react"

import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import { StyleSheet } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

import { hp, wp } from "@/libs/common/utils/device/responsive"
import { RecipeProps } from "@/libs/recipe/types"

import { MiscItem } from "./MiscItem"

type MiscDataProps = {
  recipe: RecipeProps
}

export const Misc = (props: MiscDataProps) => {
  const { recipe } = props

  const micsData = [
    {
      figure: recipe?.cookingTime || "0",
      unit: "mins",
      icon: () => (
        <MaterialCommunityIcons
          name="clock-outline"
          size={hp(2.5)}
          color="black"
        />
      ),
    },
    {
      figure: recipe?.numberOfServings || "1",
      unit: "servings",
      icon: () => <FontAwesome5 name="users" size={hp(2.5)} color="black" />,
    },
    {
      figure: recipe?.numberOfCalories || "0",
      unit: "cal",
      icon: () => (
        <MaterialCommunityIcons name="fire" size={hp(2.5)} color="black" />
      ),
    },
    {
      figure: recipe?.levelOfDifficulty || "Easy",
      unit: "",
      icon: () => <Feather name="layers" size={hp(2.5)} color="black" />,
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
    justifyContent: "center",
    alignItems: "center",
    gap: wp(5),
    marginVertical: 5,
  },
})
