export default theme => ({
  root: {
    padding: ({ paperPadding }) => paperPadding,
    color: theme.colors.black,
  },
  head: {
    marginBottom: 35,
  },
  peer: {
    ...theme.fontMedium(20, 26),
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    margin: [12, 0, 0, -1],
  },
  description: {
    ...theme.fontRegular(20, 26),
    marginRight: 22,
  },
  categoryItem: {
    ...theme.fontMedium(20, 26),
  },
  categoryIcon: {
    margin: [-2, 10, 0, 0],
  },
  bank: {
    minHeight: 38,
    marginTop: 50,
  },
  bankLogo: {
    borderRadius: 5,
  },
})
