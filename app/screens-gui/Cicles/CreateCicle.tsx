import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { useRouter } from 'expo-router';

import { AuthColors } from '@/constants/auth-theme';
import { GradientText } from '@/components/ui/GradientText';
import { GradientButton } from '@/components/auth/GradientButton';
import { AuthInput } from '@/components/auth/AuthInput';

const { width, height } = Dimensions.get('window');

const USERS_TO_INVITE = [
  { id: 'u1', name: 'Ana Silva', username: '@ana.silva', avatar: require('@/assets/assets_gui/icons/cicleProfile.png'), invited: false },
  { id: 'u2', name: 'Carlos Mendes', username: '@carlosm', avatar: require('@/assets/assets_gui/icons/cicleProfile.png'), invited: true },
  { id: 'u3', name: 'Beatriz Costa', username: '@bia.costa', avatar: require('@/assets/assets_gui/icons/cicleProfile.png'), invited: false },
  { id: 'u4', name: 'João Pedro', username: '@joao.p', avatar: require('@/assets/assets_gui/icons/cicleProfile.png'), invited: false },
  { id: 'u5', name: 'Mariana Lima', username: '@mari.lima', avatar: require('@/assets/assets_gui/icons/cicleProfile.png'), invited: true },
  { id: 'u6', name: 'Rafael Souza', username: '@rafa.s', avatar: require('@/assets/assets_gui/icons/cicleProfile.png'), invited: false },
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

const UserInviteItem = ({ item, onInviteToggle }: { item: any, onInviteToggle: (id: string) => void }) => (
    <View style={styles.userItemContainer}>
        <LinearGradient
            colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
            style={styles.userItemBorder}
        >
            <View style={styles.userItemContent}>
                <Image source={item.avatar} style={styles.userAvatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.userName} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.userUsername} numberOfLines={1}>{item.username}</Text>
                </View>
                <TouchableOpacity 
                    activeOpacity={0.7}
                    style={[styles.inviteButton, item.invited && styles.invitedButton]} 
                    onPress={() => onInviteToggle(item.id)}
                >
                    <Text style={[styles.inviteButtonText, item.invited && styles.invitedButtonText]}>
                        {item.invited ? 'Convidado' : 'Convidar'}
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    </View>
);

export default function CreateCicleScreen() {
  const router = useRouter();
  const [cycleName, setCycleName] = useState('');
  const [users, setUsers] = useState(USERS_TO_INVITE);

  const handleInviteToggle = (id: string) => {
      setUsers(currentUsers => 
          currentUsers.map(user => 
              user.id === id ? { ...user, invited: !user.invited } : user
          )
      );
  };

  const invitedUsers = users.filter(u => u.invited);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F0A20', '#000820', '#000000']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <GlowSpot size={width * 1.2} color="#9085FF" opacity={0.15} style={{ top: -height * 0.2, left: -width * 0.1 }} />
      <GlowSpot size={width} color="#7A5FFE" opacity={0.1} style={{ bottom: -width * 0.2, right: -width * 0.2 }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Ciclo</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.previewSection}>
            <View style={styles.cyclePreviewContainer}>
                <GlowSpot size={160} color="#807DFE" opacity={0.4} style={{ top: -10 }} />
                
                <LinearGradient
                    colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
                    style={styles.previewBorder}
                >
                    <BlurView intensity={30} tint="dark" style={styles.previewBlur}>
                        <LinearGradient
                            colors={['rgba(128, 125, 254, 0.15)', 'rgba(0, 0, 0, 0.3)']}
                            style={StyleSheet.absoluteFill}
                        />
                        <View style={styles.avatarsPreview}>
                            {invitedUsers.length > 0 ? (
                                invitedUsers.slice(0, 3).map((user, index) => (
                                    <Image 
                                        key={user.id} 
                                        source={user.avatar} 
                                        style={[styles.previewAvatar, { marginLeft: index > 0 ? -12 : 0, zIndex: 3 - index }]} 
                                    />
                                ))
                            ) : (
                                <Ionicons name="people-outline" size={32} color="rgba(255,255,255,0.3)" />
                            )}
                            {invitedUsers.length > 3 && (
                                <View style={[styles.previewAvatar, styles.previewMore, { marginLeft: -12, zIndex: 0 }]}>
                                    <Text style={styles.previewMoreText}>+{invitedUsers.length - 3}</Text>
                                </View>
                            )}
                        </View>
                        <Text style={styles.previewCount}>
                            {invitedUsers.length} {invitedUsers.length === 1 ? 'membro' : 'membros'}
                        </Text>
                    </BlurView>
                </LinearGradient>
            </View>
        </View>

        <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome do Ciclo</Text>
            <AuthInput 
                placeholder="Ex: Investimentos & Finanças" 
                iconName="pricetag-outline" 
                value={cycleName}
                onChangeText={setCycleName}
            />
        </View>
        
        <Text style={styles.sectionTitle}>Convidar Amigos</Text>
        
        <View style={styles.usersList}>
            {users.map(user => (
                <UserInviteItem key={user.id} item={user} onInviteToggle={handleInviteToggle} />
            ))}
        </View>

      </ScrollView>
      
      <LinearGradient
        colors={['transparent', 'rgba(15, 10, 32, 0.9)', '#0F0A20']}
        style={styles.footerGradient}
        pointerEvents="box-none"
      >
          <View style={styles.footerContent}>
            <GradientButton 
                title={cycleName ? `Criar Ciclo (${invitedUsers.length})` : "Criar Ciclo"}
                onPress={() => {
                    console.log('Criando:', cycleName);
                    router.back();
                }} 
                disabled={!cycleName}
                style={{ opacity: !cycleName ? 0.6 : 1, marginBottom: 0 }}
            />
          </View>
      </LinearGradient>

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
    paddingHorizontal: 10,
    paddingBottom: 15,
    zIndex: 10,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  
  scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 120, 
  },

  previewSection: {
      alignItems: 'center',
      marginBottom: 30,
  },
  cyclePreviewContainer: {
      alignItems: 'center',
      position: 'relative',
      justifyContent: 'center',
  },
  previewBorder: {
      width: 130, height: 130, borderRadius: 65, padding: 1.5,
  },
  previewBlur: {
      flex: 1, borderRadius: 64, overflow: 'hidden', 
      justifyContent: 'center', alignItems: 'center',
  },
  avatarsPreview: {
      flexDirection: 'row', marginBottom: 8, alignItems: 'center', justifyContent: 'center'
  },
  previewAvatar: {
      width: 36, height: 36, borderRadius: 18, borderWidth: 1.5, borderColor: '#1A1A2E',
  },
  previewMore: {
      backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', borderColor: '#1A1A2E',
  },
  previewMoreText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  previewCount: { color: '#AAA', fontSize: 12, marginTop: 4 },
  inputContainer: { marginBottom: 25 },
  label: { color: '#AAA', marginBottom: 8, fontSize: 14, marginLeft: 5 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  usersList: { gap: 12 },
  userItemContainer: {
      borderRadius: 16, 
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4,
  },
  userItemBorder: { borderRadius: 16, padding: 1 },
  userItemContent: { 
      flexDirection: 'row', alignItems: 'center', padding: 12,
      backgroundColor: 'rgba(20, 20, 35, 0.6)', // Fundo semi-transparente
      borderRadius: 15,
  },
  userAvatar: { width: 42, height: 42, borderRadius: 21, marginRight: 12 },
  userInfo: { flex: 1, paddingRight: 10 },
  userName: { color: '#FFF', fontSize: 15, fontWeight: '600', marginBottom: 2 },
  userUsername: { color: '#888', fontSize: 13 },
  inviteButton: {
      paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, 
      backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
  },
  invitedButton: {
      backgroundColor: '#807DFE', borderColor: '#807DFE',
  },
  inviteButtonText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  invitedButtonText: { color: '#FFF' },
  footerGradient: {
      position: 'absolute', bottom: 0, left: 0, right: 0,
      paddingTop: 40, paddingBottom: 30, paddingHorizontal: 20,
  },
  footerContent: {
      width: '100%',
  }
});