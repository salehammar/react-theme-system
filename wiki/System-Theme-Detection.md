# System Theme Detection

React Theme System v1.1.0 includes automatic system theme detection that syncs with the user's OS preference.

## 🎯 Overview

System theme detection automatically detects and syncs with the user's operating system theme preference (light/dark mode) using the `prefers-color-scheme` media query.

## 🔧 Basic Usage

### Enable System Theme Detection

```tsx
import { ThemeProvider, defaultTheme } from 'react-theme-system';

function App() {
  return (
    <ThemeProvider 
      themes={defaultTheme}
      enableSystemTheme={true} // Enable OS theme detection
      defaultTheme="light"
    >
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### Access System Theme Information

```tsx
import { useTheme } from 'react-theme-system';

function MyComponent() {
  const { systemTheme, currentTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {currentTheme}</p>
      <p>System preference: {systemTheme}</p>
    </div>
  );
}
```

## 🌐 How It Works

### Media Query Detection

The system uses the `prefers-color-scheme` CSS media query to detect the user's OS preference:

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}

@media (prefers-color-scheme: light) {
  /* Light mode styles */
}
```

### JavaScript Implementation

```tsx
// Inside ThemeProvider
useEffect(() => {
  if (!enableSystemTheme || typeof window === 'undefined') return;

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const updateSystemTheme = () => {
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
  };

  updateSystemTheme();
  mediaQuery.addEventListener('change', updateSystemTheme);

  return () => mediaQuery.removeEventListener('change', updateSystemTheme);
}, [enableSystemTheme]);
```

## 🎨 Advanced Usage

### With Headless Hooks

```tsx
import { useThemeToggleWithSystem } from 'react-theme-system';

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

### CSS Variables Integration

The system theme detection works seamlessly with CSS variables:

```css
/* theme-fallbacks.css */
:root {
  --color-background: #ffffff;
  --color-text: #000000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #121212;
    --color-text: #ffffff;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --color-background: #ffffff;
    --color-text: #000000;
  }
}
```

## 🔄 Theme Priority

The theme system follows this priority order:

1. **User Selection** - Explicitly chosen theme
2. **Stored Preference** - Previously saved theme
3. **System Theme** - OS preference (if enabled)
4. **Default Theme** - Fallback theme

### Example Priority Flow

```tsx
function ThemePriorityExample() {
  const { currentTheme, systemTheme } = useTheme();
  
  return (
    <div>
      <h3>Theme Priority:</h3>
      <ol>
        <li>User Selection: {currentTheme}</li>
        <li>System Preference: {systemTheme}</li>
        <li>Default: light</li>
      </ol>
    </div>
  );
}
```

## 🎯 Best Practices

### 1. Respect User Choice

```tsx
// Always respect explicit user choices
const { currentTheme, systemTheme } = useTheme();

// Don't override user selection with system theme
if (userExplicitlyChoseTheme) {
  // Use user's choice
} else if (enableSystemTheme) {
  // Use system theme
}
```

### 2. Provide Clear Controls

```tsx
function ThemeControls() {
  const { setTheme, systemTheme, setSystem } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={setSystem}>System ({systemTheme})</button>
    </div>
  );
}
```

### 3. Handle SSR Properly

```tsx
function SSRThemeProvider() {
  return (
    <ThemeProvider 
      themes={defaultTheme}
      enableSystemTheme={true}
      defaultTheme="light" // Fallback for SSR
    >
      <App />
    </ThemeProvider>
  );
}
```

## 🚀 Integration Examples

### Next.js Integration

```tsx
// _app.tsx
import { ThemeProvider, defaultTheme } from 'react-theme-system';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider 
      themes={defaultTheme}
      enableSystemTheme={true}
      defaultTheme="light"
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Gatsby Integration

```tsx
// gatsby-browser.js
import { ThemeProvider, defaultTheme } from 'react-theme-system';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider 
    themes={defaultTheme}
    enableSystemTheme={true}
    defaultTheme="light"
  >
    {element}
  </ThemeProvider>
);
```

### React Native (if applicable)

```tsx
// Note: System theme detection in React Native requires additional setup
import { useColorScheme } from 'react-native';

function ReactNativeThemeProvider() {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeProvider 
      themes={defaultTheme}
      defaultTheme={colorScheme || 'light'}
    >
      <App />
    </ThemeProvider>
  );
}
```

## 🔍 Troubleshooting

### Common Issues

1. **System theme not updating**
   ```tsx
   // Ensure enableSystemTheme is true
   <ThemeProvider enableSystemTheme={true}>
   ```

2. **SSR hydration mismatch**
   ```tsx
   // Always provide a default theme
   <ThemeProvider defaultTheme="light">
   ```

3. **Media query not supported**
   ```tsx
   // Check browser support
   if (window.matchMedia) {
     // System theme detection supported
   }
   ```

### Debug Information

```tsx
function ThemeDebug() {
  const { currentTheme, systemTheme, isHydrated } = useTheme();
  
  return (
    <div>
      <p>Current: {currentTheme}</p>
      <p>System: {systemTheme}</p>
      <p>Hydrated: {isHydrated ? 'Yes' : 'No'}</p>
      <p>Media Query Support: {window.matchMedia ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

## 📚 Related Documentation

- [ThemeProvider](ThemeProvider)
- [useTheme Hook](useTheme-Hook)
- [useThemeToggleWithSystem Hook](useThemeToggleWithSystem-Hook)
- [Dark Mode](Dark-Mode)
- [SSR Support](SSR-Support)

## 🆘 Support

- Check the [API Reference](../README.md#api-reference)
- Review [Theme Architecture](Theme-Architecture) for implementation details
- Open an [issue](https://github.com/salehammar/react-theme-system/issues) for bugs
- Join [discussions](https://github.com/salehammar/react-theme-system/discussions) for questions
