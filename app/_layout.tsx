import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="screens-gui/MoodScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens-gui/StoryViewer" options={{ headerShown: false }} />        
        <Stack.Screen name="(tabs)-GUI" options={{ headerShown: false }} />
        <Stack.Screen name="screens-gui/Cicles/CreateCicle" options={{ headerShown: false }} />
        <Stack.Screen name="screens-gui/Cicles/ChatCicle" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
