import React from "react"

import { StyleSheet, View } from "react-native"
import { ActivityIndicator, Button, Text } from "react-native-paper"

import { hp } from "@/libs/common/utils/device/responsive"

import { useThemeContext } from "../theme"

type Props = {
  isLoading: boolean
  isError: boolean
  isEmpty?: boolean
  compact?: boolean // true: small size, false: large size
  errorMessage?: string
  emptyMessage?: string
  onRetry?: () => void
  children: React.ReactNode
}

export const QueryState = (props: Props) => {
  const {
    isLoading,
    isError,
    isEmpty = false,
    compact = false,
    errorMessage = "Couldn't load data. Please try again.",
    emptyMessage = "No data",
    onRetry,
    children,
  } = props

  const { theme } = useThemeContext()

  if (isLoading) {
    return (
      <View style={[styles.center, compact && styles.compact]}>
        <ActivityIndicator
          size={compact ? "small" : "large"}
          color={theme.colors.primary}
        />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={[styles.center, compact && styles.compact]}>
        <Text style={styles.message}>{errorMessage}</Text>
        {onRetry ? (
          <Button mode="text" onPress={onRetry} compact={compact}>
            Retry
          </Button>
        ) : null}
      </View>
    )
  }

  if (isEmpty) {
    return (
      <View style={[styles.center, compact && styles.compact]}>
        <Text style={styles.message}>{emptyMessage}</Text>
      </View>
    )
  }

  return <>{children}</>
}

const styles = StyleSheet.create({
  center: {
    flexGrow: 1,
    minHeight: hp(40),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp(2),
    gap: 8,
  },
  compact: {
    flexGrow: 0,
    minHeight: hp(8),
    paddingVertical: hp(1),
  },
  message: {
    textAlign: "center",
    paddingHorizontal: 16,
  },
})
