"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const useStyled_1 = require("../hooks/useStyled");
const Box = ({ bg = 'background', color = 'text', p, px, py, m, mx, my, borderRadius = 'md', shadow, fontSize = 'base', fontWeight = 'normal', children, className = '', style = {}, ...props }) => {
    const { getColor, getSpacing, getTypography, getShadow, getBorderRadius } = (0, useStyled_1.useStyled)();
    const boxStyles = {
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
    return ((0, jsx_runtime_1.jsx)("div", { className: className, style: boxStyles, ...props, children: children }));
};
exports.Box = Box;
