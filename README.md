# React Theme System

A comprehensive React theme management system that enforces consistency, supports dark/light mode, and eliminates hardcoded styles. Built with TypeScript for full type safety and developer experience.

## ✨ Features

- **🎨 Theme Management**: Centralized theme configuration with light/dark mode support
- **🔒 Type Safety**: Full TypeScript support with autocomplete and validation
- **🚫 No Hardcoded Styles**: Enforced theme token usage through components and hooks
- **🌙 Dark Mode**: Built-in dark/light mode switching with smooth transitions
- **📱 Responsive**: Responsive design utilities with breakpoint support
- **🎛️ Runtime Editor**: Visual theme editor for designers and developers
- **🛠️ CLI Tools**: Scaffolding tools for quick theme setup
- **🔍 Linting**: ESLint rules to enforce theme compliance
- **🤖 AI-Friendly**: Clear patterns for AI-generated code

## 🚀 Quick Start

### Installation

```bash
npm install react-theme-system
```

### Basic Usage

```tsx
import React from 'react';
import { ThemeProvider, Box, Typography, Button, useTheme, defaultTheme } from 'react-theme-system';

const App = () => (
  <ThemeProvider themes={defaultTheme}>
    <Dashboard />
  </ThemeProvider>
);

const Dashboard = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  
  return (
    <Box bg="background" p="lg">
      <Typography as="h1" variant="h2" color="primary" p="md">
        Welcome to React Theme System
      </Typography>
      
      <Box bg="surface" p="md" borderRadius="md" shadow="md" m="md">
        <Typography color="textSecondary" p="sm">
          This component uses theme tokens for consistent styling
        </Typography>
        
        <Box style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <Button onClick={toggleTheme} variant="primary">
            Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
          </Button>
          <Button variant="outline">Secondary Action</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
```

## 🎨 Theme Configuration

### Using Default Theme

```tsx
import { ThemeProvider, defaultTheme } from 'react-theme-system';

<ThemeProvider themes={defaultTheme}>
  {children}
</ThemeProvider>
```

### Custom Theme

```tsx
import { ThemeProvider } from 'react-theme-system';

const customTheme = {
  light: {
    colors: {
      primary: '#your-primary-color',
      background: '#your-background',
      // ... other tokens
    },
    // ... other theme sections
  },
  dark: {
    // ... dark mode tokens
  }
};

<ThemeProvider themes={customTheme}>
  {children}
</ThemeProvider>
```

## 🧩 Components

### Box Component

The `Box` component provides layout and styling with theme tokens:

```tsx
import { Box } from 'react-theme-system';

<Box 
  bg="surface" 
  p="lg" 
  m="md" 
  borderRadius="md" 
  shadow="lg"
>
  Content goes here
</Box>
```

**Props:**
- `bg`: Background color token
- `p`, `px`, `py`: Padding tokens
- `m`, `mx`, `my`: Margin tokens
- `borderRadius`: Border radius token
- `shadow`: Shadow token
- `fontSize`: Typography size token
- `fontWeight`: Typography weight token

### Typography Component

Typography component with semantic variants:

```tsx
import { Typography } from 'react-theme-system';

<Typography as="h1" variant="h2" color="primary" p="md">
  Heading Text
</Typography>

<Typography variant="body" color="textSecondary">
  Body text with secondary color
</Typography>
```

**Props:**
- `as`: HTML element (`p`, `span`, `h1`, `h2`, etc.)
- `variant`: Typography variant (`body`, `caption`, `overline`, `button`)
- `color`: Color token
- `fontSize`: Font size token
- `fontWeight`: Font weight token
- `align`: Text alignment
- `truncate`: Truncate long text
- `noWrap`: Prevent text wrapping

### Button Component

Theme-aware button with multiple variants:

```tsx
import { Button } from 'react-theme-system';

<Button variant="primary" size="md" onClick={handleClick}>
  Primary Button
</Button>

<Button variant="outline" size="lg" disabled>
  Disabled Button
</Button>
```

**Props:**
- `variant`: Button style (`primary`, `secondary`, `outline`, `ghost`, `danger`)
- `size`: Button size (`sm`, `md`, `lg`)
- `disabled`: Disable button
- `loading`: Show loading state
- `fullWidth`: Full width button
- `onClick`: Click handler

## 🪝 Hooks

### useTheme Hook

Access theme context and controls:

```tsx
import { useTheme } from 'react-theme-system';

const { theme, isDarkMode, toggleTheme, updateTheme } = useTheme();

// Access theme values
const primaryColor = theme.colors.primary;
const spacing = theme.spacing.md;

// Toggle theme
toggleTheme();

// Update specific theme values
updateTheme('colors.primary', '#new-color');
```

### useStyled Hook

Advanced styling utilities:

```tsx
import { useStyled } from 'react-theme-system';

const { 
  styled, 
  getColor, 
  getSpacing, 
  responsive 
} = useStyled();

// Create styled object
const styles = styled({
  backgroundColor: 'colors.primary',
  padding: 'spacing.lg',
  color: 'colors.text'
});

// Direct token access
const primaryColor = getColor('primary');
const largeSpacing = getSpacing('lg');

// Responsive styles
const responsiveStyles = responsive('md', {
  padding: 'spacing.xl',
  fontSize: 'typography.fontSize.lg'
});
```

## 🎛️ Theme Editor

The `ThemeEditor` component provides a visual interface for theme customization:

```tsx
import { ThemeEditor } from 'react-theme-system';

const App = () => (
  <ThemeProvider themes={defaultTheme}>
    <ThemeEditor />
  </ThemeProvider>
);
```

Features:
- Color picker for all color tokens
- Spacing sliders for spacing scale
- Typography controls
- Real-time preview
- Theme export/import
- Reset functionality

## 🛠️ CLI Tools

### Theme Scaffolding

Create a new theme project:

```bash
npx react-theme-system create-theme
```

This creates:
- `theme.config.js` - Theme configuration
- `MyComponent.tsx` - Example component
- `App.example.tsx` - Usage example
- `.eslintrc.json` - Theme enforcement rules

### Type Generation

Types are automatically generated on install, or manually:

```bash
npx react-theme-system generate-types
```

## 🔍 Linting & Enforcement

### ESLint Rules

The package includes ESLint rules to enforce theme compliance:

```json
{
  "rules": {
    "no-hardcoded-colors": "error",
    "no-hardcoded-spacing": "error",
    "prefer-theme-tokens": "warn"
  }
}
```

### VS Code Integration

Install the VS Code extension for:
- Hardcoded value detection
- Theme token autocomplete
- Color previews in gutter
- Token validation

## 🤖 AI Development Support

### Prompt Engineering

Teach AI to generate theme-compatible code:

```
"Always use theme tokens from theme.config.js. 
Use <Box> component for layout. 
Access colors via theme.colors.[token], 
spacing via theme.spacing.[size]. 
Never use hardcoded values."
```

### Code Patterns

AI-friendly patterns for consistent styling:

```tsx
// ✅ Good - Using theme tokens
<Box bg="surface" p="md" borderRadius="md">
  <Typography color="text" fontSize="base">
    Content
  </Typography>
</Box>

// ❌ Bad - Hardcoded values
<div style={{ backgroundColor: '#f8f9fa', padding: '16px' }}>
  <p style={{ color: '#212529', fontSize: '16px' }}>
    Content
  </p>
</div>
```

## 📱 Responsive Design

### Breakpoint Utilities

```tsx
import { useStyled } from 'react-theme-system';

const { responsive } = useStyled();

const styles = {
  padding: 'spacing.md',
  ...responsive('lg', {
    padding: 'spacing.lg',
    fontSize: 'typography.fontSize.lg'
  })
};
```

### Media Query Support

```tsx
const { theme } = useTheme();

const mediaQuery = `@media (min-width: ${theme.breakpoints.md}) {
  .responsive-element {
    padding: ${theme.spacing.lg};
  }
}`;
```

## 🎨 Advanced Theming

### Component Variants

```tsx
// theme.config.js
module.exports = {
  button: {
    primary: {
      backgroundColor: 'colors.primary',
      color: 'colors.white',
      padding: 'spacing.md'
    },
    secondary: {
      backgroundColor: 'colors.secondary',
      color: 'colors.white',
      padding: 'spacing.md'
    }
  }
};

// Usage
const buttonStyles = theme.button.primary;
```

### Dynamic Theme Updates

```tsx
const { updateTheme } = useTheme();

// Update specific values
updateTheme('colors.primary', '#new-color');
updateTheme('spacing.md', '1.5rem');

// Batch updates
['sm', 'md', 'lg'].forEach(size => {
  updateTheme(`spacing.${size}`, `${parseInt(size) * 0.5}rem`);
});
```

## 📦 Package Structure

```
react-theme-system/
├── src/
│   ├── ThemeProvider.tsx      # Main theme context
│   ├── hooks/
│   │   └── useStyled.ts       # Styling utilities
│   ├── styled/
│   │   ├── Box.tsx            # Layout component
│   │   ├── Typography.tsx     # Typography component
│   │   └── Button.tsx         # Button component
│   ├── components/
│   │   └── ThemeEditor.tsx    # Visual theme editor
│   ├── themes/
│   │   └── default.ts         # Default theme
│   └── types.ts               # TypeScript definitions
├── bin/
│   ├── create-theme.js        # CLI scaffolding tool
│   └── generate-types.js      # Type generation
├── theme.config.js            # Template theme config
└── package.json
```

## 🔧 Development

### Building

```bash
npm run build
```

### Development Mode

```bash
npm run dev
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## 📚 Examples

### Dashboard Layout

```tsx
const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Box bg="background" minHeight="100vh">
      {/* Header */}
      <Box bg="surface" p="lg" shadow="sm" borderBottom="1px solid" style={{ borderColor: theme.colors.border }}>
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography as="h1" variant="h2" color="primary">Dashboard</Typography>
          <Button onClick={toggleTheme} variant="outline">
            {theme.isDarkMode ? '☀️' : '🌙'}
          </Button>
        </Box>
      </Box>
      
      {/* Content */}
      <Box p="lg">
        <Box bg="surface" p="lg" borderRadius="lg" shadow="md" m="md">
          <Typography as="h2" variant="h3" color="text" p="sm">Welcome</Typography>
          <Typography color="textSecondary">This is your dashboard content.</Typography>
        </Box>
      </Box>
    </Box>
  );
};
```

### Form Component

```tsx
const Form = () => {
  return (
    <Box bg="surface" p="lg" borderRadius="lg" shadow="md">
      <Typography as="h2" variant="h3" color="primary" p="sm">Contact Form</Typography>
      
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input 
          placeholder="Name"
          style={{
            padding: theme.spacing.sm,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.base
          }}
        />
        
        <Button variant="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- 📖 [Documentation](https://github.com/salehammar/react-theme-system)
- 🐛 [Issues](https://github.com/salehammar/react-theme-system/issues)
- 💬 [Discussions](https://github.com/salehammar/react-theme-system/
discussions)

---

Built with ❤️ for the React community
