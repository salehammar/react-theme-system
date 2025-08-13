import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import { Theme, ThemeContextType, ThemeConfig } from './types';

// Theme validation constants
export const VALID_THEMES = ['light', 'dark'] as const;
export type ValidTheme = typeof VALID_THEMES[number];

// Theme storage key
const THEME_STORAGE_KEY = 'react-theme-system-theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  themes: ThemeConfig;
  children: React.ReactNode;
  defaultTheme?: ValidTheme;
  onChange?: (_theme: ValidTheme) => void;
  enablePersistence?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  themes, 
  children, 
  defaultTheme = 'light',
  onChange,
  enablePersistence = true
}) => {
  // Use undefined initially to prevent hydration mismatch
  const [currentTheme, setCurrentTheme] = useState<ValidTheme | undefined>(undefined);
  const [customTheme, setCustomTheme] = useState<Partial<Theme> | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Theme validation function
  const isValidTheme = (theme: string): theme is ValidTheme => {
    return VALID_THEMES.includes(theme as ValidTheme);
  };

  // Initialize theme on mount (SSR-safe)
  useEffect(() => {
    if (enablePersistence && typeof window !== 'undefined') {
      try {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        const theme = storedTheme && isValidTheme(storedTheme) 
          ? storedTheme 
          : (isValidTheme(defaultTheme) ? defaultTheme : 'light');
        
        setCurrentTheme(theme);
      } catch (error) {
        console.warn('Failed to read theme from localStorage:', error);
        setCurrentTheme(isValidTheme(defaultTheme) ? defaultTheme : 'light');
      }
    } else {
      setCurrentTheme(isValidTheme(defaultTheme) ? defaultTheme : 'light');
    }
    setIsHydrated(true);
  }, [defaultTheme, enablePersistence]);

  // Persist theme changes
  const persistTheme = useCallback((theme: ValidTheme) => {
    if (enablePersistence && typeof window !== 'undefined') {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (error) {
        console.warn('Failed to persist theme to localStorage:', error);
      }
    }
  }, [enablePersistence]);

  const theme = useMemo(() => {
    if (!currentTheme) return themes.light; // Fallback during SSR
    
    const baseTheme = currentTheme === 'dark' ? themes.dark : themes.light;
    return customTheme ? { ...baseTheme, ...customTheme } : baseTheme;
  }, [currentTheme, themes, customTheme]);

  const isDarkMode = currentTheme === 'dark';

  const setTheme = useCallback((newTheme: ValidTheme) => {
    if (!isValidTheme(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}. Valid themes are: ${VALID_THEMES.join(', ')}`);
      return;
    }
    
    setCurrentTheme(newTheme);
    persistTheme(newTheme);
    onChange?.(newTheme);
  }, [onChange, persistTheme]);

  const toggleTheme = useCallback(() => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
  }, [isDarkMode, setTheme]);

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
    currentTheme,
    isHydrated,
    setTheme,
    toggleTheme,
    updateTheme,
    resetCustomTheme: () => setCustomTheme(null)
  };

  // Don't render until hydrated to prevent SSR mismatch
  if (!isHydrated) {
    return (
      <ThemeContext.Provider value={contextValue}>
        <div style={{ visibility: 'hidden' }}>{children}</div>
      </ThemeContext.Provider>
    );
  }

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
