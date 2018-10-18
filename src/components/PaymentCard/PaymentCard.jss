export default theme => ({
  root: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    display: 'flex',
    position: 'relative',
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 44,
  },
  bankIcon: {
    minWidth: 38,
    minHeight: 38,
    marginRight: 16,
    backgroundColor: 'red',
    borderRadius: 5,
    overflow: 'hidden',
  },
  bankDescription: {
    ...theme.fontRegular(13, 20),
    color: theme.colors.black,
  },
  bankDescriptionAccent: {
    fontWeight: 500,
    opacity: 0.6,
  },
  bankDescriptionText: {
    textTransform: 'uppercase',
    opacity: 0.4,
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
    ...theme.fontMedium(22, 30),
    marginRight: 20,
  },
  category: {
    display: 'table-cell',
    width: '50%',
    paddingLeft: 20,
  },
  categorySelect: {
    height: 'auto',
    ...theme.fontMedium(22, 26),
  },
  description: {
    flex: 'auto',
    ...theme.fontRegular(22, 26),
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
