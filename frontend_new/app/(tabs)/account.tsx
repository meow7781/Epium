import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Image, Alert, Dimensions, Platform, StatusBar } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { useAppStore } from '../../store/appStore';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function AccountScreen() {
  const router = useRouter();
  const { user, logout, themeMode } = useAppStore();
  const isDark = themeMode === 'dark';
  const isPink = themeMode === 'pink';

  const getBackgroundColor = () => {
    if (isDark) return '#0D0B0A';
    if (isPink) return COLORS.pinkBg;
    return '#F8F9FA';
  };

  const getHeaderColor = () => {
    if (isDark) return '#060606';
    if (isPink) return COLORS.pinkCard;
    return '#FFF';
  };

  const getTextColor = () => {
    if (isDark) return '#FFF';
    if (isPink) return COLORS.pinkMuted;
    return '#111';
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to exit your luxury session?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => {
        logout();
        router.replace('/auth');
      }},
    ]);
  };

  const renderOption = (icon: any, title: string, subtitle?: string, onPress?: () => void, isDestructive = false) => (
    <Pressable 
      style={({ pressed }) => [
        styles.optionRow, 
        { borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : (isPink ? COLORS.pinkBorder : '#F8F9FA') },
        pressed && { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : (isPink ? 'rgba(255,105,180,0.05)' : 'rgba(0,0,0,0.02)') }
      ]} 
      onPress={onPress}
    >
      <View style={[
        styles.optionIcon, 
        { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : (isPink ? 'rgba(255,105,180,0.1)' : '#F8F9FA') },
        isDestructive && { backgroundColor: 'rgba(255, 69, 58, 0.1)' }
      ]}>
        <Ionicons name={icon} size={20} color={isDestructive ? '#FF453A' : (isDark ? '#FFF' : (isPink ? COLORS.pinkPrimary : '#111'))} />
      </View>
      <View style={styles.optionContent}>
        <Text style={[styles.optionTitle, { color: getTextColor() }, isDestructive && { color: '#FF453A' }]}>{title}</Text>
        {subtitle && <Text style={[styles.optionSubtitle, isPink && { color: COLORS.pinkMuted }]}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={18} color={isDark ? '#444' : (isPink ? COLORS.pinkPrimary : '#CCC')} />
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <View style={[styles.header, { backgroundColor: getHeaderColor() }]}>
        <View style={styles.topRow}>
          <Pressable style={[styles.headerBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : (isPink ? 'rgba(255,105,180,0.1)' : '#F8F9FA') }]} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color={getTextColor()} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: getTextColor() }]}>Profile</Text>
          <Pressable style={[styles.headerBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : (isPink ? 'rgba(255,105,180,0.1)' : '#F8F9FA') }]} onPress={() => router.push('/settings')}>
            <Ionicons name="settings-outline" size={24} color={getTextColor()} />
          </Pressable>
        </View>

        {/* Profile Card - Minimalist Style */}
        <Animated.View entering={FadeInDown.duration(800)} style={[styles.profileCard, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : (isPink ? 'rgba(255,105,180,0.05)' : '#F8F9FA') }]}>
          <Image 
            source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200' }} 
            style={styles.avatar} 
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.nameText, { color: getTextColor() }]}>{user?.name || 'Gaurav Paul'}</Text>
            <Text style={[styles.emailText, isPink && { color: COLORS.pinkMuted }]}>{user?.email || 'heritage@epium.com'}</Text>
          </View>
          <Pressable 
            style={({ pressed }) => [styles.editBtn, pressed && { opacity: 0.8 }]}
            onPress={() => Alert.alert("Profile Encryption", "Accessing secure profile editor...")}
          >
            <Ionicons name="pencil" size={12} color="#FFF" />
            <Text style={styles.editText}>Edit</Text>
          </Pressable>
        </Animated.View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Personal Hub</Text>
          <View style={[styles.cardContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : (isPink ? COLORS.pinkCard : '#FFF') }]}>
            {renderOption('bag-handle-outline', 'Order History', 'Track your recent masterpieces', () => router.push('/orders'))}
            {renderOption('heart-outline', 'My Wishlist', '12 items saved for later', () => router.push('/wishlist'))}
            {renderOption('location-outline', 'Shipping Addresses', 'Varanasi, Uttar Pradesh', () => router.push('/addresses'))}
            {renderOption('card-outline', 'Payment Vault', 'Managed via Secure EpiUm Gateway', () => router.push('/settings'))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Admin & More</Text>
          <View style={[styles.cardContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : (isPink ? COLORS.pinkCard : '#FFF') }]}>
            {user?.role === 'admin' && renderOption('shield-checkmark-outline', 'Admin Console', 'System management', () => router.push('/admin'))}
            {renderOption('help-circle-outline', 'Customer Concierge')}
            {renderOption('log-out-outline', 'Sign Out', undefined, handleLogout, true)}
          </View>
        </View>
        
        <Text style={styles.versionText}>EpiUm Luxury Edition v1.0.4</Text>
      </ScrollView>
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
    backgroundColor: '#FFF',
    paddingBottom: 25,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    ...SHADOW.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginBottom: 30,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
  },
  profileCard: {
    marginHorizontal: SPACING.xl,
    backgroundColor: '#F8F9FA',
    borderRadius: 30,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOW.xs,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#E0E0E0',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },
  emailText: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
    fontWeight: '500',
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scrollContent: {
    padding: SPACING.xl,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 15,
    marginLeft: 5,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 25,
    overflow: 'hidden',
    ...SHADOW.sm,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
    marginLeft: 15,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
  },
  optionSubtitle: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
    marginTop: 10,
  },
});
