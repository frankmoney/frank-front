export default theme => ({
  root: {
    padding: ({ paperPadding }) => paperPadding,
    color: theme.colors.black,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  headLeft: {
    opacity: 0.3,
    ...theme.fontRegular(20, 26),
  },
  headRight: {
    textAlign: 'right',
  },
  amount: {
    ...theme.fontRegular(30),
  },
  postedOn: {
    marginTop: 8,
    ...theme.fontRegular(16, 20),
    opacity: 0.2,
  },
  peer: {
    ...theme.fontMedium(20, 36),
    '& + $description': {
      marginTop: 6,
    },
    '& + $categoryItem': {
      marginTop: 8,
    },
  },
  description: {
    ...theme.fontRegular(20, 26),
    marginBottom: 18,
  },
  categoryItem: {
    ...theme.fontMedium(20, 26),
  },
  categoryIcon: {
    marginRight: 13,
  },
  bank: {
    minHeight: 38,
    marginTop: 50,
  },
})
