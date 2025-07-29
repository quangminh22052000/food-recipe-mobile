import React from "react"

import { StyleSheet } from "react-native"

import { ScreenWrapper } from "@/libs/common/design-system/components"

import { Categories, HomeHeader, HomeIntro, Recipies } from "./components"

export const Home = () => {
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <HomeHeader />
      <HomeIntro />
      <Categories />
      <Recipies />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
})
