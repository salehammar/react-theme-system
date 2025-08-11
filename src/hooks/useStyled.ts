import { useMemo } from 'react';
import { useTheme } from '../ThemeProvider';
import { Theme, StyledStyles, ThemeTokenPath } from '../types';

export const useStyled = () => {
  const { theme } = useTheme();
  
  const getTokenValue = (path: ThemeTokenPath): string | number => {
    const keys = path.split('.');
    let current: any = theme;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        console.warn(`Theme token not found: ${path}`);
        return '';
      }
    }
    
    return current;
  };

  const styled = (styles: Record<string, ThemeTokenPath | string | number>): StyledStyles => {
    return Object.entries(styles).reduce((acc, [prop, value]) => {
      if (typeof value === 'string' && value.includes('.')) {
        // Assume it's a theme token path
        return { ...acc, [prop]: getTokenValue(value as ThemeTokenPath) };
      }
      return { ...acc, [prop]: value };
    }, {});
  };

  const getColor = (color: keyof Theme['colors']): string => {
    return theme.colors[color];
  };

  const getSpacing = (spacing: keyof Theme['spacing']): string => {
    return theme.spacing[spacing];
  };

  const getTypography = (typography: keyof Theme['typography']['fontSize']): string => {
    return theme.typography.fontSize[typography];
  };

  const getShadow = (shadow: keyof Theme['shadows']): string => {
    return theme.shadows[shadow];
  };

  const getBorderRadius = (radius: keyof Theme['borderRadius']): string => {
    return theme.borderRadius[radius];
  };

  const getTransition = (transition: keyof Theme['transitions']): string => {
    return theme.transitions[transition];
  };

  const responsive = (breakpoint: keyof Theme['breakpoints'], styles: StyledStyles): Record<string, StyledStyles> => {
    return {
      [`@media (min-width: ${theme.breakpoints[breakpoint]})`]: styles
    };
  };

  return {
    styled,
    getColor,
    getSpacing,
    getTypography,
    getShadow,
    getBorderRadius,
    getTransition,
    responsive,
    theme
  };
};
