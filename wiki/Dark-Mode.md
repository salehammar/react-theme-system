# Dark Mode

React Theme System provides comprehensive dark mode support with automatic detection, smooth transitions, and accessibility considerations.

## 🎯 Overview

Dark mode in React Theme System includes:
- **Automatic system preference detection**
- **Manual theme switching**
- **Smooth transitions**
- **Accessibility compliance**
- **Persistent theme state**

## 🌙 Basic Dark Mode Setup

### Simple Implementation

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
      {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
```

### With System Preference Detection

```tsx
import { ThemeProvider } from 'react-theme-system';

function App() {
  return (
    <ThemeProvider enableSystemPreference={true}>
      <YourAppContent />
    </ThemeProvider>
  );
}
```

## 🎨 Dark Mode Theme Configuration

### Default Dark Theme

```javascript
// theme.config.js
const { defaultTheme } = require('react-theme-system');

module.exports = {
  light: {
    ...defaultTheme.light,
    colors: {
      ...defaultTheme.light.colors,
      primary: '#007AFF',
      secondary: '#5856D6',
      background: '#FFFFFF',
      surface: '#F5F5F5',
      text: '#000000',
      textSecondary: '#666666',
      border: '#E5E5E5',
    },
  },
  dark: {
    ...defaultTheme.dark,
    colors: {
      ...defaultTheme.dark.colors,
      primary: '#0A84FF',
      secondary: '#5E5CE6',
      background: '#000000',
      surface: '#1A1A1A',
      text: '#FFFFFF',
      textSecondary: '#CCCCCC',
      border: '#333333',
    },
  },
};
```

### Custom Dark Theme

```javascript
// theme.config.js
module.exports = {
  light: {
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      background: '#FFFFFF',
      surface: '#F8F9FA',
      text: '#2C3E50',
      textSecondary: '#7F8C8D',
      success: '#2ECC71',
      warning: '#F39C12',
      error: '#E74C3C',
      border: '#E9ECEF',
      divider: '#DEE2E6',
    },
    // ... other theme properties
  },
  dark: {
    colors: {
      primary: '#FF8E8E',
      secondary: '#6EE7DF',
      background: '#0D1117',
      surface: '#161B22',
      text: '#F0F6FC',
      textSecondary: '#8B949E',
      success: '#3FB950',
      warning: '#F78166',
      error: '#F85149',
      border: '#30363D',
      divider: '#21262D',
    },
    // ... other theme properties
  },
};
```

## 🔄 Theme Switching Mechanisms

### Manual Toggle

```tsx
import { useTheme } from 'react-theme-system';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
        color: isDarkMode ? '#fff' : '#000',
      }}
    >
      {isDarkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
```

### System Preference Detection

```tsx
import { useEffect } from 'react';
import { useTheme } from 'react-theme-system';

function SystemThemeDetector() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches !== isDarkMode) {
        toggleTheme();
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isDarkMode, toggleTheme]);
  
  return null; // This component doesn't render anything
}
```

### Keyboard Shortcut

```tsx
import { useEffect } from 'react';
import { useTheme } from 'react-theme-system';

function KeyboardThemeToggle() {
  const { toggleTheme } = useTheme();
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Toggle theme with Cmd/Ctrl + Shift + T
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'T') {
        event.preventDefault();
        toggleTheme();
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [toggleTheme]);
  
  return null;
}
```

## 🎨 Dark Mode Styling

### CSS Custom Properties

```css
/* styles.css */
:root {
  /* Light theme variables */
  --theme-background: #ffffff;
  --theme-surface: #f5f5f5;
  --theme-text: #000000;
  --theme-text-secondary: #666666;
  --theme-border: #e5e5e5;
}

[data-theme="dark"] {
  /* Dark theme variables */
  --theme-background: #000000;
  --theme-surface: #1a1a1a;
  --theme-text: #ffffff;
  --theme-text-secondary: #cccccc;
  --theme-border: #333333;
}

/* Smooth transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```

### Component-Level Dark Mode

```tsx
import { useTheme } from 'react-theme-system';

function DarkModeAwareComponent() {
  const { isDarkMode } = useTheme();
  
  const styles = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#000000',
    border: `1px solid ${isDarkMode ? '#333333' : '#e5e5e5'}`,
    padding: '1rem',
    borderRadius: '0.5rem',
    transition: 'all 0.3s ease',
  };
  
  return (
    <div style={styles}>
      <h3>Dark Mode Aware Component</h3>
      <p>Current theme: {isDarkMode ? 'Dark' : 'Light'}</p>
    </div>
  );
}
```

## 🎯 Dark Mode Best Practices

### 1. Color Contrast

```tsx
import { useStyled } from 'react-theme-system';

function HighContrastComponent() {
  const { getColor } = useStyled();
  
  const styles = {
    backgroundColor: getColor('primary'),
    color: getColor('background'), // High contrast
    padding: '1rem',
    borderRadius: '0.5rem',
  };
  
  return <div style={styles}>High contrast content</div>;
}
```

### 2. Semantic Color Usage

```tsx
import { Box, Typography } from 'react-theme-system';

function SemanticColors() {
  return (
    <Box p="lg" bg="background">
      {/* Success state */}
      <Box p="md" bg="success" color="white" borderRadius="md">
        <Typography variant="body">Success message</Typography>
      </Box>
      
      {/* Warning state */}
      <Box p="md" bg="warning" color="white" borderRadius="md">
        <Typography variant="body">Warning message</Typography>
      </Box>
      
      {/* Error state */}
      <Box p="md" bg="error" color="white" borderRadius="md">
        <Typography variant="body">Error message</Typography>
      </Box>
    </Box>
  );
}
```

### 3. Image and Icon Adaptation

```tsx
import { useTheme } from 'react-theme-system';

function AdaptiveImage() {
  const { isDarkMode } = useTheme();
  
  return (
    <img 
      src={isDarkMode ? '/logo-dark.png' : '/logo-light.png'}
      alt="Logo"
      style={{ filter: isDarkMode ? 'invert(1)' : 'none' }}
    />
  );
}
```

### 4. Focus States

```tsx
import { useTheme } from 'react-theme-system';

function AccessibleButton() {
  const { isDarkMode } = useTheme();
  
  const styles = {
    padding: '0.75rem 1.5rem',
    backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
    color: isDarkMode ? '#fff' : '#000',
    border: '2px solid transparent',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };
  
  const focusStyles = {
    outline: 'none',
    borderColor: isDarkMode ? '#0A84FF' : '#007AFF',
    boxShadow: `0 0 0 3px ${isDarkMode ? 'rgba(10, 132, 255, 0.3)' : 'rgba(0, 122, 255, 0.3)'}`,
  };
  
  return (
    <button 
      style={styles}
      onFocus={(e) => Object.assign(e.target.style, focusStyles)}
      onBlur={(e) => {
        e.target.style.borderColor = 'transparent';
        e.target.style.boxShadow = 'none';
      }}
    >
      Accessible Button
    </button>
  );
}
```

## 🔧 Advanced Dark Mode Features

### Theme Persistence

```tsx
import { useEffect } from 'react';
import { useTheme } from 'react-theme-system';

function ThemePersistence() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme-preference', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  
  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-preference');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      if (!isDarkMode) toggleTheme();
    }
  }, []);
  
  return null;
}
```

### Theme Animation

```tsx
import { useTheme } from 'react-theme-system';

function AnimatedThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  const buttonStyles = {
    position: 'relative',
    width: '60px',
    height: '30px',
    backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
    borderRadius: '15px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };
  
  const toggleStyles = {
    position: 'absolute',
    top: '2px',
    left: isDarkMode ? '32px' : '2px',
    width: '26px',
    height: '26px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    transition: 'left 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  };
  
  return (
    <button style={buttonStyles} onClick={toggleTheme}>
      <div style={toggleStyles} />
    </button>
  );
}
```

### Conditional Rendering

```tsx
import { useTheme } from 'react-theme-system';

function ConditionalDarkMode() {
  const { isDarkMode } = useTheme();
  
  return (
    <div>
      {isDarkMode ? (
        <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '1rem' }}>
          Dark mode specific content
        </div>
      ) : (
        <div style={{ backgroundColor: '#f5f5f5', color: '#000', padding: '1rem' }}>
          Light mode specific content
        </div>
      )}
    </div>
  );
}
```

## 🎨 Dark Mode Design Principles

### 1. Maintain Visual Hierarchy

```tsx
import { Box, Typography } from 'react-theme-system';

function VisualHierarchy() {
  return (
    <Box p="lg" bg="background">
      {/* Primary content */}
      <Typography variant="h1" color="text">
        Main Heading
      </Typography>
      
      {/* Secondary content */}
      <Typography variant="body" color="textSecondary">
        Secondary information
      </Typography>
      
      {/* Interactive elements */}
      <Box p="md" bg="surface" borderRadius="md" border="1px solid" borderColor="border">
        Interactive content area
      </Box>
    </Box>
  );
}
```

### 2. Use Appropriate Contrast Ratios

```tsx
// Ensure WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
const contrastRatios = {
  primary: {
    light: '#007AFF', // High contrast on light backgrounds
    dark: '#0A84FF',  // High contrast on dark backgrounds
  },
  text: {
    light: '#000000', // Maximum contrast
    dark: '#FFFFFF',  // Maximum contrast
  },
  surface: {
    light: '#F5F5F5', // Subtle elevation
    dark: '#1A1A1A',  // Subtle elevation
  },
};
```

### 3. Consider Color Blindness

```tsx
// Use patterns and icons in addition to color
function ColorBlindFriendly() {
  return (
    <div>
      <div style={{ color: 'success', display: 'flex', alignItems: 'center' }}>
        <span>✓</span> Success (with checkmark)
      </div>
      
      <div style={{ color: 'warning', display: 'flex', alignItems: 'center' }}>
        <span>⚠️</span> Warning (with icon)
      </div>
      
      <div style={{ color: 'error', display: 'flex', alignItems: 'center' }}>
        <span>✗</span> Error (with X mark)
      </div>
    </div>
  );
}
```

## 🔍 Testing Dark Mode

### Visual Testing

```tsx
import { useTheme } from 'react-theme-system';

function DarkModeTester() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dark Mode Testing</h2>
      <p>Current theme: {isDarkMode ? 'Dark' : 'Light'}</p>
      
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
      
      {/* Test all color combinations */}
      <div style={{ marginTop: '2rem' }}>
        <h3>Color Tests</h3>
        <div style={{ backgroundColor: 'primary', color: 'white', padding: '1rem' }}>
          Primary background
        </div>
        <div style={{ backgroundColor: 'surface', color: 'text', padding: '1rem' }}>
          Surface background
        </div>
        <div style={{ backgroundColor: 'background', color: 'text', padding: '1rem' }}>
          Main background
        </div>
      </div>
    </div>
  );
}
```

### Accessibility Testing

```tsx
// Test with screen readers and keyboard navigation
function AccessibilityTest() {
  return (
    <div>
      <button 
        onClick={() => {}} 
        aria-label="Toggle dark mode"
        aria-pressed={isDarkMode}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
```

## 📚 Related Documentation

- [Theme Architecture](Theme-Architecture)
- [Design Tokens](Design-Tokens)
- [Basic Configuration](Basic-Configuration)
- [Type Safety](Type-Safety)

