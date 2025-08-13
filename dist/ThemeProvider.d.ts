import React from 'react';
import { ThemeContextType, ThemeConfig } from './types';
export declare const VALID_THEMES: readonly ["light", "dark"];
export type ValidTheme = typeof VALID_THEMES[number];
export interface ThemeProviderProps {
    themes: ThemeConfig;
    children: React.ReactNode;
    defaultTheme?: ValidTheme;
    onChange?: (_theme: ValidTheme) => void;
    enablePersistence?: boolean;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare const useTheme: () => ThemeContextType;
