import React from 'react';
import { View, StyleSheet, Dimensions, Pressable, Image, Platform } from 'react-native';
import { Text } from '../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../constants/theme';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, SlideInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Heritage Pattern or Image */}
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1590424744295-ff46e01a0678?w=800' }} // Intricate Indian loom
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      
      <LinearGradient
        colors={['rgba(13,11,10,0.2)', 'rgba(13,11,10,0.7)', '#0D0B0A']}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.content}>
        <Animated.View entering={SlideInUp.duration(1000).springify()} style={styles.logoContainer}>
          <Text style={styles.logoText}>Epium</Text>
          <View style={styles.logoUnderline} />
        </Animated.View>

        <View style={styles.midSection}>
          <Animated.View entering={FadeInDown.delay(400).duration(800)}>
            <Text style={styles.headline}>The Soul of{'\n'}Indian Heritage.</Text>
            <Text style={styles.subheadline}>
              Experience the breath of every thread. Direct from master weavers to your doorstep.
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(600).duration(800)} style={styles.features}>
            <View style={styles.featureItem}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>Artisan Stories with AR/360° View</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>Traceable GI Certified Crafts</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureBullet} />
              <Text style={styles.featureText}>Direct Impact: 80% to Artisans</Text>
            </View>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(800).duration(800)} style={styles.footer}>
          <Pressable 
            style={({ pressed }) => [styles.exploreBtn, pressed && { opacity: 0.9 }]}
            onPress={() => router.push('/auth')}
          >
            <LinearGradient
              colors={COLORS.gradientPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btnGradient}
            >
              <Text style={styles.exploreText}>Start Journey</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFF" style={{ marginLeft: 6 }} />
            </LinearGradient>
          </Pressable>
          
          <Pressable style={styles.secondaryBtn} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.secondaryText}>Explore Collections</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 60,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFF',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: 2,
  },
  logoUnderline: {
    width: 60,
    height: 3,
    backgroundColor: COLORS.primary,
    marginTop: 8,
  },
  midSection: {
    marginTop: -40,
  },
  headline: {
    fontSize: 40,
    fontWeight: '800',
    color: '#FFF',
    fontFamily: 'serif',
    lineHeight: 48,
  },
  subheadline: {
    fontSize: 18,
    color: COLORS.accentLight,
    marginTop: 20,
    lineHeight: 28,
    fontWeight: '500',
  },
  features: {
    marginTop: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },
  featureText: {
    color: COLORS.darkMuted,
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    gap: 16,
  },
  exploreBtn: {
    height: 56,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    ...SHADOW.primary,
  },
  btnGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exploreText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryText: {
    color: COLORS.darkMuted,
    fontSize: 16,
    fontWeight: '600',
  },
});
