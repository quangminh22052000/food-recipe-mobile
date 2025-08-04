import React from "react"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Pressable, StyleSheet, View } from "react-native"
import { Text, useTheme } from "react-native-paper"
import Animated, { FadeInDown } from "react-native-reanimated"

import { lightColors } from "@/libs/common/design-system/colors"
import { LevelOfDifficulties } from "@/libs/common/enums"
import { RecipeProps } from "@/libs/common/types/recipe"
import { hp, wp } from "@/libs/common/utils/device/responsive"

type Props = {
  index: number
  favoritesRecipe: RecipeProps
  handleNavigate: (id: string) => void
}

export const FavoriteCard = (props: Props) => {
  const { index, favoritesRecipe, handleNavigate } = props

  const theme = useTheme()

  const renderLevelOfDifficulty = () => {
    switch (favoritesRecipe.levelOfDifficulty) {
      case LevelOfDifficulties.EASY:
        return (
          <View style={styles.recipeInfoContainer}>
            <Text
              style={[styles.textBold, { color: lightColors.levelEasyColor }]}>
              {favoritesRecipe.levelOfDifficulty}
            </Text>
            <Text>-</Text>
            <View style={styles.cookingContainer}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={hp(2.5)}
                color={theme.colors.onBackground}
              />
              <Text>{`${favoritesRecipe.cookingTime} mins`}</Text>
            </View>
          </View>
        )
      case LevelOfDifficulties.MEDIUM:
        return (
          <View style={styles.recipeInfoContainer}>
            <Text
              style={[
                styles.textBold,
                { color: lightColors.levelMediumColor },
              ]}>
              {favoritesRecipe.levelOfDifficulty}
            </Text>
            <Text>-</Text>
            <View style={styles.cookingContainer}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={hp(2.5)}
                color={theme.colors.onBackground}
              />
              <Text>{`${favoritesRecipe.cookingTime} mins`}</Text>
            </View>
          </View>
        )
      case LevelOfDifficulties.HARD:
        return (
          <View style={styles.recipeInfoContainer}>
            <Text
              style={[styles.textBold, { color: lightColors.levelHardColor }]}>
              {favoritesRecipe.levelOfDifficulty}
            </Text>
            <Text>-</Text>
            <View style={styles.cookingContainer}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={hp(2.5)}
                color={theme.colors.onBackground}
              />
              <Text>{`${favoritesRecipe.cookingTime} mins`}</Text>
            </View>
          </View>
        )
      default:
        return null
    }
  }

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(12)}>
      <Pressable
        onPress={() => handleNavigate(favoritesRecipe.id)}
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface,
          },
        ]}>
        <Animated.Image
          // source={{ uri: item.image }}
          source={favoritesRecipe.image}
          sharedTransitionTag={`recipe-${favoritesRecipe.id}`}
          style={[styles.image, { width: wp(40), height: hp(20) }]}
          resizeMode="cover"
        />
        <Text
          style={[styles.textBold, { fontSize: hp(1.7), marginVertical: 5 }]}
          numberOfLines={1}>
          {favoritesRecipe.name}
        </Text>
        {renderLevelOfDifficulty()}
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: wp(45), // Chiếm khoảng 45% màn hình (để còn khoảng trắng giữa 2 card)
    marginHorizontal: wp(1.3), // Cân bằng spacing hai bên
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
    elevation: 3,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  image: {
    borderRadius: 35,
    marginBottom: 12,
  },
  name: {
    fontWeight: "600",
    fontSize: hp(1.8),
    marginBottom: 6,
  },
  recipeInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cookingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  textBold: {
    fontWeight: "bold",
  },
})
