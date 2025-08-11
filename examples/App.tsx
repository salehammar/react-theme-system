import React from 'react';
import { ThemeProvider, Box, Text, Button, useTheme, defaultTheme, ThemeEditor } from 'react-theme-system';

const Header = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  
  return (
    <Box 
      bg="surface" 
      p="lg" 
      shadow="sm" 
      borderBottom="1px solid" 
      style={{ borderColor: theme.colors.border }}
    >
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text as="h1" variant="h2" color="primary">React Theme System</Text>
        <Button onClick={toggleTheme} variant="outline" size="sm">
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </Button>
      </Box>
    </Box>
  );
};

const Sidebar = () => {
  const { theme } = useTheme();
  
  return (
    <Box 
      bg="surface" 
      p="md" 
      style={{ 
        width: '250px', 
        borderRight: `1px solid ${theme.colors.border}`,
        minHeight: 'calc(100vh - 80px)'
      }}
    >
      <Text as="h3" variant="h4" color="primary" p="sm">Navigation</Text>
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Box 
          p="sm" 
          bg="background" 
          borderRadius="md" 
          style={{ cursor: 'pointer' }}
          hover={{ bg: 'primary', color: 'white' }}
        >
          <Text>Dashboard</Text>
        </Box>
        <Box 
          p="sm" 
          bg="background" 
          borderRadius="md" 
          style={{ cursor: 'pointer' }}
          hover={{ bg: 'primary', color: 'white' }}
        >
          <Text>Components</Text>
        </Box>
        <Box 
          p="sm" 
          bg="background" 
          borderRadius="md" 
          style={{ cursor: 'pointer' }}
          hover={{ bg: 'primary', color: 'white' }}
        >
          <Text>Theme Editor</Text>
        </Box>
      </Box>
    </Box>
  );
};

const ComponentShowcase = () => {
  const { theme } = useTheme();
  
  return (
    <Box p="lg">
      <Text as="h2" variant="h3" color="primary" p="md">Component Showcase</Text>
      
      {/* Typography Examples */}
      <Box bg="surface" p="lg" borderRadius="lg" shadow="md" m="md">
        <Text as="h3" variant="h4" color="text" p="sm">Typography</Text>
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Text as="h1" variant="h1" color="primary">Heading 1</Text>
          <Text as="h2" variant="h2" color="secondary">Heading 2</Text>
          <Text as="h3" variant="h3" color="text">Heading 3</Text>
          <Text variant="body" color="textSecondary">Body text with secondary color</Text>
          <Text variant="caption" color="textSecondary">Caption text</Text>
        </Box>
      </Box>
      
      {/* Button Examples */}
      <Box bg="surface" p="lg" borderRadius="lg" shadow="md" m="md">
        <Text as="h3" variant="h4" color="text" p="sm">Buttons</Text>
        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Box>
        
        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Box>
        
        <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '16px' }}>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button fullWidth>Full Width</Button>
        </Box>
      </Box>
      
      {/* Layout Examples */}
      <Box bg="surface" p="lg" borderRadius="lg" shadow="md" m="md">
        <Text as="h3" variant="h4" color="text" p="sm">Layout & Spacing</Text>
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Box bg="primary" p="xs" borderRadius="sm" color="white">
            <Text align="center">Extra Small Padding</Text>
          </Box>
          <Box bg="secondary" p="sm" borderRadius="sm" color="white">
            <Text align="center">Small Padding</Text>
          </Box>
          <Box bg="success" p="md" borderRadius="sm" color="white">
            <Text align="center">Medium Padding</Text>
          </Box>
          <Box bg="warning" p="lg" borderRadius="sm" color="white">
            <Text align="center">Large Padding</Text>
          </Box>
        </Box>
      </Box>
      
      {/* Shadow Examples */}
      <Box bg="surface" p="lg" borderRadius="lg" shadow="md" m="md">
        <Text as="h3" variant="h4" color="text" p="sm">Shadows</Text>
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <Box bg="background" p="md" borderRadius="md" shadow="sm">
            <Text align="center">Small Shadow</Text>
          </Box>
          <Box bg="background" p="md" borderRadius="md" shadow="md">
            <Text align="center">Medium Shadow</Text>
          </Box>
          <Box bg="background" p="md" borderRadius="md" shadow="lg">
            <Text align="center">Large Shadow</Text>
          </Box>
          <Box bg="background" p="md" borderRadius="md" shadow="xl">
            <Text align="center">Extra Large Shadow</Text>
          </Box>
        </Box>
      </Box>
      
      {/* Border Radius Examples */}
      <Box bg="surface" p="lg" borderRadius="lg" shadow="md" m="md">
        <Text as="h3" variant="h4" color="text" p="sm">Border Radius</Text>
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
          <Box bg="info" p="md" borderRadius="none" color="white">
            <Text align="center">No Radius</Text>
          </Box>
          <Box bg="info" p="md" borderRadius="sm" color="white">
            <Text align="center">Small</Text>
          </Box>
          <Box bg="info" p="md" borderRadius="md" color="white">
            <Text align="center">Medium</Text>
          </Box>
          <Box bg="info" p="md" borderRadius="lg" color="white">
            <Text align="center">Large</Text>
          </Box>
          <Box bg="info" p="md" borderRadius="xl" color="white">
            <Text align="center">Extra Large</Text>
          </Box>
          <Box bg="info" p="md" borderRadius="full" color="white">
            <Text align="center">Full</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <ThemeProvider themes={defaultTheme}>
      <Box bg="background" minHeight="100vh">
        <Header />
        <Box style={{ display: 'flex' }}>
          <Sidebar />
          <Box style={{ flex: 1 }}>
            <ComponentShowcase />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
