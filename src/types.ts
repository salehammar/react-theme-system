export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  divider: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
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
}

export interface ThemeZIndex {
  dropdown: number;
  sticky: number;
  fixed: number;
  modal: number;
  popover: number;
  tooltip: number;
}

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

export interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  updateTheme: (path: string, value: any) => void;
}

export interface StyledProps {
  bg?: keyof ThemeColors;
  color?: keyof ThemeColors;
  p?: keyof ThemeSpacing;
  px?: keyof ThemeSpacing;
  py?: keyof ThemeSpacing;
  m?: keyof ThemeSpacing;
  mx?: keyof ThemeSpacing;
  my?: keyof ThemeSpacing;
  borderRadius?: keyof ThemeBorderRadius;
  shadow?: keyof ThemeShadows;
  fontSize?: keyof ThemeTypography['fontSize'];
  fontWeight?: keyof ThemeTypography['fontWeight'];
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface ThemeConfig {
  light: Theme;
  dark: Theme;
}

export interface StyledStyles {
  [key: string]: string | number;
}

export type ThemeTokenPath = 
  | `colors.${keyof ThemeColors}`
  | `spacing.${keyof ThemeSpacing}`
  | `typography.fontSize.${keyof ThemeTypography['fontSize']}`
  | `typography.fontWeight.${keyof ThemeTypography['fontWeight']}`
  | `shadows.${keyof ThemeShadows}`
  | `borderRadius.${keyof ThemeBorderRadius}`;
