const itemHeight = 54

export default theme => ({
  bottomMenuItem: {
    outline: 'none',
    height: itemHeight,
    padding: [0, 24],
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.1s linear',
  },
  bottomMenuItemCommon: {
    '&:hover': {
      backgroundColor: '#F7F7F7',
    },
    '& $bottomMenuItemText:after': {
      background: 'none',
    },
  },
  bottomMenuItemDanger: {
    color: 'rgb(254, 24, 24)',
    '&:hover': {
      backgroundColor: 'rgba(254, 24, 24, 0.05)',
    },
    '& $bottomMenuItemText:after': {
      background: 'none',
    },
  },
  bottomMenuItemPrimary: {
    textAlign: 'center',
    color: '#20284A',
    '& $bottomMenuItemText': {
      ...theme.fontMedium(20, 20),
    },
  },
  bottomMenuItemText: {
    ...theme.fontMedium(16, 20),
    flexGrow: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    position: 'relative',
    marginRight: 12,
    top: -1,
    left: 1,
    '&:after': {
      content: ' ',
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: 0,
      width: 38,
      background: 'linear-gradient(to left, white, rgba(255,255,255,0))',
    },
  },
})
