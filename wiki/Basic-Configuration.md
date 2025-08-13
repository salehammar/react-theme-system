# Basic Configuration

This guide covers the essential configuration options for React Theme System.

## 🎯 Overview

React Theme System is designed to work out of the box with sensible defaults, but you can customize it extensively to match your design requirements.

## ⚙️ Default Configuration

### Basic Setup

```tsx
import { ThemeProvider, defaultTheme } from 'react-theme-system';

function App() {
  return (
    <ThemeProvider themes={defaultTheme}>
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### With Custom Default Theme

```tsx
import { ThemeProvider, defaultTheme } from 'react-theme-system';

function App() {
  return (
    <ThemeProvider 
      themes={defaultTheme}
      defaultTheme="light"
    >
      <YourAppContent />
    </ThemeProvider>
  );
}
```

## 🎨 Theme Configuration

### Creating a Custom Theme

Create a `theme.config.js` file in your project root:

```javascript
const { defaultTheme } = require('react-theme-system');

module.exports = {
  light: {
    ...defaultTheme.light,
    colors: {
      ...defaultTheme.light.colors,
      // Your custom colors
      primary: '#007AFF',
      secondary: '#5856D6',
      brand: '#FF6B6B',
    },
  },
  dark: {
    ...defaultTheme.dark,
    colors: {
      ...defaultTheme.dark.colors,
      // Your custom dark mode colors
      primary: '#0A84FF',
      secondary: '#5E5CE6',
      brand: '#FF8E8E',
    },
  },
};
```

### Using Custom Theme Configuration

```tsx
import { ThemeProvider, createThemeConfig } from 'react-theme-system';
import themeConfig from './theme.config.js';

function App() {
  return (
    <ThemeProvider 
      themes={themeConfig}
      defaultTheme="light"
      enablePersistence={true}
      onChange={(theme) => {
        console.log('Theme changed to:', theme);
      }}
    >
      <YourAppContent />
    </ThemeProvider>
  );
}
```

## 🌙 Dark Mode Configuration

### Automatic Dark Mode Detection

```tsx
import { ThemeProvider } from 'react-theme-system';

function App() {
  return (
    <ThemeProvider 
      defaultTheme={defaultTheme.light}
      enableSystemPreference={true}
    >
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### Manual Dark Mode Control

```tsx
import { ThemeProvider, useTheme } from 'react-theme-system';

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <YourAppContent />
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
```

## 📱 Responsive Configuration

### Breakpoint Configuration

```javascript
// theme.config.js
module.exports = {
  light: {
    ...defaultTheme.light,
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  // ... dark theme
};
```

### Using Responsive Utilities

```tsx
import { useStyled } from 'react-theme-system';

function ResponsiveComponent() {
  const { responsive } = useStyled();
  
  const styles = {
    padding: '1rem',
    ...responsive('md', {
      padding: '2rem',
    }),
    ...responsive('lg', {
      padding: '3rem',
    }),
  };
  
  return <div style={styles}>Responsive Content</div>;
}
```

## 🔧 Advanced Configuration

### Custom Theme Provider

```tsx
import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider as BaseThemeProvider, Theme } from 'react-theme-system';

interface CustomThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  customFeature: string;
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [customFeature, setCustomFeature] = useState('default');
  
  return (
    <BaseThemeProvider>
      <CustomThemeContext.Provider value={{ customFeature }}>
        {children}
      </CustomThemeContext.Provider>
    </BaseThemeProvider>
  );
}

export function useCustomTheme() {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within CustomThemeProvider');
  }
  return context;
}
```

### Runtime Theme Updates

```tsx
import { useTheme } from 'react-theme-system';

function ThemeEditor() {
  const { updateTheme } = useTheme();
  
  const updatePrimaryColor = (color: string) => {
    updateTheme('colors.primary', color);
  };
  
  const updateSpacing = (size: string) => {
    updateTheme('spacing.md', size);
  };
  
  return (
    <div>
      <input 
        type="color" 
        onChange={(e) => updatePrimaryColor(e.target.value)}
        placeholder="Primary Color"
      />
      <input 
        type="text" 
        onChange={(e) => updateSpacing(e.target.value)}
        placeholder="Medium Spacing"
      />
    </div>
  );
}
```

## 🎯 Configuration Best Practices

### 1. Start with Defaults

```tsx
// Good: Start simple
<ThemeProvider>
  <App />
</ThemeProvider>

// Better: Add custom theme when needed
<ThemeProvider defaultTheme={customTheme}>
  <App />
</ThemeProvider>
```

### 2. Use Semantic Color Names

```javascript
// Good: Semantic naming
colors: {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
}

// Avoid: Generic names
colors: {
  blue: '#007AFF',
  purple: '#5856D6',
  green: '#34C759',
}
```

### 3. Consistent Spacing Scale

```javascript
// Good: Consistent scale
spacing: {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  xxl: '3rem',     // 48px
}
```

### 4. Typography Hierarchy

```javascript
// Good: Clear hierarchy
typography: {
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
  },
}
```

## 🔍 Configuration Validation

### TypeScript Validation

```tsx
import { Theme } from 'react-theme-system';

// TypeScript will validate your theme
const customTheme: Theme = {
  colors: {
    primary: '#007AFF',
    // TypeScript will catch missing required colors
  },
  // ... other theme properties
};
```

### Runtime Validation

```tsx
import { validateTheme } from 'react-theme-system';

const themeConfig = require('./theme.config.js');

// Validate theme configuration
const validation = validateTheme(themeConfig.light);
if (!validation.isValid) {
  console.warn('Theme validation warnings:', validation.warnings);
}
```

## 📚 Related Documentation

- [Installation Guide](Installation-Guide)
- [Theme Architecture](Theme-Architecture)
- [Design Tokens](Design-Tokens)
- [TypeScript Integration](TypeScript-Integration)

