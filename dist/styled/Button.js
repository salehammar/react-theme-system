"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useStyled_1 = require("../hooks/useStyled");
const Button = ({ variant = 'primary', size = 'md', disabled = false, loading = false, fullWidth = false, onClick, type = 'button', children, className = '', style = {}, ...props }) => {
    const { getColor, getSpacing, getTypography, getBorderRadius, getTransition } = (0, useStyled_1.useStyled)();
    const getVariantStyles = () => {
        const baseStyles = {
            border: 'none',
            borderRadius: getBorderRadius('md'),
            cursor: disabled ? 'not-allowed' : 'pointer',
            transition: getTransition('normal'),
            fontWeight: 600,
            textAlign: 'center',
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
    const getSizeStyles = () => {
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
    const buttonStyles = {
        ...getVariantStyles(),
        ...getSizeStyles(),
        opacity: disabled ? 0.6 : 1,
        ...style,
    };
    return ((0, jsx_runtime_1.jsxs)("button", { type: type, disabled: disabled || loading, onClick: onClick, className: className, style: buttonStyles, ...props, children: [loading && ((0, jsx_runtime_1.jsx)("span", { style: {
                    width: '16px',
                    height: '16px',
                    border: '2px solid currentColor',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                } })), children] }));
};
exports.Button = Button;
