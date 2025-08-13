import React from 'react';
import { 
  ThemeProvider, 
  useTheme, 
  useThemeToggle, 
  useThemeToggleWithSystem,
  useStyled,
  defaultTheme,
  themeValidator,
  Box,
  Typography,
  Button
} from '../src';

// Enhanced example component showcasing all new features
const EnhancedExample: React.FC = () => {
  return (
    <ThemeProvider 
      themes={defaultTheme}
      defaultTheme="light"
      enableSystemTheme={true}
      validateTheme={true}
      onChange={(theme) => console.log('Theme changed to:', theme)}
      enablePersistence={true}
    >
      <div style={{ padding: '2rem', minHeight: '100vh' }}>
        <Typography variant="h1" style={{ marginBottom: '2rem' }}>
          React Theme System v1.0.3 - Enhanced Features
        </Typography>
        
        <ThemeToggleSection />
        <SystemThemeSection />
        <ValidationSection />
        <HeadlessHooksSection />
        <CSSVariablesSection />
        <StyledComponentsSection />
      </div>
    </ThemeProvider>
  );
};

// Section demonstrating theme toggle functionality
const ThemeToggleSection: React.FC = () => {
  const { isDark, toggle, currentTheme } = useThemeToggle();
  
  return (
    <Box style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid var(--color-border)' }}>
      <Typography variant="h2" style={{ marginBottom: '1rem' }}>
        Theme Toggle (Headless Hook)
      </Typography>
      <p>Current theme: <strong>{currentTheme}</strong></p>
      <p>Is dark mode: <strong>{isDark ? 'Yes' : 'No'}</strong></p>
      <Button onClick={toggle} style={{ marginRight: '1rem' }}>
        {isDark ? '🌙 Switch to Light' : '☀️ Switch to Dark'}
      </Button>
    </Box>
  );
};

// Section demonstrating system theme detection
const SystemThemeSection: React.FC = () => {
  const { 
    systemTheme, 
    isSystemTheme, 
    setSystem, 
    hasSystemTheme,
    cycleTheme 
  } = useThemeToggleWithSystem();
  
  return (
    <Box style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid var(--color-border)' }}>
      <Typography variant="h2" style={{ marginBottom: '1rem' }}>
        System Theme Detection
      </Typography>
      <p>System theme: <strong>{systemTheme || 'Not detected'}</strong></p>
      <p>Using system theme: <strong>{isSystemTheme ? 'Yes' : 'No'}</strong></p>
      <p>System theme available: <strong>{hasSystemTheme ? 'Yes' : 'No'}</strong></p>
      
      <div style={{ marginTop: '1rem' }}>
        <Button onClick={setSystem} disabled={!hasSystemTheme} style={{ marginRight: '1rem' }}>
          Use System Theme
        </Button>
        <Button onClick={cycleTheme} style={{ marginRight: '1rem' }}>
          Cycle Themes
        </Button>
      </div>
    </Box>
  );
};

// Section demonstrating theme validation
const ValidationSection: React.FC = () => {
  const [validationResult, setValidationResult] = React.useState<any>(null);
  
  React.useEffect(() => {
    const result = themeValidator.validate(defaultTheme);
    setValidationResult(result);
  }, []);
  
  return (
    <Box style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid var(--color-border)' }}>
      <Typography variant="h2" style={{ marginBottom: '1rem' }}>
        Theme Validation
      </Typography>
      <p>Theme valid: <strong>{validationResult?.isValid ? 'Yes' : 'No'}</strong></p>
      
      {validationResult?.errors.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <Typography variant="h3">Errors:</Typography>
          <ul style={{ color: 'var(--color-error)' }}>
            {validationResult.errors.map((error: string, index: number) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {validationResult?.warnings.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <Typography variant="h3">Warnings:</Typography>
          <ul style={{ color: 'var(--color-warning)' }}>
            {validationResult.warnings.map((warning: string, index: number) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </Box>
  );
};

// Section demonstrating headless hooks
const HeadlessHooksSection: React.FC = () => {
  const { theme, getToken, getCSSVariable } = useTheme();
  const { isDark, toggle } = useThemeToggle();
  
  return (
    <Box style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid var(--color-border)' }}>
      <Typography variant="h2" style={{ marginBottom: '1rem' }}>
        Headless Hooks & Theme Utilities
      </Typography>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <Typography variant="h3">Token Values:</Typography>
          <p>Primary color: <code>{getToken('colors.primary')}</code></p>
          <p>Spacing md: <code>{getToken('spacing.md')}</code></p>
          <p>Font size lg: <code>{getToken('typography.fontSize.lg')}</code></p>
          <p>Shadow md: <code>{getToken('shadows.md')}</code></p>
        </div>
        
        <div>
          <Typography variant="h3">CSS Variables:</Typography>
          <p>Primary color: <code>{getCSSVariable('colors.primary')}</code></p>
          <p>Spacing md: <code>{getCSSVariable('spacing.md')}</code></p>
          <p>Font size lg: <code>{getCSSVariable('typography.fontSize.lg')}</code></p>
          <p>Shadow md: <code>{getCSSVariable('shadows.md')}</code></p>
        </div>
      </div>
      
      <Button onClick={toggle} style={{ marginTop: '1rem' }}>
        Toggle Theme (Headless)
      </Button>
    </Box>
  );
};

// Section demonstrating CSS variables
const CSSVariablesSection: React.FC = () => {
  return (
    <Box style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid var(--color-border)' }}>
      <Typography variant="h2" style={{ marginBottom: '1rem' }}>
        CSS Variables with Fallbacks
      </Typography>
      
      <div style={{ 
        backgroundColor: 'var(--color-surface)', 
        color: 'var(--color-text-primary)',
        padding: 'var(--spacing-md)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '1rem'
      }}>
        <p>This box uses CSS variables with fallbacks for graceful degradation.</p>
        <p>It will work even if JavaScript is disabled or slow to load.</p>
      </div>
      
      <div style={{ 
        backgroundColor: 'var(--color-primary)', 
        color: 'white',
        padding: 'var(--spacing-sm)',
        borderRadius: 'var(--radius-sm)',
        display: 'inline-block',
        marginRight: '1rem'
      }}>
        Primary Button Style
      </div>
      
      <div style={{ 
        backgroundColor: 'var(--color-secondary)', 
        color: 'white',
        padding: 'var(--spacing-sm)',
        borderRadius: 'var(--radius-sm)',
        display: 'inline-block',
        marginRight: '1rem'
      }}>
        Secondary Button Style
      </div>
    </Box>
  );
};

// Section demonstrating styled components
const StyledComponentsSection: React.FC = () => {
  const { styled } = useStyled();
  
  const cardStyles = styled({
    backgroundColor: 'colors.surface',
    color: 'colors.text.primary',
    padding: 'spacing.md',
    borderRadius: 'borderRadius.md',
    boxShadow: 'shadows.md',
    border: '1px solid colors.border'
  });
  
  const buttonStyles = styled({
    backgroundColor: 'colors.primary',
    color: 'white',
    padding: 'spacing.sm spacing.md',
    borderRadius: 'borderRadius.sm',
    border: 'none',
    cursor: 'pointer',
    fontSize: 'typography.fontSize.base',
    fontWeight: 'typography.fontWeight.medium',
    transition: 'transitions.normal'
  });
  
  return (
    <Box style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid var(--color-border)' }}>
      <Typography variant="h2" style={{ marginBottom: '1rem' }}>
        Styled Components with Theme Tokens
      </Typography>
      
      <div style={cardStyles}>
        <Typography variant="h3" style={{ marginBottom: '1rem' }}>
          Themed Card Component
        </Typography>
        <p>This card uses the <code>styled</code> function to apply theme tokens.</p>
        <p>It automatically adapts to light/dark themes and provides fallbacks.</p>
        
        <button style={buttonStyles}>
          Themed Button
        </button>
      </div>
    </Box>
  );
};

export default EnhancedExample;
