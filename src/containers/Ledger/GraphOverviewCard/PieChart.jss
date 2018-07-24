export default theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: [0, 30],
    position: 'relative',
  },
  switcherRoot: {
    position: 'absolute',
    top: 0,
    width: 350,
  },
  switcher: {
    ...theme.fontRegular(18, 22),
    alignItems: 'center',
    left: '50%',
    position: 'absolute',
    top: 166,
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
  },
  input: {
    ...theme.fontMedium(18, 22),
    margin: 0,
    padding: [0, 18, 0, 0],
    minHeight: 'auto',
  },
  legend: {
    margin: [-4, 0, 0, 60],
  },
  legendItem: {
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
})
