/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { Image } from "expo-image"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "react-native-paper"
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated"

import { lightColors } from "@/libs/common/design-system/colors"
import { useThemeContext } from "@/libs/common/design-system/theme"
import { hp } from "@/libs/common/utils/device/responsive"

type Props = {
  id: string
  name: string
  image: any
  type: string
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export const CategoryItem = (props: Props) => {
  const { id, name, image, activeCategory, setActiveCategory } = props

  const isActive = activeCategory === id

  const { theme } = useThemeContext()

  const progress = useDerivedValue(() =>
    withTiming(isActive ? 1 : 0, { duration: 200 }),
  )

  const animatedIconStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [lightColors.grey, theme.colors.primary],
    ),
  }))

  const handleSetActiveCategory = (category: string) => {
    if (category === activeCategory) {
      setActiveCategory("")
    } else {
      setActiveCategory(category)
    }
  }

  return (
    <TouchableOpacity
      onPress={() => handleSetActiveCategory(id)}
      style={styles.main}>
      <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
        <Image
          source={{ uri: image as string }}
          style={[styles.icon, { width: hp(6), height: hp(6) }]}
          contentFit="contain"
          cachePolicy="memory-disk"
          transition={200}
        />
      </Animated.View>
      <Text style={{ fontSize: hp(1.5) }}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    margin: 7,
  },
  iconContainer: {
    width: hp(7),
    height: hp(7),
    borderRadius: hp(9),
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: hp(9),
  },
})
