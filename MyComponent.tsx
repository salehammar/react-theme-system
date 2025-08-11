import React from 'react';
import { Box, Text, Button, useTheme } from 'react-theme-system';

export const MyComponent = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  
  return (
    <Box bg="background" p="lg">
      <Text as="h1" variant="h2" color="primary" p="md">
        Welcome to React Theme System
      </Text>
      
      <Box bg="surface" p="md" borderRadius="md" shadow="md" m="md">
        <Text color="textSecondary" p="sm">
          This component uses theme tokens for consistent styling
        </Text>
        
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
