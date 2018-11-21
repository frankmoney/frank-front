export const TEXT_TOP_PADDING = 22
export const TEXT_TOP_PADDING_LARGER = 26
export const FONT_SIZE = 18
export const FONT_SIZE_LARGER = 22
export const LABEL_FONT_SIZE = 14
export const LABEL_TOP = 2

export default {
  root: {
    position: 'relative',
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: '-0.02em',
    display: 'inline-flex',
    alignItems: 'flex-start',
    outline: 'none',
  },
  label: {
    width: 150,
    flexShrink: 0,
    color: '#000',
    fontSize: 18,
    lineHeight: 26,
  },
  placeholder: {
    position: 'absolute',
    top: 0,
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
  },
  controlWrap: {
    position: 'relative',
    height: '100%',
    flexGrow: 1,
  },
  control: {
    width: '100%',
    fontSize: 18,
    lineHeight: 26,
    paddingBottom: 8,
  },
  stretch: {
    display: 'flex',
  },
  focus: {},
  filled: {},
}
