// App.tsx
import React from 'react';
import { ThemeProvider, defaultTheme } from 'react-theme-system';
import { MyComponent } from './MyComponent';

const App = () => (
  <ThemeProvider themes={defaultTheme}>
    <MyComponent />
  </ThemeProvider>
);

export default App;
