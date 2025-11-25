import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';

// Pega as dimensões da tela
const { width, height } = Dimensions.get('window');

export const RadialBackground = () => {
  return (
    <View style={styles.container}>
      <Svg height={height} width={width} style={styles.svg}>
        <Defs>
          {/* Definimos o nosso gradiente radial.
            id="grad" é como vamos chamá-lo.
            cx="50%" e cy="35%" posicionam o centro do brilho (50% do meio, 35% do topo).
            r="70%" define o raio do gradiente.
          */}
          <RadialGradient
            id="grad"
            cx="50%"
            cy="15%"
            r="60%"
            fx="50%"
            fy="35%"
          >
            {/* A cor do centro (mais clara) */}
            <Stop offset="0%" stopColor="#2A2A4E" stopOpacity="1" />
            
            {/* A cor das bordas (mais escura) */}
            <Stop offset="100%" stopColor="#0B0A1A" stopOpacity="1" />
          </RadialGradient>
        </Defs>

        {/* O retângulo que preenche a tela inteira com o gradiente */}
        <Rect x="0" y="0" width={width} height={height} fill="url(#grad)" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1, // Garante que o fundo fique atrás de todo o conteúdo
  },
  svg: {
    position: 'absolute',
  },
});

export default RadialBackground;