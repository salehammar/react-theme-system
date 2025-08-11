import React from 'react';
import { ThemeProvider as BaseThemeProvider, ThemeConfig as BaseThemeConfig } from 'react-theme-system';
import { customTheme, CustomThemeConfig } from './theme.types';

interface CustomThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
  customThemes?: CustomThemeConfig;
}

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
  defaultTheme = 'light',
  customThemes = customTheme
}) => {
  return (
    <BaseThemeProvider themes={customThemes} defaultTheme={defaultTheme}>
      {children}
    </BaseThemeProvider>
  );
};

export { useTheme } from 'react-theme-system';
export type { CustomTheme, CustomThemeConfig };
