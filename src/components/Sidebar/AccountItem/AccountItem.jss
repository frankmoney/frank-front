export default theme => ({
  accountItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: ({ compact }) => (compact ? 'row' : 'column'),
    alignItems: ({ compact }) => (compact ? 'center' : 'unset'),
    backgroundColor: '#FFF',
    cursor: ({ compact }) => (compact ? 'pointer' : 'auto'),
    color: ({ compact }) =>
      compact ? 'rgba(32,40,74,0.5)' : 'rgba(32,40,74,0.8)',
    userSelect: 'none',
    marginBottom: 1,
    paddingBottom: ({ compact }) => (compact ? 0 : 29),
  },
  private: {
    padding: [0, 25, 37],
    marginTop: -30,
    ...theme.fontRegular(14, 17),
    color: '#A6A9B7',
  },
  labelCompact: {
    padding: [21, 20, 21, 25],
    ...theme.fontMedium(16, 19),
    flex: 1,
    wordBreak: 'break-word',
  },
  labelBig: {
    padding: [22, 25, 38, 25],
    ...theme.fontMedium(20, 24),
    wordBreak: 'break-word',
  },
  icon: {
    marginRight: 20,
  },
})
