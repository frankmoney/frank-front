export default theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: [1, 0, 0],
    justifyContent: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    display: 'flex',
    flex: [0, 0, 'auto'],
    justifyContent: 'center',
    marginRight: '7%',
  },
  categoryTypeSelect: {
    paddingTop: 2,
    position: 'absolute',
    whiteSpace: 'nowrap',
  },
  legend: {
    cursor: 'default',
    flex: [0, 0, 'auto'],
    left: -12,
    position: 'relative',
  },
  legendItem: {
    cursor: 'pointer',
    '&:not(:last-child)': {
      paddingBottom: 5,
    },
  },
  legendIcon: {
    flexShrink: 0,
    marginRight: 13,
  },
  legendItemName: {
    ...theme.fontMedium(22, 26),
  },
  legendItemValue: {
    ...theme.fontRegular(22, 26),
  },
  highlightedLegend: {
    '& > $legendItem': {
      opacity: 0.4,
    },
    '& > $activeLegendItem': {
      opacity: 1,
    },
  },
  activeLegendItem: {},
})
