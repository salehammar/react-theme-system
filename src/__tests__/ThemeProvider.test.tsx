import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeProvider';
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

// Test component to use the theme
const TestComponent = () => {
  const { theme, isDarkMode, toggleTheme, setTheme, currentTheme, isHydrated } = useTheme();
  
  return (
    <div>
      <div data-testid="theme-name">{currentTheme}</div>
      <div data-testid="is-dark">{isDarkMode.toString()}</div>
      <div data-testid="is-hydrated">{isHydrated.toString()}</div>
      <div data-testid="primary-color">{theme.colors.primary}</div>
      <button onClick={toggleTheme} data-testid="toggle-btn">Toggle</button>
      <button onClick={() => setTheme('light')} data-testid="light-btn">Light</button>
      <button onClick={() => setTheme('dark')} data-testid="dark-btn">Dark</button>
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

  it('renders with custom default theme', async () => {
    render(
      <ThemeProvider themes={defaultTheme} defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('theme-name')).toHaveTextContent('dark');
    expect(screen.getByTestId('is-dark')).toHaveTextContent('true');
    expect(screen.getByTestId('primary-color')).toHaveTextContent('#60a5fa');
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

  it('falls back to default theme when localStorage is invalid', async () => {
    localStorageMock.getItem.mockReturnValue('invalid-theme');

    render(
      <ThemeProvider themes={defaultTheme} defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('theme-name')).toHaveTextContent('dark');
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
    expect(localStorageMock.setItem).toHaveTextContent('react-theme-system-theme', 'dark');
  });

  it('sets theme directly', async () => {
    render(
      <ThemeProvider themes={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
    });

    fireEvent.click(screen.getByTestId('dark-btn'));

    expect(screen.getByTestId('theme-name')).toHaveTextContent('dark');
    expect(localStorageMock.setItem).toHaveTextContent('react-theme-system-theme', 'dark');
  });

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

    fireEvent.click(screen.getByTestId('dark-btn'));

    expect(onChange).toHaveBeenCalledWith('dark');
  });

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

    fireEvent.click(screen.getByTestId('dark-btn'));

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to persist theme to localStorage:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('disables persistence when enablePersistence is false', async () => {
    render(
      <ThemeProvider themes={defaultTheme} enablePersistence={false}>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
    });

    fireEvent.click(screen.getByTestId('dark-btn'));

    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });

  it('prevents hydration mismatch by hiding content initially', () => {
    const { container } = render(
      <ThemeProvider themes={defaultTheme}>
        <TestComponent />
      </ThemeProvider>
    );

    // Content should be hidden during hydration
    expect(container.firstChild).toHaveStyle({ visibility: 'hidden' });
  });

  it('throws error when used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useTheme must be used within ThemeProvider');

    consoleSpy.mockRestore();
  });
});
