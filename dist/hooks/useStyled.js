"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyled = void 0;
const ThemeProvider_1 = require("../ThemeProvider");
const useStyled = () => {
    const { theme } = (0, ThemeProvider_1.useTheme)();
    const getTokenValue = (path) => {
        const keys = path.split('.');
        let current = theme;
        for (const key of keys) {
            if (current && typeof current === 'object' && key in current) {
                current = current[key];
            }
            else {
                // Theme token not found
                return '';
            }
        }
        return current;
    };
    const styled = (styles) => {
        return Object.entries(styles).reduce((acc, [prop, value]) => {
            if (typeof value === 'string' && value.includes('.')) {
                // Assume it's a theme token path
                return { ...acc, [prop]: getTokenValue(value) };
            }
            return { ...acc, [prop]: value };
        }, {});
    };
    const getColor = (color) => {
        return theme.colors[color];
    };
    const getSpacing = (spacing) => {
        return theme.spacing[spacing];
    };
    const getTypography = (typography) => {
        return theme.typography.fontSize[typography];
    };
    const getShadow = (shadow) => {
        return theme.shadows[shadow];
    };
    const getBorderRadius = (radius) => {
        return theme.borderRadius[radius];
    };
    const getTransition = (transition) => {
        return theme.transitions[transition];
    };
    const responsive = (breakpoint, styles) => {
        return {
            [`@media (min-width: ${theme.breakpoints[breakpoint]})`]: styles
        };
    };
    return {
        styled,
        getColor,
        getSpacing,
        getTypography,
        getShadow,
        getBorderRadius,
        getTransition,
        responsive,
        theme
    };
};
exports.useStyled = useStyled;
