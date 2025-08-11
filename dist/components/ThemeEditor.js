"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeEditor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ThemeProvider_1 = require("../ThemeProvider");
const useStyled_1 = require("../hooks/useStyled");
const styled_1 = require("../styled");
const ColorPicker = ({ label, color: colorValue, onChange }) => ((0, jsx_runtime_1.jsxs)(styled_1.Box, { p: "sm", style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [(0, jsx_runtime_1.jsx)(styled_1.Typography, { variant: "caption", style: { minWidth: '80px' }, children: label }), (0, jsx_runtime_1.jsx)("input", { type: "color", value: colorValue, onChange: (e) => onChange(e.target.value), style: {
                width: '40px',
                height: '32px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            } }), (0, jsx_runtime_1.jsx)("input", { type: "text", value: colorValue, onChange: (e) => onChange(e.target.value), style: {
                width: '80px',
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '12px'
            } })] }));
const SpacingSlider = ({ label, value: valueStr, onChange, min = 0, max = 100, step = 1 }) => {
    const numericValue = parseInt(valueStr.replace('px', '').replace('rem', ''));
    return ((0, jsx_runtime_1.jsxs)(styled_1.Box, { p: "sm", style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [(0, jsx_runtime_1.jsx)(styled_1.Typography, { variant: "caption", style: { minWidth: '80px' }, children: label }), (0, jsx_runtime_1.jsx)("input", { type: "range", min: min, max: max, step: step, value: numericValue, onChange: (e) => onChange(`${e.target.value}px`), style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(styled_1.Typography, { variant: "caption", style: { minWidth: '40px' }, children: valueStr })] }));
};
const ThemeEditor = () => {
    const { theme, updateTheme, toggleTheme, isDarkMode } = (0, ThemeProvider_1.useTheme)();
    const { getColor } = (0, useStyled_1.useStyled)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('colors');
    const handleColorChange = (path, color) => {
        updateTheme(path, color);
    };
    const handleSpacingChange = (path, value) => {
        updateTheme(path, value);
    };
    const handleTypographyChange = (path, value) => {
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
    return ((0, jsx_runtime_1.jsxs)(styled_1.Box, { bg: "surface", p: "lg", shadow: "lg", borderRadius: "lg", style: { maxWidth: '600px', margin: '0 auto' }, children: [(0, jsx_runtime_1.jsxs)(styled_1.Box, { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }, children: [(0, jsx_runtime_1.jsx)(styled_1.Typography, { as: "h2", variant: "h2", color: "primary", children: "Theme Editor" }), (0, jsx_runtime_1.jsxs)(styled_1.Button, { onClick: toggleTheme, variant: "outline", size: "sm", children: [isDarkMode ? '☀️ Light' : '🌙 Dark', " Mode"] })] }), (0, jsx_runtime_1.jsx)(styled_1.Box, { style: { display: 'flex', gap: '8px', marginBottom: '24px' }, children: ['colors', 'spacing', 'typography'].map((tab) => ((0, jsx_runtime_1.jsx)(styled_1.Button, { variant: activeTab === tab ? 'primary' : 'ghost', size: "sm", onClick: () => setActiveTab(tab), style: { textTransform: 'capitalize' }, children: tab }, tab))) }), activeTab === 'colors' && ((0, jsx_runtime_1.jsxs)(styled_1.Box, { children: [(0, jsx_runtime_1.jsx)(styled_1.Typography, { as: "h3", variant: "h3", p: "sm", children: "Color Palette" }), (0, jsx_runtime_1.jsx)(ColorPicker, { label: "Primary", color: theme.colors.primary, onChange: (color) => handleColorChange('colors.primary', color) }), (0, jsx_runtime_1.jsx)(ColorPicker, { label: "Secondary", color: theme.colors.secondary, onChange: (color) => handleColorChange('colors.secondary', color) }), (0, jsx_runtime_1.jsx)(ColorPicker, { label: "Background", color: theme.colors.background, onChange: (color) => handleColorChange('colors.background', color) }), (0, jsx_runtime_1.jsx)(ColorPicker, { label: "Surface", color: theme.colors.surface, onChange: (color) => handleColorChange('colors.surface', color) }), (0, jsx_runtime_1.jsx)(ColorPicker, { label: "Text", color: theme.colors.text, onChange: (color) => handleColorChange('colors.text', color) })] })), activeTab === 'spacing' && ((0, jsx_runtime_1.jsxs)(styled_1.Box, { children: [(0, jsx_runtime_1.jsx)(styled_1.Typography, { as: "h3", variant: "h3", p: "sm", children: "Spacing Scale" }), (0, jsx_runtime_1.jsx)(SpacingSlider, { label: "Small", value: theme.spacing.sm, onChange: (value) => handleSpacingChange('spacing.sm', value), min: 4, max: 32 }), (0, jsx_runtime_1.jsx)(SpacingSlider, { label: "Medium", value: theme.spacing.md, onChange: (value) => handleSpacingChange('spacing.md', value), min: 8, max: 64 }), (0, jsx_runtime_1.jsx)(SpacingSlider, { label: "Large", value: theme.spacing.lg, onChange: (value) => handleSpacingChange('spacing.lg', value), min: 16, max: 128 })] })), activeTab === 'typography' && ((0, jsx_runtime_1.jsxs)(styled_1.Box, { children: [(0, jsx_runtime_1.jsx)(styled_1.Typography, { as: "h3", variant: "h3", p: "sm", children: "Typography" }), (0, jsx_runtime_1.jsxs)(styled_1.Box, { p: "sm", style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [(0, jsx_runtime_1.jsx)(styled_1.Typography, { variant: "caption", style: { minWidth: '80px' }, children: "Base Font" }), (0, jsx_runtime_1.jsxs)("select", { value: theme.typography.fontSize.base, onChange: (e) => handleTypographyChange('typography.fontSize.base', e.target.value), style: {
                                    padding: '4px 8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontSize: '12px'
                                }, children: [(0, jsx_runtime_1.jsx)("option", { value: "12px", children: "12px" }), (0, jsx_runtime_1.jsx)("option", { value: "14px", children: "14px" }), (0, jsx_runtime_1.jsx)("option", { value: "16px", children: "16px" }), (0, jsx_runtime_1.jsx)("option", { value: "18px", children: "18px" }), (0, jsx_runtime_1.jsx)("option", { value: "20px", children: "20px" })] })] })] })), (0, jsx_runtime_1.jsxs)(styled_1.Box, { style: { display: 'flex', gap: '12px', marginTop: '24px' }, children: [(0, jsx_runtime_1.jsx)(styled_1.Button, { onClick: resetTheme, variant: "ghost", size: "sm", children: "Reset Theme" }), (0, jsx_runtime_1.jsx)(styled_1.Button, { onClick: exportTheme, variant: "outline", size: "sm", children: "Export Theme" })] }), (0, jsx_runtime_1.jsxs)(styled_1.Box, { bg: "background", p: "lg", m: "lg", borderRadius: "md", style: { border: `1px solid ${getColor('border')}` }, children: [(0, jsx_runtime_1.jsx)(styled_1.Typography, { as: "h4", variant: "h4", color: "primary", p: "sm", children: "Preview" }), (0, jsx_runtime_1.jsx)(styled_1.Box, { p: "md", bg: "surface", borderRadius: "sm", m: "sm", children: (0, jsx_runtime_1.jsx)(styled_1.Typography, { children: "This is how your theme looks with the current settings." }) }), (0, jsx_runtime_1.jsxs)(styled_1.Box, { style: { display: 'flex', gap: '8px', marginTop: '12px' }, children: [(0, jsx_runtime_1.jsx)(styled_1.Button, { size: "sm", children: "Primary" }), (0, jsx_runtime_1.jsx)(styled_1.Button, { variant: "secondary", size: "sm", children: "Secondary" }), (0, jsx_runtime_1.jsx)(styled_1.Button, { variant: "outline", size: "sm", children: "Outline" })] })] })] }));
};
exports.ThemeEditor = ThemeEditor;
