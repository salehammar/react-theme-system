# Installation Guide

This guide will help you install and set up React Theme System in your project.

## 📋 Prerequisites

- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **React**: Version 16.8.0 or higher (for hooks support)

## 🚀 Quick Installation

### Using npm
```bash
npm install react-theme-system
```

### Using yarn
```bash
yarn add react-theme-system
```

### Using pnpm
```bash
pnpm add react-theme-system
```

## 📦 Package Contents

After installation, you'll have access to:

- **Core Components**: `ThemeProvider`, `Box`, `Typography`, `Button`
- **Hooks**: `useTheme`, `useStyled`
- **CLI Tools**: `create-theme`, `generate-types`
- **Type Definitions**: Full TypeScript support
- **Default Themes**: Light and dark mode themes

## 🛠️ CLI Tools Setup

### Install CLI Tools Globally (Optional)
```bash
npm install -g react-theme-system
```

### Use CLI Tools with npx (Recommended)
```bash
# Create a new theme project
npx react-theme-system create-theme

# Generate TypeScript types
npx react-theme-system generate-types
```

## ⚙️ Basic Setup

### 1. Wrap Your App with ThemeProvider

```tsx
import React from 'react';
import { ThemeProvider } from 'react-theme-system';

function App() {
  return (
    <ThemeProvider>
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### 2. Use Themed Components

```tsx
import { Box, Typography, Button } from 'react-theme-system';

function MyComponent() {
  return (
    <Box p="md" bg="primary">
      <Typography variant="h1">Hello World</Typography>
      <Button variant="primary">Click me</Button>
    </Box>
  );
}
```

## 🔧 Advanced Setup

### Custom Theme Configuration

Create a `theme.config.js` file:

```javascript
const { defaultTheme } = require('react-theme-system');

module.exports = {
  light: {
    ...defaultTheme.light,
    colors: {
      ...defaultTheme.light.colors,
      primary: '#007AFF',
      secondary: '#5856D6',
    },
  },
  dark: {
    ...defaultTheme.dark,
    colors: {
      ...defaultTheme.dark.colors,
      primary: '#0A84FF',
      secondary: '#5E5CE6',
    },
  },
};
```

### TypeScript Setup

The package includes TypeScript definitions. No additional setup required!

```tsx
import { Theme, useTheme } from 'react-theme-system';

// Full type safety and autocomplete
const { theme, toggleTheme } = useTheme();
```

## 📱 Framework Integration

### Next.js
```tsx
// pages/_app.tsx
import { ThemeProvider } from 'react-theme-system';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Create React App
```tsx
// src/App.tsx
import { ThemeProvider } from 'react-theme-system';

function App() {
  return (
    <ThemeProvider>
      <YourAppContent />
    </ThemeProvider>
  );
}
```

### Gatsby
```tsx
// gatsby-browser.js
import React from 'react';
import { ThemeProvider } from 'react-theme-system';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
```

## 🔍 Verification

### Check Installation
```bash
# Verify package is installed
npm list react-theme-system

# Check available exports
node -e "console.log(Object.keys(require('react-theme-system')))"
```

### Test Basic Usage
```tsx
import { ThemeProvider, Box, Typography } from 'react-theme-system';

function TestComponent() {
  return (
    <ThemeProvider>
      <Box p="md" bg="primary">
        <Typography variant="h1">Theme System Working!</Typography>
      </Box>
    </ThemeProvider>
  );
}
```

## 🚨 Troubleshooting

### Common Issues

**1. "Module not found" error**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install react-theme-system
```

**2. TypeScript errors**
```bash
# Ensure TypeScript is installed
npm install --save-dev typescript @types/react
```

**3. CLI tools not working**
```bash
# Use npx instead of global installation
npx react-theme-system create-theme
```

### Getting Help

- [GitHub Issues](https://github.com/salehammar/react-theme-system/issues)
- [Discussions](https://github.com/salehammar/react-theme-system/discussions)
- [Troubleshooting Guide](Troubleshooting)

## 📚 Next Steps

- [Quick Start Tutorial](Quick-Start-Tutorial)
- [Basic Configuration](Basic-Configuration)
- [Theme Architecture](Theme-Architecture)
