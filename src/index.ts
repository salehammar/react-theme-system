// Core Theme System
export { ThemeProvider, useTheme, VALID_THEMES } from './ThemeProvider';
export type { ValidTheme } from './types';
export { useStyled } from './hooks';
export { useThemeToggle, useThemeToggleWithSystem } from './hooks/useThemeToggle';
export { defaultTheme } from './themes';

// Theme Utilities
export {
  createThemeConfig,
  isValidTheme,
  getStoredTheme,
  setStoredTheme,
  themeToCSSVariables,
  applyThemeToDOM
} from './utils/theme-helpers';

// Theme Validation
export {
  themeValidator,
  createThemeValidator,
  validateTheme,
  validateThemeConfig,
  type ThemeValidationResult
} from './utils/theme-schema';

// Styled Components
// Styled components moved to examples/styled/
// Components moved to examples/components/

// Types
export type {
  Theme,
  ThemeConfig,
  ThemeContextType,
  ThemeProviderProps,
  StyledProps,
  StyledStyles,
  ThemeTokenPath,
  ThemeColors,
  ThemeSpacing,
  ThemeTypography,
  ThemeShadows,
  ThemeBorderRadius,
  ThemeBreakpoints,
  ThemeTransitions,
  ThemeZIndex
} from './types';
