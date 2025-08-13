"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = exports.ThemeProvider = exports.VALID_THEMES = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
// Theme validation constants
exports.VALID_THEMES = ['light', 'dark'];
// Theme storage key
const THEME_STORAGE_KEY = 'react-theme-system-theme';
const ThemeContext = (0, react_1.createContext)(undefined);
const ThemeProvider = ({ themes, children, defaultTheme = 'light', onChange, enablePersistence = true }) => {
    // Use undefined initially to prevent hydration mismatch
    const [currentTheme, setCurrentTheme] = (0, react_1.useState)(undefined);
    const [customTheme, setCustomTheme] = (0, react_1.useState)(null);
    const [isHydrated, setIsHydrated] = (0, react_1.useState)(false);
    // Theme validation function
    const isValidTheme = (theme) => {
        return exports.VALID_THEMES.includes(theme);
    };
    // Initialize theme on mount (SSR-safe)
    (0, react_1.useEffect)(() => {
        if (enablePersistence && typeof window !== 'undefined') {
            try {
                const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
                const theme = storedTheme && isValidTheme(storedTheme)
                    ? storedTheme
                    : (isValidTheme(defaultTheme) ? defaultTheme : 'light');
                setCurrentTheme(theme);
            }
            catch (error) {
                console.warn('Failed to read theme from localStorage:', error);
                setCurrentTheme(isValidTheme(defaultTheme) ? defaultTheme : 'light');
            }
        }
        else {
            setCurrentTheme(isValidTheme(defaultTheme) ? defaultTheme : 'light');
        }
        setIsHydrated(true);
    }, [defaultTheme, enablePersistence]);
    // Persist theme changes
    const persistTheme = (0, react_1.useCallback)((theme) => {
        if (enablePersistence && typeof window !== 'undefined') {
            try {
                localStorage.setItem(THEME_STORAGE_KEY, theme);
            }
            catch (error) {
                console.warn('Failed to persist theme to localStorage:', error);
            }
        }
    }, [enablePersistence]);
    const theme = (0, react_1.useMemo)(() => {
        if (!currentTheme)
            return themes.light; // Fallback during SSR
        const baseTheme = currentTheme === 'dark' ? themes.dark : themes.light;
        return customTheme ? { ...baseTheme, ...customTheme } : baseTheme;
    }, [currentTheme, themes, customTheme]);
    const isDarkMode = currentTheme === 'dark';
    const setTheme = (0, react_1.useCallback)((newTheme) => {
        if (!isValidTheme(newTheme)) {
            console.warn(`Invalid theme: ${newTheme}. Valid themes are: ${exports.VALID_THEMES.join(', ')}`);
            return;
        }
        setCurrentTheme(newTheme);
        persistTheme(newTheme);
        onChange?.(newTheme);
    }, [onChange, persistTheme]);
    const toggleTheme = (0, react_1.useCallback)(() => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        setTheme(newTheme);
    }, [isDarkMode, setTheme]);
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
        currentTheme,
        isHydrated,
        setTheme,
        toggleTheme,
        updateTheme,
        resetCustomTheme: () => setCustomTheme(null)
    };
    // Don't render until hydrated to prevent SSR mismatch
    if (!isHydrated) {
        return ((0, jsx_runtime_1.jsx)(ThemeContext.Provider, { value: contextValue, children: (0, jsx_runtime_1.jsx)("div", { style: { visibility: 'hidden' }, children: children }) }));
    }
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
