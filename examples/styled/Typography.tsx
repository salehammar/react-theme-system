import React from 'react';
import { useStyled } from '../hooks/useStyled';
import { StyledProps } from '../types';

interface TypographyProps extends StyledProps {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label' | 'div';
  variant?: 'body' | 'caption' | 'overline' | 'button' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  noWrap?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  as = 'p',
  variant = 'body',
  align = 'left',
  truncate = false,
  noWrap = false,
  color = 'text',
  fontSize,
  fontWeight,
  p,
  m,
  children,
  className = '',
  style = {},
  ...props
}) => {
  const { getColor, getTypography, getSpacing } = useStyled();

  const getDefaultFontSize = (): string => {
    switch (variant) {
      case 'caption': return 'sm';
      case 'overline': return 'xs';
      case 'button': return 'sm';
      case 'h1': return '3xl';
      case 'h2': return '2xl';
      case 'h3': return 'xl';
      case 'h4': return 'lg';
      case 'h5': return 'base';
      case 'h6': return 'sm';
      default: return 'base';
    }
  };

  const getDefaultFontWeight = (): number => {
    switch (variant) {
      case 'overline': return 500;
      case 'button': return 600;
      case 'h1': return 700;
      case 'h2': return 700;
      case 'h3': return 600;
      case 'h4': return 600;
      case 'h5': return 600;
      case 'h6': return 600;
      default: return 400;
    }
  };

  const textStyles: React.CSSProperties = {
    color: getColor(color),
    fontSize: fontSize ? getTypography(fontSize) : getTypography(getDefaultFontSize() as any),
    fontWeight: fontWeight || getDefaultFontWeight(),
    textAlign: align,
    padding: p ? getSpacing(p) : undefined,
    margin: m ? getSpacing(m) : undefined,
    whiteSpace: noWrap ? 'nowrap' : undefined,
    overflow: truncate ? 'hidden' : undefined,
    textOverflow: truncate ? 'ellipsis' : undefined,
    ...style
  };

  const Component = as as any;

  return (
    <Component
      className={className}
      style={textStyles}
      {...props}
    >
      {children}
    </Component>
  );
};
