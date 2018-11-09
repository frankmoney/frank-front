export default theme => ({
  root: {
    padding: [35, 30, 30],
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'space-between',
    marginBottom: 61,
  },
  amount: {
    ...theme.fontRegular(30),
  },
  postedOn: {
    ...theme.fontRegular(18, 20),
    color: '#D2D4DB',
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
    backgroundColor: 'black',
    marginTop: 50,
  },
})
