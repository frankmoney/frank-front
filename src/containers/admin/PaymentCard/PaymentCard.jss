export default theme => ({
  root: {
    padding: [40, 40],
    //  чтобы саджесты вываливались из карточки
    overflow: 'unset',
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: 37,
    ...theme.fontRegular(22),
  },
  createdAt: {
    flex: 1,
    display: 'flex',
    alignItems: 'baseline',
    color: 'rgba(37, 43, 67, 0.3)',
  },
  checkbox: {
    marginRight: 20,
  },
  pendingText: {
    color: '#20284A',
    marginRight: 10,
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
  status: {
    marginLeft: 10,
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
    width: '60%',
    marginRight: 40,
  },
  category: {
    fontWeight: 500,
    maxWidth: '40%',
    flexGrow: 0,
    flexShrink: 1,
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

  pending: {
    '& $bank': {
      marginBottom: 0,
    },
  },
})
