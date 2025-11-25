import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function PerfilStory() {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.card}>
      {/* Avatar container */}
      <View style={styles.avatarBox}>
        <Image
          source={require("@/assets/assets_gui/yuri.png")}
          style={styles.avatar}
        />

        {/* Botão + */}
        <LinearGradient
          colors={["#dad2ffff", "#7369e7ff", "#b8b2ffff"]}
          style={styles.plusButton}
        >
          <Text style={styles.plusText}>+</Text>
        </LinearGradient>
      </View>

      <Text style={styles.label}>Crie seu story</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 126,
    height: 170,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    paddingBottom: 12,
  },

  avatarBox: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: "#d9d9d9",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    resizeMode: "cover",
  },

  plusButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    position: "absolute",
    bottom: -13,
    alignItems: "center",
    justifyContent: "center",
  },

  plusText: {
    color: "#fff",
    fontSize: 22,
    marginTop: -2,
  },

  label: {
    color: "#fff",
    marginTop: 12,
    fontSize: 14,
    fontWeight: "500",
  },
});
