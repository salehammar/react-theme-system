#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const themeConfig = `const { ThemeConfig } = require('react-theme-system');

module.exports = {
  light: {
    colors: {
      primary: '#4361ee',
      secondary: '#3f37c9',
      success: '#4caf50',
      warning: '#ff9800',
      error: '#f44336',
      info: '#2196f3',
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#212529',
      textSecondary: '#6c757d',
      border: '#dee2e6',
      divider: '#e9ecef'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '3rem',
      xxl: '6rem'
    },
    typography: {
      fontFamily: {
        primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        secondary: 'Georgia, "Times New Roman", serif',
        mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75'
      }
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px'
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    transitions: {
      fast: '150ms ease-in-out',
      normal: '250ms ease-in-out',
      slow: '350ms ease-in-out'
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1020,
      fixed: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060
    }
  },
  dark: {
    colors: {
      primary: '#60a5fa',
      secondary: '#818cf8',
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171',
      info: '#60a5fa',
      background: '#0f172a',
      surface: '#1e293b',
      text: '#f8fafc',
      textSecondary: '#cbd5e1',
      border: '#334155',
      divider: '#475569'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '3rem',
      xxl: '6rem'
    },
    typography: {
      fontFamily: {
        primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        secondary: 'Georgia, "Times New Roman", serif',
        mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem'
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75'
      }
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)'
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px'
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    transitions: {
      fast: '150ms ease-in-out',
      normal: '250ms ease-in-out',
      slow: '350ms ease-in-out'
    },
    zIndex: {
      dropdown: 1000,
      sticky: 1020,
      fixed: 1030,
      modal: 1040,
      popover: 1050,
      tooltip: 1060
    }
  }
};
`;

const basicComponent = `import React from 'react';
import { Box, Typography, Button, useTheme } from 'react-theme-system';

export const MyComponent = () => {
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
`;

const usageExample = `// App.tsx
import React from 'react';
import { ThemeProvider, defaultTheme } from 'react-theme-system';
import { MyComponent } from './MyComponent';

const App = () => (
  <ThemeProvider themes={defaultTheme}>
    <MyComponent />
  </ThemeProvider>
);

export default App;
`;

function createTheme() {
  const currentDir = process.cwd();
  
  // Create theme.config.js
  const themePath = path.join(currentDir, 'theme.config.js');
  if (!fs.existsSync(themePath)) {
    fs.writeFileSync(themePath, themeConfig);
    console.log('🎨 Created theme.config.js');
  } else {
    console.log('⚠️  theme.config.js already exists');
  }
  
  // Create example component
  const componentPath = path.join(currentDir, 'MyComponent.tsx');
  if (!fs.existsSync(componentPath)) {
    fs.writeFileSync(componentPath, basicComponent);
    console.log('📝 Created MyComponent.tsx example');
  } else {
    console.log('⚠️  MyComponent.tsx already exists');
  }
  
  // Create usage example
  const usagePath = path.join(currentDir, 'App.example.tsx');
  if (!fs.existsSync(usagePath)) {
    fs.writeFileSync(usagePath, usageExample);
    console.log('📚 Created App.example.tsx usage example');
  } else {
    console.log('⚠️  App.example.tsx already exists');
  }
  
  // Create .eslintrc.json for theme enforcement
  const eslintConfig = {
    extends: ['eslint:recommended', '@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint'],
    rules: {
      'no-hardcoded-colors': 'error',
      'no-hardcoded-spacing': 'error',
      'prefer-theme-tokens': 'warn'
    }
  };
  
  const eslintPath = path.join(currentDir, '.eslintrc.json');
  if (!fs.existsSync(eslintPath)) {
    fs.writeFileSync(eslintPath, JSON.stringify(eslintConfig, null, 2));
    console.log('🔍 Created .eslintrc.json with theme rules');
  } else {
    console.log('⚠️  .eslintrc.json already exists');
  }
  
  console.log('\n✨ Theme scaffolding complete!');
  console.log('\nNext steps:');
  console.log('1. Install react-theme-system: npm install react-theme-system');
  console.log('2. Customize theme.config.js with your design tokens');
  console.log('3. Use the themed components in your app');
  console.log('4. Run the linter to ensure theme compliance');
}

// Run if called directly
if (require.main === module) {
  createTheme();
}

module.exports = { createTheme };
