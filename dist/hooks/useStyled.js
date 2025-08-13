"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyled = void 0;
const ThemeProvider_1 = require("../ThemeProvider");
const useStyled = () => {
    const { theme, isHydrated } = (0, ThemeProvider_1.useTheme)();
    const getTokenValue = (path, fallback) => {
        if (!isHydrated)
            return fallback || '';
        const keys = path.split('.');
        let current = theme;
        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            }
            else {
                // Theme token not found, return fallback or empty string
                console.warn(`Theme token not found: ${path}`);
                return fallback || '';
            }
        }
        return current;
    };
    const styled = (styles, fallbacks) => {
        return Object.entries(styles).reduce((acc, [prop, value]) => {
            if (typeof value === 'string' && value.includes('.')) {
                // Assume it's a theme token path
                const fallback = fallbacks?.[prop];
                return { ...acc, [prop]: getTokenValue(value, fallback) };
            }
            return { ...acc, [prop]: value };
        }, {});
    };
    const getColor = (color, fallback) => {
        if (!isHydrated)
            return fallback || '#000000';
        return theme.colors[color] || fallback || '#000000';
    };
    const getSpacing = (spacing, fallback) => {
        if (!isHydrated)
            return fallback || '0';
        return theme.spacing[spacing] || fallback || '0';
    };
    const getTypography = (typography, fallback) => {
        if (!isHydrated)
            return fallback || '1rem';
        return theme.typography.fontSize[typography] || fallback || '1rem';
    };
    const getShadow = (shadow, fallback) => {
        if (!isHydrated)
            return fallback || 'none';
        return theme.shadows[shadow] || fallback || 'none';
    };
    const getBorderRadius = (radius, fallback) => {
        if (!isHydrated)
            return fallback || '0';
        return theme.borderRadius[radius] || fallback || '0';
    };
    const getTransition = (transition, fallback) => {
        if (!isHydrated)
            return fallback || 'none';
        return theme.transitions[transition] || fallback || 'none';
    };
    const getFontWeight = (weight, fallback) => {
        if (!isHydrated)
            return fallback || 400;
        return theme.typography.fontWeight[weight] || fallback || 400;
    };
    const getFontFamily = (family, fallback) => {
        if (!isHydrated)
            return fallback || 'sans-serif';
        return theme.typography.fontFamily[family] || fallback || 'sans-serif';
    };
    const responsive = (breakpoint, styles) => {
        if (!isHydrated)
            return {};
        return {
            [`@media (min-width: ${theme.breakpoints[breakpoint]})`]: styles
        };
    };
    // CSS variable helpers for better fallback support
    const cssVar = (name, fallback) => {
        if (!isHydrated)
            return fallback || '';
        return `var(--${name}, ${fallback || ''})`;
    };
    const colorVar = (color, fallback) => {
        return cssVar(`color-${color}`, fallback);
    };
    const spacingVar = (spacing, fallback) => {
        return cssVar(`spacing-${spacing}`, fallback);
    };
    const fontSizeVar = (size, fallback) => {
        return cssVar(`font-size-${size}`, fallback);
    };
    const shadowVar = (shadow, fallback) => {
        return cssVar(`shadow-${shadow}`, fallback);
    };
    const radiusVar = (radius, fallback) => {
        return cssVar(`radius-${radius}`, fallback);
    };
    return {
        styled,
        getColor,
        getSpacing,
        getTypography,
        getShadow,
        getBorderRadius,
        getTransition,
        getFontWeight,
        getFontFamily,
        responsive,
        cssVar,
        colorVar,
        spacingVar,
        fontSizeVar,
        shadowVar,
        radiusVar,
        theme,
        isHydrated
    };
};
exports.useStyled = useStyled;
