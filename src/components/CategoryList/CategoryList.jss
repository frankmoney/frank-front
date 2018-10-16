export default theme => ({
  root: {
    position: 'relative',
  },
  item: {
    cursor: 'pointer',
  },
  icon: {
    marginRight: 13,
  },
  name: {
    ...theme.fontMedium(22, 26),
  },
  value: {
    ...theme.fontRegular(22, 26),
  },
  highlighted: {
    '& > $item': {
      opacity: 0.4,
    },
    '& > $active': {
      opacity: 1,
    },
  },
  active: {},
  tooltipItem: {
    alignItems: 'center',
    display: 'flex',
    '&:not(:first-child)': {
      marginTop: 12,
    },
  },
  tooltipIcon: {
    height: 12,
    width: 12,
  },
  tooltipName: {
    flex: [1, 1],
    paddingRight: 40,
    ...theme.fontMedium(14, 16),
    whiteSpace: 'nowrap',
  },
  tooltipValue: {
    flex: [1, 1],
    textAlign: 'right',
    ...theme.fontMedium(14, 16),
    color: 'black !important',
  },
})
