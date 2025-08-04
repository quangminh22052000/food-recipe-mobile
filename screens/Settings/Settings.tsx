import React from "react"

import { StyleSheet } from "react-native"

import { CustomView } from "@/libs/common/design-system/components/CustomView"

import { SettingOptions, SettingsHeader } from "./components"

export const Settings = () => {
  return (
    <CustomView style={styles.container}>
      <SettingsHeader />
      <SettingOptions />
    </CustomView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  inner: {
    paddingVertical: 16,
  },
  section: {
    marginBottom: 32,
  },
})
