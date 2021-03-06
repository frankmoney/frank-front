const CLICK_PADDING = 4

export default theme => ({
  root: {
    ...theme.fontMedium(16),
    alignItems: 'center',
    cursor: 'pointer',
    display: 'inline-flex',
    padding: CLICK_PADDING,
    position: 'relative',
    transition: theme.transition('color'),
    userSelect: 'none',
    '&:focus': {
      outline: 0,
    },
  },
  larger: {
    ...theme.fontMedium(18),
  },
  larger2: {
    ...theme.fontMedium(20),
  },
  hover: {},
  active: {},

  loading: {
    pointerEvents: 'none',
    '& > *:not($spinner)': {
      visibility: 'collapse',
    },
  },
  spinner: {
    position: 'absolute',
  },
  icon: {
    marginRight: 11,
    height: 22,
    width: 22,
  },

  black: {
    color: '#252B43',
    '&:hover, &$hover': {
      color: '#4C51F3',
    },
    '&:active, &$active': {
      color: '#3E42C9',
    },
  },

  blue: {
    color: '#4C51F3',
    '&:hover, &$hover': {
      color: '#4549DC',
    },
    '&:active, &$active': {
      color: '#3E42C9',
    },
  },

  lightBlue: {
    color: '#8285F7',
    '&:hover, &$hover': {
      color: '#4C51F3',
    },
    '&:active, &$active': {
      color: '#3E42C9',
    },
  },

  gray: {
    color: '#BEBFC7',
    '&:hover, &$hover': {
      color: '#9295A1',
    },
    '&:active, &$active': {
      color: '#666B7B',
    },
  },

  faintGray: {
    color: 'rgba(37, 43, 67, 0.2)',
    '&:hover, &$hover': {
      color: 'rgba(37, 43, 67, 0.7)',
    },
    '&:active, &$active': {
      color: '#252B43',
    },
  },

  solidGray: {
    color: 'rgba(37, 43, 67, 0.5)',
    '&:hover, &$hover': {
      color: 'rgba(37, 43, 67, 0.8)',
    },
    '&:active, &$active': {
      color: '#252B43',
    },
  },

  disabled: {
    cursor: 'auto',
    pointerEvents: 'none',
    color: '#D3D5D9',
  },
})
