import React from 'react';
import { ThemeProvider, Box, Typography, Button, useTheme, defaultTheme, ThemeEditor } from 'react-theme-system';

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
        <Typography as="h1" variant="h2" color="primary">React Theme System</Typography>
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
      <Typography as="h3" variant="h4" color="primary" p="sm">Navigation</Typography>
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Box 
          p="sm" 
          bg="background" 
          borderRadius="md" 
          style={{ cursor: 'pointer' }}
          hover={{ bg: 'primary', color: 'white' }}
        >
          <Typography>Dashboard</Typography>
        </Box>
        <Box 
          p="sm" 
          bg="background" 
          borderRadius="md" 
          style={{ cursor: 'pointer' }}
          hover={{ bg: 'primary', color: 'white' }}
        >
          <Typography>Components</Typography>
        </Box>
        <Box 
          p="sm" 
          bg="background" 
          borderRadius="md" 
          style={{ cursor: 'pointer' }}
          hover={{ bg: 'primary', color: 'white' }}
        >
          <Typography>Theme Editor</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const ComponentShowcase = () => {
  const { theme } = useTheme();
  
  return (
    <Box p="lg">
      <Typography as="h2" variant="h3" color="primary" p="md">Component Showcase</Typography>
      
      {/* Typography Examples */}
      <Box bg="surface" p="lg" borderRadius="lg" shadow="md" m="md">
        <Typography as="h3" variant="h4" color="text" p="sm">Typography</Typography>
        <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Typography as="h1" variant="h1" color="primary">Heading 1</Typography>
          <Typography as="h2" variant="h2" color="secondary">Heading 2</Typography>
          <Typography as="h3" variant="h3" color="text">Heading 3</Typography>
          <Typography variant="body" color="textSecondary">Body text with secondary color</Typography>
          <Typography variant="caption" color="textSecondary">Caption text</Typography>
        </Box>
      </Box>
      
      {/* Button Examples */}
      <Box bg="surface" p="lg" borderRadius="lg" shadow="md" m="md">
        <Typography as="h3" variant="h4" color="text" p="sm">Buttons</Typography>
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
        <Typography as="h3" variant="h4" color="text" p="sm">Layout & Spacing</Typography>
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Box bg="primary" p="xs" borderRadius="sm" color="white">
            <Typography align="center">Extra Small Padding</Typography>
          </Box>
          <Box bg="secondary" p="sm" borderRadius="sm" color="white">
            <Typography align="center">Small Padding</Typography>
          </Box>
          <Box bg="success" p="md" borderRadius="sm" color="white">
            <Typography align="center">Medium Padding</Typography>
          </Box>
          <Box bg="warning" p="lg" borderRadius="sm" color="white">
            <Typography align="center">Large Padding</Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Shadow Examples */}
      <Box bg="surface" p="lg" borderRadius="lg" shadow="md" m="md">
        <Typography as="h3" variant="h4" color="text" p="sm">Shadows</Typography>
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <Box bg="background" p="md" borderRadius="md" shadow="sm">
            <Typography align="center">Small Shadow</Typography>
          </Box>
          <Box bg="background" p="md" borderRadius="md" shadow="md">
            <Typography align="center">Medium Shadow</Typography>
          </Box>
          <Box bg="background" p="md" borderRadius="md" shadow="lg">
            <Typography align="center">Large Shadow</Typography>
          </Box>
          <Box bg="background" p="md" borderRadius="md" shadow="xl">
            <Typography align="center">Extra Large Shadow</Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Border Radius Examples */}
      <Box bg="surface" p="lg" borderRadius="lg" shadow="md" m="md">
        <Typography as="h3" variant="h4" color="text" p="sm">Border Radius</Typography>
        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
          <Box bg="info" p="md" borderRadius="none" color="white">
            <Typography align="center">No Radius</Typography>
          </Box>
          <Box bg="info" p="md" borderRadius="sm" color="white">
            <Typography align="center">Small</Typography>
          </Box>
          <Box bg="info" p="md" borderRadius="md" color="white">
            <Typography align="center">Medium</Typography>
          </Box>
          <Box bg="info" p="md" borderRadius="lg" color="white">
            <Typography align="center">Large</Typography>
          </Box>
          <Box bg="info" p="md" borderRadius="xl" color="white">
            <Typography align="center">Extra Large</Typography>
          </Box>
          <Box bg="info" p="md" borderRadius="full" color="white">
            <Typography align="center">Full</Typography>
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
