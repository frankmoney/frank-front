export default {
  placeholder: (style, prefix = '&') => ({
    [`${prefix}::-webkit-input-placeholder`]: style,
    [`${prefix}::-moz-placeholder`]: style, // Firefox 19+
    [`${prefix}:-ms-input-placeholder`]: style, // IE 11
    [`${prefix}::-ms-input-placeholder`]: style, // Edge
  }),
  maxLines: (linesCount, lineHeight) => ({
    height: linesCount * lineHeight,
    // max N lines
    wordBreak: 'break-word',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': linesCount,
  }),
}
