const CARD_PADDING = 30

export default {
  root: {
    padding: [30, CARD_PADDING, 0],
    paddingBottom: props => (props.barsOnly ? 30 : 0),
  },
  header: {
    marginBottom: 39,
  },
  chart: {
    flex: 1,
    width: 350,
    margin: [0, 60, 0, 30],
  },
  bottomRow: {
    margin: [60, -CARD_PADDING, 0],
    borderTop: '1px solid rgba(0,0,0,0.1)',
    padding: [0, CARD_PADDING, CARD_PADDING],
  },
  barChart: {
    margin: [26, 0, 10],
  },
}
