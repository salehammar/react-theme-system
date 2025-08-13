# Design Tokens

Design tokens are the foundation of React Theme System. They provide a systematic approach to design decisions and ensure consistency across your application.

## 🎯 What Are Design Tokens?

Design tokens are **atomic design decisions** that represent the smallest visual elements of your design system:

- **Colors** - Brand colors, semantic colors, neutral colors
- **Typography** - Font families, sizes, weights, line heights
- **Spacing** - Margins, padding, gaps, layout spacing
- **Shadows** - Elevation, depth, visual hierarchy
- **Border Radius** - Corner rounding, component shapes
- **Breakpoints** - Responsive design breakpoints
- **Transitions** - Animation durations and easing
- **Z-Index** - Layering and stacking context

## 🎨 Color Tokens

### Semantic Color System

```typescript
interface ThemeColors {
  // Brand colors
  primary: string;      // Main brand color
  secondary: string;    // Secondary brand color
  
  // Semantic colors
  success: string;      // Positive actions, success states
  warning: string;      // Caution, warnings
  error: string;        // Errors, destructive actions
  info: string;         // Information, neutral actions
  
  // Surface colors
  background: string;   // Main background
  surface: string;      // Component backgrounds
  text: string;         // Primary text
  textSecondary: string; // Secondary text
  
  // Border colors
  border: string;       // Component borders
  divider: string;      // Content dividers
}
```

### Color Usage Examples

```tsx
import { Box, Typography, Button } from 'react-theme-system';

function ColorExample() {
  return (
    <Box p="lg" bg="background">
      {/* Brand colors */}
      <Button variant="primary" bg="primary">
        Primary Action
      </Button>
      
      {/* Semantic colors */}
      <Box p="md" bg="success" color="white">
        Success message
      </Box>
      
      <Box p="md" bg="warning" color="white">
        Warning message
      </Box>
      
      <Box p="md" bg="error" color="white">
        Error message
      </Box>
      
      {/* Surface colors */}
      <Box p="md" bg="surface" border="1px solid" borderColor="border">
        Surface content
      </Box>
    </Box>
  );
}
```

### Color Accessibility

```tsx
import { useStyled } from 'react-theme-system';

function AccessibleComponent() {
  const { getColor } = useStyled();
  
  // Ensure sufficient contrast
  const styles = {
    backgroundColor: getColor('primary'),
    color: getColor('background'), // High contrast
    padding: '1rem',
  };
  
  return <div style={styles}>Accessible text</div>;
}
```

## 📝 Typography Tokens

### Font Family System

```typescript
interface TypographyFontFamily {
  primary: string;    // Main font family
  secondary: string;  // Alternative font family
  mono: string;       // Monospace font family
}
```

### Font Size Scale

```typescript
interface TypographyFontSize {
  xs: string;      // 0.75rem (12px)
  sm: string;      // 0.875rem (14px)
  base: string;    // 1rem (16px)
  lg: string;      // 1.125rem (18px)
  xl: string;      // 1.25rem (20px)
  '2xl': string;   // 1.5rem (24px)
  '3xl': string;   // 1.875rem (30px)
}
```

### Font Weight Scale

```typescript
interface TypographyFontWeight {
  light: number;     // 300
  normal: number;    // 400
  medium: number;    // 500
  semibold: number;  // 600
  bold: number;      // 700
}
```

### Typography Usage

```tsx
import { Typography } from 'react-theme-system';

function TypographyExample() {
  return (
    <div>
      {/* Heading hierarchy */}
      <Typography variant="h1" fontSize="3xl" fontWeight="bold">
        Main Heading
      </Typography>
      
      <Typography variant="h2" fontSize="2xl" fontWeight="semibold">
        Section Heading
      </Typography>
      
      <Typography variant="h3" fontSize="xl" fontWeight="medium">
        Subsection Heading
      </Typography>
      
      {/* Body text */}
      <Typography variant="body" fontSize="base" fontWeight="normal">
        Regular body text with good readability.
      </Typography>
      
      <Typography variant="body" fontSize="sm" fontWeight="normal">
        Smaller text for captions and secondary information.
      </Typography>
      
      {/* Monospace */}
      <Typography 
        variant="body" 
        fontSize="sm" 
        fontWeight="normal"
        fontFamily="mono"
      >
        Code: const example = 'monospace';
      </Typography>
    </div>
  );
}
```

## 📏 Spacing Tokens

### Spacing Scale

```typescript
interface ThemeSpacing {
  xs: string;    // 0.25rem (4px)
  sm: string;    // 0.5rem (8px)
  md: string;    // 1rem (16px)
  lg: string;    // 1.5rem (24px)
  xl: string;    // 2rem (32px)
  xxl: string;   // 3rem (48px)
}
```

### Spacing Usage

```tsx
import { Box } from 'react-theme-system';

function SpacingExample() {
  return (
    <Box p="lg" bg="surface">
      {/* Padding */}
      <Box p="xs" bg="primary" color="white">
        Extra small padding
      </Box>
      
      <Box p="sm" bg="secondary" color="white">
        Small padding
      </Box>
      
      <Box p="md" bg="success" color="white">
        Medium padding
      </Box>
      
      <Box p="lg" bg="warning" color="white">
        Large padding
      </Box>
      
      {/* Margins */}
      <Box m="md" p="md" bg="info" color="white">
        Medium margin
      </Box>
      
      {/* Directional spacing */}
      <Box px="lg" py="md" bg="error" color="white">
        Horizontal large, vertical medium
      </Box>
    </Box>
  );
}
```

## 🌟 Shadow Tokens

### Shadow Scale

```typescript
interface ThemeShadows {
  sm: string;   // Subtle elevation
  md: string;   // Medium elevation
  lg: string;   // High elevation
  xl: string;   // Maximum elevation
}
```

### Shadow Usage

```tsx
import { Box } from 'react-theme-system';

function ShadowExample() {
  return (
    <Box p="lg" bg="background">
      <Box p="md" bg="surface" shadow="sm">
        Subtle shadow
      </Box>
      
      <Box p="md" bg="surface" shadow="md">
        Medium shadow
      </Box>
      
      <Box p="md" bg="surface" shadow="lg">
        High shadow
      </Box>
      
      <Box p="md" bg="surface" shadow="xl">
        Maximum shadow
      </Box>
    </Box>
  );
}
```

## 🔄 Border Radius Tokens

### Border Radius Scale

```typescript
interface ThemeBorderRadius {
  none: string;   // 0
  sm: string;     // 0.125rem (2px)
  md: string;     // 0.25rem (4px)
  xl: string;     // 0.5rem (8px)
  full: string;   // 9999px (fully rounded)
}
```

### Border Radius Usage

```tsx
import { Box, Button } from 'react-theme-system';

function BorderRadiusExample() {
  return (
    <Box p="lg" bg="background">
      <Box p="md" bg="surface" borderRadius="none">
        No border radius
      </Box>
      
      <Box p="md" bg="surface" borderRadius="sm">
        Small border radius
      </Box>
      
      <Box p="md" bg="surface" borderRadius="md">
        Medium border radius
      </Box>
      
      <Box p="md" bg="surface" borderRadius="xl">
        Large border radius
      </Box>
      
      <Button borderRadius="full">
        Fully rounded button
      </Button>
    </Box>
  );
}
```

## 📱 Breakpoint Tokens

### Responsive Breakpoints

```typescript
interface ThemeBreakpoints {
  sm: string;   // 640px
  md: string;   // 768px
  lg: string;   // 1024px
  xl: string;   // 1280px
  '2xl': string; // 1536px
}
```

### Responsive Usage

```tsx
import { useStyled } from 'react-theme-system';

function ResponsiveExample() {
  const { responsive } = useStyled();
  
  const styles = {
    padding: '1rem',
    fontSize: '1rem',
    ...responsive('md', {
      padding: '2rem',
      fontSize: '1.125rem',
    }),
    ...responsive('lg', {
      padding: '3rem',
      fontSize: '1.25rem',
    }),
  };
  
  return <div style={styles}>Responsive content</div>;
}
```

## ⚡ Transition Tokens

### Animation Durations

```typescript
interface ThemeTransitions {
  fast: string;   // 150ms
  normal: string; // 250ms
  slow: string;   // 350ms
}
```

### Transition Usage

```tsx
import { useStyled } from 'react-theme-system';

function TransitionExample() {
  const { transitions } = useStyled();
  
  const styles = {
    backgroundColor: 'var(--theme-primary)',
    transition: `background-color ${transitions.normal} ease-in-out`,
  };
  
  return <div style={styles}>Smooth transitions</div>;
}
```

## 🎯 Best Practices

### 1. Use Semantic Names

```typescript
// Good: Semantic naming
colors: {
  primary: '#007AFF',
  success: '#34C759',
  warning: '#FF9500',
}

// Avoid: Generic names
colors: {
  blue: '#007AFF',
  green: '#34C759',
  orange: '#FF9500',
}
```

### 2. Maintain Consistent Scales

```typescript
// Good: Consistent spacing scale
spacing: {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
}

// Avoid: Inconsistent values
spacing: {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '20px',      // Inconsistent!
  xl: '32px',
}
```

### 3. Consider Accessibility

```typescript
// Good: High contrast colors
colors: {
  text: '#000000',
  background: '#FFFFFF',
  primary: '#007AFF',
}

// Ensure sufficient contrast ratios
// Use tools like WebAIM Contrast Checker
```

### 4. Plan for Dark Mode

```typescript
// Light theme
light: {
  colors: {
    background: '#FFFFFF',
    text: '#000000',
    surface: '#F5F5F5',
  }
}

// Dark theme
dark: {
  colors: {
    background: '#000000',
    text: '#FFFFFF',
    surface: '#1A1A1A',
  }
}
```

## 🔧 Custom Token Creation

### Extending the Theme

```typescript
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
```

### Using Custom Tokens

```tsx
import { useStyled } from 'react-theme-system';

function CustomTokenExample() {
  const { theme } = useStyled();
  
  const styles = {
    background: theme.custom.gradients.primary,
    animation: theme.custom.animations.bounce,
  };
  
  return <div style={styles}>Custom token usage</div>;
}
```

## 📚 Related Documentation

- [Theme Architecture](Theme-Architecture)
- [Basic Configuration](Basic-Configuration)
- [Type Safety](Type-Safety)
- [Custom Components](Custom-Components)

