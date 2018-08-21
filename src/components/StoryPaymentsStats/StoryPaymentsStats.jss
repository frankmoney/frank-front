export default theme => ({
  container: {
    ...theme.fontRegular(20, 30),
    color: '#252B43',
  },
  symbol: {
    ...theme.fontMedium(21, 21),
    marginRight: 12,
  },
  counter: {
    fontWeight: 500,
    marginRight: 12,
  },
  dateRange: {
    color: 'rgba(37, 43, 67, 0.3)',
  },
})
