import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeProvider';
import { defaultTheme } from '../themes';

const TestComponent = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div>
      <div data-testid="theme-name">{isDarkMode ? 'dark' : 'light'}</div>
      <div data-testid="primary-color">{theme.colors.primary}</div>
      <button onClick={toggleTheme} data-testid="toggle-btn">Toggle</button>
    </div>
  );
};

describe('Basic Theme System', () => {
  it('renders with light theme by default', () => {
    render(
      <ThemeProvider themes={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-name')).toHaveTextContent('light');
    expect(screen.getByTestId('primary-color')).toHaveTextContent('#4361ee');
  });

  it('renders with dark theme when specified', () => {
    render(
      <ThemeProvider themes={defaultTheme} defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-name')).toHaveTextContent('dark');
    expect(screen.getByTestId('primary-color')).toHaveTextContent('#60a5fa');
  });
});
