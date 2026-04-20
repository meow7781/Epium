import React from 'react';
import { View, StyleSheet, ScrollView, Pressable, Switch, Platform, Alert } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOW } from '../../constants/theme';
import { useAppStore } from '../../store/appStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SettingsScreen() {
  const router = useRouter();
  const { themeMode, setThemeMode, user, logout } = useAppStore();
  const isDark = themeMode === 'dark';
  const isPink = themeMode === 'pink';

  const getBackgroundColor = () => {
    if (isDark) return COLORS.darkBg;
    if (isPink) return COLORS.pinkBg;
    return '#F8F9FA';
  };

  const getCardColor = () => {
    if (isDark) return COLORS.darkCard;
    if (isPink) return COLORS.pinkCard;
    return '#FFF';
  };

  const getTextColor = () => {
    if (isDark) return '#FFF';
    if (isPink) return COLORS.pinkMuted;
    return '#111';
  };

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionTitle}>{title}</Text>
  );

  const renderThemeOption = (mode: 'light' | 'dark' | 'pink', label: string, icon: any) => {
    const isActive = themeMode === mode;
    return (
      <Pressable 
        onPress={() => setThemeMode(mode)}
        style={[
          styles.themeOption,
          isActive && { borderColor: COLORS.primary, backgroundColor: isDark ? 'rgba(232, 101, 26, 0.1)' : 'rgba(232, 101, 26, 0.05)' }
        ]}
      >
        <View style={styles.itemLeft}>
          <View style={[styles.iconContainer, { backgroundColor: isActive ? COLORS.primary : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)') }]}>
            <Ionicons name={icon} size={18} color={isActive ? '#FFF' : (isDark ? '#FFF' : '#666')} />
          </View>
          <Text style={[styles.itemTitle, { color: getTextColor(), fontWeight: isActive ? '700' : '500' }]}>{label}</Text>
        </View>
        <View style={[styles.radioOuter, { borderColor: isActive ? COLORS.primary : (isDark ? '#444' : '#DDD') }]}>
          {isActive && <View style={styles.radioInner} />}
        </View>
      </Pressable>
    );
  };


  const renderSettingItem = (icon: any, title: string, value?: string, onPress?: () => void, isLast = false) => (
    <Pressable 
      style={({ pressed }) => [
        styles.settingItem, 
        pressed && styles.itemPressed,
        isLast && { borderBottomWidth: 0 }
      ]}
      onPress={onPress}
    >
      <View style={styles.itemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(232, 101, 26, 0.08)' }]}>
          <Ionicons name={icon} size={20} color={isDark ? '#FFF' : (isPink ? COLORS.pinkPrimary : COLORS.accent)} />
        </View>
        <Text style={[styles.itemTitle, { color: getTextColor() }]}>{title}</Text>
      </View>
      <View style={styles.itemRight}>
        {value && <Text style={styles.itemValue}>{value}</Text>}
        <Ionicons name="chevron-forward" size={18} color={isDark ? '#444' : COLORS.darkMuted} />
      </View>
    </Pressable>
  );

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to exit your heritage account?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: "destructive", 
          onPress: () => {
            logout();
            router.replace('/auth');
          } 
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
          <Ionicons name="arrow-back" size={24} color={getTextColor()} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: getTextColor() }]}>Settings</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInDown.delay(100)}>
          {renderSectionHeader('Appearance')}
          <View style={[styles.sectionCard, { backgroundColor: getCardColor() }]}>
            {renderThemeOption('light', 'Light Mode', 'sunny-outline')}
            {renderThemeOption('dark', 'Dark Mode', 'moon-outline')}
            {renderThemeOption('pink', 'Pink Blossom', 'flower-outline')}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(150)}>
          {renderSectionHeader('Preference')}
          <View style={[styles.sectionCard, { backgroundColor: getCardColor() }]}>
            {renderSettingItem('notifications-outline', 'Notifications', 'Enabled', undefined, true)}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200)}>
          {renderSectionHeader('Security')}
          <View style={[styles.sectionCard, { backgroundColor: getCardColor() }]}>
            {renderSettingItem('lock-closed-outline', 'Security Key', 'Biometric', () => Alert.alert("Security", "FaceID is active for your vault."))}
            {renderSettingItem('shield-checkmark-outline', 'Payment Vault', 'Encrypted', undefined, true)}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300)}>
          {renderSectionHeader('Support')}
          <View style={[styles.sectionCard, { backgroundColor: getCardColor() }]}>
            {renderSettingItem('help-circle-outline', 'Help Center')}
            {renderSettingItem('document-text-outline', 'Legal Policy')}
            {renderSettingItem('star-outline', 'Rate EpiUm', '', undefined, true)}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)}>
          <Pressable 
            style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.8 }]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutText}>Log Out from EpiUm</Text>
          </Pressable>
          <Text style={styles.versionText}>EpiUm Premium v1.0.4-beta</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  content: {
    padding: SPACING.xl,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.darkMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginTop: 20,
  },
  sectionCard: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOW.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.03)',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  itemPressed: {
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(232, 101, 26, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemValue: {
    fontSize: 14,
    color: COLORS.darkMuted,
    marginRight: 8,
    fontWeight: '600',
  },
  logoutBtn: {
    marginTop: 40,
    height: 56,
    borderRadius: RADIUS.xl,
    backgroundColor: 'rgba(255, 69, 58, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 69, 58, 0.2)',
  },
  logoutText: {
    color: '#FF453A',
    fontSize: 16,
    fontWeight: '700',
  },
  versionText: {
    textAlign: 'center',
    color: COLORS.darkMuted,
    marginTop: 20,
    fontSize: 12,
    fontWeight: '600',
  },
});
