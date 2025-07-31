import React from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { useThemeContext } from "@/libs/common/design-system/theme"

type Props = {
  figure: number
  unit: string
  icon: () => React.JSX.Element
}
export const MiscItem = (props: Props) => {
  const { figure, unit, icon } = props

  const { theme } = useThemeContext()

  return (
    <View style={[styles.main, { backgroundColor: theme.colors.primary }]}>
      <View style={styles.iconContainer}>{icon()}</View>
      <Text variant="titleMedium" style={styles.textBold}>
        {figure}
      </Text>
      <Text
        variant="bodySmall"
        style={[styles.textCapitalize, styles.textBold]}>
        {unit}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    height: 135,
    display: "flex",
    alignItems: "center",
    gap: 5,
    borderRadius: 50,
    padding: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
  },
  textBold: {
    fontWeight: "bold",
  },
  textCapitalize: {
    textTransform: "capitalize",
  },
})
