# Theme Architecture

This document explains the internal architecture of React Theme System and how it manages themes, context, and styling.

## 🏗️ System Overview

React Theme System is built around a **centralized theme context** that provides:
- Theme data to all components
- Dark/light mode switching
- Runtime theme updates
- Type-safe theme access

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    React Application                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │                ThemeProvider                        │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │            ThemeContext                      │   │
│  │  │  • theme: Theme                             │   │   │
│  │  │  • isDarkMode: boolean                      │   │   │
│  │  │  • currentTheme: ValidTheme                 │   │   │
│  │  │  • isHydrated: boolean                      │   │   │
│  │  │  • setTheme: (theme) => void                │   │   │
│  │  │  • toggleTheme: () => void                  │   │   │
│  │  │  • updateTheme: (path, value) => void       │   │   │
│  │  │  • resetCustomTheme: () => void             │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   useTheme      │  │   useStyled     │  │   Box       │ │
│  │   Hook          │  │   Hook          │  │  Component  │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Theme Data Structure                   │   │
│  │  • colors: ThemeColors                             │   │
│  │  • spacing: ThemeSpacing                           │   │
│  │  • typography: ThemeTypography                     │   │
│  │  • shadows: ThemeShadows                           │   │
│  │  • borderRadius: ThemeBorderRadius                 │   │
│  │  • breakpoints: ThemeBreakpoints                   │   │
│  │  • transitions: ThemeTransitions                   │   │
│  │  • zIndex: ThemeZIndex                             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Core Components

### 1. ThemeProvider

The `ThemeProvider` is the root component that:
- Creates the theme context
- Manages theme state
- Provides theme switching functionality
- Handles theme persistence

```tsx
interface ThemeProviderProps {
  themes: ThemeConfig;
  children: React.ReactNode;
  defaultTheme?: ValidTheme;
  onChange?: (theme: ValidTheme) => void;
  enablePersistence?: boolean;
}

function ThemeProvider({ themes, children, defaultTheme = 'light', onChange, enablePersistence = true }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ValidTheme | undefined>(undefined);
  const [customTheme, setCustomTheme] = useState<Partial<Theme> | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Theme switching logic
  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
    setTheme(prev => isDarkMode ? defaultTheme.light : defaultTheme.dark);
  }, [isDarkMode, defaultTheme]);
  
  // Runtime theme updates
  const updateTheme = useCallback((path: string, value: any) => {
    setTheme(prev => {
      const newTheme = { ...prev };
      const keys = path.split('.');
      let current = newTheme;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newTheme;
    });
  }, []);
  
  const contextValue = useMemo(() => ({
    theme,
    isDarkMode,
    toggleTheme,
    updateTheme,
  }), [theme, isDarkMode, toggleTheme, updateTheme]);
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### 2. Theme Context

The context provides theme data and functions to all child components:

```tsx
interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  updateTheme: (path: string, value: any) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

### 3. useTheme Hook

Provides easy access to theme context:

```tsx
function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### 4. useStyled Hook

Provides theme-aware styling utilities:

```tsx
function useStyled() {
  const { theme } = useTheme();
  
  const getColor = useCallback((color: keyof ThemeColors) => {
    return theme.colors[color];
  }, [theme.colors]);
  
  const getSpacing = useCallback((space: keyof ThemeSpacing) => {
    return theme.spacing[space];
  }, [theme.spacing]);
  
  const getTypography = useCallback((size: keyof ThemeTypography['fontSize']) => {
    return theme.typography.fontSize[size];
  }, [theme.typography.fontSize]);
  
  const responsive = useCallback((breakpoint: string, styles: StyledStyles) => {
    return {
      [`@media (min-width: ${theme.breakpoints[breakpoint]})`]: styles
    };
  }, [theme.breakpoints]);
  
  return {
    theme,
    getColor,
    getSpacing,
    getTypography,
    responsive,
    // Direct accessors
    colors: theme.colors,
    spacing: theme.spacing,
    typography: theme.typography,
    shadows: theme.shadows,
    borderRadius: theme.borderRadius,
  };
}
```

## 🎨 Theme Data Structure

### Theme Interface

```tsx
interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  borderRadius: ThemeBorderRadius;
  breakpoints: ThemeBreakpoints;
  transitions: ThemeTransitions;
  zIndex: ThemeZIndex;
}
```

### Design Token Categories

#### Colors
```tsx
interface ThemeColors {
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
}
```

#### Spacing
```tsx
interface ThemeSpacing {
  xs: string;    // 0.25rem
  sm: string;    // 0.5rem
  md: string;    // 1rem
  lg: string;    // 1.5rem
  xl: string;    // 2rem
  xxl: string;   // 3rem
}
```

#### Typography
```tsx
interface ThemeTypography {
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
}
```

## 🔄 Theme Switching Mechanism

### 1. State Management

```tsx
const [isDarkMode, setIsDarkMode] = useState(false);
const [theme, setTheme] = useState(defaultTheme.light);
```

### 2. Toggle Function

```tsx
const toggleTheme = useCallback(() => {
  setIsDarkMode(prev => !prev);
  setTheme(prev => isDarkMode ? defaultTheme.light : defaultTheme.dark);
}, [isDarkMode, defaultTheme]);
```

### 3. Theme Application

When `isDarkMode` changes:
1. `setTheme` updates the theme object
2. `ThemeContext.Provider` re-renders with new value
3. All components using `useTheme` or `useStyled` re-render
4. CSS custom properties update automatically

## 🎯 Component Integration

### Styled Components

Components like `Box`, `Typography`, and `Button` use the theme system:

```tsx
function Box({ bg, p, m, children, ...props }: StyledProps) {
  const { getColor, getSpacing } = useStyled();
  
  const styles: React.CSSProperties = {
    backgroundColor: bg ? getColor(bg) : undefined,
    padding: p ? getSpacing(p) : undefined,
    margin: m ? getSpacing(m) : undefined,
    ...props.style,
  };
  
  return <div style={styles} {...props}>{children}</div>;
}
```

### Custom Components

You can create your own themed components:

```tsx
function CustomCard({ variant = 'default', children }: CustomCardProps) {
  const { getColor, getSpacing, shadows, borderRadius } = useStyled();
  
  const styles: React.CSSProperties = {
    backgroundColor: getColor('surface'),
    padding: getSpacing('lg'),
    boxShadow: shadows.md,
    borderRadius: borderRadius.md,
    border: `1px solid ${getColor('border')}`,
  };
  
  return <div style={styles}>{children}</div>;
}
```

## 🔧 Runtime Theme Updates

### Update Function

```tsx
const updateTheme = useCallback((path: string, value: any) => {
  setTheme(prev => {
    const newTheme = { ...prev };
    const keys = path.split('.');
    let current = newTheme;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    return newTheme;
  });
}, []);
```

### Usage Example

```tsx
const { updateTheme } = useTheme();

// Update a specific color
updateTheme('colors.primary', '#FF0000');

// Update spacing
updateTheme('spacing.md', '1.25rem');

// Update typography
updateTheme('typography.fontSize.lg', '1.25rem');
```

## 🚀 Performance Optimizations

### 1. Memoization

- `useMemo` for context value
- `useCallback` for functions
- Prevents unnecessary re-renders

### 2. Selective Updates

- Only components using specific theme tokens re-render
- Context splitting for different theme sections

### 3. CSS Custom Properties

- Theme values exposed as CSS variables
- Enables CSS-only theme switching
- Reduces JavaScript overhead

## 📚 Related Documentation

- [Design Tokens](Design-Tokens) - Understanding theme tokens
- [Type Safety](Type-Safety) - TypeScript integration
- [Performance Optimization](Performance-Optimization) - Performance best practices
- [Custom Components](Custom-Components) - Building themed components
