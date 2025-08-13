# Headless UI Patterns

React Theme System v1.1.0 includes headless UI patterns that decouple logic from presentation, providing maximum flexibility for custom UI implementations.

## 🎯 Overview

Headless UI patterns separate the logic of theme management from the visual presentation, allowing you to create custom UI components while leveraging the powerful theme system logic.

## 🧩 Available Headless Hooks

### useThemeToggle

A basic headless hook for theme toggling functionality.

```tsx
import { useThemeToggle } from 'react-theme-system';

function CustomThemeToggle() {
  const { 
    isDark, 
    toggle, 
    icon, 
    label, 
    ariaLabel,
    isHydrated 
  } = useThemeToggle();
  
  return (
    <button 
      onClick={toggle}
      aria-label={ariaLabel}
      disabled={!isHydrated}
    >
      {icon} {label}
    </button>
  );
}
```

### useThemeToggleWithSystem

An advanced headless hook that includes system theme detection.

```tsx
import { useThemeToggleWithSystem } from 'react-theme-system';

function AdvancedThemeToggle() {
  const { 
    isDark, 
    toggle, 
    systemTheme, 
    setSystem, 
    cycleTheme,
    hasSystemTheme,
    icon,
    label,
    ariaLabel,
    systemIcon,
    systemLabel,
    isHydrated 
  } = useThemeToggleWithSystem();
  
  return (
    <div>
      <button onClick={toggle} aria-label={ariaLabel}>
        {icon} {label}
      </button>
      {hasSystemTheme && (
        <button onClick={setSystem} aria-label={systemLabel}>
          {systemIcon} System ({systemTheme})
        </button>
      )}
      <button onClick={cycleTheme}>
        Cycle Themes
      </button>
    </div>
  );
}
```

## 🎨 Custom UI Examples

### Material Design Style Toggle

```tsx
import { useThemeToggle } from 'react-theme-system';

function MaterialThemeToggle() {
  const { isDark, toggle, isHydrated } = useThemeToggle();
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000
      }}
    >
      <button
        onClick={toggle}
        disabled={!isHydrated}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: isDark ? '#424242' : '#f5f5f5',
          color: isDark ? '#ffffff' : '#000000',
          cursor: isHydrated ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px'
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </button>
    </div>
  );
}
```

### Dropdown Theme Selector

```tsx
import { useThemeToggleWithSystem } from 'react-theme-system';

function ThemeDropdown() {
  const { 
    isDark, 
    toggle, 
    systemTheme, 
    setSystem, 
    hasSystemTheme,
    isHydrated 
  } = useThemeToggleWithSystem();
  
  return (
    <div style={{ position: 'relative' }}>
      <select 
        value={isDark ? 'dark' : 'light'}
        onChange={(e) => {
          if (e.target.value === 'system' && hasSystemTheme) {
            setSystem();
          } else {
            toggle();
          }
        }}
        disabled={!isHydrated}
        style={{
          padding: '0.5rem',
          borderRadius: '0.25rem',
          border: '1px solid #ccc',
          backgroundColor: 'white',
          cursor: isHydrated ? 'pointer' : 'not-allowed'
        }}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        {hasSystemTheme && (
          <option value="system">System ({systemTheme})</option>
        )}
      </select>
    </div>
  );
}
```

### Animated Theme Toggle

```tsx
import { useThemeToggle } from 'react-theme-system';
import { useState, useEffect } from 'react';

function AnimatedThemeToggle() {
  const { isDark, toggle, isHydrated } = useThemeToggle();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleToggle = () => {
    setIsAnimating(true);
    toggle();
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  return (
    <button
      onClick={handleToggle}
      disabled={!isHydrated || isAnimating}
      style={{
        width: '60px',
        height: '30px',
        borderRadius: '15px',
        border: 'none',
        backgroundColor: isDark ? '#4a5568' : '#e2e8f0',
        cursor: isHydrated && !isAnimating ? 'pointer' : 'not-allowed',
        position: 'relative',
        transition: 'all 0.3s ease',
        transform: isAnimating ? 'scale(0.95)' : 'scale(1)'
      }}
    >
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: isDark ? '#2d3748' : '#ffffff',
          position: 'absolute',
          top: '3px',
          left: isDark ? '33px' : '3px',
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </div>
    </button>
  );
}
```

## 🔧 Advanced Patterns

### Custom Theme Context

```tsx
import { useTheme } from 'react-theme-system';
import { createContext, useContext } from 'react';

// Create a custom theme context
const CustomThemeContext = createContext();

function CustomThemeProvider({ children }) {
  const themeContext = useTheme();
  
  // Add custom logic
  const customThemeLogic = {
    ...themeContext,
    isHighContrast: themeContext.currentTheme === 'dark',
    getContrastColor: (color) => {
      // Custom contrast calculation
      return themeContext.currentTheme === 'dark' ? '#ffffff' : '#000000';
    }
  };
  
  return (
    <CustomThemeContext.Provider value={customThemeLogic}>
      {children}
    </CustomThemeContext.Provider>
  );
}

function useCustomTheme() {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within CustomThemeProvider');
  }
  return context;
}
```

### Theme-Aware Components

```tsx
import { useTheme } from 'react-theme-system';

function ThemeAwareCard({ children, variant = 'default' }) {
  const { theme, isDarkMode } = useTheme();
  
  const getCardStyles = () => {
    const baseStyles = {
      padding: theme.spacing.lg,
      borderRadius: theme.borderRadius.md,
      boxShadow: theme.shadows.md,
      transition: theme.transitions.normal
    };
    
    switch (variant) {
      case 'elevated':
        return {
          ...baseStyles,
          backgroundColor: theme.colors.surface,
          boxShadow: theme.shadows.lg
        };
      case 'outlined':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          border: `1px solid ${theme.colors.border}`
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: theme.colors.surface
        };
    }
  };
  
  return (
    <div style={getCardStyles()}>
      {children}
    </div>
  );
}
```

### Responsive Theme Toggle

```tsx
import { useThemeToggleWithSystem } from 'react-theme-system';
import { useState, useEffect } from 'react';

function ResponsiveThemeToggle() {
  const { isDark, toggle, systemTheme, setSystem, hasSystemTheme } = useThemeToggleWithSystem();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  if (isMobile) {
    return (
      <button
        onClick={toggle}
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: isDark ? '#424242' : '#f5f5f5',
          color: isDark ? '#ffffff' : '#000000',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}
      >
        {isDark ? '🌙' : '☀️'}
      </button>
    );
  }
  
  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <button onClick={toggle}>
        {isDark ? '🌙' : '☀️'} {isDark ? 'Light' : 'Dark'} Mode
      </button>
      {hasSystemTheme && (
        <button onClick={setSystem}>
          System ({systemTheme})
        </button>
      )}
    </div>
  );
}
```

## 🎯 Best Practices

### 1. Always Handle Hydration

```tsx
function SafeThemeToggle() {
  const { isHydrated, toggle } = useThemeToggle();
  
  if (!isHydrated) {
    return <div>Loading...</div>;
  }
  
  return <button onClick={toggle}>Toggle Theme</button>;
}
```

### 2. Provide Accessibility Features

```tsx
function AccessibleThemeToggle() {
  const { isDark, toggle, ariaLabel } = useThemeToggle();
  
  return (
    <button
      onClick={toggle}
      aria-label={ariaLabel}
      aria-pressed={isDark}
      role="switch"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}
```

### 3. Use Semantic HTML

```tsx
function SemanticThemeToggle() {
  const { isDark, toggle, label } = useThemeToggle();
  
  return (
    <nav aria-label="Theme controls">
      <button
        onClick={toggle}
        aria-label={label}
        type="button"
      >
        <span aria-hidden="true">
          {isDark ? '🌙' : '☀️'}
        </span>
        <span className="sr-only">{label}</span>
      </button>
    </nav>
  );
}
```

### 4. Handle Loading States

```tsx
function LoadingThemeToggle() {
  const { isHydrated, toggle, isDark } = useThemeToggle();
  
  return (
    <button
      onClick={toggle}
      disabled={!isHydrated}
      style={{
        opacity: isHydrated ? 1 : 0.5,
        cursor: isHydrated ? 'pointer' : 'not-allowed'
      }}
    >
      {isHydrated ? (isDark ? '🌙' : '☀️') : '⏳'}
    </button>
  );
}
```

## 🔍 Debugging

### Theme State Debugger

```tsx
import { useTheme, useThemeToggle } from 'react-theme-system';

function ThemeDebugger() {
  const themeContext = useTheme();
  const toggleContext = useThemeToggle();
  
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '1rem', 
      left: '1rem', 
      background: '#f0f0f0', 
      padding: '1rem', 
      borderRadius: '0.25rem',
      fontSize: '12px',
      fontFamily: 'monospace'
    }}>
      <h4>Theme Debug Info:</h4>
      <pre>
        {JSON.stringify({
          currentTheme: themeContext.currentTheme,
          isDarkMode: themeContext.isDarkMode,
          isHydrated: themeContext.isHydrated,
          systemTheme: themeContext.systemTheme,
          toggleState: {
            isDark: toggleContext.isDark,
            isHydrated: toggleContext.isHydrated
          }
        }, null, 2)}
      </pre>
    </div>
  );
}
```

## 📚 Related Documentation

- [useTheme Hook](useTheme-Hook)
- [useThemeToggle Hook](useThemeToggle-Hook)
- [useThemeToggleWithSystem Hook](useThemeToggleWithSystem-Hook)
- [System Theme Detection](System-Theme-Detection)
- [Theme Architecture](Theme-Architecture)

## 🆘 Support

- Check the [API Reference](../README.md#api-reference)
- Review [Theme Architecture](Theme-Architecture) for implementation details
- Open an [issue](https://github.com/salehammar/react-theme-system/issues) for bugs
- Join [discussions](https://github.com/salehammar/react-theme-system/discussions) for questions
