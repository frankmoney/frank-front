export const TEXT_TOP_PADDING = 22
export const TEXT_TOP_PADDING_LARGER = 26
export const FONT_SIZE = 18
export const FONT_SIZE_LARGER = 22
export const LABEL_FONT_SIZE = 14
export const LABEL_TOP = 2

export default theme => ({
  root: {
    position: 'relative',
    paddingTop: TEXT_TOP_PADDING,
    paddingBottom: 5,
    ...theme.fontRegular(FONT_SIZE, 26),
    minHeight: 60,
    letterSpacing: '-0.02em',
    display: 'inline-block',
  },
  larger: {
    minHeight: 70,
    ...theme.fontRegular(FONT_SIZE_LARGER, 30),
    paddingTop: TEXT_TOP_PADDING_LARGER,
    paddingBottom: 6,
    '& $placeholder': {
      top: TEXT_TOP_PADDING_LARGER,
    },
  },
  hasAdornment: {
    '& $control': {
      marginLeft: props => props.adornmentWidth,
    },
  },
  adornment: {
    position: 'absolute',
    top: TEXT_TOP_PADDING,
    left: 0,
  },
  label: {
    position: 'absolute',
    top: LABEL_TOP,
    left: 0,
  },
  placeholder: {
    position: 'absolute',
    top: TEXT_TOP_PADDING,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
  },
  placeholderOff: {
    opacity: 0,
  },
  disabled: {
    pointerEvents: 'none',
    '& $rightLabel': {
      opacity: 0,
    },
  },
  loading: {
    composes: '$disabled',
    // prevent tab and focus
    '& $control': {
      visibility: 'collapse',
    },
  },
  spinner: {
    marginRight: 8,
  },
  rightLabel: {
    position: 'absolute',
    right: 0,
    top: LABEL_TOP,
  },
  control: {},
  stretch: {
    display: 'block',
  },
})
