export default theme => ({
  root: {
    position: 'relative',
    ...theme.fontRegular(22, 26),
  },
  item: {
    cursor: ({ inheritCursor }) => (inheritCursor ? undefined : 'pointer'),
  },
  nonclickableItem: {
    cursor: ({ inheritCursor }) => (inheritCursor ? undefined : 'default'),
  },
  icon: {
    marginRight: 13,
  },
  name: {
    fontWeight: 500,
  },
  value: {},
  highlighted: {
    '& > $item $icon': {
      opacity: 0.4,
    },
    '& > $active $icon': {
      opacity: 1,
    },
  },
  active: {},
})
