import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Animated, Easing, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Defs, RadialGradient, Stop, Rect, Path, LinearGradient as SvgLinearGradient } from 'react-native-svg';

import { AuthInput } from '@/components/auth/AuthInput';
import { GradientButton } from '@/components/auth/GradientButton';
import { AuthColors } from '@/constants/auth-theme';
import { GradientText } from '@/components/ui/GradientText';

const { width, height } = Dimensions.get('window');

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

const CustomModalBackground = ({ width, height }: { width: number, height: number }) => {
  const cornerRadius = 40;
  const notchWidth = 120; 
  const notchDepth = 28; 
  const topWidth = width;
  
  const path = `
    M 0 ${cornerRadius}
    Q 0 0 ${cornerRadius} 0
    L ${(topWidth - notchWidth) / 2 - 30} 0
    C ${(topWidth - notchWidth) / 2} 0 ${(topWidth - notchWidth) / 2 + 10} ${notchDepth} ${(topWidth) / 2} ${notchDepth}
    C ${(topWidth + notchWidth) / 2 - 10} ${notchDepth} ${(topWidth + notchWidth) / 2} 0 ${(topWidth + notchWidth) / 2 + 30} 0
    L ${topWidth - cornerRadius} 0
    Q ${topWidth} 0 ${topWidth} ${cornerRadius}
    L ${topWidth} ${height}
    L 0 ${height}
    Z
  `;

  return (
    <View style={StyleSheet.absoluteFill}>
        <Svg width={width} height={height}>
            <Defs>
                <SvgLinearGradient id="modalBorderGrad" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor="#908DFF" stopOpacity="0.9" />
                    <Stop offset="0.5" stopColor="#5040AA" stopOpacity="0.5" />
                    <Stop offset="1" stopColor="#01033E" stopOpacity="1" />
                </SvgLinearGradient>
                
                <SvgLinearGradient id="modalFillGrad" x1="0.5" y1="0" x2="0.5" y2="1">
                    <Stop offset="0" stopColor="#0F0A20" stopOpacity="1" />
                    <Stop offset="0.5" stopColor="#000820" stopOpacity="1" />
                    <Stop offset="1" stopColor="#000000" stopOpacity="1" />
                </SvgLinearGradient>
            </Defs>
            
            <Path d={path} fill="url(#modalFillGrad)" stroke="url(#modalBorderGrad)" strokeWidth="1.5" />
        </Svg>
    </View>
  );
};

export default function LoginScreen() {
  const router = useRouter();
  const [modalStep, setModalStep] = useState(0); 
  const [rememberMe, setRememberMe] = useState(false);
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (modalStep > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(floatAnim, { toValue: -10, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
          Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true, easing: Easing.inOut(Easing.ease) })
        ])
      ).start();
    } else {
      floatAnim.setValue(0);
    }
  }, [modalStep]);

  const handleLogin = () => router.replace('/screens-gui/MoodScreen');

  const renderModalHeader = (title: string, onBack?: () => void) => (
    <View style={styles.modalHeaderRow}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} hitSlop={20} style={{ width: 30, alignItems: 'flex-start' }}>
          <Ionicons name="arrow-back" size={22} color="#AAA" />
        </TouchableOpacity>
      ) : <View style={{ width: 30 }} />}
      
      <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.modalTitleInline} numberOfLines={1} adjustsFontSizeToFit>{title}</Text>
      </View>
      
      <View style={{ width: 30 }} /> 
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F0A20', '#000820', '#000000']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <GlowSpot size={width * 1.6} color="#9085FF" opacity={0.2} style={{ top: -height * 0.35, left: -width * 0.3 }} />
      <GlowSpot size={width * 1.2} color="#7A5FFE" opacity={0.15} style={{ bottom: -width * 0.5, left: -width * 0.5 }} />
      <GlowSpot size={width * 1.2} color="#0044FF" opacity={0.15} style={{ bottom: -width * 0.5, right: -width * 0.5 }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={{ marginBottom: 15, marginTop: 5 }}>
            <GradientText 
                colors={['#FFFFFF', '#D0D0D0', '#808080', '#FFFFFF']} 
                style={styles.title}
            >
                Que bom que{'\n'}você voltou!
            </GradientText>
        </View>

        <Text style={styles.subtitle}>Insira as suas informações de Login para poder entrar na sua conta</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Endereço de E-mail</Text>
          <AuthInput placeholder="simplificandopaginas@gmail.com" iconName="mail-outline" />

          <Text style={styles.label}>Senha</Text>
          <AuthInput placeholder="***************" iconName="lock-closed-outline" isPassword />

          <View style={styles.rowBetween}>
            <TouchableOpacity 
                activeOpacity={0.6} 
                style={styles.row}
                onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && <Ionicons name="checkmark" size={12} color="#FFF" />}
              </View>
              <Text style={styles.smallText} numberOfLines={1}>Lembrar de mim</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalStep(1)}>
              <Text style={styles.forgotText}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>

          <GradientButton title="Login" onPress={handleLogin} style={{ marginTop: 24 }} />

          <View style={styles.dividerContainer}>
             <View style={styles.line} />
             <View style={styles.orTextContainer}>
                <Text style={styles.dividerText}>ou</Text>
             </View>
             <View style={styles.line} />
          </View>

          <GradientButton title="Continuar com Google" variant="social-google" icon={<Ionicons name="logo-google" size={18} color="#FFF"/>} />
          <GradientButton title="Continuar com Apple" variant="social-apple" icon={<Ionicons name="logo-apple" size={18} color="#FFF"/>} />
          
          <TouchableOpacity onPress={() => router.push('/(auth)/register')} style={{ paddingBottom: 20 }}>
             <Text style={styles.footerText}>Novo por aqui? <Text style={{fontWeight: 'bold', color: '#FFF'}}>Crie sua conta</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {modalStep > 0 && (
        <Modal transparent animationType="slide" visible={true}>
          <BlurView intensity={30} tint="dark" style={styles.modalOverlay}>
            
            <Animated.View style={{ 
                transform: [{ translateY: floatAnim }], 
                alignItems: 'center', 
                zIndex: 10,
                marginBottom: -28 
            }}>
              <TouchableOpacity style={styles.floatingClose} onPress={() => setModalStep(0)}>
                <LinearGradient
                    colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.03)']}
                    style={styles.closeBtnGradient}
                >
                    <Ionicons name="close" size={20} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.modalContainer}>
                <CustomModalBackground width={width} height={700} />
                
                <View style={styles.modalContent}>
                    {modalStep === 1 && (
                        <>
                        <View style={{alignItems: 'center', marginBottom: 10, width: '100%'}}>
                            <Text style={styles.modalBigTitle}>Esqueceu a senha?</Text>
                        </View>
                        <Text style={styles.modalSubtitle}>Não se preocupe! Acontece. Por favor, coloque o seu endereço de E-mail associado a sua conta.</Text>
                        <Text style={styles.label}>Endereço de E-mail</Text>
                        <AuthInput placeholder="simplificandopaginas@gmail.com" iconName="mail-outline" />
                        <GradientButton title="Enviar código" onPress={() => setModalStep(2)} />
                        </>
                    )}

                    {modalStep === 2 && (
                        <>
                        {renderModalHeader("Confirmar código", () => setModalStep(1))}
                        
                        <View style={styles.otpContainer}>
                            {[1, 7, 6, 2, 4, 9].map((num, i) => (
                            <LinearGradient
                                key={i}
                                colors={i===0 ? ['rgba(128, 125, 254, 0.2)', 'rgba(128, 125, 254, 0.05)'] : ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
                                style={[styles.otpBox, i===0 && styles.otpBoxActive]}
                            >
                                <View style={styles.glassShine} />
                                <Text style={styles.otpText}>{i === 0 ? '6' : ''}</Text>
                            </LinearGradient>
                            ))}
                        </View>
                        
                        <Text style={styles.modalSubtitle}>Um código de 6 dígitos foi enviado para email@gmail.com</Text>
                        <GradientButton title="Verificar" onPress={() => setModalStep(3)} />
                        <Text style={styles.timerText}>Reenviar código (00:49)</Text>
                        </>
                    )}

                    {modalStep === 3 && (
                        <>
                        <View style={{ width: '100%', marginBottom: 10 }}>
                            <GradientText colors={AuthColors.gradientSilver} style={styles.modalBigTitle}>
                                Recuperar senha
                            </GradientText>
                        </View>
                        <Text style={[styles.modalSubtitle, { textAlign: 'left', marginTop: -5 }]}>Crie sua nova senha, não podendo utilizar versões anteriores</Text>
                        <Text style={styles.label}>Senha</Text>
                        <AuthInput placeholder="Sua nova senha" iconName="lock-closed-outline" isPassword />
                        <Text style={styles.label}>Repita</Text>
                        <AuthInput placeholder="Repita sua nova senha" iconName="lock-closed-outline" isPassword />
                        <GradientButton title="Criar nova senha" onPress={() => setModalStep(4)} />
                        </>
                    )}

                    {modalStep === 4 && (
                        <View style={{alignItems: 'center', paddingVertical: 20}}>
                        <View style={styles.successIconWrapper}>
                            <GlowSpot size={120} color="#807DFE" opacity={0.6} style={{ top: -10, left: -10 }} />
                            <View style={styles.successCircle}>
                                <Ionicons name="checkmark" size={32} color="#FFF" />
                            </View>
                        </View>
                        <Text style={styles.successTitle}>Recuperada com Sucesso!</Text>
                        <Text style={styles.successSubtitle}>Isso aí! Sua conta foi verificada com sucesso!</Text>
                        <GradientButton title="Realizar Login" onPress={() => setModalStep(0)} style={{marginTop: 30}} />
                        </View>
                    )}
                </View>
            </View>
          </BlurView>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AuthColors.background },
  header: { paddingTop: 60, paddingHorizontal: 24, zIndex: 1 },
  scrollContent: { padding: 24, paddingTop: 10 },
  
  title: { fontSize: 34, fontWeight: 'bold', lineHeight: 38 }, 
  subtitle: { fontSize: 14, color: '#AAA', marginBottom: 30, marginTop: 10 },
  form: { marginTop: 10 },
  label: { color: '#AAA', marginBottom: 8, fontSize: 12, marginLeft: 5 },
  
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingRight: 10 },
  checkbox: { 
    width: 20, height: 20, borderRadius: 6, 
    borderWidth: 1.5, borderColor: '#666', 
    marginRight: 8, backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center', alignItems: 'center'
  },
  checkboxChecked: { borderColor: '#807DFE', backgroundColor: '#807DFE' },
  smallText: { color: '#999', fontSize: 13 },
  forgotText: { color: '#BBB', fontSize: 13, textDecorationLine: 'underline', paddingVertical: 8 },
  
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 25, width: '100%', justifyContent: 'center' },
  orTextContainer: { paddingHorizontal: 10, minWidth: 40, alignItems: 'center' },
  dividerText: { color: '#888', fontSize: 14, fontWeight: '500' },
  line: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  
  footerText: { textAlign: 'center', color: '#666', marginTop: 20, fontSize: 13 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: width, minHeight: 550 },
  modalContent: { padding: 30, paddingTop: 60, paddingBottom: 50 },
  
  floatingClose: { 
    width: 44, height: 44, borderRadius: 22, 
    overflow: 'hidden',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: "#807DFE", shadowOpacity: 0.6, shadowRadius: 12, elevation: 10
  },
  closeBtnGradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25, width: '100%' },
  modalTitleInline: { color: '#FFF', fontSize: 18, fontWeight: '600', textAlign: 'center' },
  modalBigTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFF', marginBottom: 10, textAlign: 'center' },
  modalSubtitle: { fontSize: 14, color: '#AAA', textAlign: 'center', marginBottom: 25, lineHeight: 22 },
  
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30, gap: 8 },
  otpBox: { 
    flex: 1, aspectRatio: 0.75, borderRadius: 16, 
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', 
    justifyContent: 'center', alignItems: 'center',
    overflow: 'hidden'
  },
  otpBoxActive: { borderColor: '#807DFE' },
  otpText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  glassShine: { position: 'absolute', top: 0, left: 0, right: 0, height: '40%', backgroundColor: 'rgba(255,255,255,0.05)', borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  timerText: { textAlign: 'center', color: '#666', marginTop: 15, fontSize: 13 },

  successIconWrapper: { width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  successCircle: {
    width: 70, height: 70, borderRadius: 35,
    borderWidth: 1.5, borderColor: '#FFF',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: "#FFF", shadowOpacity: 0.8, shadowRadius: 15
  },
  successTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 8, textAlign: 'center', width: '100%' },
  successSubtitle: { fontSize: 14, color: '#AAA', textAlign: 'center', maxWidth: 250 },
});