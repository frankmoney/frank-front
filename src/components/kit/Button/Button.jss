import { applyColors } from './styles.jss'

const PADDING = 15
const PADDING_LARGE = 33

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
    '&:focus, &$focus': {
      outline: 0,
    },
  },
  compactHeight: {
    height: 40,
  },
  hover: {},
  active: {},
  focus: {},
  disabled: {
    cursor: 'auto',
    pointerEvents: 'none',
  },

  ...applyColors(theme),

  label: {
    textAlign: 'center',
    flexGrow: 1,
    whiteSpace: 'nowrap',
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
  stretch: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
  },

  larger: {
    ...theme.fontMedium(18, 28),
    padding: [0, PADDING_LARGE, 2],
    paddingLeft: props => (props.icon ? 70 : PADDING_LARGE),
  },
})
