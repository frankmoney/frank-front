import { applyColors } from './styles.jss'

export default theme => ({
  root: {
    background: 'none',
    border: 'none',
    borderRadius: '50%',
    boxShadow: 'none',
    cursor: 'pointer',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    padding: 0,
    textDecoration: 'none',
    userSelect: 'none',
    '&:focus': {
      outline: 0,
    },
  },
  hover: {},
  active: {},
  disabled: {
    cursor: 'auto',
    pointerEvents: 'none',
  },

  ...applyColors(theme),

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

  counter: {
    marginLeft: 12,
    marginTop: -1,
  },
})
