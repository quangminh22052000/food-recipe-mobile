import React from "react"

import { AntDesign, Entypo } from "@expo/vector-icons"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { StatusBar } from "expo-status-bar"
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native"
import Animated, { FadeInDown } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { lightColors } from "@/libs/common/design-system/colors"
import { useThemeContext } from "@/libs/common/design-system/theme"
import { hp } from "@/libs/common/utils/device/responsive"
import { useFavoriteStore } from "@/libs/recipe/store"

const AnimatedExpoImage = Animated.createAnimatedComponent(Image)

const HEADER_IMAGE_HEIGHT_RATIO = 0.5

type Props = {
  id: string
  image: string
}

export const RecipeHeader = (props: Props) => {
  const { id, image } = props

  const { theme } = useThemeContext()

  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore()

  const isFav = isFavorite(id)

  const router = useRouter()

  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const imageHeight = height * HEADER_IMAGE_HEIGHT_RATIO + insets.top

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
    <View
      style={[
        styles.header,
        {
          width,
          height: imageHeight,
          marginTop: -insets.top,
        },
      ]}>
      <StatusBar style="light" />
      <AnimatedExpoImage
        source={{ uri: image }}
        sharedTransitionTag={`recipe-${id}`}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={200}
        priority="high"
      />
      <Animated.View
        entering={FadeInDown.delay(200).duration(1000).springify()}
        style={[styles.overlay, { paddingTop: insets.top + hp(1) }]}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    overflow: "hidden",
    alignSelf: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
