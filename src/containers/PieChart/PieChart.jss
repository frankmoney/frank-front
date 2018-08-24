export default theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: 0,
    alignItems: 'center',
  },
  hiddenPeriod: {
    paddingTop: 0,
  },
  periodSelect: {
    position: 'absolute',
    top: 4,
    left: 2,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  chartContainer: {
    height: ({ chartSize }) => chartSize,
    position: 'relative',
    width: ({ chartSize }) => chartSize,
  },
  switcher: {
    left: '50%',
    maxWidth: ({ chartSize }) => chartSize - 30 * 2,
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
  },
  legend: {
    cursor: 'default',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:first-child)': {
      marginTop: 10,
    },
  },
  legendIcon: {
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
    '&:hover > $legendItem, & > $activeLegendItem': {
      opacity: 1,
    },
  },
  activeLegendItem: {},
})
