import React from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import YoutubePlayer from "react-native-youtube-iframe"

export const YoutubeGuideline = () => {
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
        videoId={getYoutubeVideoId(
          "https://www.youtube.com/watch?v=A_o2qfaTgKs",
        )}
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
