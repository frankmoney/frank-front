export default theme => ({
  root: {
    padding: [50, 50],
    //  чтобы саджесты вываливались из карточки
    overflow: 'unset',
  },
  header: {
    alignItems: 'baseline',
    display: 'flex',
    marginBottom: 35,
    ...theme.fontRegular(22),
  },
  createdAt: {
    flex: 1,
    lineHeight: 36,
    color: 'rgba(37, 43, 67, 0.3)',
  },
  createdAtLabel: {
    color: 'rgba(37, 43, 67, 0.3)',
    marginLeft: 20,
    ...theme.fontRegular(22, 36),
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
    marginBottom: 43,
    maxWidth: 620,
  },
  bankLogo: {
    borderRadius: 5,
  },
  bankDescription: {
    marginTop: 1,
  },
  status: {
    margin: [-1, 0, 0, 10],
  },

  body: {},
  bodyRow: {
    display: 'flex',
    '&:first-child': {
      marginBottom: 28,
    },
  },
  field: {
    display: 'block',
    width: '100%',
  },
  recipient: {
    position: 'relative',
    width: 365,
    marginRight: 40,
  },
  category: {
    fontWeight: 500,
    flex: 1,
  },
  description: {
    position: 'relative',
    flex: 'auto',
  },
  footer: {
    paddingTop: 60,
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
    '& $amount': {
      marginRight: 18,
    },
    '& $bank': {
      marginBottom: 0,
    },
  },
})
