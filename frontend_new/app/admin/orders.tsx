import React from 'react';
import { View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const MOCK_ORDERS = [
  { id: 'ORD-7821', customer: 'Rahul Sharma', total: '₹4,500', status: 'delivered', date: '2 hours ago', items: 2 },
  { id: 'ORD-7819', customer: 'Ananya Iyer', total: '₹12,200', status: 'shipped', date: '5 hours ago', items: 1 },
  { id: 'ORD-7815', customer: 'Vikram Singh', total: '₹2,800', status: 'packed', date: '8 hours ago', items: 3 },
  { id: 'ORD-7810', customer: 'Priya Verma', total: '₹18,000', status: 'placed', date: 'Yesterday', items: 1 },
  { id: 'ORD-7798', customer: 'Sidharth Malhotra', total: '₹3,200', status: 'cancelled', date: 'Yesterday', items: 2 },
];

const STATUS_MAP: any = {
  delivered: { color: COLORS.success, icon: 'checkmark-circle' },
  shipped: { color: COLORS.info, icon: 'airplane' },
  packed: { color: COLORS.warning, icon: 'cube' },
  placed: { color: COLORS.primary, icon: 'receipt' },
  cancelled: { color: COLORS.error, icon: 'close-circle' },
};

export default function AdminOrdersScreen() {
  const router = useRouter();

  const renderOrder = ({ item, index }: { item: typeof MOCK_ORDERS[0], index: number }) => (
    <Animated.View 
      entering={FadeInUp.delay(index * 60).duration(500)}
      style={styles.orderCard}
    >
      <View style={styles.orderHeader}>
        <View style={styles.statusRow}>
          <Ionicons name={STATUS_MAP[item.status].icon} size={16} color={STATUS_MAP[item.status].color} />
          <Text style={[styles.statusText, { color: STATUS_MAP[item.status].color }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      
      <View style={styles.orderBody}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>{item.id}</Text>
          <Text style={styles.customerName}>{item.customer}</Text>
          <Text style={styles.itemCount}>{item.items} {item.items === 1 ? 'Product' : 'Products'}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.orderTotal}>{item.total}</Text>
          <Pressable style={styles.detailBtn}>
            <Text style={styles.detailBtnText}>Details</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Order Management</Text>
        <View style={styles.spacer} />
      </View>

      <FlatList
        data={MOCK_ORDERS}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBg,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.darkCardAlt,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
    fontFamily: 'serif',
  },
  spacer: {
    width: 44,
  },
  listContent: {
    padding: SPACING.xl,
    paddingBottom: 40,
  },
  orderCard: {
    backgroundColor: COLORS.darkCard,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.02)',
    ...SHADOW.sm,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.03)',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  orderDate: {
    color: COLORS.darkMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  orderBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  customerName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  itemCount: {
    color: COLORS.darkMuted,
    fontSize: 12,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
  },
  detailBtn: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  detailBtnText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
