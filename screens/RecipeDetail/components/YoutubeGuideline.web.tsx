import React from "react"

import { StyleSheet, useWindowDimensions } from "react-native"
import { Text } from "react-native-paper"
import Animated, { FadeInDown } from "react-native-reanimated"

import { hp } from "@/libs/common/utils/device/responsive"
import { RecipeProps } from "@/libs/recipe/types"

type YoutubeGuidelineProps = {
  recipe: RecipeProps
}

const getYoutubeVideoId = (url: string): string | null => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

export const YoutubeGuideline = (props: YoutubeGuidelineProps) => {
  const { recipe } = props

  const { width } = useWindowDimensions()
  const VIDEO_HEIGHT = (width * 9) / 16
  const videoId = getYoutubeVideoId(recipe?.recipeVideoUrl || "")

  return (
    <Animated.View
      entering={FadeInDown.delay(400).duration(700).springify().damping(12)}
      style={styles.main}>
      <Text style={[styles.textBold, { fontSize: hp(2) }]}>Recipe Video</Text>
      {videoId ? (
        <iframe
          title="Recipe video"
          width="100%"
          height={VIDEO_HEIGHT}
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={styles.iframe}
        />
      ) : null}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  main: {
    marginVertical: 10,
    gap: 10,
  },
  textBold: {
    fontWeight: "bold",
  },
  iframe: {
    borderWidth: 0,
    borderRadius: 8,
  },
})
