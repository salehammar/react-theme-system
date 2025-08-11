import React from 'react';
import { ThemeContextType, ThemeConfig } from './types';
export declare const ThemeProvider: React.FC<{
    themes: ThemeConfig;
    children: React.ReactNode;
    defaultTheme?: 'light' | 'dark';
}>;
export declare const useTheme: () => ThemeContextType;
