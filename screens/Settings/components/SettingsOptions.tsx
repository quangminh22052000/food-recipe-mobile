/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react"

import { useTranslation } from "react-i18next"
import {
  I18nManager,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native"
import {
  Avatar,
  Divider,
  Icon,
  Switch,
  Text,
  useTheme,
} from "react-native-paper"

import { images } from "@/libs/common/design-system/assets/images"
import { ScreenWrapper } from "@/libs/common/design-system/components"
import { useThemeContext } from "@/libs/common/design-system/theme"
import { hp } from "@/libs/common/utils/device/responsive"

export const SettingOptions = () => {
  const { isDarkMode, toggleTheme } = useThemeContext()
  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const [language, setLanguage] = useState(i18n.language)
  const [notifications, setNotifications] = useState(true)

  const changeLanguage = () => {
    const newLang = language === "en" ? "vi" : "en"
    i18n.changeLanguage(newLang)
    setLanguage(newLang)
    if (Platform.OS === "android") {
      I18nManager.forceRTL(newLang === "vi")
    }
  }
  return (
    <ScreenWrapper contentContainerStyle={styles.container}>
      {/* Section 1: User info */}
      <View
        style={[
          styles.infoContainer,
          { backgroundColor: theme.colors.surface },
        ]}>
        <Avatar.Image size={50} source={images.appLogo} />
        <View style={styles.userInfo}>
          <Text style={{ fontSize: hp(2), fontWeight: "bold" }}>
            Ngọc Thạnh
          </Text>
          <Text style={{ fontSize: hp(1.5) }}>Việt Nam</Text>
        </View>
      </View>

      {/* Section 2: Preferences */}
      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity onPress={changeLanguage} activeOpacity={0.7}>
          <View style={styles.settingOptionsContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                source="translate"
                size={24}
                color={theme.colors.onSurface}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: hp(1.7) }}>Language</Text>
                <Text
                  style={{ color: theme.colors.onSurface, fontSize: hp(1.2) }}>
                  {language === "en" ? "English" : "Vietnamese"}
                </Text>
              </View>
            </View>
            <Icon
              source="chevron-right"
              size={24}
              color={theme.colors.onSurface}
            />
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7}>
          <View style={styles.settingOptionsContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                source="theme-light-dark"
                size={24}
                color={theme.colors.onSurface}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: hp(1.7) }}>Dark Mode</Text>
              </View>
            </View>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>
        </TouchableOpacity>
        {/* <Divider />
        <TouchableOpacity
          onPress={() => setNotifications(!notifications)}
          activeOpacity={0.7}>
          <View style={styles.settingOptionsContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                source="bell-outline"
                size={24}
                color={theme.colors.onSurface}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: hp(1.7) }}>Notifications</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={() => setNotifications(!notifications)}
            />
          </View>
        </TouchableOpacity> */}
      </View>

      {/* Section 3: About */}
      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <TouchableOpacity
          onPress={() => setNotifications(!notifications)}
          activeOpacity={0.7}>
          <View style={styles.settingOptionsContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                source="information-outline"
                size={24}
                color={theme.colors.onSurface}
              />
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontSize: hp(1.7) }}>About App</Text>
              </View>
            </View>
            <Icon
              source="chevron-right"
              size={24}
              color={theme.colors.onSurface}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 16,
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 15,
    marginBottom: 25,
    borderRadius: 15,
  },
  settingOptionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    justifyContent: "space-between",
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 25,
    borderRadius: 15,
  },
  userInfo: {
    marginLeft: 20,
    gap: 5,
  },
})
