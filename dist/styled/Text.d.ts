import React from 'react';
import { StyledProps } from '../types';
interface TextProps extends StyledProps {
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div';
    variant?: 'body' | 'caption' | 'overline' | 'button' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    align?: 'left' | 'center' | 'right' | 'justify';
    truncate?: boolean;
    noWrap?: boolean;
}
export declare const Text: React.FC<TextProps>;
export {};
