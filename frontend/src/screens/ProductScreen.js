import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Pressable } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, MessageCircle, Heart, MapPin, Sparkles } from 'lucide-react-native';
import { COLORS, SPACING } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export default function ProductScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;

  return (
    <View style={styles.container}>
      {/* Background Video Layout */}
      <View style={styles.mediaContainer}>
        {product.video ? (
          <Video
            source={{ uri: product.video }}
            style={styles.media}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            isMuted
          />
        ) : (
          <View style={[styles.media, { backgroundColor: COLORS.surface }]} />
        )}
        
        {/* Gradient overlay so text is readable */}
        <LinearGradient
          colors={['rgba(9,10,12,0.1)', 'rgba(9,10,12,0.6)', COLORS.background]}
          style={styles.gradient}
        />
      </View>

      {/* Top Bar Navigation */}
      <Animated.View entering={FadeIn.delay(300)} style={styles.header}>
        <Pressable 
          style={styles.iconButton} 
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft color="#fff" size={24} />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Heart color="#fff" size={24} />
        </Pressable>
      </Animated.View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.spacer} />

        {/* Product & Artisan Info */}
        <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.content}>
          <View style={styles.locationBadge}>
            <MapPin size={12} color={COLORS.primary} />
            <Text style={styles.locationText}>Handmade in {product.location}</Text>
          </View>
          
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.artisan}>Crafted by {product.artisan}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{product.price}</Text>
            <Text style={styles.taxInfo}>Incl. fair trade premium</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>The Story</Text>
          <Text style={styles.paragraph}>{product.story}</Text>
          
          <Pressable 
            style={styles.storyLink}
            onPress={() => navigation.navigate('Story', { product })}
          >
            <Text style={styles.storyLinkText}>Read full origin story</Text>
          </Pressable>

          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.paragraph}>{product.details}</Text>

          <View style={{ height: 100 }} />
        </Animated.View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <Animated.View entering={FadeInDown.delay(600)} style={styles.actionBar}>
        <Pressable 
          style={styles.chatBtn}
          onPress={() => navigation.navigate('Chat', { artisan: product.artisan })}
        >
          <MessageCircle size={22} color={COLORS.text} />
        </Pressable>

        <Pressable style={styles.experienceBtn}>
          <Sparkles size={20} color={COLORS.background} />
          <Text style={styles.experienceText}>Experience AR</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mediaContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.65,
  },
  media: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    // web fallback backdrop filter
    backdropFilter: 'blur(10px)',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  spacer: {
    height: height * 0.4, // Push content down past the main video focus
  },
  content: {
    paddingHorizontal: SPACING.xl,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(226, 194, 155, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(226, 194, 155, 0.2)',
  },
  locationText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'serif',
    marginBottom: 8,
    lineHeight: 46,
  },
  artisan: {
    fontSize: 18,
    color: COLORS.textMuted,
    marginBottom: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 32,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
    marginRight: 10,
  },
  taxInfo: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    color: COLORS.textMuted,
    lineHeight: 26,
    marginBottom: 24,
  },
  storyLink: {
    marginBottom: 40,
  },
  storyLinkText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.xl,
    paddingTop: 16,
    paddingBottom: 36, // safe area padding
    backgroundColor: 'rgba(9, 10, 12, 0.85)',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    // Add real backdrop blur in react native via external module if needed, here simulate
  },
  chatBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  experienceBtn: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  experienceText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  }
});
