import React from "react"

import { StyleSheet } from "react-native"

import { ScreenWrapper } from "@/libs/common/design-system/components"

import { FavoritesHeader, FavoritesList } from "./components"

export const Favorites = () => {
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      <FavoritesHeader />
      <FavoritesList />
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
