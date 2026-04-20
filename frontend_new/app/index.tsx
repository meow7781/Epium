import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Image, Platform } from 'react-native';
import { Text } from '../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../constants/theme';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeIn, 
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withDelay,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const SCRAPBOOK_IMAGES = [
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
  'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
  'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=800',
  'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800',
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800',
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800',
];

const FloatingPiece = ({ uri, delay, style, direction }: any) => {
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(style.rotate || 0);

  useEffect(() => {
    translateY.value = withDelay(
      delay + 1000, // Wait for entry animation to finish
      withRepeat(
        withTiming(-20, { duration: 4000 + (delay % 1000), easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` }
    ],
  }));

  const getEntryAnim = () => {
    switch(direction) {
      case 'top': return FadeInUp.delay(delay).duration(1500).springify();
      case 'bottom': return FadeInDown.delay(delay).duration(1500).springify();
      case 'left': return FadeInLeft.delay(delay).duration(1500).springify();
      case 'right': return FadeInRight.delay(delay).duration(1500).springify();
      default: return FadeIn.delay(delay).duration(1500);
    }
  };

  return (
    <Animated.View style={[styles.pieceContainer, style, animatedStyle]} entering={getEntryAnim()}>
      <Image source={{ uri }} style={styles.pieceImage} />
    </Animated.View>
  );
};

export default function LandingPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background with subtle grain or color */}
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#0D0B0A' }]} />
      
      {/* Scrapbook Pieces Layout - 10 pieces with different entry directions */}
      <View style={styles.scrapbookLayer}>
        <FloatingPiece 
          uri={SCRAPBOOK_IMAGES[0]} direction="left" delay={0}
          style={{ top: '5%', left: -30, width: width * 0.45, height: height * 0.25, rotate: -8 }} 
        />
        <FloatingPiece 
          uri={SCRAPBOOK_IMAGES[1]} direction="right" delay={300}
          style={{ top: '2%', right: -40, width: width * 0.4, height: height * 0.22, rotate: 12 }} 
        />
        <FloatingPiece 
          uri={SCRAPBOOK_IMAGES[2]} direction="top" delay={600}
          style={{ top: '25%', left: '10%', width: width * 0.5, height: height * 0.28, rotate: 5, zIndex: 1 }} 
        />
        <FloatingPiece 
          uri={SCRAPBOOK_IMAGES[3]} direction="bottom" delay={900}
          style={{ top: '22%', right: '5%', width: width * 0.35, height: height * 0.2, rotate: -15 }} 
        />
        <FloatingPiece 
          uri={SCRAPBOOK_IMAGES[4]} direction="left" delay={1200}
          style={{ top: '45%', left: -20, width: width * 0.55, height: height * 0.3, rotate: -4 }} 
        />
        <FloatingPiece 
          uri={SCRAPBOOK_IMAGES[5]} direction="right" delay={1500}
          style={{ top: '48%', right: -15, width: width * 0.45, height: height * 0.25, rotate: 7 }} 
        />
        <FloatingPiece 
          uri={SCRAPBOOK_IMAGES[6]} direction="bottom" delay={1800}
          style={{ bottom: '25%', left: '15%', width: width * 0.4, height: height * 0.22, rotate: 9, zIndex: 2 }} 
        />
        <FloatingPiece 
          uri={SCRAPBOOK_IMAGES[7]} direction="top" delay={2100}
          style={{ bottom: '15%', right: '10%', width: width * 0.5, height: height * 0.28, rotate: -10 }} 
        />
        <FloatingPiece 
          uri={SCRAPBOOK_IMAGES[8]} direction="left" delay={2400}
          style={{ bottom: '5%', left: -30, width: width * 0.45, height: height * 0.25, rotate: -12 }} 
        />
        <FloatingPiece 
          uri={SCRAPBOOK_IMAGES[9]} direction="right" delay={2700}
          style={{ bottom: '2%', right: -35, width: width * 0.4, height: height * 0.22, rotate: 6 }} 
        />
      </View>

      <LinearGradient
        colors={['transparent', 'rgba(13,11,10,0.6)', '#0D0B0A']}
        style={StyleSheet.absoluteFillObject}
        locations={[0, 0.4, 0.8]}
      />

      {/* Top Navigation Bar */}
      <View style={styles.header}>
        <Animated.View entering={FadeIn.delay(3000)}>
          <Text style={styles.logoText}>EpiUm</Text>
        </Animated.View>
      </View>

      <View style={styles.content}>
        <Animated.View entering={FadeInDown.delay(3500).duration(1000)} style={styles.mainHeadline}>
          <Text style={styles.tagline}>TRADITION REDEFINED</Text>
          <Text style={styles.heroTitle}>Wear the {'\n'}Heritage.</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(4000).duration(1000)} style={styles.footer}>
          <Pressable 
            style={({ pressed }) => [styles.shopBtn, pressed && { opacity: 0.8 }]}
            onPress={() => router.push('/auth/onboarding')}
          >
            <Text style={styles.shopBtnText}>ENTER THE STORE</Text>
            <Ionicons name="arrow-forward" size={18} color="#000" style={{ marginLeft: 10 }} />
          </Pressable>
          
          <Pressable 
            style={({ pressed }) => [styles.scannerBtn, pressed && { opacity: 0.8 }]}
            onPress={() => router.push('/scan')}
          >
            <Ionicons name="qr-code" size={20} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.scannerBtnText}>SCAN QR CODE</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0B0A',
  },
  scrapbookLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  pieceContainer: {
    position: 'absolute',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#1A1614',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  pieceImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  header: {
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
    zIndex: 100,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 32,
    fontWeight: '300',
    color: '#FFF',
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    fontStyle: 'italic',
    letterSpacing: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'flex-end',
    paddingBottom: 80,
    zIndex: 101,
  },
  mainHeadline: {
    marginBottom: 40,
  },
  tagline: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '300',
    color: '#FFF',
    lineHeight: 56,
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Light' : 'sans-serif-light',
  },
  footer: {
    width: '100%',
  },
  shopBtn: {
    backgroundColor: '#FFF',
    height: 64,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2, 
  },
  shopBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
  },
  scannerBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  scannerBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
