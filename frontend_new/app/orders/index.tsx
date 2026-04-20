import React from 'react';
import { View, StyleSheet, FlatList, Image, Pressable, Platform, StatusBar } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../../store/appStore';

const MOCK_ORDERS = [
  {
    id: 'ORD-8821',
    date: '12 Apr 2026',
    total: 45000,
    status: 'Delivered',
    items: [
      { title: 'Imperial Banarasi Silk', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400' }
    ]
  },
  {
    id: 'ORD-7742',
    date: '05 Apr 2026',
    total: 12400,
    status: 'In Transit',
    items: [
      { title: 'Gilded Lotus Mirror', image: 'https://images.unsplash.com/photo-1616489953149-8e411b03378b?w=400' }
    ]
  }
];

export default function OrdersScreen() {
  const router = useRouter();
  const { isDark } = useAppStore();

  const renderOrder = ({ item, index }: { item: any, index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100)} 
      style={[styles.orderCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF' }]}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={[styles.orderId, { color: isDark ? '#FFF' : '#111' }]}>{item.id}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={[styles.statusBadge, item.status === 'Delivered' ? styles.statusDelivered : styles.statusTransit]}>
          <Text style={[styles.statusText, { color: isDark ? '#FFF' : '#111' }]}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      {item.items.map((prod: any, i: number) => (
        <View key={i} style={styles.productRow}>
          <Image source={{ uri: prod.image }} style={styles.productImg} />
          <View style={styles.productInfo}>
            <Text style={[styles.productTitle, { color: isDark ? '#FFF' : '#111' }]}>{prod.title}</Text>
            <Text style={[styles.viewDetails, { color: isDark ? '#E8651A' : '#635BFF' }]}>View Details</Text>
          </View>
          <Text style={[styles.orderTotal, { color: isDark ? '#FFF' : '#111' }]}>₹{item.total.toLocaleString()}</Text>
        </View>
      ))}

      <Pressable style={[styles.trackBtn, { backgroundColor: isDark ? '#FFF' : '#111' }]}>
        <Text style={[styles.trackText, { color: isDark ? '#111' : '#FFF' }]}>Track Shipment</Text>
        <Ionicons name="arrow-forward" size={16} color={isDark ? '#111' : '#FFF'} />
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0D0B0A' : '#F8F9FA' }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={[styles.header, { backgroundColor: isDark ? '#0D0B0A' : '#FFF', borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : '#F0F0F0', borderBottomWidth: 1 }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F8F9FA' }]}>
          <Ionicons name="arrow-back" size={24} color={isDark ? '#FFF' : '#111'} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFF' : '#111' }]}>Order History</Text>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={MOCK_ORDERS}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={60} color={isDark ? '#333' : '#DDD'} />
            <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        }
      />
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
    paddingBottom: 20,
    backgroundColor: '#FFF',
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
  listContent: {
    padding: 20,
    paddingTop: 30,
  },
  orderCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    ...SHADOW.sm,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusDelivered: {
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
  },
  statusTransit: {
    backgroundColor: 'rgba(255, 159, 10, 0.15)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#111',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImg: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  viewDetails: {
    fontSize: 12,
    color: '#635BFF',
    marginTop: 4,
    fontWeight: '600',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
  },
  trackBtn: {
    backgroundColor: '#111',
    height: 50,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    marginRight: 8,
  },
  empty: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 15,
    fontWeight: '600',
  }
});
