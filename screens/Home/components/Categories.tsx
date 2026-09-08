import React from "react"

import { FlatList, StyleSheet, View } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

import { QueryState } from "@/libs/common/design-system/components"
import { useAppStore } from "@/libs/common/store"
import { hp } from "@/libs/common/utils/device/responsive"
import { useCategoryAPI } from "@/libs/recipe/services/hooks/useCategoryAPI"

import { CategoryItem } from "./CategoryItem"

export const Categories = () => {
  const { selectedRecipeType, setSelectedRecipeType } = useAppStore()

  const {
    data: categories = [],
    isLoading,
    isError,
    refetch,
  } = useCategoryAPI.useCategories()

  return (
    <View style={styles.main}>
      <Animated.View entering={FadeInDown.duration(500).springify()}>
        <QueryState
          compact
          isLoading={isLoading}
          isError={isError}
          isEmpty={!isLoading && !isError && categories.length === 0}
          errorMessage="Couldn't load categories."
          emptyMessage="No categories"
          onRetry={refetch}>
          <FlatList
            data={categories}
            extraData={selectedRecipeType}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : index.toString()
            }
            renderItem={({ item }) => (
              <CategoryItem
                {...item}
                activeCategory={selectedRecipeType}
                setActiveCategory={setSelectedRecipeType}
              />
            )}
          />
        </QueryState>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    marginVertical: 10,
    gap: 10,
    minHeight: hp(10),
    justifyContent: "center",
  },
})
