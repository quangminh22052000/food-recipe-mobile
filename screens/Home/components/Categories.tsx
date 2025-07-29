import React, { useState } from "react"

import { FlashList } from "@shopify/flash-list"
import { StyleSheet, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

import { images } from "@/libs/common/design-system/assets/images"
import { SelectSearch } from "@/libs/common/design-system/components"

import { CategoryItem } from "./CategoryItem"

const categories = [
  { id: "1", label: "Starter", image: images.starterMeal },
  { id: "2", label: "Noodle", image: images.noodle },
]

export const Categories = () => {
  const [activeCategory, setActiveCategory] = useState<string>("")
  return (
    <View style={styles.main}>
      <SelectSearch
        data={[{ id: "1", label: "Item 1" }]}
        onSelect={() => {}}
        placeholder="Search any recipe"
      />
      <Animated.View entering={FadeInDown.duration(500).springify()}>
        <FlashList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={20}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <CategoryItem
              {...item}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    marginVertical: 10,
    gap: 10,
  },
})
