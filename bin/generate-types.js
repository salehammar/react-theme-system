#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function generateTypesFromTheme() {
  try {
    const currentDir = process.cwd();
    const themePath = path.join(currentDir, 'theme.config.js');
    
    if (!fs.existsSync(themePath)) {
      console.log('⚠️  No theme.config.js found, skipping type generation');
      return;
    }
    
    // Read theme config - handle both require and direct file reading
    let themeConfig;
    try {
      // Try to require the theme config
      delete require.cache[require.resolve(themePath)];
      themeConfig = require(themePath);
    } catch (error) {
      // If require fails, try to read and parse the file manually
      const themeContent = fs.readFileSync(themePath, 'utf8');
      // Simple regex to extract the theme object
      const themeMatch = themeContent.match(/module\.exports\s*=\s*({[\s\S]*});?\s*$/);
      if (themeMatch) {
        try {
          // Remove the module.exports wrapper and evaluate
          const themeString = themeMatch[1];
          themeConfig = eval(`(${themeString})`);
        } catch (evalError) {
          console.log('⚠️  Could not parse theme.config.js, using default structure');
          themeConfig = {
            light: { colors: {}, spacing: {}, typography: {}, shadows: {}, borderRadius: {}, breakpoints: {}, transitions: {}, zIndex: {} },
            dark: { colors: {}, spacing: {}, typography: {}, shadows: {}, borderRadius: {}, breakpoints: {}, transitions: {}, zIndex: {} }
          };
        }
      } else {
        console.log('⚠️  Could not parse theme.config.js, using default structure');
        themeConfig = {
          light: { colors: {}, spacing: {}, typography: {}, shadows: {}, borderRadius: {}, breakpoints: {}, transitions: {}, zIndex: {} },
          dark: { colors: {}, spacing: {}, typography: {}, shadows: {}, borderRadius: {}, breakpoints: {}, transitions: {}, zIndex: {} }
        };
      }
    }
    
    // Generate TypeScript definitions
    const typeDefinitions = `// Auto-generated TypeScript definitions from theme.config.js
// This file is generated automatically - do not edit manually

export interface CustomTheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    divider: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  typography: {
    fontFamily: {
      primary: string;
      secondary: string;
      mono: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: string;
      normal: string;
      relaxed: string;
    };
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
  zIndex: {
    dropdown: number;
    sticky: number;
    fixed: number;
    modal: number;
    popover: number;
    tooltip: number;
  };
}

export interface CustomThemeConfig {
  light: CustomTheme;
  dark: CustomTheme;
}

// Theme values for type checking
export const customTheme: CustomThemeConfig = ${JSON.stringify(themeConfig, null, 2)};

// Type-safe theme access helpers
export type CustomColorToken = keyof CustomTheme['colors'];
export type CustomSpacingToken = keyof CustomTheme['spacing'];
export type CustomTypographyToken = keyof CustomTheme['typography']['fontSize'];
export type CustomShadowToken = keyof CustomTheme['shadows'];
export type CustomBorderRadiusToken = keyof CustomTheme['borderRadius'];
`;

    // Write type definitions
    const typesPath = path.join(currentDir, 'theme.types.ts');
    fs.writeFileSync(typesPath, typeDefinitions);
    
    console.log('✨ Generated theme.types.ts with TypeScript definitions');
    
    // Create theme provider wrapper
    const providerWrapper = `import React from 'react';
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
`;

    const providerPath = path.join(currentDir, 'CustomThemeProvider.tsx');
    fs.writeFileSync(providerPath, providerWrapper);
    
    console.log('✨ Generated CustomThemeProvider.tsx wrapper');
    
  } catch (error) {
    console.error('❌ Error generating types:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  generateTypesFromTheme();
}

module.exports = { generateTypesFromTheme };
