export default theme => ({
  root: {
    ...theme.fontMedium(16, 36),
    alignItems: 'center',
    cursor: 'pointer',
    display: 'inline-flex',
    position: 'relative',
    transition: theme.transition('color'),
    userSelect: 'none',
    '&:focus': {
      outline: 0,
    },
  },
  larger: {
    fontSize: 18,
  },
  thin: {
    fontWeight: 400,
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

  disabled: {
    cursor: 'auto',
    pointerEvents: 'none',
    color: '#D3D5D9',
  },
})
