export default theme => ({
  container: {
    ...theme.fontRegular(20, 30),
    color: '#252B43',
    display: 'flex',
  },
  symbol: {
    width: 26,
    height: 26,
    marginRight: 8,
  },
  counter: {
    fontWeight: 500,
    marginRight: 20,
  },
  dateRange: {
    color: 'rgba(37, 43, 67, 0.3)',
  },
})
