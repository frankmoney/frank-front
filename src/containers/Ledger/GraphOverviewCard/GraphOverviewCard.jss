const CARD_PADDING = 30

export default theme => ({
  card: {
    position: 'relative',
    width: 850,
    height: 580,
    backgroundColor: 'white',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.07)',
    borderRadius: 8,
  },
  cardExpanded: {
    height: 934,
  },
  timeRange: {
    ...theme.fontRegular(22, 22),
    padding: CARD_PADDING,
  },
  graphPieChart: {
    height: 366,
    padding: [10, CARD_PADDING],
    marginBottom: 52,
  },
  bottomRow: {
    width: '100%',
    borderTop: '1px solid rgba(0,0,0,0.1)',
  },
  graphBarChart: {
    userSelect: 'none',
    margin: [-20, 30, 0, 30],
    width: 790,
    height: 341,
  },
})
