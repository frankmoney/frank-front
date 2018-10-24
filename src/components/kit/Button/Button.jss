import { applyColors } from './styles.jss'

const PADDING = 15

export default theme => ({
  root: {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    borderRadius: 5,
    boxShadow: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    ...theme.fontMedium(16, 36),
    height: 50,
    padding: [0, PADDING],
    paddingLeft: props => (props.icon ? 50 : PADDING),
    position: 'relative',
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

  label: {
    textAlign: 'center',
    flexGrow: 1,
  },

  icon: {
    position: 'absolute',
    width: 20,
    height: 20,
    left: PADDING,
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

  counter: {
    marginLeft: 10,
    flexShrink: 0,
  },
})
