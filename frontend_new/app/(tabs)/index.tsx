import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image, FlatList, Dimensions, StatusBar, Platform, TextInput } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { useAppStore } from '../../store/appStore';
import { MOCK_PRODUCTS } from '../../constants/mockData';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, LinearTransition } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const CATEGORIES = [
  { name: 'All', icon: 'grid-outline' },
  { name: 'Jackets', icon: 'layers-outline' },
  { name: 'T-Shirts', icon: 'shirt-outline' },
  { name: 'Pants', icon: 'file-tray-full-outline' },
  { name: 'Heritage', icon: 'ribbon-outline' },
];

const CAROUSEL_ITEMS = [
  { title: 'The Banaras Silk Series', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200', tag: 'LIMITED EDITION' },
  { title: 'Royal Heritage Jewelry', image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1200', tag: 'CURATED' },
  { title: 'Hand-Woven Pashmina', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1200', tag: 'WINTER 2024' },
  { title: 'Zardozi Gold Masterpiece', image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?w=1200', tag: 'CRAFTSMANSHIP' },
  { title: 'Modern Indian Luxury', image: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=1200', tag: 'EPITOME' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isDark, user, activeCategory, setActiveCategory } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef<ScrollView>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSearching) {
        const nextIndex = (carouselIndex + 1) % CAROUSEL_ITEMS.length;
        carouselRef.current?.scrollTo({ 
          x: nextIndex * (width - 40), 
          animated: true 
        });
        setCarouselIndex(nextIndex);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselIndex, isSearching]);

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Top Navigation Row */}
      <View style={styles.topNav}>
        {!isSearching ? (
          <>
            <Pressable onPress={() => router.push('/account')}>
              <Image 
                source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }} 
                style={styles.avatar} 
              />
            </Pressable>
            <View style={styles.topRightActions}>
              <Pressable style={styles.topActionBtn} onPress={() => setIsSearching(true)}>
                <Feather name="search" size={22} color={isDark ? '#FFF' : '#111'} />
              </Pressable>
              <Pressable style={styles.topActionBtn} onPress={() => router.push('/wishlist')}>
                <Ionicons name="heart-outline" size={24} color={isDark ? '#FFF' : '#111'} />
              </Pressable>
              <Pressable style={styles.topActionBtn} onPress={() => router.push('/bag')}>
                <Ionicons name="bag-handle-outline" size={24} color={isDark ? '#FFF' : '#111'} />
                <View style={styles.headerBadge} />
              </Pressable>
            </View>
          </>
        ) : (
          <Animated.View entering={FadeInRight} style={[styles.activeSearchContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF' }]}>
            <Feather name="search" size={20} color="#999" />
            <TextInput
              autoFocus
              placeholder="Search masterpieces..."
              placeholderTextColor="#999"
              style={[styles.activeSearchInput, { color: isDark ? '#FFF' : '#111' }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Pressable onPress={() => { setIsSearching(false); setSearchQuery(''); }}>
              <Ionicons name="close-circle" size={22} color="#999" />
            </Pressable>
          </Animated.View>
        )}
      </View>

      {!isSearching && (
        <Animated.View entering={FadeInDown}>
          {/* Discovery Headline */}
          <View style={styles.headlineContainer}>
            <Text style={[styles.heyText, { color: isDark ? '#999' : '#666' }]}>Hey, {user?.name?.split(' ')[0] || 'Collector'}</Text>
            <Text style={[styles.discoverText, { color: isDark ? '#FFF' : '#111' }]}>Discover</Text>
            <Text style={[styles.subtitleText, { color: isDark ? '#BBB' : '#666' }]}>Your Best Heritage</Text>
          </View>

          {/* Hero Carousel - 5 Pages with Auto-swipe */}
          <View style={styles.carouselContainer}>
            <ScrollView 
              ref={carouselRef}
              horizontal 
              pagingEnabled 
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / (width - 40));
                setCarouselIndex(index);
              }}
              scrollEventThrottle={16}
            >
              {CAROUSEL_ITEMS.map((item, index) => (
                <View key={index} style={styles.carouselSlide}>
                  <Image source={{ uri: item.image }} style={styles.carouselImg} />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.carouselOverlay}
                  >
                    <Text style={styles.carouselTag}>{item.tag}</Text>
                    <Text style={styles.carouselTitle}>{item.title}</Text>
                  </LinearGradient>
                </View>
              ))}
            </ScrollView>
            <View style={styles.dotsContainer}>
              {CAROUSEL_ITEMS.map((_, i) => (
                <View key={i} style={[styles.dot, carouselIndex === i && styles.activeDot]} />
              ))}
            </View>
          </View>
        </Animated.View>
      )}

      {/* Category Selection */}

      {/* Category Selection */}
      <View style={styles.categoryContainer}>
        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFF' : '#111' }]}>Category</Text>
          <Pressable><Text style={[styles.seeAll, { color: isDark ? 'rgba(255,255,255,0.4)' : '#999' }]}>See All</Text></Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
          {CATEGORIES.map((cat) => (
            <Pressable 
              key={cat.name} 
              onPress={() => setActiveCategory(cat.name)}
              style={[
                styles.catPill,
                activeCategory === cat.name && styles.catPillActive
              ]}
            >
              <Ionicons 
                name={cat.icon as any} 
                size={18} 
                color={activeCategory === cat.name ? '#FFF' : '#111'} 
              />
              <Text style={[
                styles.catText,
                activeCategory === cat.name && styles.catTextActive
              ]}>
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>


      <View style={styles.sectionTitleRow}>
        {/* Removed Popular Masterpieces as requested */}
      </View>
    </View>
  );

  const renderProduct = ({ item, index }: { item: any, index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(600)}
      style={[styles.productCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF' }]}
    >
      <Pressable onPress={() => router.push({ pathname: '/product/[id]', params: { id: item.id } })}>
        <Image source={{ uri: item.images[0] }} style={styles.productImg} />
        <Pressable style={styles.heartBtn}>
          <Ionicons name="heart-outline" size={16} color="#111" />
        </Pressable>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={10} color="#FFD700" />
          <Text style={styles.ratingText}>4.9</Text>
        </View>
        <View style={styles.productInfo}>
          <Text style={[styles.productTitle, { color: isDark ? '#FFF' : '#111' }]} numberOfLines={1}>{item.title}</Text>
          <Text style={[styles.productPrice, { color: isDark ? '#E8651A' : '#111' }]}>₹{item.price.toLocaleString()}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0D0B0A' : '#F8F9FA' }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <FlatList
        data={MOCK_PRODUCTS.filter(p => {
          const matchesCategory = activeCategory === 'All' ? true : p.category === activeCategory;
          const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.location.toLowerCase().includes(searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        })}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={<View style={{ height: 120 }} />}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#E0E0E0',
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topActionBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(0,0,0,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  activeSearchContainer: {
    flex: 1,
    height: 45,
    borderRadius: 22.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    ...SHADOW.sm,
  },
  activeSearchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  headerBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8651A',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  arCard: {
    width: '100%',
    height: 140,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 30,
    ...SHADOW.md,
  },
  arGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
  },
  arTextContent: {
    flex: 1,
  },
  arTag: {
    fontSize: 10,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 1.5,
  },
  arTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    marginTop: 4,
  },
  arSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    lineHeight: 16,
  },
  arIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headlineContainer: {
    marginBottom: 25,
  },
  heyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  discoverText: {
    fontSize: 32,
    fontWeight: '800',
  },
  subtitleText: {
    fontSize: 24,
    fontWeight: '400',
  },
  carouselContainer: {
    marginBottom: 30,
    width: '100%',
  },
  carouselSlide: {
    width: width - 40,
    height: 200,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 20,
  },
  carouselImg: {
    width: '100%',
    height: '100%',
  },
  carouselOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'flex-end',
  },
  carouselTag: {
    color: '#E8651A',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  carouselTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#E8651A',
    width: 15,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  searchContainer: {
    flex: 1,
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 27.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    ...SHADOW.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  categoryContainer: {
    marginBottom: 30,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  catScroll: {
    marginLeft: -5,
  },
  catPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    ...SHADOW.sm,
  },
  catPillActive: {
    backgroundColor: '#111',
  },
  catText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
    marginLeft: 8,
  },
  catTextActive: {
    color: '#FFF',
  },
  bannerContainer: {
    width: '100%',
    height: 180,
    borderRadius: RADIUS.xxl,
    overflow: 'hidden',
    marginBottom: 30,
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    padding: 25,
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerLabel: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
    opacity: 0.8,
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 8,
    lineHeight: 28,
  },
  bannerBtn: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    color: '#111',
    fontSize: 12,
    fontWeight: '800',
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
  heartBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 65,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  productInfo: {
    paddingHorizontal: 5,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
    marginTop: 4,
  },
});
