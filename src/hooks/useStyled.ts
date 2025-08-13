import { useTheme } from '../ThemeProvider';
import { Theme, StyledStyles, ThemeTokenPath } from '../types';

export const useStyled = () => {
  const { theme, isHydrated } = useTheme();
  
  const getTokenValue = (path: ThemeTokenPath, fallback?: string | number): string | number => {
    if (!isHydrated) return fallback || '';
    
    const keys = path.split('.');
    let current: any = theme;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Theme token not found, return fallback or empty string
        console.warn(`Theme token not found: ${path}`);
        return fallback || '';
      }
    }
    
    return current;
  };

  const styled = (
    styles: Record<string, ThemeTokenPath | string | number>,
    fallbacks?: Record<string, string | number>
  ): StyledStyles => {
    return Object.entries(styles).reduce((acc, [prop, value]) => {
      if (typeof value === 'string' && value.includes('.')) {
        // Assume it's a theme token path
        const fallback = fallbacks?.[prop];
        return { ...acc, [prop]: getTokenValue(value as ThemeTokenPath, fallback) };
      }
      return { ...acc, [prop]: value };
    }, {});
  };

  const getColor = (color: keyof Theme['colors'], fallback?: string): string => {
    if (!isHydrated) return fallback || '#000000';
    return theme.colors[color] || fallback || '#000000';
  };

  const getSpacing = (spacing: keyof Theme['spacing'], fallback?: string): string => {
    if (!isHydrated) return fallback || '0';
    return theme.spacing[spacing] || fallback || '0';
  };

  const getTypography = (
    typography: keyof Theme['typography']['fontSize'], 
    fallback?: string
  ): string => {
    if (!isHydrated) return fallback || '1rem';
    return theme.typography.fontSize[typography] || fallback || '1rem';
  };

  const getShadow = (shadow: keyof Theme['shadows'], fallback?: string): string => {
    if (!isHydrated) return fallback || 'none';
    return theme.shadows[shadow] || fallback || 'none';
  };

  const getBorderRadius = (radius: keyof Theme['borderRadius'], fallback?: string): string => {
    if (!isHydrated) return fallback || '0';
    return theme.borderRadius[radius] || fallback || '0';
  };

  const getTransition = (transition: keyof Theme['transitions'], fallback?: string): string => {
    if (!isHydrated) return fallback || 'none';
    return theme.transitions[transition] || fallback || 'none';
  };

  const getFontWeight = (weight: keyof Theme['typography']['fontWeight'], fallback?: number): number => {
    if (!isHydrated) return fallback || 400;
    return theme.typography.fontWeight[weight] || fallback || 400;
  };

  const getFontFamily = (family: keyof Theme['typography']['fontFamily'], fallback?: string): string => {
    if (!isHydrated) return fallback || 'sans-serif';
    return theme.typography.fontFamily[family] || fallback || 'sans-serif';
  };

  const responsive = (
    breakpoint: keyof Theme['breakpoints'], 
    styles: StyledStyles
  ): Record<string, StyledStyles> => {
    if (!isHydrated) return {};
    return {
      [`@media (min-width: ${theme.breakpoints[breakpoint]})`]: styles
    };
  };

  // CSS variable helpers for better fallback support
  const cssVar = (name: string, fallback?: string): string => {
    if (!isHydrated) return fallback || '';
    return `var(--${name}, ${fallback || ''})`;
  };

  const colorVar = (color: keyof Theme['colors'], fallback?: string): string => {
    return cssVar(`color-${color}`, fallback);
  };

  const spacingVar = (spacing: keyof Theme['spacing'], fallback?: string): string => {
    return cssVar(`spacing-${spacing}`, fallback);
  };

  const fontSizeVar = (size: keyof Theme['typography']['fontSize'], fallback?: string): string => {
    return cssVar(`font-size-${size}`, fallback);
  };

  const shadowVar = (shadow: keyof Theme['shadows'], fallback?: string): string => {
    return cssVar(`shadow-${shadow}`, fallback);
  };

  const radiusVar = (radius: keyof Theme['borderRadius'], fallback?: string): string => {
    return cssVar(`radius-${radius}`, fallback);
  };

  return {
    styled,
    getColor,
    getSpacing,
    getTypography,
    getShadow,
    getBorderRadius,
    getTransition,
    getFontWeight,
    getFontFamily,
    responsive,
    cssVar,
    colorVar,
    spacingVar,
    fontSizeVar,
    shadowVar,
    radiusVar,
    theme,
    isHydrated
  };
};
