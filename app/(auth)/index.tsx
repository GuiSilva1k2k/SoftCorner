import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '@/components/auth/GradientButton';
import { AuthColors } from '@/constants/auth-theme';
import { Ionicons } from '@expo/vector-icons';
import { GradientText } from '@/components/ui/GradientText';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/assets_gui/icons/background.png')} 
        style={styles.backgroundImage} 
        resizeMode="cover"
      />
      
      <LinearGradient
        colors={['transparent', '#040813']}
        style={StyleSheet.absoluteFill}
        locations={[0.4, 0.95]}
      />

      <View style={styles.content}>
        
        <View style={styles.headerContainer}>
            <View style={styles.logoWrapper}>
                <Image 
                    source={require('@/assets/assets_gui/icons/Logo.png')} 
                    style={styles.logo} 
                    resizeMode="contain"
                />
            </View>

            <View style={styles.titleWrapper}>
                <GradientText colors={AuthColors.gradientSilver} style={styles.title}>
                    O futuro <Text style={styles.thinText}>do</Text>
                </GradientText>
                
                <GradientText 
                    colors={['#D4D6E2', '#B28DFF', '#D4D6E2']} 
                    style={[styles.title, styles.italicText]}
                >
                    autoconhecimento
                </GradientText>

                <GradientText colors={AuthColors.gradientSilver} style={styles.title}>
                    começa aqui.
                </GradientText>
            </View>

            <Text style={styles.subtitle} numberOfLines={1} adjustsFontSizeToFit>
                Para mentes que pensam diferente
            </Text>
        </View>

        <View style={styles.buttonGroup}>
          <GradientButton 
            title="Continuar com Google"
            variant="social-google"
            icon={<Ionicons name="logo-google" size={20} color="#FFF" />}
            onPress={() => router.push('/(auth)')} 
            style={{ marginBottom: 12 }}
          />
          
          <GradientButton 
            title="Entrar na minha conta" 
            variant="ghost"
            onPress={() => router.push('/(auth)/login')}
          />
          
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/register')} 
            style={styles.footerTouchable}
            activeOpacity={0.7}
          >
            <Text style={styles.footerText}>
                Novo por aqui? <Text style={styles.createAccount}>Crie sua conta</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: AuthColors.background 
  },
  backgroundImage: { 
    position: 'absolute', 
    width: width, 
    height: height 
  },
  content: { 
    flex: 1, 
    justifyContent: 'flex-end', 
    padding: 24, 
    paddingBottom: height * 0.05 
  },
  headerContainer: {
    marginBottom: height * 0.05,
    alignItems: 'flex-start',
    width: '100%',
  },
  logoWrapper: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'flex-start',
  },
  logo: { 
    width: 150, 
    height: 55,
    marginLeft: -5 
  }, 
  titleWrapper: {
    marginBottom: 10,
    width: '100%',
  },
  title: { 
    fontSize: width * 0.09, 
    fontWeight: 'bold', 
    lineHeight: width * 0.11,
    textAlign: 'left',
  },
  thinText: { 
    fontWeight: '300' 
  },
  italicText: { 
    fontStyle: 'italic', 
    fontWeight: '400',
  }, 
  subtitle: { 
    color: '#888', 
    fontSize: 15, 
    marginTop: 5,
    textAlign: 'left',
    width: '100%',
  },
  buttonGroup: { 
    width: '100%' 
  },
  footerTouchable: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 5,
  },
  footerText: { 
    color: '#666',
    textAlign: 'center', 
    fontSize: 13 
  }, 
  createAccount: { 
    fontWeight: 'bold', 
    color: '#CCC'
  },
});