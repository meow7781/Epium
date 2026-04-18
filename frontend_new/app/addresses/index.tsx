import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function AddressesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </Pressable>
        <Text style={styles.headerTitle}>Personal Hub</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.duration(800)} style={styles.card}>
          <View style={styles.iconBox}>
            <Ionicons name="location" size={30} color="#E8651A" />
          </View>
          <Text style={styles.title}>Shipping Address</Text>
          <Text style={styles.address}>123 Heritage Lane, Varanasi,{'\n'}Uttar Pradesh, 221001</Text>
          <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Set New Address</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    paddingBottom: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },
  content: {
    padding: 30,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    ...SHADOW.md,
  },
  iconBox: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(232, 101, 26, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    marginBottom: 10,
  },
  address: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  btn: {
    backgroundColor: '#111',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
  },
  btnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
  }
});
