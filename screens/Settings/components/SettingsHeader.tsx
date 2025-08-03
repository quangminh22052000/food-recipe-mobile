import React from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { hp } from "@/libs/common/utils/device/responsive"

export const SettingsHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: hp(3), fontWeight: "bold" }}>Settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 70,
    marginLeft: 10,
  },
})
