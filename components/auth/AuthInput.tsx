import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthColors } from '@/constants/auth-theme';
import { LinearGradient } from 'expo-linear-gradient';

interface AuthInputProps extends TextInputProps {
  iconName?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
}

export function AuthInput({ iconName, isPassword, style, ...rest }: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.07)', 'rgba(10, 10, 20, 0.4)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientContainer}
    >
      <View style={styles.innerContainer}>
        {iconName && <Ionicons name={iconName} size={20} color="#888" style={styles.icon} />}
        <TextInput
          placeholderTextColor="#666"
          style={[styles.input, style]}
          secureTextEntry={isPassword && !showPassword}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 18,
    padding: 1,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)', 
    shadowColor: "#807DFE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  icon: { marginRight: 12 },
  input: {
    flex: 1,
    color: AuthColors.text,
    fontSize: 15,
    height: '100%',
  },
});