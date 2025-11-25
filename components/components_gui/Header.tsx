import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.container}>
      {/* Perfil e saudação */}
      <View style={styles.leftSection}>
        <Image
          source={require('@/assets/assets_gui/yuri.png')}
          style={styles.profileImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>Olá, <Text style={styles.name}>Yuri Levi</Text></Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#ccc" />
            <Text style={styles.locationText}>Manaus, Brasil</Text>
          </View>
        </View>
      </View>

      {/* Botão de busca */}
      <TouchableOpacity style={styles.searchButton} activeOpacity={0.8}>
        <Ionicons name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 45,
    left: 20,
    right: 20,
    height: 80,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 45 ,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
  greeting: {
    color: '#fff',
    fontSize: 16,
  },
  name: {
    fontWeight: '600',
    color: '#fff',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    color: '#ccc',
    fontSize: 13,
    marginLeft: 4,
  },
  searchButton: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
});
