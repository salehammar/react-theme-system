"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useStyled_1 = require("../hooks/useStyled");
const Text = ({ as = 'p', variant = 'body', align = 'left', truncate = false, noWrap = false, color = 'text', fontSize, fontWeight, p, m, children, className = '', style = {}, ...props }) => {
    const { getColor, getTypography, getSpacing } = (0, useStyled_1.useStyled)();
    const getDefaultFontSize = () => {
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
    const getDefaultFontWeight = () => {
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
    const textStyles = {
        color: getColor(color),
        fontSize: fontSize ? getTypography(fontSize) : getTypography(getDefaultFontSize()),
        fontWeight: fontWeight || getDefaultFontWeight(),
        textAlign: align,
        padding: p ? getSpacing(p) : undefined,
        margin: m ? getSpacing(m) : undefined,
        whiteSpace: noWrap ? 'nowrap' : undefined,
        overflow: truncate ? 'hidden' : undefined,
        textOverflow: truncate ? 'ellipsis' : undefined,
        ...style
    };
    const Component = as;
    return ((0, jsx_runtime_1.jsx)(Component, { className: className, style: textStyles, ...props, children: children }));
};
exports.Text = Text;
