export const TEXT_TOP_PADDING = 22
export const TEXT_TOP_PADDING_LARGER = 26
export const FONT_SIZE = 20
export const FONT_SIZE_LARGER = 40
export const LABEL_FONT_SIZE = 14
export const LABEL_TOP = 2

export default theme => ({
  root: {
    position: 'relative',
    ...theme.fontRegular(FONT_SIZE, 32),
    minHeight: 60,
    letterSpacing: '-0.02em',
    display: 'inline-flex',
    flexDirection: 'row',
  },
  larger: {
    minHeight: 70,
    ...theme.fontSemibold(FONT_SIZE_LARGER, 46),
  },
  icon: {
    display: 'flex',
    borderRight: '1px solid rgba(37, 43, 67, 0.08)',
    marginRight: 25,
    padding: [0, 20, 0, 5],
    alignItems: 'center',
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
  control: {
    flex: 'auto',
    paddingTop: 7,
    paddingBottom: 5,
    '$larger &': {
      paddingTop: 10,
      paddingBottom: 4,
    },
  },
  stretch: {
    display: 'flex',
  },
})
