# React Theme System

A comprehensive React theme management system that enforces consistency, supports dark/light mode, and eliminates hardcoded styles. Built with TypeScript, SSR support, and production-ready features.

## ✨ Features

- **🎨 Theme Management**: Light/dark mode with automatic persistence
- **🔒 Type Safety**: Full TypeScript support with strict typing
- **⚡ SSR Ready**: Server-side rendering support with hydration safety
- **🛡️ Error Handling**: Graceful fallbacks and error recovery
- **📱 Responsive**: Built-in responsive design utilities
- **🎯 Validation**: Theme validation and error prevention
- **🧪 Tested**: Comprehensive test coverage
- **📦 Zero Dependencies**: Lightweight and framework-agnostic

## 🚀 Quick Start

### Installation

```bash
npm install react-theme-system
```

### Basic Usage

```tsx
import React from 'react';
import { ThemeProvider, useTheme, defaultTheme } from 'react-theme-system';

function App() {
  return (
    <ThemeProvider themes={defaultTheme}>
      <MyApp />
    </ThemeProvider>
  );
}

function MyApp() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: theme.colors.background,
      color: theme.colors.text 
    }}>
      <h1>Hello, themed world!</h1>
      <button onClick={toggleTheme}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}
```

## 📚 Advanced Usage

### Custom Theme Configuration

```tsx
import { createThemeConfig } from 'react-theme-system';

const customTheme = createThemeConfig({
  light: {
    colors: {
      primary: '#007bff',
      background: '#ffffff',
      // ... other colors
    }
  },
  dark: {
    colors: {
      primary: '#0056b3',
      background: '#121212',
      // ... other colors
    }
  }
});

<ThemeProvider themes={customTheme}>
  <App />
</ThemeProvider>
```

### SSR Support (Next.js/Gatsby)

```tsx
// _app.tsx (Next.js)
import { ThemeProvider, defaultTheme } from 'react-theme-system';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider 
      themes={defaultTheme}
      defaultTheme="light"
      enablePersistence={true}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Theme Change Callbacks

```tsx
<ThemeProvider 
  themes={defaultTheme}
  onChange={(theme) => {
    // Analytics tracking
    analytics.track('theme_changed', { theme });
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
  }}
>
  <App />
</ThemeProvider>
```

### Styled Components with Fallbacks

```tsx
import { useStyled } from 'react-theme-system';

function StyledButton() {
  const { styled, getColor, getSpacing } = useStyled();
  
  const buttonStyles = styled({
    backgroundColor: 'colors.primary',
    padding: 'spacing.md',
    borderRadius: 'borderRadius.md',
    boxShadow: 'shadows.sm'
  }, {
    // Fallbacks for SSR or missing tokens
    backgroundColor: '#007bff',
    padding: '1rem'
  });

  return (
    <button style={buttonStyles}>
      Click me!
    </button>
  );
}
```

### CSS Variables with Fallbacks

```tsx
import { useStyled } from 'react-theme-system';

function CSSVarComponent() {
  const { colorVar, spacingVar, cssVar } = useStyled();
  
  return (
    <div style={{
      backgroundColor: colorVar('primary', '#007bff'),
      padding: spacingVar('md', '1rem'),
      fontSize: cssVar('font-size-lg', '1.125rem')
    }}>
      Using CSS variables with fallbacks
    </div>
  );
}
```

## 🎨 Theme Structure

```typescript
interface Theme {
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
```

## 🔧 API Reference

### ThemeProvider Props

```typescript
interface ThemeProviderProps {
  themes: ThemeConfig;
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
  onChange?: (theme: 'light' | 'dark') => void;
  enablePersistence?: boolean;
}
```

### Theme Utilities

```typescript
// Theme configuration helper
const themeConfig = createThemeConfig({
  light: { /* your light theme */ },
  dark: { /* your dark theme */ }
});

// Theme validation
const isValid = isValidTheme('light'); // true
const isValid = isValidTheme('invalid'); // false

// Theme storage utilities
const storedTheme = getStoredTheme(); // Get theme from localStorage
setStoredTheme('dark'); // Save theme to localStorage

// CSS variable generation
const cssVars = themeToCSSVariables(theme); // Convert theme to CSS variables
applyThemeToDOM(theme); // Apply theme directly to document

// Valid theme constants
import { VALID_THEMES, type ValidTheme } from 'react-theme-system';
// VALID_THEMES = ['light', 'dark']
// ValidTheme = 'light' | 'dark'
```

### useTheme Hook

```typescript
const {
  theme,           // Current theme object
  isDarkMode,      // Boolean indicating dark mode
  currentTheme,    // Current theme name ('light' | 'dark')
  isHydrated,      // Boolean indicating hydration status
  setTheme,        // Function to set theme directly
  toggleTheme,     // Function to toggle between themes
  updateTheme,     // Function to update specific theme values
  resetCustomTheme // Function to reset custom theme overrides
} = useTheme();
```

### useStyled Hook

```typescript
const {
  styled,          // Function to create styled objects
  getColor,        // Get color with fallback
  getSpacing,      // Get spacing with fallback
  getTypography,   // Get typography with fallback
  getShadow,       // Get shadow with fallback
  getBorderRadius, // Get border radius with fallback
  getTransition,   // Get transition with fallback
  getFontWeight,   // Get font weight with fallback
  getFontFamily,   // Get font family with fallback
  responsive,      // Create responsive styles
  cssVar,          // Generate CSS variable with fallback
  colorVar,        // Generate color CSS variable
  spacingVar,      // Generate spacing CSS variable
  fontSizeVar,     // Generate font size CSS variable
  shadowVar,       // Generate shadow CSS variable
  radiusVar,       // Generate radius CSS variable
  theme,           // Current theme object
  isHydrated       // Hydration status
} = useStyled();
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Build

```bash
# Build the library
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🎯 Best Practices

### 1. Always Use Fallbacks

```tsx
// ✅ Good
const { getColor } = useStyled();
const color = getColor('primary', '#007bff');

// ❌ Bad
const color = theme.colors.primary; // No fallback
```

### 2. Handle SSR Properly

```tsx
// ✅ Good
const { isHydrated, theme } = useTheme();
if (!isHydrated) return <LoadingSpinner />;

// ❌ Bad
const { theme } = useTheme(); // May cause hydration mismatch
```

### 3. Use Theme Validation

```tsx
// ✅ Good
import { isValidTheme } from 'react-theme-system';
const theme = isValidTheme(userTheme) ? userTheme : 'light';

// ❌ Bad
const theme = userTheme; // No validation
```

### 4. CSS Variables for Performance

```tsx
// ✅ Good - CSS variables are more performant
const { colorVar } = useStyled();
<div style={{ backgroundColor: colorVar('primary') }} />

// ❌ Bad - Direct theme access
<div style={{ backgroundColor: theme.colors.primary }} />
```

## 🔄 Migration Guide

### From v1.0.2 to v1.0.3

1. **ThemeProvider Props**: New optional props added
   ```tsx
   // New props (all optional)
   <ThemeProvider 
     themes={themes}
     defaultTheme="light"
     onChange={(theme) => {}}
     enablePersistence={true}
   >
   ```

2. **useTheme Hook**: New properties available
   ```tsx
   const { 
     currentTheme,    // New
     isHydrated,      // New
     setTheme,        // New
     resetCustomTheme // New
   } = useTheme();
   ```

3. **useStyled Hook**: Enhanced with fallbacks
   ```tsx
   // All getter functions now accept fallback parameters
   const color = getColor('primary', '#fallback');
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run the test suite
6. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- 📖 [Documentation](https://github.com/salehammar/react-theme-system/wiki)
- 🐛 [Issues](https://github.com/salehammar/react-theme-system/issues)
- 💬 [Discussions](https://github.com/salehammar/react-theme-system/discussions)
