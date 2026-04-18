import React from 'react';
import { View, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInLeft } from 'react-native-reanimated';

const MOCK_USERS = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul.s@gmail.com', method: 'Google', totalSpend: '₹14,500', joined: '2 days ago' },
  { id: '2', name: 'Ananya Iyer', email: 'ani@outlook.com', method: 'Email', totalSpend: '₹8,200', joined: '1 week ago' },
  { id: '3', name: 'Vikram Singh', email: 'vikram.v@yahoo.com', method: 'Google', totalSpend: '₹22,100', joined: '3 weeks ago' },
  { id: '4', name: 'Priya Verma', email: 'pverma@me.com', method: 'Guest', totalSpend: '₹1,200', joined: 'Today' },
  { id: '5', name: 'Sidharth Malhotra', email: 'sid.m@gmail.com', method: 'Email', totalSpend: '₹0', joined: 'Just now' },
];

export default function AdminUsersScreen() {
  const router = useRouter();

  const renderUser = ({ item, index }: { item: typeof MOCK_USERS[0], index: number }) => (
    <Animated.View 
      entering={FadeInLeft.delay(index * 80).duration(500)}
      style={styles.userCard}
    >
      <View style={styles.userIcon}>
        <Ionicons name="person" size={20} color={COLORS.accent} />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <View style={styles.tagRow}>
          <View style={styles.methodTag}>
            <Text style={styles.tagText}>{item.method}</Text>
          </View>
          <Text style={styles.joinedText}>Joined {item.joined}</Text>
        </View>
      </View>
      <View style={styles.userSpendContainer}>
        <Text style={styles.spendLabel}>Spent</Text>
        <Text style={styles.spendValue}>{item.totalSpend}</Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </Pressable>
        <Text style={styles.headerTitle}>User Registry</Text>
        <Pressable style={styles.headerBtn}>
          <Ionicons name="search" size={24} color="#FFF" />
        </Pressable>
      </View>

      <FlatList
        data={MOCK_USERS}
        renderItem={renderUser}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.statsBar}>
            <View style={styles.statItem}>
              <Text style={styles.statTitle}>Total Users</Text>
              <Text style={styles.statNumber}>8,542</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statTitle}>Active Today</Text>
              <Text style={styles.statNumber}>421</Text>
            </View>
          </View>
        }
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
  headerBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    paddingBottom: 40,
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.darkCard,
    margin: SPACING.xl,
    padding: SPACING.lg,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    ...SHADOW.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statTitle: {
    fontSize: 12,
    color: COLORS.darkMuted,
    fontWeight: '600',
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primary,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.darkCard,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    ...SHADOW.sm,
  },
  userIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(212, 168, 83, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  userName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  userEmail: {
    color: COLORS.darkMuted,
    fontSize: 12,
    marginTop: 2,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  methodTag: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  tagText: {
    color: COLORS.accent,
    fontSize: 10,
    fontWeight: '700',
  },
  joinedText: {
    color: COLORS.darkMuted,
    fontSize: 10,
  },
  userSpendContainer: {
    alignItems: 'flex-end',
  },
  spendLabel: {
    fontSize: 10,
    color: COLORS.darkMuted,
    fontWeight: '700',
    marginBottom: 2,
  },
  spendValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.success,
  },
});
