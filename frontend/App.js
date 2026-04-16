import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './src/screens/HomeScreen';
import ProductScreen from './src/screens/ProductScreen';
import StoryScreen from './src/screens/StoryScreen';
import ChatScreen from './src/screens/ChatScreen';

import { COLORS } from './src/theme/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={{
        colors: {
          background: COLORS.background,
          card: COLORS.surface,
          text: COLORS.text,
          border: COLORS.border,
          primary: COLORS.primary,
          notification: COLORS.accent,
        },
        dark: true,
      }}>
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: COLORS.background },
            animation: 'fade', // Premium fade transition between screens
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen 
            name="Product" 
            component={ProductScreen} 
            // Gives an immersive feel when navigating to Product
            options={{ animation: 'slide_from_bottom' }} 
          />
          <Stack.Screen 
            name="Story" 
            component={StoryScreen} 
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen} 
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
