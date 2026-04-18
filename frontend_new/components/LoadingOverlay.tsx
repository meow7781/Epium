import React from 'react';
import { View, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { Text } from './Themed';
import { COLORS, TYPOGRAPHY, SPACING } from '../constants/theme';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export default function LoadingOverlay({ visible, message = 'Epium' }: LoadingOverlayProps) {
  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.container}>
        <Animated.View 
          entering={FadeIn} 
          exiting={FadeOut}
          style={styles.content}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(13, 11, 10, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: SPACING.xl,
    borderRadius: 20,
    backgroundColor: COLORS.darkCard,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.darkBorder,
  },
  text: {
    marginTop: SPACING.base,
    color: COLORS.textWhite,
    fontSize: TYPOGRAPHY.base,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
