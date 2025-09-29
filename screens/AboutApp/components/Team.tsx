import React from "react"

import { Image, StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"

import { images } from "@/libs/common/design-system/assets/images"

export const Team = () => {
  const members = [
    {
      id: 1,
      name: "Văn Chiến",
      role: "Dad",
      image: images.dad,
    },
    {
      name: "Ngọc Thạnh",
      role: "Mom",
      image: images.mom,
    },
    {
      name: "Quang Minh",
      role: "Me",
      image: images.me,
    },
    {
      name: "Phương Uyên",
      role: "Sister",
      image: images.sister,
    },
  ]
  return (
    <Animated.View
      entering={FadeInDown.delay(600).duration(800)}
      style={styles.section}>
      <Text style={styles.sectionTitle}>Meet The Team</Text>
      <View style={styles.teamRow}>
        {members.map((member, i) => (
          <Animated.View
            key={i}
            entering={FadeInUp.delay(200 * i)}
            style={styles.teamCard}>
            <Image
              source={member.image}
              resizeMode="cover"
              style={styles.avatar}
            />
            <Text style={styles.teamName}>{member.name}</Text>
            <Text style={styles.teamRole}>{member.role}</Text>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    // color: "#333",
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666",
  },
  teamRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  teamCard: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 35,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 12,
    fontWeight: "600",
  },
  teamRole: {
    fontSize: 10,
    color: "#777",
  },
})
