import React from "react"

import { AntDesign, Entypo } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, TouchableOpacity } from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

import { lightColors } from "@/libs/common/design-system/colors"
import { useThemeContext } from "@/libs/common/design-system/theme"

type Props = {
  id: string
  image: number
}

export const RecipeHeader = (props: Props) => {
  const { id, image } = props

  const { theme } = useThemeContext()

  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <>
      <StatusBar style="light" />
      <Animated.Image
        source={+image}
        sharedTransitionTag={`recipe-${id}`}
        style={styles.image}
      />
      <Animated.View
        entering={FadeInDown.delay(200).duration(1000).springify()}
        style={styles.overlay}>
        <TouchableOpacity onPress={handleGoBack} style={styles.buttonContainer}>
          <Entypo name="chevron-left" size={30} color={theme.colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <AntDesign name="heart" size={30} color={theme.colors.primary} />
        </TouchableOpacity>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 500,
    borderRadius: 32,
  },
  overlay: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    position: "absolute",
  },
  buttonContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 50,
    backgroundColor: lightColors.white,
    margin: 20,
  },
})
