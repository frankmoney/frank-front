export default theme => ({
  container: {
    ...theme.fontRegular(20, 30),
    color: '#252B43',
    display: 'flex',
  },
  symbol: {
    fontSize: '1.3em',
    marginRight: 8,
  },
  counter: {
    fontWeight: 500,
    marginRight: 20,
  },
  dateRange: {
    opacity: 0.5,
  },
})
