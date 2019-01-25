export default theme => ({
  paper: {
    display: 'flex',
    padding: [30, 30],
    minHeight: 252,
    overflow: 'visible',
  },
  leftColumn: {
    position: 'relative',
    width: 520,
  },
  rightColumn: {
    position: 'relative',
    width: 270,
  },
  name: {
    width: 420,
    ...theme.fontSemibold(40, 46),
    marginBottom: 98,
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    ...theme.fontRegular(18, 26),
    position: 'absolute',
    bottom: 4,
  },
  statsColumn: {
    ...theme.fontRegular(20, 26),
    '&:not(:first-child)': {
      marginLeft: 25,
      paddingLeft: 15,
      borderLeft: '1px solid rgba(37, 43, 67, 0.3)',
    },
  },
  statsLabel: {
    ...theme.fontRegular(18, 26),
    color: 'rgba(37, 43, 67, 0.3)',
    paddingBottom: 2,
  },
  lastDate: {
    ...theme.fontRegular(18, 26),
    position: 'absolute',
    bottom: 0,
  },
  lastDateLabel: {
    color: 'rgba(37, 43, 67, 0.3)',
  },
})
