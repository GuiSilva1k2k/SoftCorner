import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_SIZE = 120;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

type EmojiItem = {
  id?: string;
  src?: ImageSourcePropType;
  label?: string;
};

const EMOJIS: EmojiItem[] = [
  { id: 'spacer-left' },
  {
    src: require('@/assets/assets_gui/icons/expressionless-face.png'),
    label: 'Neutro',
  },
  {
    src: require('@/assets/assets_gui/icons/pensive-face.png'),
    label: 'Pensativo',
  },
  {
    src: require('@/assets/assets_gui/icons/star-struck.png'),
    label: 'Muito Feliz',
  },
  {
    src: require('@/assets/assets_gui/icons/smiling-face-with-sunglasses.png'),
    label: 'Confiante',
  },
  {
    src: require('@/assets/assets_gui/icons/thinking.png'),
    label: 'Reflexivo',
  },
  { id: 'spacer-right' },
];

export default function EmojiSelector() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedIndex, setSelectedIndex] = useState(2);

  const selectedEmoji = EMOJIS[selectedIndex + 1];

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={EMOJIS}
        keyExtractor={(item, index) => item.id ?? String(index)}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{ alignItems: 'center' }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(ev) => {
          const index = Math.round(ev.nativeEvent.contentOffset.x / ITEM_SIZE);
          setSelectedIndex(index);
        }}
        renderItem={({ item, index }) => {
          if (!item.src) return <View style={{ width: SPACER_ITEM_SIZE }} />;

          // Calcula a posição horizontal relativa do emoji
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          // Mantém a escala dinâmica no centro
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1.2, 0.7],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          // 🎯 Curva real — os emojis seguem uma forma de arco
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [50, -35, 50],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={{
                width: ITEM_SIZE,
                alignItems: 'center',
                transform: [{ scale }, { translateY }],
                opacity,
              }}
            >
              <Animated.Image
                source={item.src}
                style={styles.emojiImage}
                resizeMode="contain"
              />
            </Animated.View>
          );
        }}
      />

      {selectedEmoji?.label && (
        <Animated.View style={styles.labelContainer}>
          <Text style={styles.labelText}>{selectedEmoji.label}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    maxHeight: 450,
    marginBottom: 40
  },
  emojiImage: {
    width: 110,
    height: 110
  },
  labelContainer: {
    marginTop: -170,
    marginBottom: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 120,
    alignItems: 'center',
  },
  labelText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
