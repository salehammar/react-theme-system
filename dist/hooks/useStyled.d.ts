import { Theme, StyledStyles, ThemeTokenPath } from '../types';
export declare const useStyled: () => {
    styled: (styles: Record<string, ThemeTokenPath | string | number>) => StyledStyles;
    getColor: (color: keyof Theme["colors"]) => string;
    getSpacing: (spacing: keyof Theme["spacing"]) => string;
    getTypography: (typography: keyof Theme["typography"]["fontSize"]) => string;
    getShadow: (shadow: keyof Theme["shadows"]) => string;
    getBorderRadius: (radius: keyof Theme["borderRadius"]) => string;
    getTransition: (transition: keyof Theme["transitions"]) => string;
    responsive: (breakpoint: keyof Theme["breakpoints"], styles: StyledStyles) => Record<string, StyledStyles>;
    theme: Theme;
};
