export default theme => ({
  root: {
    padding: ({ paperPadding }) => paperPadding,
    color: theme.colors.black,
  },
  head: {
    marginBottom: 23,
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
