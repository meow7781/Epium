import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Pressable, Platform } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, SlideInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const MOCK_BG_IMAGES = [
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80',
  'https://images.unsplash.com/photo-1583344640101-789a7f677d24?w=400&q=80',
  'https://images.unsplash.com/photo-1621600411666-474d8935a60a?w=400&q=80',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80',
  'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&q=80',
  'https://images.unsplash.com/photo-1605518216938-7c31b7ad13d9?w=400&q=80',
];

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Grid - Mosaic Style */}
      <View style={styles.mosaicGrid}>
        <View style={styles.column}>
          <Image source={{ uri: MOCK_BG_IMAGES[0] }} style={[styles.gridImg, { height: 180 }]} />
          <Image source={{ uri: MOCK_BG_IMAGES[1] }} style={[styles.gridImg, { height: 260 }]} />
          <Image source={{ uri: MOCK_BG_IMAGES[2] }} style={[styles.gridImg, { height: 200 }]} />
        </View>
        <View style={[styles.column, { paddingTop: 40 }]}>
          <Image source={{ uri: MOCK_BG_IMAGES[3] }} style={[styles.gridImg, { height: 220 }]} />
          <Image source={{ uri: MOCK_BG_IMAGES[4] }} style={[styles.gridImg, { height: 180 }]} />
          <Image source={{ uri: MOCK_BG_IMAGES[5] }} style={[styles.gridImg, { height: 240 }]} />
        </View>
        <View style={styles.column}>
          <Image source={{ uri: MOCK_BG_IMAGES[2] }} style={[styles.gridImg, { height: 200 }]} />
          <Image source={{ uri: MOCK_BG_IMAGES[0] }} style={[styles.gridImg, { height: 260 }]} />
          <Image source={{ uri: MOCK_BG_IMAGES[3] }} style={[styles.gridImg, { height: 180 }]} />
        </View>
      </View>

      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)', 'rgba(255,255,255,1)']}
        style={styles.gradient}
      />

      {/* Content Card */}
      <Animated.View entering={FadeInDown.duration(1000).springify()} style={styles.contentCard}>
        <View style={styles.indicatorContainer}>
          <View style={styles.indicatorActive} />
          <View style={styles.indicatorInactive} />
          <View style={styles.indicatorInactive} />
        </View>

        <Text style={styles.title}>Change your{'\n'}Perspective In Style</Text>
        <Text style={styles.subtitle}>
          Change the quality of your appearance{'\n'}with Epium luxury collections now!
        </Text>

        <Pressable 
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
          onPress={() => router.replace('/auth')}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  mosaicGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    width: width,
  },
  column: {
    flex: 1,
    paddingHorizontal: 5,
  },
  gridImg: {
    width: '100%',
    borderRadius: RADIUS.xl,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
  },
  contentCard: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 30,
    paddingHorizontal: SPACING.xl,
    paddingBottom: Platform.OS === 'ios' ? 60 : 40,
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  indicatorActive: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#111',
    marginHorizontal: 4,
  },
  indicatorInactive: {
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
    textAlign: 'center',
    lineHeight: 36,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
    marginBottom: 40,
  },
  button: {
    width: '100%',
    height: 60,
    backgroundColor: '#111',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
