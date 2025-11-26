import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  Animated, 
  StatusBar,
  PanResponder
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const USER_STORIES = [
  { id: '1', image: require('@/assets/assets_gui/icons/storie.png'), user: 'Nicolas Cage', time: '13 min' },
  { id: '2', image: require('@/assets/assets_gui/icons/storie2.png'), user: 'Nicolas Cage', time: '15 min' }, 
];

const STORY_DURATION = 10000;

export default function StoryViewer() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [inputText, setInputText] = useState('');
  
  const progressAnims = useRef(
    USER_STORIES.map(() => new Animated.Value(0))
  ).current;
  
  const slideAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.stop();
    }

    if (isPaused) {
      return;
    }

    const currentProgressAnim = progressAnims[currentIndex];
    const currentValue = (currentProgressAnim as any)._value;
    const remainingTime = STORY_DURATION * (1 - currentValue);

    const animation = Animated.timing(currentProgressAnim, {
      toValue: 1,
      duration: remainingTime,
      useNativeDriver: false,
    });

    animationRef.current = animation;

    animation.start(({ finished }) => {
      if (finished) {
        goToNextStory();
      }
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [currentIndex, isPaused]);

  useEffect(() => {
    slideAnim.setValue(0);
  }, [currentIndex]);

  const goToNextStory = () => {
    if (currentIndex < USER_STORIES.length - 1) {
      progressAnims[currentIndex].setValue(1);
      setCurrentIndex(prev => prev + 1);
    } else {
      progressAnims[currentIndex].setValue(1);
      router.back();
    }
  };

  const goToPrevStory = () => {
    if (currentIndex > 0) {
      progressAnims[currentIndex].setValue(0);
      const prevIndex = currentIndex - 1;
      progressAnims[prevIndex].setValue(0);
      setCurrentIndex(prevIndex);
    } else {
      progressAnims[0].setValue(0);
    }
  };

  const handlePressIn = () => {
    setIsPaused(true);
  };
  
  const handlePressOut = () => {
    setIsPaused(false);
  };

  const handleTap = (evt: any) => {
    const touchX = evt.nativeEvent.locationX;
    if (touchX < width * 0.3) {
      goToPrevStory();
    } else {
      goToNextStory();
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      handlePressIn();
    },
    onPanResponderRelease: (evt, gestureState) => {
      handlePressOut();

      if (Math.abs(gestureState.dx) < 10 && Math.abs(gestureState.dy) < 10) {
        handleTap(evt);
      } 
      else if (Math.abs(gestureState.dx) > 50) {
        if (gestureState.dx > 0) {
          if (currentIndex > 0) {
            goToPrevStory();
          } else {
            Animated.sequence([
              Animated.timing(slideAnim, { toValue: 50, duration: 150, useNativeDriver: true }),
              Animated.timing(slideAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
            ]).start();
          }
        } else {
          goToNextStory();
        }
      }
    },
    onPanResponderTerminate: () => handlePressOut(),
  });

  const renderProgressBars = () => {
    return (
      <View style={styles.progressContainer}>
        {USER_STORIES.map((story, index) => {
          let barWidth: any = '0%';
          
          if (index < currentIndex) {
            barWidth = '100%';
          } else if (index === currentIndex) {
            barWidth = progressAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            });
          } else {
            barWidth = '0%';
          }

          return (
            <View key={story.id} style={styles.progressBarBackground}>
              <Animated.View style={[styles.progressBarFill, { width: barWidth }]}>
                <LinearGradient
                  colors={['#0033FF', '#807DFE']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              </Animated.View>
            </View>
          );
        })}
      </View>
    );
  };

  const currentStory = USER_STORIES[currentIndex] || USER_STORIES[0];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View 
        style={[styles.storyContent, { transform: [{ translateX: slideAnim }] }]}
        {...panResponder.panHandlers}
      >
        {currentStory?.image && (
          <Image 
            source={currentStory.image} 
            style={styles.backgroundImage} 
            resizeMode="cover" 
          />
        )}
        
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent', 'transparent', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        
        <View style={styles.topContainer}>
          {renderProgressBars()}

          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Image source={require('@/assets/assets_gui/yuri.png')} style={styles.avatar} />
              <Text style={styles.userName}>{currentStory.user}</Text>
              <Text style={styles.timeAgo}>{currentStory.time}</Text>
            </View>
            
            <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
              <Ionicons name="close" size={28} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.footer}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        >
          <View style={styles.inputWrapper}>
            <BlurView intensity={40} tint="dark" style={styles.blurInput}>
              <LinearGradient
                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']}
                style={StyleSheet.absoluteFill}
              />
              
              <TouchableOpacity style={styles.cameraBtn}>
                <LinearGradient
                  colors={['#3E2D60', '#2A1F45']}
                  style={styles.cameraIcon}
                >
                  <Ionicons name="camera" size={20} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>

              <TextInput 
                placeholder="Enviar mensagem..." 
                placeholderTextColor="#DDD" 
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
              />
              
              {inputText.length > 0 ? (
                <TouchableOpacity>
                  <Ionicons name="send" size={24} color="#807DFE" />
                </TouchableOpacity>
              ) : (
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="heart-outline" size={28} color="#FFF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="paper-plane-outline" size={26} color="#FFF" />
                  </TouchableOpacity>
                </View>
              )}
            </BlurView>
          </View>
        </KeyboardAvoidingView>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyContent: {
    flex: 1,
    width: width,
    height: height,
    position: 'absolute',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    paddingTop: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    gap: 4,
    height: 3,
    marginBottom: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FFF',
    marginRight: 10,
  },
  userName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  timeAgo: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: '400',
  },
  closeBtn: {
    padding: 5,
  },
  footer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  inputWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  blurInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cameraBtn: {
    marginLeft: 5,
    marginRight: 10,
  },
  cameraIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(128, 100, 255, 0.4)',
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    height: '100%',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 10,
    marginRight: 5,
  },
});