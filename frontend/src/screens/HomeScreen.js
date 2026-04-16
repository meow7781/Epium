import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, StatusBar, SafeAreaView } from 'react-native';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { COLORS, SPACING } from '../theme/colors';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // In a real app we would handle errors better, here we ensure it doesn't crash
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
      // Fallback data if backend is not running during demo
      setProducts([
        {
          id: 'fb1',
          title: 'Woven Jamdani Scarf',
          artisan: 'Priya Das',
          location: 'Phulia, West Bengal',
          image: 'https://images.unsplash.com/photo-1584988771970-d26b01b69106?q=80&w=2942&auto=format&fit=crop',
          price: '$45',
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.subtitle}>Discover</Text>
        <Text style={styles.title}>True Craftsmanship</Text>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <ProductCard item={item} index={index} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: COLORS.text,
    fontSize: 34,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: SPACING.xxl,
  }
});
