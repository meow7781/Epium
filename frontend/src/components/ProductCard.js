import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { COLORS, SPACING } from '../theme/colors';
import { MapPin } from 'lucide-react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ProductCard({ item, index }) {
  const navigation = useNavigation();

  return (
    <AnimatedPressable 
      entering={FadeInUp.delay(index * 150).springify().damping(14)}
      style={styles.card}
      onPress={() => navigation.navigate('Product', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.artisan}>By {item.artisan}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={COLORS.primary} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.priceTag}>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 480,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: SPACING.lg,
  },
  contentContainer: {
    marginBottom: SPACING.sm,
  },
  artisan: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontFamily: 'serif', // Simple way to look premium without loading custom fonts for demo
    fontWeight: '700',
    marginBottom: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  priceTag: {
    position: 'absolute',
    top: SPACING.lg,
    right: SPACING.lg,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backdropFilter: 'blur(10px)', // Only works on web, but gives idea
  },
  price: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
