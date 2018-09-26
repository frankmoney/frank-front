const itemHeight = 54

export default theme => ({
  bottomMenu: {
    position: 'relative',
    flexShrink: 0,
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.SidebarBottomMenu.backgroundColor,
    color: theme.SidebarBottomMenu.color,
    transition: props =>
      props.isOpened ? 'all .15s ease-out' : 'all .15s ease-in',
    height: props =>
      props.isOpened ? itemHeight * props.itemsCount : itemHeight,
    overflow: 'hidden',
    willChange: 'height',
  },
  bottomMenuWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  bottomMenuIcon: {
    position: 'absolute',
    top: 15,
    right: 16,
    flexShrink: 0,
    transition: 'transform .15s ease',
    transform: props =>
      props.isOpened ? 'translate3d(0,0,0)' : 'rotateX(180deg)',
  },
})
