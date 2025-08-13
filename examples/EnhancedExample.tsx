import React from 'react';
import { 
  ThemeProvider, 
  useTheme, 
  useStyled, 
  defaultTheme,
  createThemeConfig,
  applyThemeToDOM
} from '../src';

// Example of custom theme configuration
const customTheme = createThemeConfig({
  light: {
    colors: {
      primary: '#007bff',
      background: '#ffffff',
      text: '#212529'
    }
  },
  dark: {
    colors: {
      primary: '#0056b3',
      background: '#121212',
      text: '#ffffff'
    }
  }
});

// Component using the enhanced useStyled hook
const StyledComponent = () => {
  const { styled, getColor, colorVar, isHydrated } = useStyled();
  
  const styles = styled({
    backgroundColor: 'colors.primary',
    padding: 'spacing.md',
    borderRadius: 'borderRadius.md',
    boxShadow: 'shadows.sm'
  }, {
    // Fallbacks for SSR or missing tokens
    backgroundColor: '#007bff',
    padding: '1rem'
  });

  return (
    <div>
      <div style={styles}>
        <h3>Styled Component with Fallbacks</h3>
        <p>Primary Color: {getColor('primary', '#007bff')}</p>
        <p>CSS Variable: {colorVar('primary', '#007bff')}</p>
        <p>Hydrated: {isHydrated ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

// Main example component
const EnhancedExample = () => {
  const { 
    theme, 
    isDarkMode, 
    currentTheme, 
    isHydrated,
    setTheme, 
    toggleTheme 
  } = useTheme();

  // Apply theme to DOM for CSS variables
  React.useEffect(() => {
    if (isHydrated) {
      applyThemeToDOM(theme);
    }
  }, [theme, isHydrated]);

  return (
    <div style={{ 
      backgroundColor: theme.colors.background,
      color: theme.colors.text,
      padding: '2rem',
      minHeight: '100vh'
    }}>
      <h1>Enhanced React Theme System</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Theme Information</h2>
        <p><strong>Current Theme:</strong> {currentTheme}</p>
        <p><strong>Is Dark Mode:</strong> {isDarkMode ? 'Yes' : 'No'}</p>
        <p><strong>Is Hydrated:</strong> {isHydrated ? 'Yes' : 'No'}</p>
        <p><strong>Primary Color:</strong> {theme.colors.primary}</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Theme Controls</h2>
        <button 
          onClick={toggleTheme}
          style={{
            backgroundColor: theme.colors.primary,
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            marginRight: '1rem',
            cursor: 'pointer'
          }}
        >
          Toggle Theme
        </button>
        
        <button 
          onClick={() => setTheme('light')}
          style={{
            backgroundColor: theme.colors.secondary,
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            marginRight: '1rem',
            cursor: 'pointer'
          }}
        >
          Set Light
        </button>
        
        <button 
          onClick={() => setTheme('dark')}
          style={{
            backgroundColor: theme.colors.secondary,
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Set Dark
        </button>
      </div>

      <StyledComponent />

      <div style={{ marginTop: '2rem' }}>
        <h2>CSS Variables Demo</h2>
        <div style={{
          backgroundColor: 'var(--color-surface, #f8f9fa)',
          padding: '1rem',
          borderRadius: '0.375rem',
          border: '1px solid var(--color-border, #dee2e6)'
        }}>
          <p>This div uses CSS variables with fallbacks</p>
          <p>Background: var(--color-surface, #f8f9fa)</p>
          <p>Border: var(--color-border, #dee2e6)</p>
        </div>
      </div>
    </div>
  );
};

// App wrapper with theme provider
const App = () => {
  const handleThemeChange = (theme: 'light' | 'dark') => {
    console.log('Theme changed to:', theme);
    // You can add analytics tracking here
  };

  return (
    <ThemeProvider 
      themes={customTheme}
      defaultTheme="light"
      onChange={handleThemeChange}
      enablePersistence={true}
    >
      <EnhancedExample />
    </ThemeProvider>
  );
};

export default App;
