export default theme => ({
  root: {
    position: 'relative',
  },
  item: {
    cursor: 'pointer',
  },
  nonclickableItem: {
    cursor: 'default',
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
})
