import React, { useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { useStyled } from '../hooks/useStyled';
import { Box, Button, Typography } from '../styled';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (_color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => (
  <Box p="sm" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <Typography variant="caption" style={{ minWidth: '80px' }}>{label}</Typography>
    <input
      type="color"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '40px',
        height: '32px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    />
    <input
      type="text"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '80px',
        padding: '4px 8px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '12px'
      }}
    />
  </Box>
);

interface SpacingSliderProps {
  label: string;
  value: string;
  onChange: (_value: string) => void;
  min?: number;
  max?: number;
  step?: number;
}

const SpacingSlider: React.FC<SpacingSliderProps> = ({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1 
}) => {
  const numericValue = parseInt(value.replace('px', '').replace('rem', ''));
  
  return (
    <Box p="sm" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Typography variant="caption" style={{ minWidth: '80px' }}>{label}</Typography>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={numericValue}
        onChange={(e) => onChange(`${e.target.value}px`)}
        style={{ flex: 1 }}
      />
      <Typography variant="caption" style={{ minWidth: '40px' }}>{value}</Typography>
    </Box>
  );
};

export const ThemeEditor: React.FC = () => {
  const { theme, updateTheme, toggleTheme, isDarkMode } = useTheme();
  const { getColor } = useStyled();
  const [activeTab, setActiveTab] = useState<'colors' | 'spacing' | 'typography'>('colors');

  const handleColorChange = (path: string, color: string) => {
    updateTheme(path, color);
  };

  const handleSpacingChange = (path: string, value: string) => {
    updateTheme(path, value);
  };

  const handleTypographyChange = (path: string, value: string | number) => {
    updateTheme(path, value);
  };

  const resetTheme = () => {
    // Reset to default theme
    Object.keys(theme).forEach(key => {
      updateTheme(key, undefined);
    });
  };

  const exportTheme = () => {
    const themeData = JSON.stringify(theme, null, 2);
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-theme.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box 
      bg="surface" 
      p="lg" 
      shadow="lg" 
      borderRadius="lg"
      style={{ maxWidth: '600px', margin: '0 auto' }}
    >
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Typography as="h2" variant="h2" color="primary">Theme Editor</Typography>
        <Button onClick={toggleTheme} variant="outline" size="sm">
          {isDarkMode ? '☀️ Light' : '🌙 Dark'} Mode
        </Button>
      </Box>

      {/* Tab Navigation */}
      <Box style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(['colors', 'spacing', 'typography'] as const).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(tab)}
            style={{ textTransform: 'capitalize' }}
          >
            {tab}
          </Button>
        ))}
      </Box>

      {/* Colors Tab */}
      {activeTab === 'colors' && (
        <Box>
          <Typography as="h3" variant="h3" p="sm">Color Palette</Typography>
          <ColorPicker
            label="Primary"
            color={theme.colors.primary}
            onChange={(color) => handleColorChange('colors.primary', color)}
          />
          <ColorPicker
            label="Secondary"
            color={theme.colors.secondary}
            onChange={(color) => handleColorChange('colors.secondary', color)}
          />
          <ColorPicker
            label="Background"
            color={theme.colors.background}
            onChange={(color) => handleColorChange('colors.background', color)}
          />
          <ColorPicker
            label="Surface"
            color={theme.colors.surface}
            onChange={(color) => handleColorChange('colors.surface', color)}
          />
          <ColorPicker
            label="Text"
            color={theme.colors.text}
            onChange={(color) => handleColorChange('colors.text', color)}
          />
        </Box>
      )}

      {/* Spacing Tab */}
      {activeTab === 'spacing' && (
        <Box>
          <Typography as="h3" variant="h3" p="sm">Spacing Scale</Typography>
          <SpacingSlider
            label="Small"
            value={theme.spacing.sm}
            onChange={(value) => handleSpacingChange('spacing.sm', value)}
            min={4}
            max={32}
          />
          <SpacingSlider
            label="Medium"
            value={theme.spacing.md}
            onChange={(value) => handleSpacingChange('spacing.md', value)}
            min={8}
            max={64}
          />
          <SpacingSlider
            label="Large"
            value={theme.spacing.lg}
            onChange={(value) => handleSpacingChange('spacing.lg', value)}
            min={16}
            max={128}
          />
        </Box>
      )}

      {/* Typography Tab */}
      {activeTab === 'typography' && (
        <Box>
          <Typography as="h3" variant="h3" p="sm">Typography</Typography>
          <Box p="sm" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Typography variant="caption" style={{ minWidth: '80px' }}>Base Font</Typography>
            <select
              value={theme.typography.fontSize.base}
              onChange={(e) => handleTypographyChange('typography.fontSize.base', e.target.value)}
              style={{
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
            </select>
          </Box>
        </Box>
      )}

      {/* Action Buttons */}
      <Box style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
        <Button onClick={resetTheme} variant="ghost" size="sm">
          Reset Theme
        </Button>
        <Button onClick={exportTheme} variant="outline" size="sm">
          Export Theme
        </Button>
      </Box>

      {/* Preview */}
      <Box 
        bg="background" 
        p="lg" 
        m="lg" 
        borderRadius="md" 
        style={{ border: `1px solid ${getColor('border')}` }}
      >
        <Typography as="h4" variant="h4" color="primary" p="sm">Preview</Typography>
        <Box p="md" bg="surface" borderRadius="sm" m="sm">
          <Typography>This is how your theme looks with the current settings.</Typography>
        </Box>
        <Box style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <Button size="sm">Primary</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="outline" size="sm">Outline</Button>
        </Box>
      </Box>
    </Box>
  );
};
