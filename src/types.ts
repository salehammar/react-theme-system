import React from 'react';

export const VALID_THEMES = ['light', 'dark'] as const;
export type ValidTheme = typeof VALID_THEMES[number];

// Enhanced theme structure with better typing
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  // Function for dynamic spacing
  scale: (multiplier: number) => string;
}

export interface ThemeTypography {
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

export interface ThemeBorderRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeBreakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ThemeTransitions {
  fast: string;
  normal: string;
  slow: string;
  ease: {
    in: string;
    out: string;
    inOut: string;
  };
}

export interface ThemeZIndex {
  hide: number;
  auto: number;
  base: number;
  docked: number;
  dropdown: number;
  sticky: number;
  banner: number;
  overlay: number;
  modal: number;
  popover: number;
  skipLink: number;
  toast: number;
  tooltip: number;
}

// Enhanced Theme interface with better structure
export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  borderRadius: ThemeBorderRadius;
  breakpoints: ThemeBreakpoints;
  transitions: ThemeTransitions;
  zIndex: ThemeZIndex;
}

export interface ThemeConfig {
  light: Theme;
  dark: Theme;
}

// Theme token path type for better autocomplete
export type ThemeTokenPath = 
  | 'colors.primary'
  | 'colors.secondary'
  | 'colors.accent'
  | 'colors.background'
  | 'colors.surface'
  | 'colors.text.primary'
  | 'colors.text.secondary'
  | 'colors.text.disabled'
  | 'colors.border'
  | 'colors.error'
  | 'colors.warning'
  | 'colors.success'
  | 'colors.info'
  | 'spacing.xs'
  | 'spacing.sm'
  | 'spacing.md'
  | 'spacing.lg'
  | 'spacing.xl'
  | 'spacing.xxl'
  | 'typography.fontFamily.primary'
  | 'typography.fontFamily.secondary'
  | 'typography.fontFamily.mono'
  | 'typography.fontSize.xs'
  | 'typography.fontSize.sm'
  | 'typography.fontSize.base'
  | 'typography.fontSize.lg'
  | 'typography.fontSize.xl'
  | 'typography.fontSize.2xl'
  | 'typography.fontSize.3xl'
  | 'typography.fontSize.4xl'
  | 'typography.fontWeight.light'
  | 'typography.fontWeight.normal'
  | 'typography.fontWeight.medium'
  | 'typography.fontWeight.semibold'
  | 'typography.fontWeight.bold'
  | 'typography.lineHeight.tight'
  | 'typography.lineHeight.normal'
  | 'typography.lineHeight.relaxed'
  | 'shadows.sm'
  | 'shadows.md'
  | 'shadows.lg'
  | 'shadows.xl'
  | 'shadows.2xl'
  | 'shadows.inner'
  | 'shadows.none'
  | 'borderRadius.none'
  | 'borderRadius.sm'
  | 'borderRadius.md'
  | 'borderRadius.lg'
  | 'borderRadius.xl'
  | 'borderRadius.full'
  | 'breakpoints.sm'
  | 'breakpoints.md'
  | 'breakpoints.lg'
  | 'breakpoints.xl'
  | 'breakpoints.2xl'
  | 'transitions.fast'
  | 'transitions.normal'
  | 'transitions.slow'
  | 'transitions.ease.in'
  | 'transitions.ease.out'
  | 'transitions.ease.inOut'
  | 'zIndex.hide'
  | 'zIndex.auto'
  | 'zIndex.base'
  | 'zIndex.docked'
  | 'zIndex.dropdown'
  | 'zIndex.sticky'
  | 'zIndex.banner'
  | 'zIndex.overlay'
  | 'zIndex.modal'
  | 'zIndex.popover'
  | 'zIndex.skipLink'
  | 'zIndex.toast'
  | 'zIndex.tooltip';

export interface StyledProps {
  theme?: Theme;
}

export interface StyledStyles {
  [key: string]: string | number;
}

// Enhanced context type with better API
export interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  currentTheme: ValidTheme | undefined;
  isHydrated: boolean;
  setTheme: (_theme: ValidTheme) => void;
  toggleTheme: () => void;
  updateTheme: (_path: string, _value?: any) => void;
  resetCustomTheme: () => void;
  // New: System theme detection
  systemTheme: ValidTheme | null;
  // New: Theme utilities
  getToken: (path: ThemeTokenPath, fallback?: string | number) => string | number;
  getCSSVariable: (path: ThemeTokenPath, fallback?: string) => string;
}

// Enhanced provider props
export interface ThemeProviderProps {
  themes?: ThemeConfig;
  defaultTheme?: ValidTheme;
  onChange?: (_theme: ValidTheme) => void;
  enablePersistence?: boolean;
  // New: System theme detection
  enableSystemTheme?: boolean;
  // New: Theme validation
  validateTheme?: boolean;
}
