export default theme => ({
  root: {
    padding: [40, 40],
  },
  header: {
    display: 'flex',
    marginBottom: 37,
    ...theme.fontRegular(22),
  },
  createdAt: {
    flex: 1,
    color: '#20284A',
    opacity: 0.3,
  },
  amount: {
    display: 'flex',
    textAlign: 'right',
    whiteSpace: 'nowrap',
  },
  bank: {
    marginBottom: 44,
    maxWidth: 620,
  },

  body: {},
  bodyRow: {
    display: 'flex',
    '&:first-child': {
      marginBottom: 25,
    },
  },
  field: {
    display: 'block',
    width: '100%',
  },
  recipient: {
    position: 'relative',
    width: 365,
    fontWeight: 500,
    marginRight: 40,
  },
  category: {
    fontWeight: 500,
  },
  description: {
    position: 'relative',
    flex: 'auto',
  },
  footer: {
    paddingTop: 54,
    display: 'flex',
    alignItems: 'center',
    '&:after': {
      content: '" "',
      display: 'table',
      clear: 'both',
    },
  },
  leftButtons: {
    flex: 'auto',
    ...theme.fontMedium(16, 22),
    color: '#BCBFC9',
  },
  rightButtons: {
    display: 'flex',
    whiteSpace: 'nowrap',
  },
  rightButton: {
    '&:not(:first-child)': {
      marginLeft: 10,
    },
  },
})
