# Testing Guide

This guide covers how to test React Theme System components and hooks effectively, including setup, best practices, and common testing patterns.

## 🎯 Overview

React Theme System includes comprehensive testing support with:
- Jest configuration with TypeScript support
- React Testing Library integration
- Mocked localStorage for theme persistence
- SSR and hydration testing utilities

## 🚀 Setup

### Installation

The testing dependencies are already included in the package:

```bash
npm install react-theme-system
```

### Jest Configuration

The package includes a pre-configured Jest setup:

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/__tests__/setup.ts'
  ]
};
```

### Test Setup

```typescript
// src/__tests__/setup.ts
import '@testing-library/jest-dom';

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Suppress console warnings in tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
```

## 🧪 Testing ThemeProvider

### Basic ThemeProvider Test

```tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from 'react-theme-system';
import { defaultTheme } from '../themes';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Test component
const TestComponent = () => {
  const { theme, isDarkMode, toggleTheme, currentTheme, isHydrated } = useTheme();
  
  return (
    <div>
      <div data-testid="theme-name">{currentTheme}</div>
      <div data-testid="is-dark">{isDarkMode.toString()}</div>
      <div data-testid="is-hydrated">{isHydrated.toString()}</div>
      <div data-testid="primary-color">{theme.colors.primary}</div>
      <button onClick={toggleTheme} data-testid="toggle-btn">Toggle</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  it('renders with default light theme', async () => {
    render(
      <ThemeProvider themes={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('theme-name')).toHaveTextContent('light');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('false');
    expect(screen.getByTestId('primary-color')).toHaveTextContent('#4361ee');
  });

  it('loads theme from localStorage', async () => {
    localStorageMock.getItem.mockReturnValue('dark');

    render(
      <ThemeProvider themes={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('theme-name')).toHaveTextContent('dark');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('react-theme-system-theme');
  });

  it('toggles theme correctly', async () => {
    render(
      <ThemeProvider themes={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('theme-name')).toHaveTextContent('light');

    fireEvent.click(screen.getByTestId('toggle-btn'));

    expect(screen.getByTestId('theme-name')).toHaveTextContent('dark');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('true');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('react-theme-system-theme', 'dark');
  });
});
```

### Testing Theme Change Callbacks

```tsx
it('calls onChange callback when theme changes', async () => {
  const onChange = jest.fn();

  render(
    <ThemeProvider themes={defaultTheme} onChange={onChange}>
      <TestComponent />
    </ThemeProvider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
  });

  fireEvent.click(screen.getByTestId('toggle-btn'));

  expect(onChange).toHaveBeenCalledWith('dark');
});
```

### Testing Error Handling

```tsx
it('handles localStorage errors gracefully', async () => {
  localStorageMock.setItem.mockImplementation(() => {
    throw new Error('Storage quota exceeded');
  });

  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

  render(
    <ThemeProvider themes={defaultTheme}>
      <TestComponent />
    </ThemeProvider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
  });

  fireEvent.click(screen.getByTestId('toggle-btn'));

  expect(consoleSpy).toHaveBeenCalledWith(
    'Failed to persist theme to localStorage:',
    expect.any(Error)
  );

  consoleSpy.mockRestore();
});
```

## 🧪 Testing useStyled Hook

### Basic useStyled Test

```tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { useStyled } from '../hooks/useStyled';
import { defaultTheme } from '../themes';

const StyledTestComponent = () => {
  const { 
    styled, 
    getColor, 
    getSpacing, 
    cssVar,
    isHydrated 
  } = useStyled();
  
  const styles = styled({
    backgroundColor: 'colors.primary',
    padding: 'spacing.md',
    borderRadius: 'borderRadius.md'
  }, {
    backgroundColor: '#fallback-color',
    padding: '1rem'
  });

  const color = getColor('primary', '#fallback');
  const spacing = getSpacing('md', '1rem');
  const cssVarValue = cssVar('color-primary', '#fallback');

  return (
    <div>
      <div data-testid="is-hydrated">{isHydrated.toString()}</div>
      <div data-testid="styled-bg">{styles.backgroundColor}</div>
      <div data-testid="color">{color}</div>
      <div data-testid="spacing">{spacing}</div>
      <div data-testid="css-var">{cssVarValue}</div>
    </div>
  );
};

describe('useStyled', () => {
  it('provides theme values when hydrated', async () => {
    render(
      <ThemeProvider themes={defaultTheme}>
        <StyledTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('styled-bg')).toHaveTextContent('#4361ee');
    expect(screen.getByTestId('color')).toHaveTextContent('#4361ee');
    expect(screen.getByTestId('spacing')).toHaveTextContent('1rem');
  });

  it('uses fallbacks when not hydrated', () => {
    render(
      <ThemeProvider themes={defaultTheme}>
        <StyledTestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('is-hydrated')).toHaveTextContent('false');
    expect(screen.getByTestId('color')).toHaveTextContent('#fallback');
    expect(screen.getByTestId('styled-bg')).toHaveTextContent('#fallback-color');
  });

  it('generates correct CSS variables', async () => {
    render(
      <ThemeProvider themes={defaultTheme}>
        <StyledTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('css-var')).toHaveTextContent('var(--color-primary, #fallback)');
  });
});
```

## 🧪 Testing Custom Components

### Testing Box Component

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, Box } from 'react-theme-system';
import { defaultTheme } from '../themes';

describe('Box Component', () => {
  it('renders with theme styles', () => {
    render(
      <ThemeProvider themes={defaultTheme}>
        <Box 
          bg="primary" 
          p="md" 
          borderRadius="md"
          data-testid="box"
        >
          Content
        </Box>
      </ThemeProvider>
    );

    const box = screen.getByTestId('box');
    expect(box).toHaveTextContent('Content');
  });
});
```

### Testing Button Component

```tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, Button } from 'react-theme-system';
import { defaultTheme } from '../themes';

describe('Button Component', () => {
  it('renders with correct variant', () => {
    render(
      <ThemeProvider themes={defaultTheme}>
        <Button variant="primary" data-testid="button">
          Click me
        </Button>
      </ThemeProvider>
    );

    const button = screen.getByTestId('button');
    expect(button).toHaveTextContent('Click me');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();

    render(
      <ThemeProvider themes={defaultTheme}>
        <Button onClick={handleClick} data-testid="button">
          Click me
        </Button>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 🧪 Testing SSR Scenarios

### Testing Hydration

```tsx
it('prevents hydration mismatch by hiding content initially', () => {
  const { container } = render(
    <ThemeProvider themes={defaultTheme}>
      <TestComponent />
    </ThemeProvider>
  );

  // Content should be hidden during hydration
  expect(container.firstChild).toHaveStyle({ visibility: 'hidden' });
});
```

### Testing SSR-Only Environment

```tsx
it('works without localStorage in SSR environment', async () => {
  // Mock window as undefined to simulate SSR
  const originalWindow = global.window;
  delete global.window;

  render(
    <ThemeProvider themes={defaultTheme} enablePersistence={false}>
      <TestComponent />
    </ThemeProvider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
  });

  expect(screen.getByTestId('theme-name')).toHaveTextContent('light');

  // Restore window
  global.window = originalWindow;
});
```

## 🎯 Testing Best Practices

### 1. Always Test Hydration State

```tsx
// ✅ Good
await waitFor(() => {
  expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
});

// ❌ Bad
expect(screen.getByTestId('theme-name')).toHaveTextContent('light');
```

### 2. Mock localStorage

```tsx
// ✅ Good
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
```

### 3. Test Error Scenarios

```tsx
// ✅ Good
it('handles localStorage errors gracefully', async () => {
  localStorageMock.setItem.mockImplementation(() => {
    throw new Error('Storage quota exceeded');
  });
  // ... test implementation
});
```

### 4. Test Theme Validation

```tsx
it('validates theme names', async () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

  render(
    <ThemeProvider themes={defaultTheme}>
      <TestComponent />
    </ThemeProvider>
  );

  // Test invalid theme name
  // ... implementation

  expect(consoleSpy).toHaveBeenCalledWith(
    expect.stringContaining('Invalid theme')
  );

  consoleSpy.mockRestore();
});
```

## 🚀 Running Tests

### Basic Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=ThemeProvider.test.tsx

# Run tests with no cache
npm test -- --no-cache
```

### CI/CD Testing

```bash
# Run tests for CI
npm run test:ci
```

## 📚 Related Documentation

- [SSR Support](SSR-Support)
- [Error Handling](Error-Handling)
- [Theme Architecture](Theme-Architecture)
- [Basic Configuration](Basic-Configuration)
