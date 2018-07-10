const CLOSE_ICON_SIZE = 20

export default theme => ({
  title: {
    ...theme.fontMedium(26, 34),
  },
  titleText: {
    marginRight: 40,
  },
  maximizeButton: {
    width: CLOSE_ICON_SIZE,
    height: CLOSE_ICON_SIZE,
    position: 'absolute',
    right: CLOSE_ICON_SIZE,
    top: 14,
    cursor: 'pointer',
    color: '#D8D8D8',
    '&:hover': {
      color: '#000',
    },
  },
  closeIcon: {
    width: CLOSE_ICON_SIZE,
    height: CLOSE_ICON_SIZE,
  },
})
