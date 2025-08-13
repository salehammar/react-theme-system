# React Theme System

A comprehensive React theme management system that enforces consistency, supports dark/light mode, and eliminates hardcoded styles. Built with TypeScript, SSR support, and production-ready features.

## ✨ Features

- **🎨 Theme Management**: Light/dark mode with automatic persistence
- **🔒 Type Safety**: Full TypeScript support with strict typing and schema validation
- **⚡ SSR Ready**: Server-side rendering support with hydration safety
- **🛡️ Error Handling**: Graceful fallbacks and error recovery
- **📱 Responsive**: Built-in responsive design utilities
- **🎯 Validation**: Theme validation and error prevention
- **🧪 Tested**: Comprehensive test coverage
- **📦 Zero Dependencies**: Lightweight and framework-agnostic
- **🌐 System Theme Sync**: Automatic OS theme detection and sync
- **🧩 Headless UI**: Decoupled logic hooks for maximum flexibility
- **🔍 Schema Validation**: Comprehensive theme structure validation
- **🎨 Enhanced CSS Variables**: System theme support with fallbacks

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
      color: theme.colors.text.primary 
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
import { createThemeConfig, themeValidator } from 'react-theme-system';

const customTheme = createThemeConfig({
  light: {
    colors: {
      primary: '#007bff',
      background: '#ffffff',
      text: {
        primary: '#212529',
        secondary: '#6c757d',
        disabled: '#adb5bd'
      },
      // ... other colors
    }
  },
  dark: {
    colors: {
      primary: '#0056b3',
      background: '#121212',
      text: {
        primary: '#f8fafc',
        secondary: '#cbd5e1',
        disabled: '#64748b'
      },
      // ... other colors
    }
  }
});

// Validate your theme
const validation = themeValidator.validate(customTheme);
if (!validation.isValid) {
  console.error('Theme validation failed:', validation.errors);
}

<ThemeProvider themes={customTheme} validateTheme={true}>
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
      enableSystemTheme={true}
      validateTheme={true}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Headless Theme Toggle Hooks

```tsx
import { useThemeToggle, useThemeToggleWithSystem } from 'react-theme-system';

// Basic theme toggle
function ThemeToggle() {
  const { isDark, toggle, icon, label } = useThemeToggle();
  
  return (
    <button onClick={toggle} aria-label={label}>
      {icon}
    </button>
  );
}

// Advanced theme toggle with system theme detection
function AdvancedThemeToggle() {
  const { 
    isDark, 
    toggle, 
    systemTheme, 
    setSystem, 
    cycleTheme,
    hasSystemTheme 
  } = useThemeToggleWithSystem();
  
  return (
    <div>
      <button onClick={toggle}>
        {isDark ? '🌙' : '☀️'}
      </button>
      {hasSystemTheme && (
        <button onClick={setSystem}>
          Use System ({systemTheme})
        </button>
      )}
      <button onClick={cycleTheme}>
        Cycle Themes
      </button>
    </div>
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

### Enhanced Theme Utilities

```tsx
import { useTheme } from 'react-theme-system';

function ThemeUtilities() {
  const { getToken, getCSSVariable } = useTheme();
  
  return (
    <div>
      {/* Get token values with fallbacks */}
      <p>Primary: {getToken('colors.primary', '#007bff')}</p>
      <p>Spacing: {getToken('spacing.md', '1rem')}</p>
      
      {/* Generate CSS variables */}
      <div style={{
        backgroundColor: getCSSVariable('colors.primary', '#007bff'),
        padding: getCSSVariable('spacing.md', '1rem')
      }}>
        Using CSS variables with fallbacks
      </div>
    </div>
  );
}
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

## 🎨 Enhanced Theme Structure

```typescript
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    border: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
    scale: (multiplier: number) => string; // Dynamic spacing
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
      '4xl': string;
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
    '2xl': string;
    inner: string;
    none: string;
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
    ease: {
      in: string;
      out: string;
      inOut: string;
    };
  };
  zIndex: {
    hide: number;
    auto: number;
    base: number;
    docked: number;
    dropdown: number;
    sticky: number;
    banner: number;
    overlay: number;
    modal: number;
    popover: number;
    skipLink: number;
    toast: number;
    tooltip: number;
  };
}
```

## 🔧 API Reference

### ThemeProvider Props

```typescript
interface ThemeProviderProps {
  themes?: ThemeConfig;
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
  onChange?: (theme: 'light' | 'dark') => void;
  enablePersistence?: boolean;
  enableSystemTheme?: boolean; // New: Enable OS theme detection
  validateTheme?: boolean;     // New: Enable theme validation
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

// Theme validation with detailed feedback
import { themeValidator, createThemeValidator } from 'react-theme-system';

const validation = themeValidator.validate(themeConfig);
if (!validation.isValid) {
  console.error('Theme errors:', validation.errors);
  console.warn('Theme warnings:', validation.warnings);
}

// Strict validation
const strictValidator = createThemeValidator(true);
const strictValidation = strictValidator.validate(themeConfig);
```

### useTheme Hook

```typescript
const {
  theme,           // Current theme object
  isDarkMode,      // Boolean indicating dark mode
  currentTheme,    // Current theme name ('light' | 'dark')
  isHydrated,      // Boolean indicating hydration status
  systemTheme,     // Current system theme ('light' | 'dark' | null)
  setTheme,        // Function to set theme directly
  toggleTheme,     // Function to toggle between themes
  updateTheme,     // Function to update specific theme values
  resetCustomTheme, // Function to reset custom theme overrides
  getToken,        // Get theme token with fallback
  getCSSVariable   // Generate CSS variable with fallback
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

### From v1.0.3 to v1.1.0

1. **Enhanced Theme Structure**: Updated theme interface
   ```tsx
   // New nested text structure
   colors: {
     text: {
       primary: string;
       secondary: string;
       disabled: string;
     }
   }
   
   // New spacing scale function
   spacing: {
     scale: (multiplier: number) => string;
   }
   ```

2. **New Headless Hooks**: Added theme toggle hooks
   ```tsx
   import { useThemeToggle, useThemeToggleWithSystem } from 'react-theme-system';
   
   const { isDark, toggle, icon, label } = useThemeToggle();
   const { systemTheme, setSystem, cycleTheme } = useThemeToggleWithSystem();
   ```

3. **Theme Validation**: Added comprehensive validation
   ```tsx
   import { themeValidator } from 'react-theme-system';
   
   const validation = themeValidator.validate(themeConfig);
   if (!validation.isValid) {
     console.error(validation.errors);
   }
   ```

4. **System Theme Detection**: New provider props
   ```tsx
   <ThemeProvider 
     enableSystemTheme={true}
     validateTheme={true}
   >
   ```

5. **Enhanced Utilities**: New theme utilities
   ```tsx
   const { getToken, getCSSVariable } = useTheme();
   
   const color = getToken('colors.primary', '#fallback');
   const cssVar = getCSSVariable('colors.primary', '#fallback');
   ```

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
