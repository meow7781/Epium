import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Pressable, Dimensions, Platform, Share, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { MOCK_PRODUCTS } from '../../constants/mockData';
import { useAppStore } from '../../store/appStore';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight, SlideInRight } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const SIZES = ['S', 'M', 'L', 'XL'];
const COLORS_DATA = [
  { name: 'Grey', color: '#999' },
  { name: 'Black', color: '#111' },
  { name: 'Khaki', color: '#BDB76B' },
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Grey');
  const { isDark, addToCart } = useAppStore();

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0D0B0A' : '#F8F9FA' }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? '#0D0B0A' : '#F8F9FA' }]}>
        <Pressable onPress={() => router.back()} style={[styles.headerBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF' }]}>
          <Ionicons name="chevron-back" size={24} color={isDark ? '#FFF' : '#111'} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFF' : '#111' }]}>Product Details</Text>
        <Pressable style={[styles.headerBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF' }]}>
          <Ionicons name="ellipsis-horizontal" size={24} color={isDark ? '#FFF' : '#111'} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Product Image */}
        <Animated.View entering={FadeInDown.duration(800)} style={styles.imageContainer}>
          <Image source={{ uri: product.images[0] }} style={styles.mainImage} />
          
          {/* AR & 360 Overlay Button */}
          <Pressable style={styles.arOverlayBtn}>
            <LinearGradient
              colors={['rgba(232, 101, 26, 0.9)', 'rgba(255, 69, 58, 0.9)']}
              style={styles.arGradient}
            >
              <Ionicons name="cube-outline" size={20} color="#FFF" />
              <Text style={styles.arBtnText}>360° AR View</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={[styles.wishlistBtn, { backgroundColor: isDark ? '#1A1614' : '#FFF' }]}>
            <Ionicons name="heart-outline" size={24} color={isDark ? '#FFF' : '#111'} />
          </Pressable>
        </Animated.View>

        <View style={styles.detailsContainer}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: isDark ? '#FFF' : '#111' }]}>{product.title}</Text>
          </View>
          <Text style={[styles.price, { color: isDark ? '#E8651A' : '#666' }]}>₹{product.price.toLocaleString()}</Text>

          {/* Color Selector */}
          <View style={styles.selectorSection}>
            <View style={styles.selectorHeader}>
              <View style={[styles.colorPreview, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF' }]}>
                <View style={[styles.colorDot, { backgroundColor: COLORS_DATA.find(c => c.name === selectedColor)?.color }]} />
                <Text style={[styles.selectorTitle, { color: isDark ? '#FFF' : '#111' }]}>Colors</Text>
                <Ionicons name="chevron-down" size={14} color={isDark ? '#FFF' : '#666'} />
              </View>
            </View>
            <View style={styles.sizeOptions}>
              {SIZES.map(size => (
                <Pressable 
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={[
                    styles.sizePill, 
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF' },
                    selectedSize === size && (isDark ? styles.sizePillActiveDark : styles.sizePillActive)
                  ]}
                >
                  <Text style={[styles.sizeText, { color: isDark ? '#FFF' : '#111' }, selectedSize === size && styles.sizeTextActive]}>{size}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={[styles.ratingVal, { color: isDark ? '#FFF' : '#111' }]}>4.9 Rating</Text>
            </View>
            <View style={styles.slash} />
            <Text style={styles.soldText}>1.5k+ Sold</Text>
          </View>

          <Text style={styles.description}>
            This premium collection piece from {product.location} represents the pinnacle of Epium craftsmanship. Every detail is meticulously handled by master artisans.
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: isDark ? '#060606' : '#FFF', borderTopColor: isDark ? 'rgba(255,255,255,0.05)' : '#EEE' }]}>
        <Pressable 
          style={[styles.buyBtn, { backgroundColor: isDark ? '#FFF' : '#111' }]}
          onPress={() => {
            addToCart(product);
            Alert.alert("Success", "Added to your luxury collection.");
          }}
        >
          <Text style={[styles.buyText, { color: isDark ? '#111' : '#FFF' }]}>Buy Now</Text>
        </Pressable>
        <Pressable style={[styles.cartIconBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#F1F3F5' }]} onPress={() => router.push('/bag')}>
          <Ionicons name="cart-outline" size={24} color={isDark ? '#FFF' : '#111'} />
          <View style={styles.cartBadge} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    backgroundColor: '#F8F9FA',
    zIndex: 10,
  },
  headerBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.sm,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  imageContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    height: height * 0.45,
    borderRadius: 30,
    overflow: 'hidden',
    ...SHADOW.md,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  arOverlayBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOW.md,
  },
  arGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  arBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
  },
  wishlistBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.md,
  },
  detailsContainer: {
    paddingHorizontal: 25,
    marginTop: 30,
  },
  titleRow: {
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 25,
  },
  selectorSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  selectorHeader: {
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    ...SHADOW.sm,
  },
  colorPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  selectorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
    marginRight: 5,
  },
  sizeOptions: {
    flexDirection: 'row',
  },
  sizePill: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    ...SHADOW.sm,
  },
  sizePillActive: {
    backgroundColor: '#111',
  },
  sizePillActiveDark: {
    backgroundColor: '#E8651A',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
  sizeTextActive: {
    color: '#FFF',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingVal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginLeft: 6,
  },
  slash: {
    width: 1,
    height: 14,
    backgroundColor: '#CCC',
    marginHorizontal: 15,
  },
  soldText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#777',
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 100,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: Platform.OS === 'ios' ? 25 : 0,
    justifyContent: 'space-between',
    ...SHADOW.md,
  },
  buyBtn: {
    flex: 1,
    height: 60,
    backgroundColor: '#111',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  buyText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  cartIconBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F1F3F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF453A',
    borderWidth: 2,
    borderColor: '#FFF',
  }
});
