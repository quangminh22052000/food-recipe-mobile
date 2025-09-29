import React from "react"
import { StyleSheet } from "react-native"

import { ScreenWrapper } from "@/libs/common/design-system/components"
import { Header, Explore, Hero, Misson, Team, Values } from "./components"

export const AboutApp = () => {
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Mission Section */}
      <Misson />

      {/* Values Section */}
      <Values />

      {/* Team Section */}
      <Team />

      {/* Call to Action */}
      <Explore />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
})
