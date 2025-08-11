import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { Theme, ThemeContextType, ThemeConfig } from './types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{
  themes: ThemeConfig;
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
}> = ({ themes, children, defaultTheme = 'light' }) => {
  const [isDarkMode, setIsDarkMode] = useState(defaultTheme === 'dark');
  const [customTheme, setCustomTheme] = useState<Partial<Theme> | null>(null);
  
  const theme = useMemo(() => {
    const baseTheme = isDarkMode ? themes.dark : themes.light;
    return customTheme ? { ...baseTheme, ...customTheme } : baseTheme;
  }, [isDarkMode, themes, customTheme]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const updateTheme = useCallback((path: string, value: any) => {
    setCustomTheme(prev => {
      const newTheme = { ...prev };
      const keys = path.split('.');
      let current: any = newTheme;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newTheme;
    });
  }, []);

  const contextValue: ThemeContextType = {
    theme,
    isDarkMode,
    toggleTheme,
    updateTheme
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
