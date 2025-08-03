import React from "react"

import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

import TabBar from "@/libs/common/design-system/components/TabBar"
import { useThemeContext } from "@/libs/common/design-system/theme"

const TabLayout = () => {
  const { theme } = useThemeContext()
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        animation: "shift",
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          color: theme.colors.text,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="testing"
        options={{
          // header: () => <RootHeader />,
          title: "Testing",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="flask" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
