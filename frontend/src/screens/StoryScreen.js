import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { X, Calendar } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { COLORS, SPACING } from '../theme/colors';

export default function StoryScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Artisan Story</Text>
            <Pressable onPress={() => navigation.goBack()} style={styles.closeBtn}>
                <X color={COLORS.text} size={24} />
            </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
            <Animated.Text entering={FadeInUp.delay(100)} style={styles.title}>
            The Making of {product.title}
            </Animated.Text>
            <Animated.Text entering={FadeInUp.delay(200)} style={styles.subtitle}>
            By {product.artisan} in {product.location}
            </Animated.Text>

            <View style={styles.timeline}>
                {[
                    { year: 'Generations Past', text: 'The craft was born along the local riverbanks, utilizing the natural mud and elements provided by the earth.' },
                    { year: '20 Years Ago', text: `${product.artisan} began their journey learning from village elders, perfecting the delicate art of hand weaving.` },
                    { year: 'Today', text: `Each piece takes weeks to craft and directly supports ${product.artisan}'s family and local community, preserving this ancient heritage.` }
                ].map((item, index) => (
                    <Animated.View 
                        key={index} 
                        entering={FadeInUp.delay(300 + (index * 150))}
                        style={styles.timelineItem}
                    >
                        <View style={styles.timelineIcon}>
                            <Calendar color={COLORS.primary} size={16} />
                        </View>
                        <View style={styles.timelineContent}>
                            <Text style={styles.timelineYear}>{item.year}</Text>
                            <Text style={styles.timelineText}>{item.text}</Text>
                        </View>
                    </Animated.View>
                ))}
            </View>

            <Animated.View entering={FadeInUp.delay(800)} style={styles.quoteBlock}>
                <Text style={styles.quote}>
                    "{product.story}"
                </Text>
                <Text style={styles.quoteAuthor}>- {product.artisan}</Text>
            </Animated.View>
            
            {/* Adding extra space at the bottom for scroll comfort */}
            <View style={{height: 100}} /> 
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface, // Distinct from background to feel like a modal
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeBtn: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
  },
  content: {
    padding: SPACING.xl,
  },
  title: {
    color: COLORS.primary,
    fontSize: 32,
    fontFamily: 'serif',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.textMuted,
    fontSize: 16,
    marginBottom: 40,
  },
  timeline: {
    marginLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    paddingBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 32,
    paddingRight: 20,
  },
  timelineIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -16, // Center on the line
    marginRight: 16,
  },
  timelineContent: {
    flex: 1,
  },
  timelineYear: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  timelineText: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 24,
  },
  quoteBlock: {
    marginTop: 40,
    padding: 24,
    backgroundColor: 'rgba(226, 194, 155, 0.05)',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  quote: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'serif',
    fontStyle: 'italic',
    lineHeight: 28,
    marginBottom: 16,
  },
  quoteAuthor: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  }
});
