export default theme => ({
  root: {
    flexGrow: 0,
    flexShrink: 0,
    display: props => (props.hidden ? 'none' : 'flex'),
    flexWrap: 'nowrap',
    alignItems: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    pointerEvents: props => (props.disabled ? 'none' : 'inherit'),
    padding: '0px 25px',
    ...theme.fontMedium(16, 20),
    color: props => (props.disabled ? 'rgba(32,40,74,0.5)' : '#20284A'),
    '&:hover': {
      color: theme.colors.primary,
    },
    '&:not(:first-child)': {
      marginTop: 10,
    },
  },
  active: {
    color: props =>
      props.disabled ? 'rgba(32,40,74,0.5)' : theme.colors.primary,
    pointerEvents: 'none!important',
  },
  icon: {
    color: props => (props.disabled ? 'rgba(32,40,74,0.5)' : '#20284A'),
    flexShrink: 0,
  },
  iconLeft: {
    composes: '$icon',
    marginRight: 18,
  },
  iconRight: {
    composes: '$icon',
    marginLeft: 5,
  },
  primaryText: {
    marginLeft: 0,
    flexGrow: 1,
  },
  secondaryText: {
    marginLeft: 8,
  },
})
