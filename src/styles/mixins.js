export default {
  placeholder: (style, prefix = '&') => ({
    [`${prefix}::-webkit-input-placeholder`]: style,
    [`${prefix}::-moz-placeholder`]: style, // Firefox 19+
    [`${prefix}:-ms-input-placeholder`]: style, // IE 11
    [`${prefix}::-ms-input-placeholder`]: style, // Edge
  }),
}
