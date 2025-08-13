import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { useStyled } from '../hooks/useStyled';
import { defaultTheme } from '../themes';

// Test component to use the styled hook
const StyledTestComponent = () => {
  const { 
    styled, 
    getColor, 
    getSpacing, 
    getTypography, 
    getShadow, 
    getBorderRadius,
    cssVar,
    colorVar,
    isHydrated 
  } = useStyled();
  
  const styles = styled({
    backgroundColor: 'colors.primary',
    padding: 'spacing.md',
    fontSize: 'typography.fontSize.lg',
    boxShadow: 'shadows.md',
    borderRadius: 'borderRadius.md'
  }, {
    backgroundColor: '#fallback-color',
    padding: '1rem'
  });

  const color = getColor('primary', '#fallback');
  const spacing = getSpacing('md', '1rem');
  const typography = getTypography('lg', '1.125rem');
  const shadow = getShadow('md', 'none');
  const radius = getBorderRadius('md', '0.375rem');

  const cssVarValue = cssVar('color-primary', '#fallback');
  const colorVarValue = colorVar('primary', '#fallback');

  return (
    <div>
      <div data-testid="is-hydrated">{isHydrated.toString()}</div>
      <div data-testid="styled-bg">{styles.backgroundColor}</div>
      <div data-testid="styled-padding">{styles.padding}</div>
      <div data-testid="color">{color}</div>
      <div data-testid="spacing">{spacing}</div>
      <div data-testid="typography">{typography}</div>
      <div data-testid="shadow">{shadow}</div>
      <div data-testid="radius">{radius}</div>
      <div data-testid="css-var">{cssVarValue}</div>
      <div data-testid="color-var">{colorVarValue}</div>
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
    expect(screen.getByTestId('styled-padding')).toHaveTextContent('1rem');
    expect(screen.getByTestId('color')).toHaveTextContent('#4361ee');
    expect(screen.getByTestId('spacing')).toHaveTextContent('1rem');
    expect(screen.getByTestId('typography')).toHaveTextContent('1.125rem');
    expect(screen.getByTestId('shadow')).toHaveTextContent('0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)');
    expect(screen.getByTestId('radius')).toHaveTextContent('0.375rem');
  });

  it('uses fallbacks when not hydrated', async () => {
    render(
      <ThemeProvider themes={defaultTheme}>
        <StyledTestComponent />
      </ThemeProvider>
    );

    // Wait for hydration to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
    });

    // After hydration, should use theme values
    expect(screen.getByTestId('color')).toHaveTextContent('#4361ee');
    expect(screen.getByTestId('spacing')).toHaveTextContent('1rem');
    expect(screen.getByTestId('typography')).toHaveTextContent('1.125rem');
    expect(screen.getByTestId('shadow')).toHaveTextContent('0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)');
    expect(screen.getByTestId('radius')).toHaveTextContent('0.375rem');
  });

  it('uses fallbacks for styled function when not hydrated', async () => {
    render(
      <ThemeProvider themes={defaultTheme}>
        <StyledTestComponent />
      </ThemeProvider>
    );

    // Wait for hydration to complete
    await waitFor(() => {
      expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
    });

    // After hydration, should use theme values
    expect(screen.getByTestId('styled-bg')).toHaveTextContent('#4361ee');
    expect(screen.getByTestId('styled-padding')).toHaveTextContent('1rem');
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
    expect(screen.getByTestId('color-var')).toHaveTextContent('var(--color-primary, #fallback)');
  });

  it('handles missing theme tokens gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    const TestComponentWithInvalidToken = () => {
      const { styled } = useStyled();
      
      const styles = styled({
        backgroundColor: 'colors.invalid' as any
      });

      return <div data-testid="invalid-token">{styles.backgroundColor}</div>;
    };

    render(
      <ThemeProvider themes={defaultTheme}>
        <TestComponentWithInvalidToken />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('invalid-token')).toHaveTextContent('');
    });

    expect(consoleSpy).toHaveBeenCalledWith('Theme token not found: colors.invalid');
    consoleSpy.mockRestore();
  });

  it('works with dark theme', async () => {
    render(
      <ThemeProvider themes={defaultTheme} defaultTheme="dark">
        <StyledTestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-hydrated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('color')).toHaveTextContent('#60a5fa');
    expect(screen.getByTestId('styled-bg')).toHaveTextContent('#60a5fa');
  });
});
