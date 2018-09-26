export default theme => ({
  accountItem: {
    position: 'relative',
    flex: ({ compact }) => (compact ? 'row' : 'column'),
    backgroundColor: '#FFF',
    color: ({ compact }) => (compact ? '#C7C9D1' : theme.colors.black),
    marginBottom: 1,
    paddingBottom: ({ compact }) => (compact ? 0 : 29),
  },
  labelCompact: {
    padding: [21, 20, 21, 25],
    ...theme.fontMedium(16, 19),
  },
  labelBig: {
    padding: [22, 25, 38, 25],
    ...theme.fontMedium(20, 24),
  },
  icon: {
    position: 'absolute',
    right: 20,
    top: 25,
  },
})
