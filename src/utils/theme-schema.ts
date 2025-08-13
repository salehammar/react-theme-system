import { Theme, ThemeConfig, ValidTheme } from '../types';

// Theme schema validation
export interface ThemeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Required theme properties
const REQUIRED_COLOR_PROPERTIES = [
  'primary', 'secondary', 'accent', 'background', 'surface',
  'text.primary', 'text.secondary', 'text.disabled',
  'border', 'error', 'warning', 'success', 'info'
] as const;

const REQUIRED_SPACING_PROPERTIES = [
  'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'scale'
] as const;

const REQUIRED_TYPOGRAPHY_PROPERTIES = [
  'fontFamily.primary', 'fontFamily.secondary', 'fontFamily.mono',
  'fontSize.xs', 'fontSize.sm', 'fontSize.base', 'fontSize.lg', 'fontSize.xl', 'fontSize.2xl', 'fontSize.3xl', 'fontSize.4xl',
  'fontWeight.light', 'fontWeight.normal', 'fontWeight.medium', 'fontWeight.semibold', 'fontWeight.bold',
  'lineHeight.tight', 'lineHeight.normal', 'lineHeight.relaxed'
] as const;

// Helper function to get nested object value
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Validate color values
const validateColor = (color: string): boolean => {
  if (!color || typeof color !== 'string') return false;
  
  // Check for valid CSS color formats
  const colorRegex = /^(#([0-9A-F]{3}){1,2}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)|hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)|hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\)|transparent|currentColor|inherit|initial|unset)$/i;
  return colorRegex.test(color);
};

// Validate spacing values
const validateSpacing = (spacing: string): boolean => {
  if (!spacing || typeof spacing !== 'string') return false;
  
  // Check for valid CSS length units
  const spacingRegex = /^(\d+(\.\d+)?(px|rem|em|vh|vw|%|ch|ex|in|cm|mm|pt|pc)|0)$/;
  return spacingRegex.test(spacing);
};

// Validate typography values
const validateTypography = (value: string | number): boolean => {
  if (typeof value === 'number') {
    return value >= 100 && value <= 900; // Valid font-weight range
  }
  
  if (typeof value === 'string') {
    // Check for valid CSS font values
    const fontRegex = /^([a-zA-Z\s,]+|inherit|initial|unset)$/;
    const sizeRegex = /^(\d+(\.\d+)?(px|rem|em|vh|vw|%|ch|ex|in|cm|mm|pt|pc)|0)$/;
    const lineHeightRegex = /^(\d+(\.\d+)?|normal|inherit|initial|unset)$/;
    
    return fontRegex.test(value) || sizeRegex.test(value) || lineHeightRegex.test(value);
  }
  
  return false;
};

// Validate individual theme
export const validateTheme = (theme: Theme, themeName: string): ThemeValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate colors
  REQUIRED_COLOR_PROPERTIES.forEach(prop => {
    const value = getNestedValue(theme, prop);
    if (!value) {
      errors.push(`Missing required color property: ${prop} in ${themeName} theme`);
    } else if (!validateColor(value)) {
      errors.push(`Invalid color value for ${prop} in ${themeName} theme: ${value}`);
    }
  });

  // Validate spacing
  REQUIRED_SPACING_PROPERTIES.forEach(prop => {
    const value = getNestedValue(theme, prop);
    if (!value) {
      errors.push(`Missing required spacing property: ${prop} in ${themeName} theme`);
    } else if (prop !== 'scale' && !validateSpacing(value)) {
      errors.push(`Invalid spacing value for ${prop} in ${themeName} theme: ${value}`);
    } else if (prop === 'scale' && typeof value !== 'function') {
      errors.push(`Spacing scale must be a function in ${themeName} theme`);
    }
  });

  // Validate typography
  REQUIRED_TYPOGRAPHY_PROPERTIES.forEach(prop => {
    const value = getNestedValue(theme, prop);
    if (!value) {
      errors.push(`Missing required typography property: ${prop} in ${themeName} theme`);
    } else if (!validateTypography(value)) {
      warnings.push(`Potentially invalid typography value for ${prop} in ${themeName} theme: ${value}`);
    }
  });

  // Validate shadows
  if (!theme.shadows || typeof theme.shadows !== 'object') {
    errors.push(`Missing or invalid shadows object in ${themeName} theme`);
  }

  // Validate border radius
  if (!theme.borderRadius || typeof theme.borderRadius !== 'object') {
    errors.push(`Missing or invalid borderRadius object in ${themeName} theme`);
  }

  // Validate breakpoints
  if (!theme.breakpoints || typeof theme.breakpoints !== 'object') {
    errors.push(`Missing or invalid breakpoints object in ${themeName} theme`);
  }

  // Validate transitions
  if (!theme.transitions || typeof theme.transitions !== 'object') {
    errors.push(`Missing or invalid transitions object in ${themeName} theme`);
  }

  // Validate z-index
  if (!theme.zIndex || typeof theme.zIndex !== 'object') {
    errors.push(`Missing or invalid zIndex object in ${themeName} theme`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Validate theme configuration
export const validateThemeConfig = (config: ThemeConfig): ThemeValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate light theme
  if (!config.light) {
    errors.push('Missing light theme configuration');
  } else {
    const lightValidation = validateTheme(config.light, 'light');
    errors.push(...lightValidation.errors);
    warnings.push(...lightValidation.warnings);
  }

  // Validate dark theme
  if (!config.dark) {
    errors.push('Missing dark theme configuration');
  } else {
    const darkValidation = validateTheme(config.dark, 'dark');
    errors.push(...darkValidation.errors);
    warnings.push(...darkValidation.warnings);
  }

  // Check for theme consistency
  if (config.light && config.dark) {
    const lightKeys = Object.keys(config.light);
    const darkKeys = Object.keys(config.dark);
    
    const missingInDark = lightKeys.filter(key => !darkKeys.includes(key));
    const missingInLight = darkKeys.filter(key => !lightKeys.includes(key));
    
    if (missingInDark.length > 0) {
      warnings.push(`Dark theme missing properties: ${missingInDark.join(', ')}`);
    }
    
    if (missingInLight.length > 0) {
      warnings.push(`Light theme missing properties: ${missingInLight.join(', ')}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

// Create a theme schema validator
export const createThemeValidator = (strict: boolean = false) => {
  return {
    validate: (config: ThemeConfig): ThemeValidationResult => {
      const result = validateThemeConfig(config);
      
      if (strict && result.warnings.length > 0) {
        result.errors.push(...result.warnings);
        result.warnings = [];
        result.isValid = result.errors.length === 0;
      }
      
      return result;
    },
    
    validateTheme: (theme: Theme, themeName: string): ThemeValidationResult => {
      const result = validateTheme(theme, themeName);
      
      if (strict && result.warnings.length > 0) {
        result.errors.push(...result.warnings);
        result.warnings = [];
        result.isValid = result.errors.length === 0;
      }
      
      return result;
    }
  };
};

// Export default validator
export const themeValidator = createThemeValidator();
