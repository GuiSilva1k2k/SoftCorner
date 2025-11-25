import PerfilStory from '@/components/components_gui/PerfilStory';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CardStory() {
  const stories = [
    {
      id: '1',
      name: 'Nicolas Cage',
      image: require('@/assets/relaxar.jpg'),
      avatar: require('@/assets/relaxar.jpg'),
    },
    {
      id: '2',
      name: 'Aghata Torres',
      image: require('@/assets/viajar.jpg'),
      avatar: require('@/assets/viajar.jpg'),
    },
    {
      id: '3',
      name: 'Nicolas Cage',
      image: require('@/assets/relaxar.jpg'),
      avatar: require('@/assets/relaxar.jpg'),
    },
    {
      id: '4',
      name: 'Aghata Torres',
      image: require('@/assets/viajar.jpg'),
      avatar: require('@/assets/viajar.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <PerfilStory />

        {stories.map((story) => (
          <TouchableOpacity key={story.id} style={styles.card} activeOpacity={0.9}>

            <View style={styles.imageWrapper}>
              <Image
                source={story.image}
                style={styles.image}
                blurRadius={20}
              />

              <BlurView intensity={30} tint="dark" style={styles.blurLayer} />
            </View>

            <View style={styles.topBar} />

            <View style={styles.avatarContainer}>
              <Image source={story.avatar} style={styles.avatar} />
            </View>

            <Text style={styles.name}>{story.name}</Text>

          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },

  // CARD PRINCIPAL
  card: {
    width: 126,
    height: 170,
    borderRadius: 26,
    marginRight: 18,
    overflow: 'hidden',
    backgroundColor: '#1b1b33',
    position: 'relative',
  },

  imageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: 0,
  },
  blurLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

  topBar: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    width: 45,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 999,
    zIndex: 3,
  },

  avatarContainer: {
    position: 'absolute',
    marginLeft: 15,
    top: 90,
    width: 40,
    height: 40,
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.85)',
    overflow: 'hidden',
    zIndex: 4, // 👈 FUNDAMENTAL — mantém nítido e acima do blur
  },

  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  name: {
    position: 'absolute',
    marginLeft: 15,
    bottom: 14,
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    zIndex: 4, // acima do blur também
  },
});
