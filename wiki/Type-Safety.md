# Type Safety

React Theme System provides comprehensive TypeScript support to ensure type safety throughout your themed applications.

## 🎯 Overview

Type safety in React Theme System ensures:
- **Compile-time validation** of theme tokens
- **Autocomplete and IntelliSense** for all theme properties
- **Runtime type checking** for theme updates
- **Error prevention** for invalid theme paths

## 🔧 TypeScript Setup

### Basic Setup

React Theme System includes TypeScript definitions out of the box. No additional setup required!

```tsx
import { ThemeProvider, useTheme, Theme } from 'react-theme-system';

// Full type safety and autocomplete
function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  // TypeScript knows the exact structure of theme
  const primaryColor = theme.colors.primary; // ✅ Type-safe
  const spacing = theme.spacing.md; // ✅ Type-safe
  
  return <div>Component with type safety</div>;
}
```

### Custom Theme Types

```tsx
import { Theme } from 'react-theme-system';

// Extend the base theme interface
interface CustomTheme extends Theme {
  custom: {
    gradients: {
      primary: string;
      secondary: string;
    };
    animations: {
      bounce: string;
      fade: string;
    };
  };
}

// Use your custom theme
const customTheme: CustomTheme = {
  ...defaultTheme.light,
  custom: {
    gradients: {
      primary: 'linear-gradient(45deg, #007AFF, #5856D6)',
      secondary: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
    },
    animations: {
      bounce: 'bounce 0.5s ease-in-out',
      fade: 'fade 0.3s ease-in-out',
    },
  },
};
```

## 🎨 Theme Interface Types

### Core Theme Interface

```typescript
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

### Color Types

```typescript
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

### Spacing Types

```typescript
interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}
```

### Typography Types

```typescript
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

## 🎯 Component Props Types

### StyledProps Interface

```typescript
interface StyledProps {
  bg?: keyof ThemeColors;
  color?: keyof ThemeColors;
  p?: keyof ThemeSpacing;
  px?: keyof ThemeSpacing;
  py?: keyof ThemeSpacing;
  m?: keyof ThemeSpacing;
  mx?: keyof ThemeSpacing;
  my?: keyof ThemeSpacing;
  borderRadius?: keyof ThemeBorderRadius;
  shadow?: keyof ThemeShadows;
  fontSize?: keyof ThemeTypography['fontSize'];
  fontWeight?: keyof ThemeTypography['fontWeight'];
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
```

### Typed Component Usage

```tsx
import { Box, Typography, Button } from 'react-theme-system';

function TypedComponent() {
  return (
    <Box 
      bg="primary"        // ✅ Type-safe: only valid color keys
      p="md"              // ✅ Type-safe: only valid spacing keys
      borderRadius="md"   // ✅ Type-safe: only valid border radius keys
    >
      <Typography 
        variant="h1"      // ✅ Type-safe: only valid variants
        fontSize="2xl"    // ✅ Type-safe: only valid font sizes
        fontWeight="bold" // ✅ Type-safe: only valid font weights
      >
        Typed Content
      </Typography>
      
      <Button 
        variant="primary" // ✅ Type-safe: only valid button variants
        size="md"         // ✅ Type-safe: only valid button sizes
      >
        Typed Button
      </Button>
    </Box>
  );
}
```

## 🔍 Type-Safe Theme Access

### useTheme Hook Types

```tsx
import { useTheme } from 'react-theme-system';

function ThemeHookExample() {
  const { theme, isDarkMode, toggleTheme, updateTheme } = useTheme();
  
  // theme is fully typed
  const primaryColor: string = theme.colors.primary; // ✅ Type-safe
  const mediumSpacing: string = theme.spacing.md; // ✅ Type-safe
  
  // updateTheme is type-safe
  updateTheme('colors.primary', '#FF0000'); // ✅ Valid path
  updateTheme('spacing.md', '1.5rem'); // ✅ Valid path
  
  // TypeScript will catch invalid paths
  // updateTheme('colors.invalid', '#FF0000'); // ❌ Type error
  // updateTheme('invalid.path', 'value'); // ❌ Type error
  
  return <div>Type-safe theme usage</div>;
}
```

### useStyled Hook Types

```tsx
import { useStyled } from 'react-theme-system';

function StyledHookExample() {
  const { 
    getColor, 
    getSpacing, 
    getTypography, 
    responsive,
    colors,
    spacing,
    typography 
  } = useStyled();
  
  // Type-safe getter functions
  const primaryColor = getColor('primary'); // ✅ Type-safe
  const mediumSpacing = getSpacing('md'); // ✅ Type-safe
  const largeFontSize = getTypography('lg'); // ✅ Type-safe
  
  // Direct access with full typing
  const successColor: string = colors.success; // ✅ Type-safe
  const largeSpacing: string = spacing.lg; // ✅ Type-safe
  const boldWeight: number = typography.fontWeight.bold; // ✅ Type-safe
  
  // Responsive function is type-safe
  const responsiveStyles = responsive('md', {
    padding: '2rem',
    fontSize: '1.125rem',
  });
  
  return <div style={responsiveStyles}>Styled content</div>;
}
```

## 🛡️ Runtime Type Validation

### Theme Validation

```tsx
import { validateTheme } from 'react-theme-system';

// Validate theme at runtime
const themeValidation = validateTheme(customTheme);

if (!themeValidation.isValid) {
  console.warn('Theme validation errors:', themeValidation.errors);
}

// Type-safe validation result
interface ThemeValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
```

### Component Prop Validation

```tsx
import { validateStyledProps } from 'react-theme-system';

function ValidatedComponent(props: StyledProps) {
  // Validate props at runtime
  const validation = validateStyledProps(props, theme);
  
  if (!validation.isValid) {
    console.warn('Invalid props:', validation.errors);
  }
  
  return <div>Validated component</div>;
}
```

## 🔧 Advanced Type Patterns

### Conditional Types

```tsx
import { Theme, ThemeColors, ThemeSpacing } from 'react-theme-system';

// Conditional type for theme tokens
type ThemeToken<T extends keyof Theme> = Theme[T];

// Usage
type ColorTokens = ThemeToken<'colors'>; // ThemeColors
type SpacingTokens = ThemeToken<'spacing'>; // ThemeSpacing

// Conditional type for valid theme paths
type ThemePath = 
  | `colors.${keyof ThemeColors}`
  | `spacing.${keyof ThemeSpacing}`
  | `typography.fontSize.${keyof ThemeTypography['fontSize']}`;

// Type-safe path validation
function updateThemeSafely(path: ThemePath, value: string) {
  // Implementation with full type safety
}
```

### Generic Components

```tsx
import { Theme, ThemeColors } from 'react-theme-system';

// Generic component with theme constraints
interface ThemedComponentProps<T extends keyof ThemeColors> {
  color: T;
  children: React.ReactNode;
}

function ThemedComponent<T extends keyof ThemeColors>({
  color,
  children
}: ThemedComponentProps<T>) {
  const { getColor } = useStyled();
  
  const styles = {
    color: getColor(color), // Type-safe color access
  };
  
  return <div style={styles}>{children}</div>;
}

// Usage with full type safety
<ThemedComponent color="primary">Content</ThemedComponent> // ✅ Valid
<ThemedComponent color="success">Content</ThemedComponent> // ✅ Valid
// <ThemedComponent color="invalid">Content</ThemedComponent> // ❌ Type error
```

### Utility Types

```tsx
import { Theme } from 'react-theme-system';

// Extract color keys
type ColorKeys = keyof Theme['colors'];

// Extract spacing keys
type SpacingKeys = keyof Theme['spacing'];

// Extract font size keys
type FontSizeKeys = keyof Theme['typography']['fontSize'];

// Create a type for theme-aware props
type ThemeAwareProps = {
  [K in keyof Theme]?: Partial<Theme[K]>;
};
```

## 🎯 Type Safety Best Practices

### 1. Use Strict TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 2. Leverage Type Inference

```tsx
// Let TypeScript infer types when possible
const { theme } = useTheme(); // TypeScript infers Theme type

// Explicit typing when needed
const customTheme: Theme = {
  // TypeScript will validate all required properties
};
```

### 3. Use Type Guards

```tsx
import { isTheme } from 'react-theme-system';

// Type guard for theme validation
function validateThemeObject(obj: unknown): obj is Theme {
  return isTheme(obj);
}

// Usage
const maybeTheme = getThemeFromAPI();
if (validateThemeObject(maybeTheme)) {
  // TypeScript knows maybeTheme is Theme
  const primaryColor = maybeTheme.colors.primary;
}
```

### 4. Avoid Type Assertions

```tsx
// ❌ Avoid type assertions
const theme = someObject as Theme;

// ✅ Use proper typing
const theme: Theme = someObject;

// ✅ Use type guards
if (isTheme(someObject)) {
  const theme = someObject; // Type-safe
}
```

## 🔍 Debugging Type Issues

### TypeScript Error Resolution

```tsx
// Common type errors and solutions

// Error: Property 'invalidColor' does not exist on type 'ThemeColors'
// Solution: Use valid color keys
const color = theme.colors.primary; // ✅ Valid
// const color = theme.colors.invalidColor; // ❌ Invalid

// Error: Argument of type 'string' is not assignable to parameter of type 'keyof ThemeColors'
// Solution: Use typed parameters
function getColor(color: keyof ThemeColors) {
  return theme.colors[color];
}

// Error: Type 'string' is not assignable to type 'ThemePath'
// Solution: Use proper path types
const path: ThemePath = 'colors.primary'; // ✅ Valid
// const path: ThemePath = 'invalid.path'; // ❌ Invalid
```

### IDE Support

```tsx
// Enable better IDE support with JSDoc
/**
 * A themed component with full type safety
 * @param props - Themed component props
 * @returns A themed component
 */
function ThemedComponent(props: StyledProps) {
  // IDE will provide autocomplete for all theme properties
  return <div>Component</div>;
}
```

## 📚 Related Documentation

- [Theme Architecture](Theme-Architecture)
- [Design Tokens](Design-Tokens)
- [Basic Configuration](Basic-Configuration)
- [Custom Components](Custom-Components)
