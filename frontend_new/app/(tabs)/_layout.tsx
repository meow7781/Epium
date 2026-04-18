import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { useAppStore } from '../../store/appStore';

export default function TabLayout() {
  const { isDark } = useAppStore();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? '#FFF' : '#111',
        tabBarInactiveTintColor: isDark ? '#666' : '#999',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#060606' : '#FFF',
          borderTopWidth: 1,
          borderTopColor: isDark ? 'rgba(255,255,255,0.05)' : '#EEE',
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
          paddingTop: 10,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'compass' : 'compass-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bag"
        options={{
          href: null, // Still hidden, manually triggered from bag icon
          title: 'Bag',
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'User',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
