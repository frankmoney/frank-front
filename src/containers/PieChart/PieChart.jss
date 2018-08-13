export default theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    padding: [0, 30],
    position: 'relative',
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
    margin: [-4, 0, 0, 60],
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
