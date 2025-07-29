import React from "react"

import { StyleSheet } from "react-native"

import { ScreenWrapper } from "@/libs/common/design-system/components"

import { HomeHeader, HomeIntro } from "./components"

export const Home = () => {
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <HomeHeader />
      <HomeIntro />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
})
