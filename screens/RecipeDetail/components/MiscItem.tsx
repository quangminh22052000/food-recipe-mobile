import React from "react"

import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

import { lightColors } from "@/libs/common/design-system/colors"
import { useThemeContext } from "@/libs/common/design-system/theme"
import { hp, wp } from "@/libs/common/utils/device/responsive"

type Props = {
  figure: string
  unit: string
  icon: () => React.JSX.Element
}
export const MiscItem = (props: Props) => {
  const { figure, unit, icon } = props

  const { theme, isDarkMode } = useThemeContext()

  return (
    <View style={[styles.main, { backgroundColor: theme.colors.primary }]}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: lightColors.white,
            width: hp(5.5),
            height: hp(5.5),
          },
        ]}>
        {icon()}
      </View>
      <Text
        // variant="titleMedium"
        style={[
          styles.textBold,
          {
            color: isDarkMode ? lightColors.dark : lightColors.white,
            textAlign: "center",
            fontSize: hp(1.5),
          },
        ]}>
        {figure}
      </Text>
      <Text
        // variant="bodySmall"
        style={[
          styles.textCapitalize,
          styles.textBold,
          {
            color: isDarkMode ? lightColors.dark : lightColors.white,
            fontSize: hp(1.4),
          },
        ]}>
        {unit}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: wp(18), // chiếm khoảng 18% chiều rộng màn hình
    height: hp(15), // chiếm 15% chiều cao màn hình
    display: "flex",
    alignItems: "center",
    gap: hp(0.7),
    borderRadius: wp(9), // luôn bo tròn theo height
    padding: hp(1),
  },
  iconContainer: {
    width: hp(6),
    height: hp(6),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: hp(3),
    backgroundColor: "white",
  },
  textBold: {
    fontWeight: "bold",
  },
  textCapitalize: {
    textTransform: "capitalize",
  },
})
