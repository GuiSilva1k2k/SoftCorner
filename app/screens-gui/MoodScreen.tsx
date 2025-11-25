import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import EmojiSelector from '@/components/components_gui/EmojiSelector';
import RadialBackground from '@/constants/constants-gui/RadialBackground';
import { Ionicons } from '@expo/vector-icons';

export default function MoodScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Oculta header e tab bar */}
      <Stack.Screen options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />

      <RadialBackground />

      <View style={styles.header}>
        <Text style={styles.title}>Como você está{'\n'}se sentindo hoje?</Text>
        <Text style={styles.subtitle}>
          O rastreador de sentimentos nos ajuda a{'\n'}entender o estado atual da sua mente.
        </Text>
      </View>

      <View style={styles.selector}>
        <EmojiSelector />
      </View>

      <TouchableOpacity
        style={styles.circleButton}
        onPress={() => router.push('/(tabs)-GUI/Home')}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-forward" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 0,
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 15,
    maxWidth: 300,
  },
  selector: {
    marginTop: 0,
  },
  circleButton: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
});
