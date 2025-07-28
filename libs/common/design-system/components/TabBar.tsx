import React from "react"

import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { View, StyleSheet } from "react-native"

import TabBarButton from "./TabBarButton"

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label = (() => {
          if (typeof options.tabBarLabel === "string")
            return options.tabBarLabel
          if (typeof options.title === "string") return options.title
          return route.name
        })()

        if (["_sitemap", "+not-found"].includes(route.name)) return null

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }

        return (
          <TabBarButton
            key={route.name}
            isFocused={isFocused}
            routeName={route.name}
            label={label}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
})

export default TabBar
