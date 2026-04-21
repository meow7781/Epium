import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import 'react-native-reanimated';

import { useAppStore } from '../store/appStore';
import { COLORS } from '../constants/theme';
import LoadingOverlay from '../components/LoadingOverlay';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const { themeMode, isAuthenticated, hasOnboarded, user } = useAppStore();
  const segments = useSegments();
  const router = useRouter();
  const [isAppReady, setIsAppReady] = useState(false);

  const PinkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: COLORS.pinkPrimary,
      background: COLORS.pinkBg,
      card: COLORS.pinkCard,
      text: COLORS.pinkMuted,
      border: COLORS.pinkBorder,
      notification: COLORS.pinkPrimary,
    },
  };

  const getTheme = () => {
    switch (themeMode) {
      case 'dark': return DarkTheme;
      case 'pink': return PinkTheme;
      case 'light': return DefaultTheme;
      default: return DarkTheme;
    }
  };

  useEffect(() => {
    if (!segments[0] && !isAuthenticated) {
      // Allow landing page for unauthenticated users
      setIsAppReady(true);
      return;
    }

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';
    
    if (!isAuthenticated && inTabsGroup) {
      // Redirect to landing or auth if trying to access tabs while not authenticated
      router.replace('/');
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to onboarding or home if authenticated and in auth pages
      if (!hasOnboarded) {
        router.replace('/auth/onboarding');
      } else {
        router.replace('/(tabs)');
      }
    } else if (isAuthenticated && hasOnboarded && segments[1] === 'onboarding') {
       // Redirect to home if onboarded
       router.replace('/(tabs)');
    }

    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, hasOnboarded, segments]);

  return (
    <ThemeProvider value={getTheme()}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ animation: 'fade' }} />
        <Stack.Screen name="auth/index" options={{ animation: 'fade' }} />
        <Stack.Screen name="auth/onboarding" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="admin/index" options={{ presentation: 'card' }} />
        <Stack.Screen name="product/[id]" options={{ presentation: 'card' }} />
        <Stack.Screen name="ar-view" options={{ presentation: 'fullScreenModal', animationEnabled: true }} />
      </Stack>
      <LoadingOverlay visible={!isAppReady} />
    </ThemeProvider>
  );
}
