import React from 'react';
import { Text, TextProps, StyleSheet, View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientTextProps extends TextProps {
  colors: readonly string[] | string[];
}

export function GradientText({ colors, style, ...rest }: GradientTextProps) {
  try {
    return (
      <MaskedView
        maskElement={<Text style={[style, { backgroundColor: 'transparent' }]} {...rest} />}
      >
        <LinearGradient
          // @ts-ignore
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Text style={[style, { opacity: 0 }]} {...rest} />
        </LinearGradient>
      </MaskedView>
    );
  } catch (e) {
    return <Text style={[style, { color: '#E0E4F5' }]} {...rest} />;
  }
}