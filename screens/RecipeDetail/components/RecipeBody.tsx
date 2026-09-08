import React from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import Animated, { FadeInDown } from "react-native-reanimated"

import { hp } from "@/libs/common/utils/device/responsive"
import { RecipeProps } from "@/libs/recipe/types"

import { Ingredients } from "./Ingredients"
import { Instructions } from "./Instructions"
import { Misc } from "./Misc"
import { YoutubeGuideline } from "./YoutubeGuideline"

type Props = {
  recipe: RecipeProps
}

export const RecipeBody = (props: Props) => {
  const { recipe } = props

  return (
    <View style={styles.main}>
      <Animated.View
        entering={FadeInDown.duration(700).springify().damping(12)}
        style={styles.intro}>
        <Text style={[styles.textBold, { fontSize: hp(3) }]}>
          {recipe.name}
        </Text>
        <Text style={{ fontSize: hp(1.7) }}>{recipe.description}</Text>
      </Animated.View>
      <Misc recipe={recipe} />
      <Ingredients recipe={recipe} />
      <Instructions recipe={recipe} />
      <YoutubeGuideline recipe={recipe} />
    </View>
  )
}

export default RecipeBody

const styles = StyleSheet.create({
  main: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  intro: {
    gap: 5,
    marginVertical: 10,
  },
  textBold: {
    fontWeight: "bold",
  },
})
