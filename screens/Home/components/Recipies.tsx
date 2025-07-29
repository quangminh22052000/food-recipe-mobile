import React from "react"

import { MasonryFlashList } from "@shopify/flash-list"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { images } from "@/libs/common/design-system/assets/images"

import { RecipeCard, RecipeProps } from "./RecipeCard"

const data: RecipeProps[] = [
  { id: "1", image: images.bunBo, name: "Bún bò" },
  { id: "2", image: images.comSuon, name: "Cơm sườn" },
  { id: "3", image: images.huTieu, name: "Hủ tiếu" },
  { id: "5", image: images.phoBo, name: "Phở bò" },
]

export const Recipies = () => {
  return (
    <View style={styles.main}>
      <Text variant="titleLarge" style={[styles.title, styles.textBold]}>
        Recipies
      </Text>
      <MasonryFlashList
        data={data}
        numColumns={2}
        estimatedItemSize={200}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <RecipeCard index={index} recipe={item} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    marginVertical: 10,
  },
  title: {
    marginBottom: 10,
  },
  textBold: {
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
})
