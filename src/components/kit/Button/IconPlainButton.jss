export default theme => ({
  root: {
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
    color: '#D3D5D9',
    '&:hover, &$hover': {
      color: '#666B7B',
    },
    '&:active, &$active': {
      color: '#252B43',
    },
  },
})
