import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const STATS = [
  { label: 'Revenue', value: '₹4.2L', icon: 'cash-outline', color: COLORS.success },
  { label: 'Orders', value: '1,280', icon: 'cart-outline', color: COLORS.primary },
  { label: 'Users', value: '8.5K', icon: 'people-outline', color: COLORS.info },
  { label: 'Artisans', value: '450', icon: 'star-outline', color: COLORS.accent },
];

export default function AdminDashboard() {
  const router = useRouter();

  const renderStatCard = (stat: typeof STATS[0], index: number) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(600)}
      style={styles.statCard}
    >
      <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
        <Ionicons name={stat.icon as any} size={20} color={stat.color} />
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </Animated.View>
  );

  const renderMenuBtn = (title: string, icon: any, route: any) => (
    <Pressable 
      style={styles.menuBtn}
      onPress={() => router.push(route)}
    >
      <View style={styles.menuLeft}>
        <View style={styles.menuIconContainer}>
          <Ionicons name={icon} size={22} color={COLORS.accent} />
        </View>
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.darkMuted} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Admin Console</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Performance Overview</Text>
        <View style={styles.statsGrid}>
          {STATS.map((stat, i) => renderStatCard(stat, i))}
        </View>

        <Text style={styles.sectionTitle}>Management</Text>
        <View style={styles.card}>
          {renderMenuBtn('User Registry', 'people-outline', '/admin/users')}
          {renderMenuBtn('Order Management', 'receipt-outline', '/admin/orders')}
          {renderMenuBtn('Inventory & Catalog', 'grid-outline', '/admin/products')}
          {renderMenuBtn('Artisan Payouts', 'ribbon-outline', '/admin/index')}
        </View>

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.card}>
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <Text style={styles.activityText}>New login: <Text style={styles.highlight}>gaurav@epium.com</Text></Text>
            <Text style={styles.activityTime}>2m ago</Text>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <Text style={styles.activityText}>Purchase: <Text style={styles.highlight}>Banarasi Silk</Text> by User A</Text>
            <Text style={styles.activityTime}>15m ago</Text>
          </View>
          <View style={[styles.activityItem, { borderBottomWidth: 0 }]}>
            <View style={styles.activityDot} />
            <Text style={styles.activityText}>New signup: <Text style={styles.highlight}>artisan.k@weaver.in</Text></Text>
            <Text style={styles.activityTime}>1h ago</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>System Status</Text>
        <View style={styles.card}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Payment Gateway</Text>
            <View style={styles.statusBadge}>
              <View style={[styles.statusDot, { backgroundColor: COLORS.success }]} />
              <Text style={styles.statusText}>Operational</Text>
            </View>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>AR Model Server</Text>
            <View style={styles.statusBadge}>
              <View style={[styles.statusDot, { backgroundColor: COLORS.success }]} />
              <Text style={styles.statusText}>99.9% Sync</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.reportBtn}>
          <LinearGradient
            colors={COLORS.gradientPrimary}
            style={styles.reportGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Ionicons name="download-outline" size={20} color="#FFF" />
            <Text style={styles.reportText}>Generate Weekly Report</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
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
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
  content: {
    padding: SPACING.xl,
    paddingBottom: 60,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: SPACING.lg,
    marginTop: SPACING.base,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
  },
  statCard: {
    width: (width - SPACING.xl * 3) / 2,
    backgroundColor: COLORS.darkCard,
    padding: SPACING.md,
    borderRadius: RADIUS.xl,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
    ...SHADOW.sm,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.darkMuted,
    marginTop: 2,
  },
  card: {
    backgroundColor: COLORS.darkCard,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
    ...SHADOW.sm,
  },
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.02)',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(212, 168, 83, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  menuTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.02)',
  },
  activityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
    marginRight: 12,
  },
  activityText: {
    flex: 1,
    color: '#FFF',
    fontSize: 13,
    fontWeight: '500',
  },
  highlight: {
    color: COLORS.accent,
    fontWeight: '700',
  },
  activityTime: {
    color: COLORS.darkMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.02)',
  },
  statusLabel: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    color: COLORS.success,
    fontSize: 11,
    fontWeight: '700',
  },
  reportBtn: {
    height: 56,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
    marginTop: SPACING.lg,
  },
  reportGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
});
