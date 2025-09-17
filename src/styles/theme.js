export const colors = {
  primary: '#2E8B57', // Sea Green - evokes nature and trust
  primaryDark: '#1F5F3F',
  secondary: '#4A90E2', // Modern Blue
  accent: '#FF6B6B', // Coral for highlights
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
  
  // Light theme
  background: '#FFFFFF',
  surface: '#F8F9FA',
  text: '#2C3E50',
  textSecondary: '#7F8C8D',
  border: '#E9ECEF',
  
  // Dark theme
  backgroundDark: '#1A1A1A',
  surfaceDark: '#2D2D2D',
  textDark: '#FFFFFF',
  textSecondaryDark: '#B0B0B0',
  borderDark: '#404040',
};

export const lightTheme = {
  colors: {
    primary: colors.primary,
    primaryDark: colors.primaryDark,
    secondary: colors.secondary,
    accent: colors.accent,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    textSecondary: colors.textSecondary,
    border: colors.border,
  },
};

export const darkTheme = {
  colors: {
    primary: colors.primary,
    primaryDark: colors.primaryDark,
    secondary: colors.secondary,
    accent: colors.accent,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    background: colors.backgroundDark,
    surface: colors.surfaceDark,
    text: colors.textDark,
    textSecondary: colors.textSecondaryDark,
    border: colors.borderDark,
  },
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
};