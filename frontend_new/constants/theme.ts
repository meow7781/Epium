export const COLORS = {
  // Core Brand
  primary: '#E8651A',       // Saffron
  primaryLight: '#FF8C42',
  primaryDark: '#C24D0A',
  secondary: '#6B1E2F',     // Deep Burgundy
  accent: '#D4A853',        // Gold
  accentLight: '#F0C97A',

  // Dark theme
  darkBg: '#0D0B0A',
  darkCard: '#1A1614',
  darkCardAlt: '#231E1B',
  darkBorder: '#2E2520',
  darkMuted: '#6B6460',

  // Light theme
  lightBg: '#FAF7F2',
  lightCard: '#FFFFFF',
  lightCardAlt: '#F2EDE6',
  lightBorder: '#E8E0D5',
  lightMuted: '#9B9088',

  // Pink theme
  pinkBg: '#FFF0F5',
  pinkCard: '#FFFFFF',
  pinkCardAlt: '#FFD1DC',
  pinkBorder: '#FFC0CB',
  pinkMuted: '#DB7093',
  pinkPrimary: '#FF69B4',

  // Text
  textWhite: '#FAF7F2',
  textBlack: '#0D0B0A',
  textMuted: '#9B9088',

  // Status
  success: '#4CAF50',
  error: '#E53935',
  warning: '#FFA726',
  info: '#42A5F5',

  // Gradients (as arrays for LinearGradient)
  gradientPrimary: ['#E8651A', '#C24D0A'],
  gradientBurgundy: ['#6B1E2F', '#3D0F1A'],
  gradientGold: ['#D4A853', '#B8892E'],
  gradientDark: ['#1A1614', '#0D0B0A'],
} as const;

export const TYPOGRAPHY = {
  // Sizes
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 30,
  '3xl': 38,
  '4xl': 48,

  // Weights
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,

  // Line Heights
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 56,
  '5xl': 72,
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 28,
  full: 999,
};

export const SHADOW = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 16,
    elevation: 10,
  },
  primary: {
    shadowColor: '#E8651A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
};
