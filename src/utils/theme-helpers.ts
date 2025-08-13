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
        accent: '#4895ef',
        background: '#ffffff',
        surface: '#f8f9fa',
        text: {
          primary: '#212529',
          secondary: '#6c757d',
          disabled: '#adb5bd'
        },
        border: '#dee2e6',
        error: '#dc3545',
        warning: '#ffc107',
        success: '#28a745',
        info: '#17a2b8'
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '3rem',
        xxl: '4rem',
        scale: (multiplier: number) => `${multiplier * 0.25}rem`
      },
      typography: {
        fontFamily: {
          primary: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          secondary: 'Georgia, "Times New Roman", serif',
          mono: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace'
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem'
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
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none'
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
        normal: '300ms ease-in-out',
        slow: '500ms ease-in-out',
        ease: {
          in: 'ease-in',
          out: 'ease-out',
          inOut: 'ease-in-out'
        }
      },
      zIndex: {
        hide: -1,
        auto: 0,
        base: 0,
        docked: 10,
        dropdown: 1000,
        sticky: 1100,
        banner: 1200,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        skipLink: 1600,
        toast: 1700,
        tooltip: 1800
      }
    },
    dark: {
      colors: {
        primary: '#60a5fa',
        secondary: '#818cf8',
        accent: '#34d399',
        background: '#0f172a',
        surface: '#1e293b',
        text: {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
          disabled: '#64748b'
        },
        border: '#334155',
        error: '#f87171',
        warning: '#fbbf24',
        success: '#4ade80',
        info: '#60a5fa'
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '3rem',
        xxl: '4rem',
        scale: (multiplier: number) => `${multiplier * 0.25}rem`
      },
      typography: {
        fontFamily: {
          primary: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          secondary: 'Georgia, "Times New Roman", serif',
          mono: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace'
        },
        fontSize: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
          '4xl': '2.25rem'
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
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
        none: 'none'
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
        normal: '300ms ease-in-out',
        slow: '500ms ease-in-out',
        ease: {
          in: 'ease-in',
          out: 'ease-out',
          inOut: 'ease-in-out'
        }
      },
      zIndex: {
        hide: -1,
        auto: 0,
        base: 0,
        docked: 10,
        dropdown: 1000,
        sticky: 1100,
        banner: 1200,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        skipLink: 1600,
        toast: 1700,
        tooltip: 1800
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
