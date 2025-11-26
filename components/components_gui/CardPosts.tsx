import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// -----------------------------
// LISTA DE POSTS AQUI MESMO 👇
// -----------------------------

type Post = {
  id: string;
  user: {
    name: string;
    avatar: any;
  };
  time: string;
  text: string;
  image: any;
  likes: number;
  comments: number;
  views: number;
};

const posts = [
  {
    id: "1",
    user: {
      name: "Charles Leclerc",
      avatar: require("@/assets/assets_gui/icons/charle.jpg"),
    },
    time: "2 horas atrás",
    text: "Teste de post",
    image: require("@/assets/assets_gui/yuri.png"),
    likes: 1500,
    comments: 75,
    views: 33250,
  },
  {
    id: "2",
    user: {
      name: "Gabriel Bortoleto",
      avatar: require("@/assets/assets_gui/icons/gabriel.jpg"),
    },
    time: "2 horas atrás",
    text: "Teste de post",
    image: require("@/assets/assets_gui/yuri.png"),
    likes: 1500,
    comments: 75,
    views: 33250,
  },
  {
    id: "3",
    user: {
      name: "Max Verstappen",
      avatar: require("@/assets/assets_gui/icons/max.jpg"),
    },
    time: "2 horas atrás",
    text: "Teste de post",
    image: require("@/assets/assets_gui/yuri.png"),
    likes: 1500,
    comments: 75,
    views: 33250,
  }
];

// -----------------------------
// CARD INDIVIDUAL
// -----------------------------
const PostCard = ({ item }: { item: Post }) => {
  return (
    <BlurView intensity={50} tint="dark" style={styles.card}>
      {/* ---------- TOPO ---------- */}
      <View style={styles.header}>
        <Image source={item.user.avatar} style={styles.avatar} />

        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
      </View>

      {/* ---------- TEXTO ---------- */}
      <Text style={styles.text}>{item.text}</Text>

      {/* ---------- IMAGEM ---------- */}
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.postImage} />
        <Ionicons
          name="bookmark-outline"
          size={22}
          color="#fff"
          style={styles.bookmark}
        />
      </View>

      {/* ---------- FOOTER ---------- */}
      <View style={styles.footer}>
        <View style={styles.iconRow}>
          <Ionicons name="heart" size={18} color="#ff4f4f" />
          <Text style={styles.footerText}>{item.likes}</Text>
        </View>

        <View style={styles.iconRow}>
          <Ionicons name="chatbubble" size={18} color="#f5d142" />
          <Text style={styles.footerText}>{item.comments}</Text>
        </View>

        <View style={styles.iconRow}>
          <Ionicons name="eye" size={18} color="#ccc" />
          <Text style={styles.footerText}>{item.views}</Text>
        </View>

        <TouchableOpacity style={styles.readMoreBtn}>
          <Text style={styles.readMoreText}>Ler Mais</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

// -----------------------------
// LISTA PRINCIPAL
// -----------------------------
export const CardPosts = () => {
  return (
    <>
      {posts.map((item) => (
        <PostCard key={item.id} item={item} />
      ))}
    </>
  );
};

// -----------------------------
// STYLES
// -----------------------------
const styles = StyleSheet.create({
  card: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 24,
    padding: 16,
    marginVertical: 12,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    marginRight: 10,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  time: {
    color: "#aaa",
    fontSize: 13,
  },

  text: {
    color: "#ddd",
    fontSize: 15,
    marginBottom: 12,
  },

  imageWrapper: {
    width: "100%",
    height: 200,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
  },
  postImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bookmark: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.25)",
    padding: 6,
    borderRadius: 20,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
  },

  readMoreBtn: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  readMoreText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
