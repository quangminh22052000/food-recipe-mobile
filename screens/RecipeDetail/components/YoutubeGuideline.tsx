import React, { useMemo } from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import YoutubePlayer from "react-native-youtube-iframe"

import { cookingRecipeData } from "@/libs/common/dummy-data"
import { RecipeProps } from "@/libs/common/types/recipe"

type YoutubeGuidelineProps = {
  recipeId: string
}

export const YoutubeGuideline = (props: YoutubeGuidelineProps) => {
  const { recipeId } = props

  const recipe = useMemo(() => {
    return cookingRecipeData.find((item: RecipeProps) => item.id === recipeId)
  }, [recipeId])

  const getYoutubeVideoId = (url: string): string | null => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  return (
    <View style={styles.main}>
      <Text variant="titleMedium" style={styles.textBold}>
        Recipe Video
      </Text>
      <YoutubePlayer
        height={300}
        videoId={getYoutubeVideoId(recipe?.recipeVideoUrl || "") || ""}
      />
    </View>
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
})
