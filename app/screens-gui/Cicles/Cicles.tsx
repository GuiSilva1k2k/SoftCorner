import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { useRouter } from 'expo-router';

import { AuthColors } from '@/constants/auth-theme';
import { GradientText } from '@/components/ui/GradientText';

const { width, height } = Dimensions.get('window');

const CYCLES_DATA = [
  {
    id: '1',
    name: 'Família',
    membersCount: 4,
    notificationCount: 5,
    membersAvatars: [
      require('@/assets/assets_gui/icons/cicleProfile.png'),
      require('@/assets/assets_gui/icons/cicleProfile.png'),
      require('@/assets/assets_gui/icons/cicleProfile.png'),
      require('@/assets/assets_gui/icons/cicleProfile.png'),
    ],
  },
  {
    id: '2',
    name: 'Exotic Cars',
    membersCount: 2,
    membersAvatars: [
      require('@/assets/assets_gui/icons/cicleProfile.png'),
      require('@/assets/assets_gui/icons/cicleProfile.png'),
    ],
  },
];

const GlowSpot = ({ size, color, opacity, style }: { size: number, color: string, opacity: number, style?: any }) => (
    <View style={[{ position: 'absolute', width: size, height: size }, style]} pointerEvents="none">
        <Svg height="100%" width="100%">
            <Defs>
                <RadialGradient id={`glow-${color}`} cx="50%" cy="50%" rx="50%" ry="50%">
                    <Stop offset="0" stopColor={color} stopOpacity={opacity} />
                    <Stop offset="1" stopColor="transparent" stopOpacity="0" />
                </RadialGradient>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill={`url(#glow-${color})`} />
        </Svg>
    </View>
);

const CycleCard = ({ item, onPress }: { item: any, onPress: () => void }) => {
    const cardSize = width * 0.42; 

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.cardWrapper, { width: cardSize }]}>
            <View style={[styles.circleContainer, { width: cardSize, height: cardSize }]}>
                <GlowSpot size={cardSize * 1.2} color="#6050C0" opacity={0.4} style={{ top: -10, left: -10 }} />

                <LinearGradient
                    colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)']}
                    style={styles.circleBorder}
                >
                    <BlurView intensity={40} tint="dark" style={styles.circleBlur}>
                        <LinearGradient
                            colors={['rgba(80, 60, 180, 0.3)', 'rgba(10, 10, 25, 0.6)']}
                            style={StyleSheet.absoluteFill}
                        />
                        
                        <View style={styles.avatarsGrid}>
                            <View style={styles.avatarsRow}>
                                {item.membersAvatars.slice(0, 2).map((avatar: any, index: number) => (
                                    <Image key={`top-${index}`} source={avatar} style={styles.avatar} />
                                ))}
                            </View>
                            {item.membersAvatars.length > 2 && (
                                <View style={styles.avatarsRow}>
                                    {item.membersAvatars.slice(2, 4).map((avatar: any, index: number) => (
                                        <Image key={`bottom-${index}`} source={avatar} style={styles.avatar} />
                                    ))}
                                </View>
                            )}
                        </View>
                    </BlurView>
                </LinearGradient>

                {item.notificationCount > 0 && (
                    <View style={styles.notificationBadge}>
                        <LinearGradient
                            colors={['#B25AFF', '#7A30C0']}
                            style={styles.notificationGradient}
                        >
                            <Text style={styles.notificationText}>+{item.notificationCount}</Text>
                        </LinearGradient>
                    </View>
                )}
            </View>

            <Text style={styles.cycleName}>{item.name}</Text>
            <Text style={styles.cycleMembers}>{item.membersCount} pessoas</Text>
        </TouchableOpacity>
    );
};

const NewCycleCard = ({ onPress }: { onPress: () => void }) => {
    const cardSize = width * 0.42;

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.cardWrapper, { width: cardSize }]}>
            <View style={[styles.circleContainer, { width: cardSize, height: cardSize }]}>
                <LinearGradient
                    colors={['rgba(128, 125, 254, 0.3)', 'rgba(128, 125, 254, 0.05)']}
                    style={styles.newCycleBorder}
                >
                    <View style={styles.newCycleInner}>
                        <Ionicons name="people-outline" size={32} color="#AAA" style={{ marginBottom: 5 }} />
                        <Text style={styles.newCycleText}>Novo Ciclo</Text>
                    </View>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    );
};

export default function CyclesScreen() {
  const router = useRouter();
  const dataWithNewButton = [...CYCLES_DATA, { id: 'new_cycle_action' }];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F0A20', '#000820', '#000000']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <GlowSpot size={width * 1.5} color="#9085FF" opacity={0.15} style={{ top: -height * 0.3, left: -width * 0.25 }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        
        <TouchableOpacity>
            <Ionicons name="create-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <GradientText colors={AuthColors.gradientSilver} style={styles.pageTitle}>
            Seus Ciclos
        </GradientText>
      </View>

      <FlatList
        data={dataWithNewButton}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
            if (item.id === 'new_cycle_action') {
                return <NewCycleCard onPress={() => router.push('/screens-gui/Cicles/CreateCicle')} />;
            }
            return <CycleCard item={item} onPress={() => router.push('/screens-gui/Cicles/ChatCicle')} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AuthColors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  titleContainer: {
      paddingHorizontal: 24,
      marginBottom: 30,
  },
  pageTitle: {
      fontSize: 28,
      fontWeight: 'bold',
  },
  listContent: {
      paddingHorizontal: 24,
      paddingBottom: 100,
  },
  columnWrapper: {
      justifyContent: 'space-between',
      marginBottom: 30,
  },
  
  cardWrapper: {
      alignItems: 'center',
  },
  
  circleContainer: {
      borderRadius: 999,
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
  },
  circleBorder: {
      flex: 1,
      borderRadius: 999,
      padding: 1.5,
  },
  circleBlur: {
      flex: 1,
      borderRadius: 999,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
  },
  avatarsGrid: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  avatarsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
  },
  avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      margin: 2,
      borderWidth: 1.5,
      borderColor: '#2A2A40',
      backgroundColor: '#333',
  },
  
  notificationBadge: {
      position: 'absolute',
      top: 0,
      right: 0,
      borderRadius: 15,
      overflow: 'hidden',
      elevation: 6,
      shadowColor: "#B25AFF",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
  },
  notificationGradient: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      justifyContent: 'center',
      alignItems: 'center',
  },
  notificationText: {
      color: '#FFF',
      fontSize: 12,
      fontWeight: 'bold',
  },

  cycleName: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 5,
  },
  cycleMembers: {
      color: '#888',
      fontSize: 12,
      textAlign: 'center',
  },

  newCycleBorder: {
      flex: 1,
      borderRadius: 999,
      padding: 1.5,
      opacity: 0.7,
  },
  newCycleInner: {
      flex: 1,
      borderRadius: 999,
      backgroundColor: 'rgba(20, 20, 40, 0.4)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'rgba(128, 125, 254, 0.3)',
      borderStyle: 'dashed',
  },
  newCycleText: {
      color: '#AAA',
      fontSize: 14,
      fontWeight: '500',
  },
});