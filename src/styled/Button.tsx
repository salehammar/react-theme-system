import React from 'react';
import { useStyled } from '../hooks/useStyled';
import { StyledProps } from '../types';

interface ButtonProps extends StyledProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  children,
  className = '',
  style = {},
  ...props
}) => {
  const { getColor, getSpacing, getTypography, getBorderRadius, getTransition } = useStyled();

  const getVariantStyles = (): React.CSSProperties => {
    const baseStyles = {
      border: 'none',
      borderRadius: getBorderRadius('md'),
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: getTransition('normal'),
      fontWeight: 600,
      textAlign: 'center' as const,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: getSpacing('sm'),
      width: fullWidth ? '100%' : 'auto',
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: getColor('primary'),
          color: '#ffffff',
        };
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: getColor('secondary'),
          color: '#ffffff',
        };
      case 'outline':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: getColor('primary'),
          border: `2px solid ${getColor('primary')}`,
        };
      case 'ghost':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          color: getColor('text'),
        };
      case 'danger':
        return {
          ...baseStyles,
          backgroundColor: getColor('error'),
          color: '#ffffff',
        };
      default:
        return baseStyles;
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          padding: `${getSpacing('xs')} ${getSpacing('sm')}`,
          fontSize: getTypography('sm'),
          minHeight: '32px',
        };
      case 'lg':
        return {
          padding: `${getSpacing('md')} ${getSpacing('lg')}`,
          fontSize: getTypography('lg'),
          minHeight: '48px',
        };
      default: // md
        return {
          padding: `${getSpacing('sm')} ${getSpacing('md')}`,
          fontSize: getTypography('base'),
          minHeight: '40px',
        };
    }
  };

  const buttonStyles: React.CSSProperties = {
    ...getVariantStyles(),
    ...getSizeStyles(),
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
      style={buttonStyles}
      {...props}
    >
      {loading && (
        <span style={{ 
          width: '16px', 
          height: '16px', 
          border: '2px solid currentColor',
          borderTop: '2px solid transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      )}
      {children}
    </button>
  );
};
