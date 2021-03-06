const SIZE = 18
const COLOR_GRAY = '#D2D4DB'
const COLOR_GRAY_HOVER = '#BCBFC9'
const COLOR_GRAY_DISABLED = '#E9EAEE'
const COLOR_BLUE = '#484DE7'
const COLOR_BLUE_HOVER = '#4549DC'
const COLOR_GREEN = '#21CB61'
const COLOR_GREEN_HOVER = '#1EB757'
export const CHECKBOX_HIT_ZONE_SIZE = 7

export default theme => ({
  root: {
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    color: COLOR_GRAY,
    // Pump checkbox hitzone
    padding: props =>
      props.disableExtendedHitZone ? 0 : CHECKBOX_HIT_ZONE_SIZE,
    left: props =>
      props.hitzoneLeftCompensation ? -CHECKBOX_HIT_ZONE_SIZE : null,
    '&:hover, &$hover': {
      color: COLOR_GRAY_HOVER,
      '& $box': {
        borderColor: COLOR_GRAY_HOVER,
      },
    },
  },
  box: {
    width: SIZE,
    height: SIZE,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    border: ['2px', 'solid', COLOR_GRAY],
  },
  checkmark: {
    flex: 1,
    color: '#fff',
  },
  hover: {},
  disabled: {
    color: COLOR_GRAY_DISABLED,
    '& $box': {
      background: '#F8F9FA',
      borderColor: COLOR_GRAY_DISABLED,
    },
    '&$checked $box': {
      border: 'none',
      background: COLOR_GRAY_DISABLED,
    },
    pointerEvents: 'none',
  },
  checked: {
    '&:not($disabled)$blue': {
      color: COLOR_BLUE,
      '& $box': {
        border: 'none',
        background: COLOR_BLUE,
      },
      '&:hover, &$hover': {
        color: COLOR_BLUE_HOVER,
        '& $box': {
          background: COLOR_BLUE_HOVER,
        },
      },
    },
    '&:not($disabled)$green': {
      color: COLOR_GREEN,
      '& $box': {
        border: 'none',
        background: COLOR_GREEN,
      },
      '&:hover, &$hover': {
        color: COLOR_GREEN_HOVER,
        '& $box': {
          background: COLOR_GREEN_HOVER,
        },
      },
    },
  },
  green: {},
  blue: {},
  input: {
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
  },
  label: {
    ...theme.fontMedium(16, 22),
    marginLeft: 10,
  },
})
