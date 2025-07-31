import React from "react"

import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"

import { MiscItem } from "./MiscItem"

const micsData = [
  {
    figure: 35,
    unit: "mins",
    icon: () => (
      <MaterialCommunityIcons name="clock-outline" size={24} color="black" />
    ),
  },
  {
    figure: 30,
    unit: "servings",
    icon: () => <FontAwesome5 name="users" size={24} color="black" />,
  },
  {
    figure: 103,
    unit: "cal",
    icon: () => <MaterialCommunityIcons name="fire" size={24} color="black" />,
  },
  {
    figure: 2,
    unit: "cal",
    icon: () => <Feather name="layers" size={24} color="black" />,
  },
]

export const Misc = () => {
  return (
    <View style={styles.main}>
      {micsData.map((item, index) => (
        <MiscItem key={index} {...item} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
})
