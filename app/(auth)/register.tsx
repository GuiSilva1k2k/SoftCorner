import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

import { AuthInput } from '@/components/auth/AuthInput';
import { GradientButton } from '@/components/auth/GradientButton';
import { AuthColors } from '@/constants/auth-theme';
import { GradientText } from '@/components/ui/GradientText';

const { width, height } = Dimensions.get('window');

// Componente de Glow Radial Reutilizável (igual ao Login)
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

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 1. BACKGROUND GRADIENTE (Lilás -> Azul -> Preto) */}
      <LinearGradient
        colors={['#0F0A20', '#000820', '#000000']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* 2. LUZES RADIAIS DE FUNDO (Glows) */}
      
      {/* Topo: Luz Explosiva Lilás */}
      <GlowSpot size={width * 1.6} color="#9085FF" opacity={0.2} style={{ top: -height * 0.35, left: -width * 0.3 }} />
      
      {/* Canto Inferior Esquerdo: Luz Lilás */}
      <GlowSpot size={width * 1.2} color="#7A5FFE" opacity={0.15} style={{ bottom: -width * 0.5, left: -width * 0.5 }} />
      
      {/* Canto Inferior Direito: Luz Azulada */}
      <GlowSpot size={width * 1.2} color="#0044FF" opacity={0.15} style={{ bottom: -width * 0.5, right: -width * 0.5 }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Título com Gradiente Metálico (Cromado) */}
        <View style={{ marginBottom: 30, marginTop: 10 }}>
            <GradientText 
                colors={['#FFFFFF', '#D0D0D0', '#808080', '#FFFFFF']} 
                style={styles.title}
            >
                Crie sua conta
            </GradientText>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Endereço de E-mail</Text>
          <AuthInput 
            placeholder="simplificandopaginas@gmail.com" 
            iconName="mail-outline" 
            keyboardType="email-address" 
          />

          <Text style={styles.label}>Senha</Text>
          <AuthInput 
            placeholder="***************" 
            iconName="lock-closed-outline" 
            isPassword 
          />

          <Text style={styles.label}>Repita a sua senha</Text>
          <AuthInput 
            placeholder="***************" 
            iconName="lock-closed-outline" 
            isPassword 
          />

          <GradientButton 
            title="Criar conta" 
            onPress={() => router.replace('/(tabs)-GUI/Home')} 
            style={{ marginTop: 24 }} 
          />

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <View style={styles.orTextContainer}>
                <Text style={styles.dividerText}>ou</Text>
            </View>
            <View style={styles.line} />
          </View>

          {/* Botão Google (Lilás) */}
          <GradientButton 
            title="Continuar com Google" 
            variant="social-google" 
            icon={<Ionicons name="logo-google" size={18} color="#FFF"/>} 
          />
          
          {/* Botão Apple (Cinza/Preto) */}
          <GradientButton 
            title="Continuar com Apple" 
            variant="social-apple" 
            icon={<Ionicons name="logo-apple" size={18} color="#FFF"/>} 
          />
          
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AuthColors.background },
  header: { paddingTop: 60, paddingHorizontal: 24, paddingBottom: 10, zIndex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  
  title: { fontSize: 34, fontWeight: 'bold', lineHeight: 42 },
  
  form: { marginTop: 10 },
  label: { color: '#AAA', marginBottom: 8, fontSize: 13, marginLeft: 5 },
  
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 25, width: '100%', justifyContent: 'center' },
  orTextContainer: { paddingHorizontal: 10, minWidth: 40, alignItems: 'center' },
  dividerText: { color: '#888', fontSize: 14, fontWeight: '500' },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
});