import React from "react"

import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        animation: "shift",
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="testing"
        options={{
          // header: () => <RootHeader />,
          title: "Testing",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
