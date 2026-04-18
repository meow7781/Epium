import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, Pressable, Image, Dimensions, Platform, StatusBar } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { MOCK_PRODUCTS } from '../../constants/mockData';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { useAppStore } from '../../store/appStore';

const { width } = Dimensions.get('window');

export default function ShopScreen() {
  const router = useRouter();
  const { isDark, user } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Top Navigation - Matching Home */}
      <View style={styles.topNav}>
        <Pressable onPress={() => router.push('/account')}>
          <Image 
            source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }} 
            style={styles.avatar} 
          />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFF' : '#111' }]}>Explore</Text>
        </View>
        <View style={{ width: 44 }}>
          {/* Notification or Search Icon can go here later */}
        </View>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{filteredProducts.length} masterpieces found</Text>
        <Pressable style={[styles.sortBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF' }]}>
          <Text style={[styles.sortText, { color: isDark ? '#BBB' : '#666' }]}>Sort By</Text>
          <Ionicons name="chevron-down" size={14} color={isDark ? '#BBB' : '#666'} />
        </Pressable>
      </View>
    </View>
  );

  const renderProduct = ({ item, index }: { item: any, index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 50).duration(600)}
      style={[styles.productCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF' }]}
    >
      <Pressable onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}>
        <Image source={{ uri: item.images[0] }} style={styles.productImg} />
        <View style={styles.productInfo}>
          <Text style={[styles.productTitle, { color: isDark ? '#FFF' : '#111' }]} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.productArtisan}>{item.location}</Text>
          <Text style={[styles.productPrice, { color: isDark ? '#E8651A' : '#111' }]}>₹{item.price.toLocaleString()}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0D0B0A' : '#F8F9FA' }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={<View style={{ height: 100 }} />}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: SPACING.xl,
    paddingBottom: 20,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 27.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    ...SHADOW.sm,
    marginBottom: 25,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#111',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultsCount: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    ...SHADOW.xs,
  },
  sortText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    marginRight: 4,
  },
  listContent: {
    paddingHorizontal: SPACING.xl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - SPACING.xl * 3) / 2,
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 10,
    ...SHADOW.sm,
  },
  productImg: {
    width: '100%',
    height: 160,
    borderRadius: 20,
    marginBottom: 10,
  },
  productInfo: {
    paddingHorizontal: 5,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
  productArtisan: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    marginTop: 6,
  },
});
