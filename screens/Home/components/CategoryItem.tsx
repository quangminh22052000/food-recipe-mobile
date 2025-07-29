/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { useThemeContext } from "@/libs/common/design-system/theme"

type Props = {
  id: string
  label: string
  image: any
  activeCategory: string
  setActiveCategory: (category: string) => void
}

const CategoryItem = (props: Props) => {
  const { id, label, image, activeCategory, setActiveCategory } = props

  const isActive = activeCategory === id

  const { theme } = useThemeContext()

  return (
    <TouchableOpacity onPress={() => setActiveCategory(id)} style={styles.main}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: isActive ? theme.colors.primary : "" },
        ]}>
        <Image
          source={image}
          style={[
            styles.icon,
            { backgroundColor: isActive ? theme.colors.primary : "" },
          ]}
        />
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    margin: 7,
  },
  iconContainer: {
    borderRadius: 50,
    padding: 5,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
})
