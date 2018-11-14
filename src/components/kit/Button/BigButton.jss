export default theme => ({
  root: {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    display: 'inline-flex',
    ...theme.fontMedium(18, 36),
    height: 80,
    width: '100%',
    padding: [0, 20],
    position: 'relative',
    textDecoration: 'none',
    userSelect: 'none',
    '&:focus': {
      outline: 0,
    },

    backgroundColor: '#4C51F3',
    color: '#fff',
    transition: theme.transition('background-color'),
    boxShadow: '0px 4px 10px rgba(28, 33, 184, 0.2)',
    '&:hover, &$hover': {
      backgroundColor: '#4449DB',
      boxShadow: '0px 4px 15px rgba(28, 33, 184, 0.4)',
    },
    '&:active, &$active, &$loading': {
      backgroundColor: '#3D41C2',
      boxShadow: '0px 4px 5px rgba(28, 33, 184, 0.1)',
    },
    '&$disabled': {
      backgroundColor: 'rgba(37,43,67,0.04)',
      color: 'rgba(37, 43, 67, 0.2)',
      boxShadow: 'none',
    },
  },
  hover: {},
  active: {},
  disabled: {
    cursor: 'auto',
    pointerEvents: 'none',
  },

  label: {
    textAlign: 'center',
    flexGrow: 1,
  },

  icon: {
    position: 'absolute',
    width: 26,
    height: 26,
    left: 20,
    top: '50%',
    transform: 'translateY(-50%)',
  },

  loading: {
    pointerEvents: 'none',
    '& > *:not($spinner)': {
      visibility: 'collapse',
    },
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: '#fff',
  },
})
