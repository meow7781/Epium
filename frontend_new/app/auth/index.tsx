import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TextInput, Pressable, KeyboardAvoidingView, Platform, Alert, Image } from 'react-native';
import { Text } from '../../components/Themed';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/appStore';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn, FadeOut } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function AuthScreen() {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = () => {
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setUser({
        id: 'u1',
        name: 'Gaurav User',
        email: email || 'user@example.com',
        role: email === 'admin@epium.com' ? 'admin' : 'user',
        isGuest: false
      });
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleGuest = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: '',
      role: 'user',
      isGuest: true
    });
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Background Video */}
      <Video
        source={{ uri: 'https://cdn.pixabay.com/video/2021/08/11/84687-587425178_large.mp4' }} // Beautiful artisan video
        style={StyleSheet.absoluteFillObject}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />
      
      {/* Dark Gradient Overlay */}
      <LinearGradient
        colors={['rgba(13,11,10,0.1)', 'rgba(13,11,10,0.8)', '#0D0B0A']}
        locations={[0, 0.4, 0.9]}
        style={StyleSheet.absoluteFillObject}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <Animated.View entering={FadeInDown.delay(300).duration(800)} style={styles.headerContainer}>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.logoImage} 
            resizeMode="contain"
          />
          <Text style={styles.tagline}>Discover Immersive Craftsmanship</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(800)} style={styles.formContainer}>
          {/* Form Toggle */}
          <View style={styles.toggleContainer}>
            <Pressable onPress={() => setIsLogin(true)} style={[styles.toggleBtn, isLogin && styles.toggleBtnActive]}>
              <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>Sign In</Text>
            </Pressable>
            <Pressable onPress={() => setIsLogin(false)} style={[styles.toggleBtn, !isLogin && styles.toggleBtnActive]}>
              <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>Create Account</Text>
            </Pressable>
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="mail-outline" size={20} color={COLORS.lightMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor={COLORS.darkMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.lightMuted} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={COLORS.darkMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {isLogin && (
            <Pressable 
              onPress={() => Alert.alert("Reset Password", "A recovery link has been sent to your heritage email.")}
              style={styles.forgotBtn}
            >
              <Text style={styles.forgotText}>Forgot Master Key?</Text>
            </Pressable>
          )}

          {!isLogin && (
            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.inputGroup}>
              <Ionicons name="person-outline" size={20} color={COLORS.lightMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={COLORS.darkMuted}
              />
            </Animated.View>
          )}

          <Pressable 
            style={({ pressed }) => [
              styles.mainButton, 
              pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
            ]} 
            onPress={handleAuth}
            disabled={isLoading}
          >
            <LinearGradient
              colors={COLORS.gradientPrimary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <Text style={styles.mainButtonText}>{isLoading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}</Text>
            </LinearGradient>
          </Pressable>

          {/* Social Auth */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <Pressable 
            style={({ pressed }) => [styles.socialButton, pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] }]}
            onLongPress={() => {
              Alert.alert("Admin Access", "Bypassing Firebase for Developer Build.");
              handleGuest(); // Or a specific admin setter
            }}
          >
            <Ionicons name="logo-google" size={20} color={COLORS.textWhite} />
            <Text style={styles.socialButtonText}>Google (Long Press for Dev)</Text>
          </Pressable>
          <Text style={styles.firebaseNote}>* Native Google Auth requires npx expo prebuild</Text>

          <Pressable style={styles.guestContainer} onPress={handleGuest}>
            <Text style={styles.guestText}>Browse as Guest</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.accent} />
          </Pressable>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBg,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: SPACING.xl,
    paddingBottom: Platform.OS === 'ios' ? 50 : SPACING.xl,
  },
  headerContainer: {
    marginBottom: SPACING['2xl'],
    alignItems: 'flex-start',
  },
  logoImage: {
    width: 140,
    height: 50,
    marginBottom: 5,
  },
  tagline: {
    fontSize: TYPOGRAPHY.md,
    color: COLORS.accentLight,
    marginTop: SPACING.xs,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  formContainer: {
    padding: SPACING.lg,
    borderRadius: RADIUS['2xl'],
    // Subtle glass effect
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: RADIUS.full,
    padding: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  toggleText: {
    color: COLORS.darkMuted,
    fontWeight: '600',
    fontSize: TYPOGRAPHY.sm,
  },
  toggleTextActive: {
    color: COLORS.textWhite,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    color: COLORS.textWhite,
    paddingVertical: SPACING.md,
    fontSize: TYPOGRAPHY.base,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.lg,
    paddingVertical: 4,
  },
  forgotText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  mainButton: {
    marginTop: SPACING.sm,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#FFF',
    fontSize: TYPOGRAPHY.md,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    color: COLORS.darkMuted,
    paddingHorizontal: SPACING.md,
    fontSize: TYPOGRAPHY.xs,
    fontWeight: '600',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  socialButtonText: {
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.base,
    fontWeight: '600',
    marginLeft: SPACING.sm,
  },
  guestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
  },
  guestText: {
    color: COLORS.accent,
    fontSize: TYPOGRAPHY.base,
    fontWeight: '600',
    marginRight: SPACING.xs,
  },
  firebaseNote: {
    textAlign: 'center',
    color: COLORS.darkMuted,
    fontSize: 10,
    marginTop: 8,
    fontStyle: 'italic',
  },
});
