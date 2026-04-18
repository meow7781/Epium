import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image, Platform, Alert } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { useAppStore } from '../../store/appStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useAppStore();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePlaceOrder = () => {
    Alert.alert(
      "Order Authenticated",
      `Your luxury order has been placed via ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Secure Vault'}.`,
      [{ text: "Back to Home", onPress: () => {
        clearCart();
        router.replace('/');
      }}]
    );
  };

  const renderPaymentOption = (id: string, title: string, icon: any, subtitle: string) => (
    <Pressable 
      style={[styles.paymentCard, paymentMethod === id && styles.paymentCardActive]}
      onPress={() => setPaymentMethod(id)}
    >
      <View style={styles.paymentLeft}>
        <View style={[styles.methodIcon, paymentMethod === id && styles.methodIconActive]}>
          <Ionicons name={icon} size={20} color={paymentMethod === id ? '#FFF' : '#111'} />
        </View>
        <View style={styles.methodInfo}>
          <Text style={styles.methodTitle}>{title}</Text>
          <Text style={styles.methodSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={[styles.radio, paymentMethod === id && styles.radioActive]}>
        {paymentMethod === id && <View style={styles.radioInner} />}
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Shipping Address */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.section}>
          <Text style={styles.sectionHeader}>Shipping Address</Text>
          <View style={styles.addressCard}>
            <View style={styles.addressIcon}>
              <Ionicons name="location" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.addressText}>
              <Text style={styles.addressName}>Home Hub</Text>
              <Text style={styles.addressDetails}>123 Heritage Lane, Varanasi,{'\n'}Uttar Pradesh, 221001</Text>
            </View>
            <Pressable><Text style={styles.editBtn}>Edit</Text></Pressable>
          </View>
        </Animated.View>

        {/* Payment Methods */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.section}>
          <Text style={styles.sectionHeader}>Payment Methods</Text>
          {renderPaymentOption('card', 'Secure Card Vault', 'card-outline', 'Mastercard ending in 4242')}
          {renderPaymentOption('upi', 'Instant UPI', 'flash-outline', 'Pay via GPay, PhonePe, or BHIM')}
          {renderPaymentOption('cod', 'Cash on Delivery', 'cash-outline', 'Payment collected at doorstep')}
        </Animated.View>

        {/* Order Summary */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
          <Text style={styles.sectionHeader}>Order Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{cartTotal().toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping Heritage</Text>
              <Text style={[styles.summaryValue, { color: COLORS.success }]}>FREE</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Grand Total</Text>
              <Text style={styles.totalValue}>₹{cartTotal().toLocaleString()}</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerTotalBox}>
          <Text style={styles.footerLabel}>Grand Total</Text>
          <Text style={styles.footerVal}>₹{cartTotal().toLocaleString()}</Text>
        </View>
        <Pressable 
          style={({ pressed }) => [styles.placeOrderBtn, pressed && { opacity: 0.9 }]}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Finalize Order</Text>
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: 20,
    backgroundColor: '#FFF',
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
    fontFamily: 'serif',
  },
  scrollContent: {
    padding: SPACING.xl,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: RADIUS.xl,
    ...SHADOW.sm,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(232, 101, 26, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressText: {
    flex: 1,
    marginLeft: 15,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  addressDetails: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    lineHeight: 18,
  },
  editBtn: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: RADIUS.xl,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    ...SHADOW.sm,
  },
  paymentCardActive: {
    borderColor: '#111',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F3F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodIconActive: {
    backgroundColor: '#111',
  },
  methodInfo: {
    marginLeft: 15,
  },
  methodTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  methodSubtitle: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: '#111',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#111',
  },
  summaryCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: RADIUS.xl,
    ...SHADOW.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: Platform.OS === 'ios' ? 25 : 0,
    justifyContent: 'space-between',
    ...SHADOW.md,
  },
  footerTotalBox: {
    justifyContent: 'center',
  },
  footerLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  footerVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },
  placeOrderBtn: {
    flex: 1,
    height: 60,
    backgroundColor: '#111',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
  },
  placeOrderText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
