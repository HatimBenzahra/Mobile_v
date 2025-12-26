// ========== COLORS ==========

export const colors = {
  brand: '#1A73E8',
  brandDark: '#1557B0',

  white: '#FFFFFF',
  lightGray: '#E5E7EB',
  mediumGray: '#9CA3AF',

  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',

  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textMuted: '#9CA3AF',

  bgPrimary: '#FFFFFF',
  bgSecondary: '#F9FAFB',

  border: '#E5E7EB',
} as const;

// ========== SPACING ==========

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// ========== BORDER RADIUS ==========

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// ========== SHADOWS ==========

export const shadows = {
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;
