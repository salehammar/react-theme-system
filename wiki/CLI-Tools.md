# CLI Tools

React Theme System includes powerful command-line tools to help you scaffold and manage your themed applications.

## 🛠️ Available Commands

### `create-theme`

Creates a new theme project with all necessary files and configurations.

```bash
# Using npx (recommended)
npx react-theme-system create-theme

# Using global installation
react-theme-system create-theme
```

**What it creates:**
- `theme.config.js` - Central theme configuration
- `MyComponent.tsx` - Example themed component
- `App.example.tsx` - Usage example
- `.eslintrc.json` - ESLint configuration with theme rules

### `generate-types`

Generates TypeScript definitions and custom theme provider based on your `theme.config.js`.

```bash
# Using npx (recommended)
npx react-theme-system generate-types

# Using global installation
react-theme-system generate-types
```

**What it creates:**
- `theme.types.ts` - TypeScript definitions for your theme
- `CustomThemeProvider.tsx` - Custom theme provider wrapper

## 📁 Generated Files

### theme.config.js

```javascript
const { defaultTheme } = require('react-theme-system');

module.exports = {
  light: {
    ...defaultTheme.light,
    colors: {
      ...defaultTheme.light.colors,
      // Customize your colors here
      primary: '#007AFF',
      secondary: '#5856D6',
    },
  },
  dark: {
    ...defaultTheme.dark,
    colors: {
      ...defaultTheme.dark.colors,
      // Customize your dark mode colors here
      primary: '#0A84FF',
      secondary: '#5E5CE6',
    },
  },
};
```

### MyComponent.tsx

```tsx
import React from 'react';
import { Box, Typography, Button, useTheme } from 'react-theme-system';

export function MyComponent() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Box p="lg" bg="surface" borderRadius="md" shadow="md">
      <Typography variant="h2" style={{ marginBottom: '1rem' }}>
        My Themed Component
      </Typography>
      
      <Typography variant="body" style={{ marginBottom: '1rem' }}>
        This component uses theme tokens for consistent styling.
        Current mode: {isDarkMode ? 'Dark' : 'Light'}
      </Typography>
      
      <Button variant="primary" onClick={toggleTheme}>
        Toggle Theme
      </Button>
    </Box>
  );
}
```

### App.example.tsx

```tsx
import React from 'react';
import { ThemeProvider } from 'react-theme-system';
import { MyComponent } from './MyComponent';

function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: '2rem' }}>
        <MyComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;
```

### .eslintrc.json

```json
{
  "extends": [
    "eslint:recommended"
  ],
  "plugins": [
    "react",
    "react-hooks"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "es2020": true,
    "node": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": "warn",
    "no-console": "warn",
    "react/jsx-uses-react": "off",
    "react/jsx-uses-vars": "error",
    "react/no-unescaped-entities": "off"
  },
  "overrides": [
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "no-var": "error",
        "prefer-const": "error"
      }
    }
  ]
}
```

## 🔧 Customization

### Custom Theme Configuration

You can customize the generated `theme.config.js`:

```javascript
const { defaultTheme } = require('react-theme-system');

module.exports = {
  light: {
    ...defaultTheme.light,
    colors: {
      ...defaultTheme.light.colors,
      // Brand colors
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#45B7D1',
      
      // Custom semantic colors
      brand: '#FF6B6B',
      success: '#2ECC71',
      warning: '#F39C12',
      error: '#E74C3C',
    },
    spacing: {
      ...defaultTheme.light.spacing,
      // Custom spacing
      '2xs': '0.125rem',
      '3xl': '4rem',
    },
    typography: {
      ...defaultTheme.light.typography,
      fontSize: {
        ...defaultTheme.light.typography.fontSize,
        // Custom font sizes
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
    },
  },
  dark: {
    ...defaultTheme.dark,
    colors: {
      ...defaultTheme.dark.colors,
      // Dark mode brand colors
      primary: '#FF8E8E',
      secondary: '#6EE7DF',
      accent: '#6BC5E0',
      
      // Custom semantic colors
      brand: '#FF8E8E',
      success: '#27AE60',
      warning: '#F39C12',
      error: '#C0392B',
    },
  },
};
```

### Custom Component Templates

You can modify the generated component templates to match your project's patterns:

```tsx
// Custom MyComponent.tsx template
import React from 'react';
import { Box, Typography, Button, useTheme } from 'react-theme-system';

interface MyComponentProps {
  title?: string;
  description?: string;
  onAction?: () => void;
}

export function MyComponent({ 
  title = "My Themed Component",
  description = "This component uses theme tokens for consistent styling.",
  onAction 
}: MyComponentProps) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Box p="lg" bg="surface" borderRadius="md" shadow="md">
      <Typography variant="h2" style={{ marginBottom: '1rem' }}>
        {title}
      </Typography>
      
      <Typography variant="body" style={{ marginBottom: '1rem' }}>
        {description}
        Current mode: {isDarkMode ? 'Dark' : 'Light'}
      </Typography>
      
      <Box display="flex" gap="md">
        <Button variant="primary" onClick={toggleTheme}>
          Toggle Theme
        </Button>
        {onAction && (
          <Button variant="secondary" onClick={onAction}>
            Custom Action
          </Button>
        )}
      </Box>
    </Box>
  );
}
```

## 🚀 Workflow Integration

### Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "create-theme": "react-theme-system create-theme",
    "generate-types": "react-theme-system generate-types",
    "theme:setup": "npm run create-theme && npm run generate-types"
  }
}
```

### Git Hooks

You can set up Git hooks to automatically generate types:

```bash
# .git/hooks/pre-commit
#!/bin/sh
npm run generate-types
git add theme.types.ts CustomThemeProvider.tsx
```

### CI/CD Integration

Add to your GitHub Actions workflow:

```yaml
- name: Generate theme types
  run: npm run generate-types
```

## 🔍 Troubleshooting

### Common Issues

**1. "Command not found" error**
```bash
# Use npx instead of global installation
npx react-theme-system create-theme
```

**2. "Cannot find module" error**
```bash
# Ensure the package is installed
npm install react-theme-system
```

**3. Generated files not working**
```bash
# Check if theme.config.js exists
ls theme.config.js

# Regenerate types
npm run generate-types
```

### Getting Help

- [GitHub Issues](https://github.com/salehammar/react-theme-system/issues)
- [Discussions](https://github.com/salehammar/react-theme-system/discussions)
- [Troubleshooting](Troubleshooting)

## 📚 Related Documentation

- [Installation Guide](Installation-Guide)
- [Basic Configuration](Basic-Configuration)
- [Theme Architecture](Theme-Architecture)
- [TypeScript Integration](TypeScript-Integration)
