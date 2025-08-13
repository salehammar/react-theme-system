import { useCallback } from 'react';
import { useTheme } from '../ThemeProvider';
import { ValidTheme } from '../types';

/**
 * Headless hook for theme toggle functionality
 * Decouples theme logic from presentation, enabling custom UIs without fork-modifying
 * 
 * @example
 * ```tsx
 * const { isDark, toggle, setTheme } = useThemeToggle();
 * 
 * return (
 *   <button onClick={toggle}>
 *     {isDark ? '🌙' : '☀️'}
 *   </button>
 * );
 * ```
 */
export const useThemeToggle = () => {
  const { currentTheme, setTheme, isHydrated } = useTheme();

  const isDark = currentTheme === 'dark';
  const isLight = currentTheme === 'light';

  const toggle = useCallback(() => {
    if (!isHydrated) return;
    setTheme(isDark ? 'light' : 'dark');
  }, [isDark, setTheme, isHydrated]);

  const setLight = useCallback(() => {
    if (!isHydrated) return;
    setTheme('light');
  }, [setTheme, isHydrated]);

  const setDark = useCallback(() => {
    if (!isHydrated) return;
    setTheme('dark');
  }, [setTheme, isHydrated]);

  return {
    // State
    isDark,
    isLight,
    currentTheme,
    isHydrated,
    
    // Actions
    toggle,
    setLight,
    setDark,
    setTheme,
    
    // Utilities
    nextTheme: isDark ? 'light' : 'dark' as ValidTheme,
    icon: isDark ? '🌙' : '☀️',
    label: isDark ? 'Switch to light mode' : 'Switch to dark mode',
    ariaLabel: isDark ? 'Switch to light mode' : 'Switch to dark mode'
  };
};

/**
 * Enhanced theme toggle hook with system theme detection
 * 
 * @example
 * ```tsx
 * const { isDark, toggle, systemTheme, isSystemTheme } = useThemeToggleWithSystem();
 * 
 * return (
 *   <div>
 *     <button onClick={toggle}>
 *       {isDark ? '🌙' : '☀️'}
 *     </button>
 *     {systemTheme && <span>System: {systemTheme}</span>}
 *   </div>
 * );
 * ```
 */
export const useThemeToggleWithSystem = () => {
  const { currentTheme, setTheme, isHydrated, systemTheme } = useTheme();

  const isDark = currentTheme === 'dark';
  const isLight = currentTheme === 'light';
  const isSystemTheme = currentTheme === systemTheme;

  const toggle = useCallback(() => {
    if (!isHydrated) return;
    setTheme(isDark ? 'light' : 'dark');
  }, [isDark, setTheme, isHydrated]);

  const setSystem = useCallback(() => {
    if (!isHydrated || !systemTheme) return;
    setTheme(systemTheme);
  }, [systemTheme, setTheme, isHydrated]);

  const cycleTheme = useCallback(() => {
    if (!isHydrated) return;
    
    // Cycle: light -> dark -> system -> light
    if (isLight) {
      setTheme('dark');
    } else if (isDark) {
      setTheme(systemTheme || 'light');
    } else {
      setTheme('light');
    }
  }, [isLight, isDark, systemTheme, setTheme, isHydrated]);

  return {
    // State
    isDark,
    isLight,
    currentTheme,
    isHydrated,
    systemTheme,
    isSystemTheme,
    
    // Actions
    toggle,
    setLight: () => setTheme('light'),
    setDark: () => setTheme('dark'),
    setSystem,
    setTheme,
    cycleTheme,
    
    // Utilities
    nextTheme: isDark ? 'light' : 'dark' as ValidTheme,
    icon: isDark ? '🌙' : '☀️',
    label: isDark ? 'Switch to light mode' : 'Switch to dark mode',
    ariaLabel: isDark ? 'Switch to light mode' : 'Switch to dark mode',
    
    // System theme utilities
    systemIcon: systemTheme === 'dark' ? '🌙' : '☀️',
    systemLabel: `Use system theme (${systemTheme})`,
    hasSystemTheme: !!systemTheme
  };
};
