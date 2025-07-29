import React from "react"

import { Feather } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"
import { Avatar } from "react-native-paper"

import { images } from "@/libs/common/design-system/assets/images"

export const HomeHeader = () => {
  return (
    <View style={styles.main}>
      <Avatar.Image size={40} source={images.appLogo} />
      <Feather name="bell" size={30} color="gray" />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 70,
  },
})
