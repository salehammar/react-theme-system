import { Theme, ThemeConfig, ValidTheme, VALID_THEMES } from '../types';

/**
 * Theme configuration helper
 * Creates a validated theme configuration with fallbacks
 */
export const createThemeConfig = (config: Partial<ThemeConfig>): ThemeConfig => {
  const defaultConfig: ThemeConfig = {
    light: {
      colors: {
        primary: '#4361ee',
        secondary: '#3f37c9',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#2196f3',
        background: '#ffffff',
        surface: '#f8f9fa',
        text: '#212529',
        textSecondary: '#6c757d',
        border: '#dee2e6',
        divider: '#e9ecef'
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '3rem',
        xxl: '6rem'
      },
      typography: {
        fontFamily: {
          primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          secondary: 'Georgia, "Times New Roman", serif',
          mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem'
        },
        fontWeight: {
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700
        },
        lineHeight: {
          tight: '1.25',
          normal: '1.5',
          relaxed: '1.75'
        }
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px'
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      transitions: {
        fast: '150ms ease-in-out',
        normal: '250ms ease-in-out',
        slow: '350ms ease-in-out'
      },
      zIndex: {
        dropdown: 1000,
        sticky: 1020,
        fixed: 1030,
        modal: 1040,
        popover: 1050,
        tooltip: 1060
      }
    },
    dark: {
      colors: {
        primary: '#60a5fa',
        secondary: '#818cf8',
        success: '#34d399',
        warning: '#fbbf24',
        error: '#f87171',
        info: '#60a5fa',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f8fafc',
        textSecondary: '#cbd5e1',
        border: '#334155',
        divider: '#475569'
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '3rem',
        xxl: '6rem'
      },
      typography: {
        fontFamily: {
          primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          secondary: 'Georgia, "Times New Roman", serif',
          mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem'
        },
        fontWeight: {
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700
        },
        lineHeight: {
          tight: '1.25',
          normal: '1.5',
          relaxed: '1.75'
        }
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px'
      },
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
      },
      transitions: {
        fast: '150ms ease-in-out',
        normal: '250ms ease-in-out',
        slow: '350ms ease-in-out'
      },
      zIndex: {
        dropdown: 1000,
        sticky: 1020,
        fixed: 1030,
        modal: 1040,
        popover: 1050,
        tooltip: 1060
      }
    }
  };

  return {
    light: { ...defaultConfig.light, ...config.light },
    dark: { ...defaultConfig.dark, ...config.dark }
  };
};

/**
 * Theme validation function
 */
export const isValidTheme = (theme: string): theme is ValidTheme => {
  return VALID_THEMES.includes(theme as ValidTheme);
};

/**
 * Get theme from localStorage with fallback
 */
export const getStoredTheme = (defaultTheme: ValidTheme = 'light'): ValidTheme => {
  if (typeof window === 'undefined') return defaultTheme;
  
  try {
    const stored = localStorage.getItem('react-theme-system-theme');
    return stored && isValidTheme(stored) ? stored : defaultTheme;
  } catch {
    return defaultTheme;
  }
};

/**
 * Set theme in localStorage
 */
export const setStoredTheme = (theme: ValidTheme): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('react-theme-system-theme', theme);
  } catch (error) {
    console.warn('Failed to persist theme:', error);
  }
};

/**
 * Convert theme object to CSS variables
 */
export const themeToCSSVariables = (theme: Theme): Record<string, string> => {
  const cssVars: Record<string, string> = {};
  
  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    cssVars[`--color-${key}`] = value;
  });
  
  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });
  
  // Typography
  Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
    cssVars[`--font-size-${key}`] = value;
  });
  
  Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
    cssVars[`--font-weight-${key}`] = value.toString();
  });
  
  Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
    cssVars[`--font-family-${key}`] = value;
  });
  
  // Shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    cssVars[`--shadow-${key}`] = value;
  });
  
  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    cssVars[`--radius-${key}`] = value;
  });
  
  // Transitions
  Object.entries(theme.transitions).forEach(([key, value]) => {
    cssVars[`--transition-${key}`] = value;
  });
  
  // Z-index
  Object.entries(theme.zIndex).forEach(([key, value]) => {
    cssVars[`--z-${key}`] = value.toString();
  });
  
  return cssVars;
};

/**
 * Apply theme CSS variables to document
 */
export const applyThemeToDOM = (theme: Theme): void => {
  if (typeof document === 'undefined') return;
  
  const cssVars = themeToCSSVariables(theme);
  const root = document.documentElement;
  
  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};
