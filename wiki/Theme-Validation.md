# Theme Validation

React Theme System v1.1.0 includes comprehensive theme validation to ensure your themes are properly structured and prevent runtime errors.

## 🎯 Overview

Theme validation helps you catch issues early by validating:
- **Required properties**: Ensures all required theme tokens are present
- **Value formats**: Validates color formats, spacing units, and typography values
- **Theme consistency**: Checks that light and dark themes have matching structures
- **Type safety**: Ensures values match expected TypeScript types

## 🔧 Basic Validation

### Automatic Validation

Enable validation in your `ThemeProvider`:

```tsx
import { ThemeProvider, defaultTheme } from 'react-theme-system';

function App() {
  return (
    <ThemeProvider 
      themes={defaultTheme}
      validateTheme={true} // Enable validation
    >
      <MyApp />
    </ThemeProvider>
  );
}
```

### Manual Validation

Validate themes manually:

```tsx
import { themeValidator, createThemeValidator } from 'react-theme-system';

// Validate a theme configuration
const validation = themeValidator.validate(myThemeConfig);

if (!validation.isValid) {
  console.error('Theme validation failed:', validation.errors);
  console.warn('Theme warnings:', validation.warnings);
} else {
  console.log('Theme is valid!');
}
```

## 📋 Validation Rules

### Color Validation

Validates color values using CSS color format regex:

```tsx
// ✅ Valid colors
colors: {
  primary: '#4361ee',
  secondary: 'rgb(67, 97, 238)',
  accent: 'rgba(67, 97, 238, 0.8)',
  background: 'hsl(220, 100%, 60%)',
  surface: 'transparent',
  text: {
    primary: '#212529',
    secondary: '#6c757d',
    disabled: '#adb5bd'
  }
}

// ❌ Invalid colors
colors: {
  primary: 'not-a-color', // Invalid format
  secondary: '#GGGGGG',   // Invalid hex
  text: {
    primary: 12345        // Not a string
  }
}
```

### Spacing Validation

Validates spacing values using CSS length unit regex:

```tsx
// ✅ Valid spacing
spacing: {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '3rem',
  xxl: '4rem',
  scale: (multiplier: number) => `${multiplier * 0.25}rem`
}

// ❌ Invalid spacing
spacing: {
  xs: 'invalid-unit',     // Invalid unit
  scale: 'not-a-function' // Must be a function
}
```

### Typography Validation

Validates typography values:

```tsx
// ✅ Valid typography
typography: {
  fontFamily: {
    primary: 'system-ui, sans-serif',
    secondary: 'Georgia, serif',
    mono: 'SFMono-Regular, monospace'
  },
  fontSize: {
    xs: '0.75rem',
    base: '1rem',
    lg: '1.125rem'
  },
  fontWeight: {
    light: 300,
    normal: 400,
    bold: 700
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75'
  }
}

// ❌ Invalid typography
typography: {
  fontWeight: {
    light: '300',     // Should be number
    normal: 999       // Invalid font-weight
  }
}
```

## 🛠️ Validation API

### themeValidator

The default validator with lenient rules:

```tsx
import { themeValidator } from 'react-theme-system';

const validation = themeValidator.validate(themeConfig);

// Validation result structure
interface ThemeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
```

### createThemeValidator

Create a custom validator with strict rules:

```tsx
import { createThemeValidator } from 'react-theme-system';

// Strict validator - treats warnings as errors
const strictValidator = createThemeValidator(true);

const validation = strictValidator.validate(themeConfig);

// Lenient validator - separates warnings from errors
const lenientValidator = createThemeValidator(false);
```

### Individual Theme Validation

Validate individual themes:

```tsx
import { validateTheme } from 'react-theme-system';

// Validate light theme
const lightValidation = validateTheme(themeConfig.light, 'light');

// Validate dark theme
const darkValidation = validateTheme(themeConfig.dark, 'dark');
```

## 🎯 Validation Examples

### Complete Example

```tsx
import { 
  createThemeConfig, 
  themeValidator, 
  ThemeProvider 
} from 'react-theme-system';

// Create a custom theme
const customTheme = createThemeConfig({
  light: {
    colors: {
      primary: '#007bff',
      background: '#ffffff',
      text: {
        primary: '#212529',
        secondary: '#6c757d',
        disabled: '#adb5bd'
      },
      border: '#dee2e6',
      error: '#dc3545',
      warning: '#ffc107',
      success: '#28a745',
      info: '#17a2b8'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '3rem',
      xxl: '4rem',
      scale: (m: number) => `${m * 0.25}rem`
    },
    // ... other theme properties
  },
  dark: {
    // ... dark theme configuration
  }
});

// Validate the theme
const validation = themeValidator.validate(customTheme);

if (!validation.isValid) {
  console.error('Theme validation failed:');
  validation.errors.forEach(error => console.error(`❌ ${error}`));
  validation.warnings.forEach(warning => console.warn(`⚠️ ${warning}`));
} else {
  console.log('✅ Theme is valid!');
}

// Use the validated theme
function App() {
  return (
    <ThemeProvider 
      themes={customTheme}
      validateTheme={true}
    >
      <MyApp />
    </ThemeProvider>
  );
}
```

### Error Handling

```tsx
function ThemeValidator() {
  const [validationResult, setValidationResult] = useState(null);
  
  useEffect(() => {
    const result = themeValidator.validate(myTheme);
    setValidationResult(result);
  }, [myTheme]);
  
  if (!validationResult?.isValid) {
    return (
      <div className="theme-errors">
        <h3>Theme Validation Errors:</h3>
        <ul>
          {validationResult.errors.map((error, index) => (
            <li key={index} className="error">
              {error}
            </li>
          ))}
        </ul>
        {validationResult.warnings.length > 0 && (
          <>
            <h3>Theme Validation Warnings:</h3>
            <ul>
              {validationResult.warnings.map((warning, index) => (
                <li key={index} className="warning">
                  {warning}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
  
  return <div>✅ Theme is valid!</div>;
}
```

## 🔍 Validation Best Practices

### 1. Enable Validation in Development

```tsx
// Only validate in development
<ThemeProvider 
  themes={themeConfig}
  validateTheme={process.env.NODE_ENV === 'development'}
>
```

### 2. Use Strict Validation for Production

```tsx
// Use strict validation for production builds
const validator = createThemeValidator(process.env.NODE_ENV === 'production');
const validation = validator.validate(themeConfig);
```

### 3. Validate Custom Themes

```tsx
// Always validate custom themes before using
const customTheme = createCustomTheme();
const validation = themeValidator.validate(customTheme);

if (!validation.isValid) {
  throw new Error(`Invalid theme: ${validation.errors.join(', ')}`);
}
```

### 4. Handle Validation Errors Gracefully

```tsx
function SafeThemeProvider({ themes, children }) {
  const validation = themeValidator.validate(themes);
  
  if (!validation.isValid) {
    console.error('Theme validation failed, using fallback theme');
    return (
      <ThemeProvider themes={defaultTheme}>
        {children}
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider themes={themes}>
      {children}
    </ThemeProvider>
  );
}
```

## 🚀 Integration with Build Tools

### Webpack Plugin

```js
// webpack.config.js
const { ThemeValidationPlugin } = require('react-theme-system/webpack');

module.exports = {
  plugins: [
    new ThemeValidationPlugin({
      themePath: './src/theme.js',
      strict: process.env.NODE_ENV === 'production'
    })
  ]
};
```

### ESLint Rule

```js
// .eslintrc.js
module.exports = {
  plugins: ['react-theme-system'],
  rules: {
    'react-theme-system/validate-theme': 'error'
  }
};
```

## 📚 Related Documentation

- [Theme Architecture](Theme-Architecture)
- [Design Tokens](Design-Tokens)
- [Type Safety](Type-Safety)
- [Testing Guide](Testing-Guide)

## 🆘 Troubleshooting

### Common Validation Errors

1. **Missing Required Properties**
   ```
   Error: Missing required color property: primary in light theme
   ```
   **Solution**: Ensure all required properties are defined in both light and dark themes.

2. **Invalid Color Format**
   ```
   Error: Invalid color value for primary in light theme: not-a-color
   ```
   **Solution**: Use valid CSS color formats (hex, rgb, rgba, hsl, hsla, or named colors).

3. **Invalid Spacing Unit**
   ```
   Error: Invalid spacing value for md in light theme: invalid-unit
   ```
   **Solution**: Use valid CSS length units (px, rem, em, %, etc.).

4. **Theme Structure Mismatch**
   ```
   Warning: Light theme missing properties: colors.accent
   ```
   **Solution**: Ensure both light and dark themes have the same structure.

### Getting Help

- Check the [API Reference](../README.md#api-reference)
- Review [Theme Architecture](Theme-Architecture) for proper structure
- Open an [issue](https://github.com/salehammar/react-theme-system/issues) for bugs
- Join [discussions](https://github.com/salehammar/react-theme-system/discussions) for questions
