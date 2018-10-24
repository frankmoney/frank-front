export const TEXT_TOP_PADDING = 22
export const TEXT_TOP_PADDING_LARGER = 26
export const FONT_SIZE = 18
export const FONT_SIZE_LARGER = 22

export default {
  root: {
    position: 'relative',
    paddingTop: TEXT_TOP_PADDING,
    paddingBottom: 5,
    fontSize: 18,
    lineHeight: 26,
    minHeight: 60,
    letterSpacing: '-0.025em',
  },
  larger: {
    minHeight: 70,
    fontSize: 22,
    lineHeight: 30,
    paddingTop: TEXT_TOP_PADDING_LARGER,
    paddingBottom: 6,
    '& $placeholder': {
      top: TEXT_TOP_PADDING_LARGER,
    },
  },
  label: {
    position: 'absolute',
    top: 0,
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
    '& $error': {
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
  error: {},
  control: {},
}
