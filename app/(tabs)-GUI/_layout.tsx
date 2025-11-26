import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const TabBarIcon = ({ focused, color, name, label }: { focused: boolean, color: string, name: keyof typeof Ionicons.glyphMap, label: string }) => {
  return (
    <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
      {focused && (
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
          style={styles.liquidGlass}
        />
      )}
      
      <Ionicons
        name={name}
        size={24}
        color={focused ? '#FFF' : 'rgba(255,255,255,0.6)'}
        style={{ marginBottom: 2, zIndex: 2 }}
      />
      
      <Text 
        style={[
          styles.label, 
          { color: focused ? '#FFF' : 'rgba(255,255,255,0.6)' }
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {label}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 30,
          left: 20,
          right: 20,
          height: 80,
          borderRadius: 40,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 0,
        },
        tabBarBackground: () => (
          <View style={styles.tabBarBackgroundContainer}>
            <LinearGradient
                colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
                style={styles.tabBarBorder}
            >
                <BlurView intensity={40} tint="dark" style={styles.blurView}>
                    <LinearGradient
                        colors={['rgba(30, 30, 40, 0.85)', 'rgba(10, 10, 20, 0.95)']}
                        style={StyleSheet.absoluteFill}
                    />
                </BlurView>
            </LinearGradient>
          </View>
        ),
        tabBarItemStyle: {
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 0,
        }
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} color={color} name={focused ? 'home' : 'home-outline'} label="Home" />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Comunidade"
        options={{
          title: "Comunidade",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} color={color} name={focused ? 'people' : 'people-outline'} label="Comunidade" />
          ),
        }}
        listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault(); 
            },
        })}
      />
      
      <Tabs.Screen
        name="Criar"
        options={{
          title: "Criar",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} color={color} name={focused ? 'add-circle' : 'add-circle-outline'} label="Criar" />
          ),
        }}
        listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
            },
        })}
      />
      
      <Tabs.Screen
        name="Mais"
        options={{
          title: "Mais",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon focused={focused} color={color} name={focused ? 'grid' : 'grid-outline'} label="Mais" />
          ),
        }}
        listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
            },
        })}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarBackgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  tabBarBorder: {
    flex: 1,
    padding: 1.5,
    borderRadius: 40,
  },
  blurView: {
    flex: 1,
    borderRadius: 39,
    overflow: 'hidden',
  },

  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 60,
    borderRadius: 16,
    paddingTop: 25
  },
  activeIconContainer: {
  },

  liquidGlass: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    shadowColor: "#807DFE",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },

  label: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    zIndex: 3,
  },
});