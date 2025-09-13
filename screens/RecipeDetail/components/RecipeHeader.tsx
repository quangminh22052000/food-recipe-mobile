import React from "react"

import { AntDesign, Entypo } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"

import { lightColors } from "@/libs/common/design-system/colors"
import { useThemeContext } from "@/libs/common/design-system/theme"
import { useFavoriteStore } from "@/libs/common/store/useFavoriteStore"
import { hp } from "@/libs/common/utils/device/responsive"

type Props = {
  id: string
  image: number
}

export const RecipeHeader = (props: Props) => {
  const { id, image } = props

  const { theme } = useThemeContext()

  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore()

  const isFav = isFavorite(id)

  const router = useRouter()

  const { width, height } = useWindowDimensions()

  const handleGoBack = () => {
    router.back()
  }

  const handleFavorite = () => {
    if (isFav) {
      removeFavorite(id)
    } else {
      addFavorite(id)
    }
  }

  return (
    <>
      <StatusBar style="light" />
      <Animated.Image
        source={image}
        sharedTransitionTag={`recipe-${id}`}
        style={[
          styles.image,
          {
            width: width, // fill toàn bộ chiều ngang hiện tại
            height: height * 0.5, // 50% chiều cao màn hình
          },
        ]}
        resizeMode="cover"
      />
      <Animated.View
        entering={FadeInDown.delay(200).duration(1000).springify()}
        style={styles.overlay}>
        <TouchableOpacity onPress={handleGoBack} style={styles.buttonContainer}>
          <Entypo
            name="chevron-left"
            size={hp(3)}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleFavorite}
          style={styles.buttonContainer}>
          <AntDesign
            name={isFav ? "heart" : "hearto"}
            size={hp(3)}
            color={theme.colors.primary}
          />
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
    borderTopLeftRadius: Platform.OS === "ios" ? 30 : 0,
    borderTopRightRadius: Platform.OS === "ios" ? 30 : 0,
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
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 50,
    backgroundColor: lightColors.white,
    margin: 20,
  },
})
