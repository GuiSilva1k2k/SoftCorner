import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { useRouter } from 'expo-router';

import { AuthColors } from '@/constants/auth-theme';
import { GradientText } from '@/components/ui/GradientText';

const { width, height } = Dimensions.get('window');

const MESSAGES_DATA = [
  {
    id: '1',
    text: 'Tu viu hoje quem me deu seta no sinal? kkkkkkkkk',
    time: '14:35h',
    senderId: 'u2',
    senderName: 'Nicolas Cage',
    avatar: require('@/assets/assets_gui/icons/cicleProfile.png'),
  },
  {
    id: '2',
    text: 'Quem foi?? Faço nem ideia',
    time: '14:35h',
    senderId: 'me',
    senderName: 'Eu',
    avatar: require('@/assets/assets_gui/icons/cicleProfile.png'),
  },
  {
    id: '3',
    text: 'Jettagarage92 😂😂',
    time: '14:36h',
    senderId: 'u2',
    senderName: 'Nicolas Cage',
    avatar: require('@/assets/assets_gui/icons/cicleProfile.png'),
  },
  {
    id: '4',
    text: 'Oloko o doidão ?',
    time: '14:35h',
    senderId: 'me',
    senderName: 'Eu',
    avatar: require('@/assets/assets_gui/icons/cicleProfile.png'),
  },
  {
    id: '5',
    text: '', 
    image: require('@/assets/assets_gui/icons/cicleProfile.png'),
    isSticker: true,
    time: '',
    senderId: 'me',
    avatar: require('@/assets/assets_gui/icons/cicleProfile.png'),
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

const MessageBubble = ({ item }: { item: any }) => {
    const isMe = item.senderId === 'me';

    return (
        <View style={[styles.messageRow, isMe ? styles.messageRowRight : styles.messageRowLeft]}>
            {!isMe && <Image source={item.avatar} style={styles.msgAvatar} />}
            
            <View style={[styles.bubbleContainer, isMe ? styles.bubbleRight : styles.bubbleLeft]}>
                <LinearGradient
                    colors={isMe 
                        ? ['rgba(60, 40, 120, 0.6)', 'rgba(30, 20, 60, 0.4)']
                        : ['rgba(40, 40, 60, 0.6)', 'rgba(20, 20, 30, 0.4)']
                    }
                    style={[styles.bubbleGradient, isMe ? styles.bubbleGradientRight : styles.bubbleGradientLeft]}
                >
                    <View style={[styles.bubbleBorder, { borderColor: isMe ? 'rgba(128,100,255,0.2)' : 'rgba(255,255,255,0.1)' }]} />
                    
                    {item.isSticker ? (
                        <Image source={item.image} style={styles.stickerImage} />
                    ) : (
                        <Text style={styles.messageText}>{item.text}</Text>
                    )}
                </LinearGradient>
            </View>

            {isMe && <Image source={item.avatar} style={styles.msgAvatar} />}

            {item.time ? (
                <Text style={[styles.timeText, isMe ? { right: 50, bottom: -15 } : { left: 50, bottom: -15 }]}>
                    {item.time}
                </Text>
            ) : null}
        </View>
    );
};

export default function ChatCicleScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F0A20', '#080825', '#000000']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <GlowSpot size={width * 1.2} color="#5040AA" opacity={0.15} style={{ top: height * 0.2, right: -width * 0.4 }} />
      <GlowSpot size={width} color="#0033FF" opacity={0.1} style={{ bottom: 100, left: -width * 0.3 }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
            <GradientText colors={['#FFF', '#D0D0FF', '#FFF']} style={styles.headerTitle}>
                Manco's Club
            </GradientText>
            <View style={styles.headerAvatars}>
                <Image source={require('@/assets/assets_gui/icons/cicleProfile.png')} style={[styles.headerAvatarSmall, { zIndex: 2 }]} />
                <Image source={require('@/assets/assets_gui/icons/cicleProfile.png')} style={[styles.headerAvatarSmall, { marginLeft: -8, zIndex: 1 }]} />
            </View>
        </View>

        <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerIconBtn}>
                <Ionicons name="videocam-outline" size={26} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn}>
                <Ionicons name="call-outline" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.dateSeparator}>Hoje</Text>

      <FlatList
        data={MESSAGES_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <View style={styles.inputBarContainer}>
            <TouchableOpacity style={styles.cameraButton}>
                <LinearGradient
                    colors={['#3E2D60', '#2A1F45']}
                    style={styles.cameraGradient}
                >
                    <Ionicons name="camera" size={20} color="#FFF" />
                </LinearGradient>
            </TouchableOpacity>
            <View style={styles.textInputWrapper}>
                <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                <LinearGradient
                    colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
                    style={styles.textInputGradient}
                />
                <TextInput 
                    placeholder="Mensagem..." 
                    placeholderTextColor="#888" 
                    style={styles.textInput}
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity style={styles.micButton}>
                    <Ionicons name="mic-outline" size={20} color="#AAA" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="file-tray-full-outline" size={24} color="#888" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="add-circle-outline" size={28} color="#888" />
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

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
    paddingHorizontal: 20,
    paddingBottom: 15,
    zIndex: 10,
  },
  headerBtn: { padding: 5 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerAvatars: { flexDirection: 'row' },
  headerAvatarSmall: { width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, borderColor: '#0F0A20' },
  headerActions: { flexDirection: 'row', gap: 15 },
  headerIconBtn: { padding: 5 },

  dateSeparator: {
      textAlign: 'center', color: '#666', fontSize: 12, marginVertical: 10,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  messageRow: {
      flexDirection: 'row', alignItems: 'flex-end', marginBottom: 25,
      position: 'relative',
  },
  messageRowLeft: { justifyContent: 'flex-start' },
  messageRowRight: { justifyContent: 'flex-end' },
  
  msgAvatar: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  
  bubbleContainer: {
      maxWidth: '75%',
      marginHorizontal: 10,
      borderRadius: 20,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4,
  },
  bubbleLeft: { borderBottomLeftRadius: 4 },
  bubbleRight: { borderBottomRightRadius: 4 },
  
  bubbleGradient: { padding: 12, borderRadius: 20 },
  bubbleGradientLeft: { borderBottomLeftRadius: 4 },
  bubbleGradientRight: { borderBottomRightRadius: 4 },
  
  bubbleBorder: {
      ...StyleSheet.absoluteFillObject,
      borderWidth: 1, borderRadius: 20,
      opacity: 0.5,
  },
  
  messageText: { color: '#E0E0E0', fontSize: 14, lineHeight: 20 },
  timeText: { 
      position: 'absolute', 
      color: '#666', fontSize: 10, 
  },
  
  stickerImage: { width: 40, height: 40, borderRadius: 20 },

  inputBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      paddingBottom: 30,
      backgroundColor: 'rgba(10, 10, 25, 0.9)',
      borderTopWidth: 1,
      borderTopColor: 'rgba(255,255,255,0.05)',
  },
  cameraButton: {
      width: 40, height: 40, borderRadius: 20,
      overflow: 'hidden', marginRight: 10,
      justifyContent: 'center', alignItems: 'center',
  },
  cameraGradient: {
      width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
      borderWidth: 1, borderColor: 'rgba(128, 100, 255, 0.3)', borderRadius: 20
  },
  
  textInputWrapper: {
      flex: 1,
      height: 40,
      borderRadius: 20,
      overflow: 'hidden',
      flexDirection: 'row', alignItems: 'center',
      marginRight: 10,
      position: 'relative',
  },
  textInputGradient: { ...StyleSheet.absoluteFillObject },
  textInput: {
      flex: 1, color: '#FFF', paddingHorizontal: 15, fontSize: 14,
  },
  micButton: { padding: 8, paddingRight: 12 },
  
  actionButton: {
      padding: 5, marginLeft: 5,
  }
});