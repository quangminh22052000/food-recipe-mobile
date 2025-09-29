import React from "react"

import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Text } from "react-native-paper"

import { hp } from "@/libs/common/utils/device/responsive"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export const Header = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.backContainer}
        onPress={handleGoBack}>
        <Ionicons name="chevron-back" size={20} color="#007AFF" />
        <Text style={styles.backText}>Setting</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{"About App"}</Text>

      {/* Placeholder để căn giữa title */}
      <View style={styles.rightPlaceholder} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: "#ccc",
    // paddingHorizontal: 10,
    marginTop: 50,
  },
  backContainer: {
    width: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: hp(1.8),
    color: "#007AFF",
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: "bold",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  rightPlaceholder: {
    width: 100,
  },
})
