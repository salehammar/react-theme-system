import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from 'react';
import { Theme, ThemeContextType, ThemeConfig, ValidTheme, ThemeTokenPath } from './types';
import { themeValidator } from './utils/theme-schema';

// Theme validation constants
export const VALID_THEMES = ['light', 'dark'] as const;

// Theme storage key
const THEME_STORAGE_KEY = 'react-theme-system-theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  themes?: ThemeConfig;
  children: React.ReactNode;
  defaultTheme?: ValidTheme;
  onChange?: (_theme: ValidTheme) => void;
  enablePersistence?: boolean;
  enableSystemTheme?: boolean;
  validateTheme?: boolean;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  themes, 
  children, 
  defaultTheme = 'light',
  onChange,
  enablePersistence = true,
  enableSystemTheme = false,
  validateTheme = false
}) => {
  // Use undefined initially to prevent hydration mismatch
  const [currentTheme, setCurrentTheme] = useState<ValidTheme | undefined>(undefined);
  const [customTheme, setCustomTheme] = useState<Partial<Theme> | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [systemTheme, setSystemTheme] = useState<ValidTheme | null>(null);
  
  // Theme validation function
  const isValidTheme = (theme: string): theme is ValidTheme => {
    return VALID_THEMES.includes(theme as ValidTheme);
  };

  // System theme detection
  useEffect(() => {
    if (!enableSystemTheme || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    updateSystemTheme();
    mediaQuery.addEventListener('change', updateSystemTheme);

    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, [enableSystemTheme]);

  // Theme validation
  useEffect(() => {
    if (validateTheme && themes) {
      const validation = themeValidator.validate(themes);
      if (!validation.isValid) {
        console.error('Theme validation failed:', validation.errors);
      }
      if (validation.warnings.length > 0) {
        console.warn('Theme validation warnings:', validation.warnings);
      }
    }
  }, [themes, validateTheme]);

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
    if (!themes) {
      // Return a minimal theme if no themes provided
      return {
        colors: { primary: '#000', secondary: '#666', accent: '#007bff', background: '#fff', surface: '#f8f9fa', text: { primary: '#000', secondary: '#666', disabled: '#999' }, border: '#dee2e6', error: '#dc3545', warning: '#ffc107', success: '#28a745', info: '#17a2b8' },
        spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '3rem', xxl: '4rem', scale: (m: number) => `${m * 0.25}rem` },
        typography: { fontFamily: { primary: 'system-ui', secondary: 'Georgia', mono: 'monospace' }, fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' }, fontWeight: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 }, lineHeight: { tight: '1.25', normal: '1.5', relaxed: '1.75' } },
        shadows: { sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)', inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)', none: 'none' },
        borderRadius: { none: '0', sm: '0.125rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', full: '9999px' },
        breakpoints: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
        transitions: { fast: '150ms', normal: '300ms', slow: '500ms', ease: { in: 'ease-in', out: 'ease-out', inOut: 'ease-in-out' } },
        zIndex: { hide: -1, auto: 0, base: 0, docked: 10, dropdown: 1000, sticky: 1100, banner: 1200, overlay: 1300, modal: 1400, popover: 1500, skipLink: 1600, toast: 1700, tooltip: 1800 }
      } as Theme;
    }
    
    if (!currentTheme) return themes.light; // Fallback during SSR
    
    const baseTheme = currentTheme === 'dark' ? themes.dark : themes.light;
    return customTheme ? { ...baseTheme, ...customTheme } : baseTheme;
  }, [currentTheme, themes, customTheme]);

  // Get token value from theme
  const getToken = useCallback((path: ThemeTokenPath, fallback?: string | number): string | number => {
    if (!isHydrated || !themes) return fallback || '';
    
    const keys = path.split('.');
    let current: any = theme;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        console.warn(`Theme token not found: ${path}`);
        return fallback || '';
      }
    }
    
    return current;
  }, [theme, isHydrated, themes]);

  // Get CSS variable string
  const getCSSVariable = useCallback((path: ThemeTokenPath, fallback?: string): string => {
    const value = getToken(path, fallback);
    const cssVarName = `--${path.replace(/\./g, '-')}`;
    return `var(${cssVarName}, ${fallback || value})`;
  }, [getToken]);

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
    systemTheme,
    setTheme,
    toggleTheme,
    updateTheme,
    resetCustomTheme: () => setCustomTheme(null),
    getToken,
    getCSSVariable
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
