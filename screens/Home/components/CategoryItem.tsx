/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"

import { lightColors } from "@/libs/common/design-system/colors"
import { useThemeContext } from "@/libs/common/design-system/theme"

type Props = {
  id: string
  label: string
  image: any
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export const CategoryItem = (props: Props) => {
  const { id, label, image, activeCategory, setActiveCategory } = props

  const isActive = activeCategory === id

  const { theme } = useThemeContext()

  return (
    <TouchableOpacity onPress={() => setActiveCategory(id)} style={styles.main}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isActive ? theme.colors.primary : lightColors.grey,
          },
        ]}>
        <Image source={image} style={styles.icon} resizeMode="contain" />
      </View>
      <Text>{label}</Text>
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
