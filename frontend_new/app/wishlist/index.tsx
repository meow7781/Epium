import React from 'react';
import { View, StyleSheet, FlatList, Image, Pressable, Platform, Dimensions, StatusBar } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { MOCK_PRODUCTS } from '../../constants/mockData';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useAppStore } from '../../store/appStore';

const { width } = Dimensions.get('window');

export default function WishlistScreen() {
  const router = useRouter();
  const { isDark, wishlist, toggleWishlist } = useAppStore();
  
  // Dynamic wishlist from store
  const wishlistItems = MOCK_PRODUCTS.filter(p => wishlist.includes(p.id));

  const renderItem = ({ item, index }: { item: any, index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100)} 
      style={[styles.card, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF' }]}
    >
      <Pressable onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}>
        <Image source={{ uri: item.images[0] }} style={styles.image} />
        <Pressable style={[styles.removeBtn, { backgroundColor: isDark ? '#111' : '#FFF' }]}>
          <Ionicons name="heart" size={20} color="#FF453A" />
        </Pressable>
        <View style={styles.info}>
          <Text style={[styles.title, { color: isDark ? '#FFF' : '#111' }]} numberOfLines={1}>{item.title}</Text>
          <Text style={[styles.location, { color: isDark ? 'rgba(255,255,255,0.4)' : '#999' }]}>{item.location}</Text>
          <View style={styles.footer}>
            <Text style={[styles.price, { color: isDark ? '#FFF' : '#111' }]}>₹{item.price.toLocaleString()}</Text>
            <Pressable style={[styles.addBtn, { backgroundColor: isDark ? '#FFF' : '#111' }]}>
              <Ionicons name="cart-outline" size={18} color={isDark ? '#111' : '#FFF'} />
            </Pressable>
          </View>
        </View>
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
        <Text style={[styles.headerTitle, { color: isDark ? '#FFF' : '#111' }]}>My Wishlist</Text>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={wishlistItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
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
    padding: 15,
    paddingTop: 25,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: (width - 50) / 2,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    ...SHADOW.sm,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 20,
  },
  removeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.sm,
  },
  info: {
    padding: 5,
    paddingTop: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
  location: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
  },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
