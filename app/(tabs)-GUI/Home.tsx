import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import RadialBackground from '@/constants/constants-gui/RadialBackground';
import Header from '@/components/components_gui/Header';
import CardStory from '@/components/components_gui/CardStorys';
import { CardPosts } from '@/components/components_gui/CardPosts';


export default function Home() {
  return (
    <View style={styles.container}>
      <RadialBackground />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <View style={[styles.section, styles.row]}>
          <CardStory />
        </View>

        <View style={styles.section}>
          <CardPosts />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60, // espaço pro Header respirar
    paddingBottom: 120, // evita que fique colado no tab bar
  },
  section: {
    marginTop: 75,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
