import React from 'react';
import { useStyled } from '../hooks/useStyled';
import { StyledProps } from '../types';

export const Box: React.FC<StyledProps> = ({ 
  bg = 'background',
  color = 'text',
  p,
  px,
  py,
  m,
  mx,
  my,
  borderRadius = 'md',
  shadow,
  fontSize = 'base',
  fontWeight = 'normal',
  children,
  className = '',
  style = {},
  ...props
}) => {
  const { 
    getColor, 
    getSpacing, 
    getTypography, 
    getShadow, 
 
    getBorderRadius 
  } = useStyled();

  const boxStyles: React.CSSProperties = {
    backgroundColor: bg ? getColor(bg) : undefined,
    color: color ? getColor(color) : undefined,
    padding: p ? getSpacing(p) : undefined,
    paddingLeft: px ? getSpacing(px) : undefined,
    paddingRight: px ? getSpacing(px) : undefined,
    paddingTop: py ? getSpacing(py) : undefined,
    paddingBottom: py ? getSpacing(py) : undefined,
    margin: m ? getSpacing(m) : undefined,
    marginLeft: mx ? getSpacing(mx) : undefined,
    marginRight: mx ? getSpacing(mx) : undefined,
    marginTop: my ? getSpacing(my) : undefined,
    marginBottom: my ? getSpacing(my) : undefined,
    borderRadius: borderRadius ? getBorderRadius(borderRadius) : undefined,
    boxShadow: shadow ? getShadow(shadow) : undefined,
    fontSize: fontSize ? getTypography(fontSize) : undefined,
    fontWeight: fontWeight ? fontWeight : undefined,
    ...style
  };

  return (
    <div 
      className={className}
      style={boxStyles}
      {...props}
    >
      {children}
    </div>
  );
};
