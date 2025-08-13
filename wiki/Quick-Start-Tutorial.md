# Quick Start Tutorial

This tutorial will guide you through creating your first themed React application using React Theme System.

## 🎯 What You'll Build

A simple dashboard with:
- Theme switching (light/dark mode)
- Themed components
- Responsive design
- Custom styling

## 📋 Prerequisites

- Node.js 16+ installed
- Basic React knowledge
- A code editor (VS Code recommended)

## 🚀 Step 1: Create a New Project

```bash
# Create a new React project
npx create-react-app my-themed-app --template typescript

# Navigate to the project
cd my-themed-app

# Install React Theme System
npm install react-theme-system
```

## 🎨 Step 2: Set Up Theme Provider

Replace your `src/App.tsx` with:

```tsx
import React from 'react';
import { ThemeProvider, Box, Typography, Button, defaultTheme } from 'react-theme-system';
import './App.css';

function App() {
  return (
    <ThemeProvider 
      themes={defaultTheme}
      defaultTheme="light"
      enablePersistence={true}
      onChange={(theme) => {
        console.log('Theme changed to:', theme);
      }}
    >
      <Dashboard />
    </ThemeProvider>
  );
}

function Dashboard() {
  return (
    <Box p="lg" bg="background" style={{ minHeight: '100vh' }}>
      <Typography variant="h1" style={{ marginBottom: '1rem' }}>
        My Themed Dashboard
      </Typography>
      
      <Box p="md" bg="surface" borderRadius="md" shadow="md">
        <Typography variant="h2" style={{ marginBottom: '0.5rem' }}>
          Welcome to React Theme System!
        </Typography>
        <Typography variant="body">
          This is your first themed component. Try switching between light and dark modes!
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
```

## 🌙 Step 3: Add Theme Toggle

Create a new component `src/components/ThemeToggle.tsx`:

```tsx
import React from 'react';
import { useTheme, Button, Box } from 'react-theme-system';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme, isHydrated } = useTheme();

  // Handle SSR safely
  if (!isHydrated) {
    return (
      <Box 
        position="fixed" 
        top="md" 
        right="md" 
        zIndex="modal"
      >
        <Button variant="secondary" disabled>
          Loading...
        </Button>
      </Box>
    );
  }

  return (
    <Box 
      position="fixed" 
      top="md" 
      right="md" 
      zIndex="modal"
    >
      <Button 
        variant={isDarkMode ? "primary" : "secondary"}
        onClick={toggleTheme}
      >
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </Button>
    </Box>
  );
}
```

Update your `App.tsx` to include the toggle:

```tsx
import React from 'react';
import { ThemeProvider, Box, Typography, Button } from 'react-theme-system';
import { ThemeToggle } from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
      <ThemeToggle />
    </ThemeProvider>
  );
}

// ... rest of the code remains the same
```

## 📱 Step 4: Add Responsive Components

Create `src/components/Card.tsx`:

```tsx
import React from 'react';
import { Box, Typography, Button } from 'react-theme-system';

interface CardProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function Card({ title, description, actionText, onAction }: CardProps) {
  return (
    <Box 
      p="lg" 
      bg="surface" 
      borderRadius="md" 
      shadow="md"
      style={{ 
        border: '1px solid',
        borderColor: 'var(--theme-border)',
        transition: 'all 0.2s ease'
      }}
    >
      <Typography variant="h3" style={{ marginBottom: '0.5rem' }}>
        {title}
      </Typography>
      <Typography variant="body" style={{ marginBottom: '1rem' }}>
        {description}
      </Typography>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Box>
  );
}
```

## 🎯 Step 5: Build the Dashboard

Update your `Dashboard` component in `App.tsx`:

```tsx
import React from 'react';
import { ThemeProvider, Box, Typography, Button } from 'react-theme-system';
import { ThemeToggle } from './components/ThemeToggle';
import { Card } from './components/Card';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Dashboard />
      <ThemeToggle />
    </ThemeProvider>
  );
}

function Dashboard() {
  const handleCardAction = (cardTitle: string) => {
    alert(`Clicked on ${cardTitle}!`);
  };

  return (
    <Box p="lg" bg="background" style={{ minHeight: '100vh' }}>
      <Typography variant="h1" style={{ marginBottom: '2rem' }}>
        My Themed Dashboard
      </Typography>
      
      <Box 
        display="grid" 
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap="lg"
        style={{ marginBottom: '2rem' }}
      >
        <Card
          title="Analytics"
          description="View your application analytics and performance metrics."
          actionText="View Analytics"
          onAction={() => handleCardAction('Analytics')}
        />
        
        <Card
          title="Users"
          description="Manage user accounts and permissions."
          actionText="Manage Users"
          onAction={() => handleCardAction('Users')}
        />
        
        <Card
          title="Settings"
          description="Configure your application settings and preferences."
          actionText="Open Settings"
          onAction={() => handleCardAction('Settings')}
        />
      </Box>
      
      <Box p="md" bg="primary" borderRadius="md" color="white">
        <Typography variant="h3" style={{ marginBottom: '0.5rem' }}>
          Theme System Features
        </Typography>
        <Typography variant="body">
          ✅ Automatic dark/light mode switching<br/>
          ✅ Responsive design with CSS Grid<br/>
          ✅ Type-safe theme tokens<br/>
          ✅ Consistent spacing and typography<br/>
          ✅ Smooth transitions and animations
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
```

## 🎨 Step 6: Add Custom Styling

Update your `src/App.css`:

```css
/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Smooth transitions for theme switching */
* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--theme-surface);
}

::-webkit-scrollbar-thumb {
  background: var(--theme-border);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--theme-text-secondary);
}
```

## 🚀 Step 7: Run Your Application

```bash
npm start
```

Your application should now be running at `http://localhost:3000`!

## 🎯 What You've Built

✅ **Theme Provider**: Wraps your app with theme context  
✅ **Theme Toggle**: Switch between light and dark modes  
✅ **Responsive Cards**: Grid layout that adapts to screen size  
✅ **Type-Safe Components**: Full TypeScript support  
✅ **Consistent Styling**: All components use theme tokens  

## 🔧 Customization

### Change Colors

You can customize the theme by creating a `theme.config.js` file:

```javascript
const { defaultTheme } = require('react-theme-system');

module.exports = {
  light: {
    ...defaultTheme.light,
    colors: {
      ...defaultTheme.light.colors,
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
    },
  },
  dark: {
    ...defaultTheme.dark,
    colors: {
      ...defaultTheme.dark.colors,
      primary: '#FF8E8E',
      secondary: '#6EE7DF',
    },
  },
};
```

### Add More Components

Create additional themed components following the same pattern:

```tsx
import { Box, Typography } from 'react-theme-system';

export function Alert({ type = 'info', children }: { type?: 'info' | 'warning' | 'error', children: React.ReactNode }) {
  const bgColor = type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info';
  
  return (
    <Box p="md" bg={bgColor} borderRadius="sm" color="white">
      <Typography variant="body">{children}</Typography>
    </Box>
  );
}
```

## 📚 Next Steps

- [Theme Architecture](Theme-Architecture) - Learn about the underlying theme system
- [Design Tokens](Design-Tokens) - Understand how to create and use design tokens
- [Custom Components](Custom-Components) - Build your own themed components
- [Performance Optimization](Performance-Optimization) - Optimize your themed application

## 🆘 Need Help?

- [GitHub Issues](https://github.com/salehammar/react-theme-system/issues)
- [Discussions](https://github.com/salehammar/react-theme-system/discussions)
- [Troubleshooting](Troubleshooting)
