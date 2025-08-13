# SSR Support

React Theme System provides comprehensive support for Server-Side Rendering (SSR) frameworks like Next.js, Gatsby, and Remix. This guide covers how to implement the theme system in SSR environments.

## 🎯 Overview

The theme system is designed to work seamlessly with SSR frameworks by:
- Preventing hydration mismatches
- Providing fallback values during server rendering
- Supporting theme persistence across page loads
- Maintaining type safety in SSR environments

## ⚡ Key Features

### **Hydration Safety**
- Content is hidden during hydration to prevent flicker
- `isHydrated` state for conditional rendering
- Graceful fallbacks for theme values

### **Theme Persistence**
- localStorage persistence with error handling
- Optional persistence for SSR-only environments
- Theme change callbacks for analytics

### **Error Handling**
- Graceful localStorage error recovery
- Fallback values for missing theme tokens
- Console warnings for debugging

## 🚀 Next.js Integration

### Basic Setup

```tsx
// pages/_app.tsx
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

export default MyApp;
```

### With Custom Theme

```tsx
// pages/_app.tsx
import { ThemeProvider, createThemeConfig } from 'react-theme-system';

const customTheme = createThemeConfig({
  light: {
    colors: {
      primary: '#007bff',
      background: '#ffffff',
      text: '#212529'
    }
  },
  dark: {
    colors: {
      primary: '#0056b3',
      background: '#121212',
      text: '#ffffff'
    }
  }
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider 
      themes={customTheme}
      defaultTheme="light"
      enablePersistence={true}
      onChange={(theme) => {
        // Analytics tracking
        analytics.track('theme_changed', { theme });
      }}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
```

### App Router (Next.js 13+)

```tsx
// app/layout.tsx
'use client';

import { ThemeProvider, defaultTheme } from 'react-theme-system';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider 
          themes={defaultTheme}
          defaultTheme="light"
          enablePersistence={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## 🌐 Gatsby Integration

### Basic Setup

```tsx
// gatsby-browser.js
import React from 'react';
import { ThemeProvider, defaultTheme } from 'react-theme-system';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider 
    themes={defaultTheme}
    defaultTheme="light"
    enablePersistence={true}
  >
    {element}
  </ThemeProvider>
);
```

```tsx
// gatsby-ssr.js
import React from 'react';
import { ThemeProvider, defaultTheme } from 'react-theme-system';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider 
    themes={defaultTheme}
    defaultTheme="light"
    enablePersistence={false} // Disable persistence for SSR
  >
    {element}
  </ThemeProvider>
);
```

## 🔧 Remix Integration

### Basic Setup

```tsx
// app/root.tsx
import { ThemeProvider, defaultTheme } from 'react-theme-system';

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider 
          themes={defaultTheme}
          defaultTheme="light"
          enablePersistence={true}
        >
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

## 🎨 Using Theme in Components

### With useTheme Hook

```tsx
import { useTheme } from 'react-theme-system';

function MyComponent() {
  const { theme, isDarkMode, toggleTheme, isHydrated } = useTheme();
  
  // Handle SSR safely
  if (!isHydrated) {
    return <div>Loading...</div>;
  }
  
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

### With useStyled Hook

```tsx
import { useStyled } from 'react-theme-system';

function StyledComponent() {
  const { styled, getColor, isHydrated } = useStyled();
  
  const styles = styled({
    backgroundColor: 'colors.primary',
    padding: 'spacing.md',
    borderRadius: 'borderRadius.md'
  }, {
    // Fallbacks for SSR
    backgroundColor: '#007bff',
    padding: '1rem'
  });
  
  return (
    <div style={styles}>
      <p>Styled with fallbacks</p>
      <p>Primary Color: {getColor('primary', '#007bff')}</p>
      <p>Hydrated: {isHydrated ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

## 🛡️ Error Handling

### localStorage Errors

```tsx
<ThemeProvider 
  themes={defaultTheme}
  enablePersistence={true} // Will handle localStorage errors gracefully
>
  <App />
</ThemeProvider>
```

### Missing Theme Tokens

```tsx
const { getColor, getSpacing } = useStyled();

// Always provide fallbacks
const color = getColor('primary', '#007bff');
const spacing = getSpacing('md', '1rem');
```

## 🎯 Best Practices

### 1. Always Use Fallbacks

```tsx
// ✅ Good
const color = getColor('primary', '#007bff');

// ❌ Bad
const color = theme.colors.primary; // May cause hydration issues
```

### 2. Handle Hydration State

```tsx
// ✅ Good
const { isHydrated, theme } = useTheme();
if (!isHydrated) return <LoadingSpinner />;

// ❌ Bad
const { theme } = useTheme(); // May cause hydration mismatch
```

### 3. Disable Persistence for SSR-Only

```tsx
// For SSR-only environments
<ThemeProvider 
  themes={defaultTheme}
  enablePersistence={false}
>
  <App />
</ThemeProvider>
```

### 4. Use CSS Variables for Performance

```tsx
const { colorVar } = useStyled();

// ✅ Good - CSS variables are more performant
<div style={{ backgroundColor: colorVar('primary') }} />

// ❌ Bad - Direct theme access
<div style={{ backgroundColor: theme.colors.primary }} />
```

## 🔍 Debugging

### Check Hydration Status

```tsx
const { isHydrated, currentTheme } = useTheme();

console.log('Hydrated:', isHydrated);
console.log('Current Theme:', currentTheme);
```

### Monitor Theme Changes

```tsx
<ThemeProvider 
  themes={defaultTheme}
  onChange={(theme) => {
    console.log('Theme changed to:', theme);
  }}
>
  <App />
</ThemeProvider>
```

### Check localStorage

```tsx
// In browser console
console.log('Stored theme:', localStorage.getItem('react-theme-system-theme'));
```

## 🚨 Common Issues

### Hydration Mismatch

**Problem**: Different content rendered on server vs client
**Solution**: Use `isHydrated` state for conditional rendering

### localStorage Not Available

**Problem**: localStorage errors in SSR
**Solution**: The system handles this automatically with error recovery

### Theme Not Persisting

**Problem**: Theme resets on page reload
**Solution**: Ensure `enablePersistence={true}` is set

## 📚 Related Documentation

- [Basic Configuration](Basic-Configuration)
- [Theme Architecture](Theme-Architecture)
- [Error Handling](Error-Handling)
- [Testing Guide](Testing-Guide)
