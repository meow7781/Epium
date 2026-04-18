import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Pressable, Image, ScrollView, Dimensions, Alert, Platform } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { useAppStore } from '../../store/appStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInRight, FadeInDown, SlideInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function BagScreen() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, cartTotal, isDark } = useAppStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStripePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        "Payment Successful",
        "Your heritage piece is being packed with care by our artisans.",
        [{ text: "Excellent", onPress: () => router.replace('/(tabs)') }]
      );
    }, 2500);
  };

  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <Animated.View 
      entering={FadeInRight.delay(index * 100).duration(500)}
      style={[styles.itemCard, { backgroundColor: isDark ? COLORS.darkCard : '#FFF' }]}
    >
      <Image source={{ uri: item.product.images[0] }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{item.product.title}</Text>
          <Pressable onPress={() => removeFromCart(item.product.id)}>
            <Ionicons name="trash-outline" size={18} color={COLORS.error} />
          </Pressable>
        </View>
        <Text style={styles.itemArtisan}>by {item.product.artisan}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.itemPrice}>₹{item.product.price.toLocaleString()}</Text>
          <View style={styles.quantityContainer}>
            <Pressable 
              style={styles.quantityBtn} 
              onPress={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
            >
              <Ionicons name="remove" size={16} color="#FFF" />
            </Pressable>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <Pressable 
              style={styles.quantityBtn} 
              onPress={() => updateQuantity(item.product.id, item.quantity + 1)}
            >
              <Ionicons name="add" size={16} color="#FFF" />
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  if (cart.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: isDark ? COLORS.darkBg : '#F8F9FA' }]}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="bag-outline" size={60} color={COLORS.accent} />
        </View>
        <Text style={styles.emptyTitle}>Empty Collection</Text>
        <Text style={styles.emptySubtitle}>You haven't added any masterpieces to your bag yet.</Text>
        <Pressable 
          style={styles.browseBtn}
          onPress={() => router.push('/(tabs)/shop')}
        >
          <Text style={styles.browseText}>Explore Heritage</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? COLORS.darkBg : '#F8F9FA' }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Selection</Text>
          <Text style={styles.itemCountText}>{cart.length} {cart.length === 1 ? 'Masterpiece' : 'Masterpieces'}</Text>
        </View>
        <View style={styles.bagIcon}>
          <Ionicons name="bag-handle" size={24} color={COLORS.primary} />
        </View>
      </View>

      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.product.id}-${index}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Animated.View entering={SlideInUp.duration(600)} style={[styles.checkoutSection, { backgroundColor: isDark ? COLORS.darkCardAlt : '#FFF' }]}>
        <View style={styles.paymentMethodRow}>
          <View style={styles.stripeLogoContainer}>
            <Ionicons name="logo-bitcoin" size={16} color="#635BFF" /> 
            <Text style={styles.stripeText}>STRIPE SECURE</Text>
          </View>
          <Text style={styles.changeText}>Change</Text>
        </View>

        <View style={styles.billingCard}>
          <View style={styles.billingRow}>
            <Text style={styles.billingLabel}>Subtotal</Text>
            <Text style={styles.billingValue}>₹{cartTotal().toLocaleString()}</Text>
          </View>
          <View style={styles.billingRow}>
            <Text style={styles.billingLabel}>Luxury Shipping</Text>
            <Text style={styles.billingValue}>FREE</Text>
          </View>
          <View style={[styles.billingRow, { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' }]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{cartTotal().toLocaleString()}</Text>
          </View>
        </View>
        
        <Pressable 
          style={({ pressed }) => [styles.payBtn, pressed && { opacity: 0.9 }]} 
          onPress={() => router.push('/checkout')}
        >
          <LinearGradient
            colors={['#111', '#333']}
            style={styles.payGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="lock-closed" size={20} color="#FFF" style={{ marginRight: 10 }} />
            <Text style={styles.payText}>Proceed to Checkout</Text>
          </LinearGradient>
        </Pressable>
        <Text style={styles.securityText}>🛡️ Verified Gateway • COD Available</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  itemCountText: {
    color: COLORS.darkMuted,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 2,
  },
  bagIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(232, 101, 26, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: 320,
  },
  itemCard: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    ...SHADOW.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius: 14,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    flex: 1,
    marginRight: 8,
  },
  itemArtisan: {
    color: COLORS.darkMuted,
    fontSize: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: RADIUS.full,
    padding: 2,
  },
  quantityBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    color: '#FFF',
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '700',
  },
  checkoutSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
    ...SHADOW.lg,
  },
  paymentMethodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  stripeLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 91, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  stripeText: {
    color: '#635BFF',
    fontSize: 10,
    fontWeight: '900',
    marginLeft: 5,
    letterSpacing: 0.5,
  },
  changeText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '700',
  },
  billingCard: {
    marginBottom: 24,
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  billingLabel: {
    color: COLORS.darkMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  billingValue: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primary,
  },
  payBtn: {
    height: 58,
    borderRadius: 16,
    overflow: 'hidden',
    ...SHADOW.primary,
  },
  payGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '800',
  },
  securityText: {
    textAlign: 'center',
    color: COLORS.darkMuted,
    fontSize: 11,
    marginTop: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(212, 168, 83, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    fontFamily: 'serif',
  },
  emptySubtitle: {
    fontSize: 15,
    color: COLORS.darkMuted,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
    lineHeight: 22,
  },
  browseBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: RADIUS.full,
    ...SHADOW.primary,
  },
  browseText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 16,
  },
});
