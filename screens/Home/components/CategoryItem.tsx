/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"

import { lightColors } from "@/libs/common/design-system/colors"
import { useThemeContext } from "@/libs/common/design-system/theme"

type Props = {
  id: string
  name: string
  image: any
  type: string
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export const CategoryItem = (props: Props) => {
  const { name, image, type, activeCategory, setActiveCategory } = props

  const isActive = activeCategory === type

  const { theme } = useThemeContext()

  const handleSetActiveCategory = (category: string) => {
    if (category === activeCategory) {
      setActiveCategory("")
    } else {
      setActiveCategory(category)
    }
  }

  return (
    <TouchableOpacity
      onPress={() => handleSetActiveCategory(type)}
      style={styles.main}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isActive ? theme.colors.primary : lightColors.grey,
          },
        ]}>
        <Image source={image} style={styles.icon} resizeMode="contain" />
      </View>
      <Text>{name}</Text>
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
    width: 70,
    height: 70,
    borderRadius: 50,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
})
