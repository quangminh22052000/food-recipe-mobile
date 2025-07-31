/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { Image, Pressable, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import Animated, { FadeInDown } from "react-native-reanimated"

export type RecipeProps = {
  id: string
  image: any
  name: string
  description: string
}

type Props = {
  index: number
  recipe: RecipeProps
  handleNavigate: (recipe: RecipeProps) => void
}

export const RecipeCard = (props: Props) => {
  const { index, recipe, handleNavigate } = props
  const isEven = index % 2 === 0
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}>
      <Pressable
        onPress={() => handleNavigate(recipe)}
        style={[
          styles.main,
          { paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 },
        ]}>
        <Image
          // source={{ uri: item.image }}
          source={recipe.image}
          style={[styles.image, { height: index % 3 === 0 ? 250 : 200 }]}
          resizeMode="cover"
        />
        <Text variant="titleMedium">{recipe.name}</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    justifyContent: "center",
    marginBottom: 6,
  },
  image: {
    width: "100%",
    borderRadius: 35,
  },
})
