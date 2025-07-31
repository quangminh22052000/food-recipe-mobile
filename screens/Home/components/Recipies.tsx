import React from "react"

import { MasonryFlashList } from "@shopify/flash-list"
import { useRouter } from "expo-router"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { images } from "@/libs/common/design-system/assets/images"

import { RecipeCard, RecipeProps } from "./RecipeCard"

const data: RecipeProps[] = [
  { id: "1", image: images.bunBo, name: "Bún bò", description: "Bún và bò" },
  {
    id: "2",
    image: images.comSuon,
    name: "Cơm sườn",
    description: "Cơm và sườn",
  },
  { id: "3", image: images.huTieu, name: "Hủ tiếu", description: "Hủ và tiếu" },
  { id: "4", image: images.phoBo, name: "Phở bò", description: "Phở và bò" },
]

export const Recipies = () => {
  const router = useRouter()

  const handleNavigate = (recipe: RecipeProps) => {
    router.push({
      pathname: "/recipe-detail",
      params: {
        id: recipe.id,
        image: recipe.image,
        name: recipe.name,
        description: recipe.description,
      },
    })
  }
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
          <RecipeCard
            index={index}
            recipe={item}
            handleNavigate={handleNavigate}
          />
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
