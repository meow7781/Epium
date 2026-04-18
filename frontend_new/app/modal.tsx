import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, FlatList, Pressable, Image, Dimensions, Platform } from 'react-native';
import { Text } from '../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../constants/theme';
import { MOCK_PRODUCTS } from '../constants/mockData';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInDown, LinearTransition } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SearchModal() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(MOCK_PRODUCTS);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setResults(MOCK_PRODUCTS);
    } else {
      const filtered = MOCK_PRODUCTS.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.artisan.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    }
  }, [searchQuery]);

  const renderProduct = ({ item, index }: { item: any, index: number }) => (
    <Animated.View 
      layout={LinearTransition}
      entering={FadeInDown.delay(index * 50)}
      style={styles.productCard}
    >
      <Pressable onPress={() => {
        router.push({ pathname: '/product/[id]', params: { id: item.id } });
      }}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.productPrice}>₹{item.price.toLocaleString()}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(13,11,10,0.95)', 'rgba(13,11,10,0.9)', 'rgba(13,11,10,0.8)']}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.header}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color={COLORS.accent} style={styles.searchIcon} />
          <TextInput
            autoFocus
            style={styles.searchInput}
            placeholder="Search heritage, artisans, clusters..."
            placeholderTextColor={COLORS.darkMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            selectionColor={COLORS.primary}
          />
          {searchQuery !== '' && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.darkMuted} />
            </Pressable>
          )}
        </View>
        <Pressable style={styles.closeBtn} onPress={() => router.back()}>
          <Text style={styles.closeText}>Cancel</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {searchQuery === '' ? 'Curated Collections' : `${results.length} Results Found`}
          </Text>
        </View>

        <FlatList
          data={results}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderProduct}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={60} color={COLORS.darkMuted} />
              <Text style={styles.emptyText}>No masterpieces found matching "{searchQuery}"</Text>
            </View>
          }
        />
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  closeBtn: {
    marginLeft: 15,
  },
  closeText: {
    color: COLORS.accent,
    fontSize: 15,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: SPACING.xl,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.darkMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 50,
  },
  productCard: {
    width: (width - SPACING.lg * 3) / 2,
    marginBottom: 20,
    marginRight: SPACING.lg,
  },
  productImage: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    backgroundColor: COLORS.darkCard,
  },
  productInfo: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  productTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  productPrice: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  emptyContainer: {
    paddingTop: 100,
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  emptyText: {
    color: COLORS.darkMuted,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
  },
});
