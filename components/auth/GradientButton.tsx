import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, View, StyleProp, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthColors } from '@/constants/auth-theme';

interface GradientButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'social-google' | 'social-apple' | 'ghost';
  icon?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
}

export function GradientButton({ title, variant = 'primary', icon, style, textStyle, ...rest }: GradientButtonProps) {
  let colors: string[] = ['#2E2E3A', '#1C1C26'];
  let textColor = '#FFF';
  let borderColor = 'rgba(255,255,255,0.1)';

  if (variant === 'social-google') {
    colors = [...AuthColors.gradientLilacBtn]; 
  } else if (variant === 'social-apple') {
    colors = [...AuthColors.gradientGrayBtn];
  } else if (variant === 'ghost') {
    colors = ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)'];
    textColor = '#AAA';
    borderColor = 'rgba(255,255,255,0.05)';
  } else if (variant === 'primary') {
    colors = ['#1F1F2E', '#0F0F1A'];
    borderColor = 'rgba(128, 125, 254, 0.15)'; 
  }

  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.container, style]} {...rest}>
      <LinearGradient
        // @ts-ignore
        colors={colors}
        style={[styles.gradient, { borderColor }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.15)', 'transparent']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.5 }}
          style={styles.liquidShine}
        />

        {icon && <View style={styles.iconContainer}>{icon}</View>}
        
        <View style={styles.textWrapper}>
            <Text 
                style={[styles.text, { color: textColor }, textStyle]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.85}
            >
                {title}
            </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  gradient: {
    flex: 1,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  liquidShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
});