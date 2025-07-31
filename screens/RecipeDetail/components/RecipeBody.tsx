import React from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { Ingredients } from "./Ingredients"
import { Instructions } from "./Instructions"
import { Misc } from "./Misc"
import { YoutubeGuideline } from "./YoutubeGuideline"

type Props = {
  id: string
  name: string
  description: string
}

export const RecipeBody = (props: Props) => {
  const { id, name, description } = props
  return (
    <View style={styles.main}>
      <View style={styles.intro}>
        <Text variant="titleLarge" style={styles.textBold}>
          {name}
        </Text>
        <Text variant="bodyLarge">{description}</Text>
      </View>
      <Misc recipeId={id} />
      <Ingredients recipeId={id} />
      <Instructions recipeId={id} />
      <YoutubeGuideline recipeId={id} />
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
