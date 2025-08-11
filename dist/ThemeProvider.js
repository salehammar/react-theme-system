"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = exports.ThemeProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ThemeContext = (0, react_1.createContext)(undefined);
const ThemeProvider = ({ themes, children, defaultTheme = 'light' }) => {
    const [isDarkMode, setIsDarkMode] = (0, react_1.useState)(defaultTheme === 'dark');
    const [customTheme, setCustomTheme] = (0, react_1.useState)(null);
    const theme = (0, react_1.useMemo)(() => {
        const baseTheme = isDarkMode ? themes.dark : themes.light;
        return customTheme ? { ...baseTheme, ...customTheme } : baseTheme;
    }, [isDarkMode, themes, customTheme]);
    const toggleTheme = (0, react_1.useCallback)(() => {
        setIsDarkMode(prev => !prev);
    }, []);
    const updateTheme = (0, react_1.useCallback)((path, value) => {
        setCustomTheme(prev => {
            const newTheme = { ...prev };
            const keys = path.split('.');
            let current = newTheme;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) {
                    current[keys[i]] = {};
                }
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newTheme;
        });
    }, []);
    const contextValue = {
        theme,
        isDarkMode,
        toggleTheme,
        updateTheme
    };
    return ((0, jsx_runtime_1.jsx)(ThemeContext.Provider, { value: contextValue, children: children }));
};
exports.ThemeProvider = ThemeProvider;
const useTheme = () => {
    const context = (0, react_1.useContext)(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};
exports.useTheme = useTheme;
