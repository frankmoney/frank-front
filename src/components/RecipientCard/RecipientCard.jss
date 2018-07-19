export default theme => ({
  paper: {
    display: 'flex',
    padding: [30, 30],
    minHeight: 252,
  },
  leftColumn: {
    position: 'relative',
    width: 520,
  },
  rightColumn: {
    position: 'relative',
  },
  name: {
    ...theme.fontSemibold(40, 46),
    paddingBottom: 44,
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
  list: {
    paddingTop: 8,
  },
  listItem: {},
  listItemName: {
    ...theme.fontMedium(18, 28),
  },
  listItemCounter: {
    ...theme.fontRegular(18, 28),
  },
  listTooltipItem: {
    display: 'flex',
    '&:not(:first-child)': {
      marginTop: 12,
    },
  },
  listTooltipItemName: {
    flex: [1, 1],
    paddingRight: 40,
    ...theme.fontMedium(14, 16),
  },
  listTooltipItemCounter: {
    flex: [1, 1],
    textAlign: 'right',
    ...theme.fontMedium(14, 16),
    color: 'black !important',
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
