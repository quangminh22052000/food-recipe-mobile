import React from "react"

import MasonryList from "@react-native-seoul/masonry-list"
import { useRouter } from "expo-router"
import LottieView from "lottie-react-native"
import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { animations } from "@/libs/common/design-system/assets/animations"
import { cookingRecipeData } from "@/libs/common/dummy-data"
import { useFavoriteStore } from "@/libs/common/store/useFavoriteStore"
import { RecipeProps } from "@/libs/common/types/recipe"
import { wp } from "@/libs/common/utils/device/responsive"

import { FavoriteCard } from "./FavoriteCard"

export const FavoritesList = () => {
  const router = useRouter()

  const { favoriteIds } = useFavoriteStore()

  const handleNavigate = (recipeId: string) => {
    router.push({
      pathname: "/recipe-detail",
      params: {
        id: recipeId,
      },
    })
  }

  return (
    <View style={styles.container}>
      {favoriteIds.length > 0 ? (
        <MasonryList
          data={cookingRecipeData
            .filter(item => favoriteIds.includes(item.id))
            .sort(
              (a, b) => favoriteIds.indexOf(a.id) - favoriteIds.indexOf(b.id),
            )}
          keyExtractor={(item: RecipeProps) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => (
            <FavoriteCard
              index={i}
              favoritesRecipe={item as RecipeProps}
              handleNavigate={handleNavigate}
            />
          )}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <LottieView
            source={animations.noData}
            autoPlay
            loop={false} // nếu muốn chạy 1 lần thôi
            style={styles.lottie}
          />
          <Text>No favorite recipes yet</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 16,
  },
  list: {
    paddingHorizontal: wp(2.5),
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 200,
    height: 200,
  },
})
