const SPACING = 20
const SIZE = 40

export default theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
  },
  pagesWrap: {
    margin: [0, 5],
    display: 'flex',
  },
  page: {
    color: 'rgba(0,0,0,0.2)',
    borderRadius: '50%',
    width: SIZE,
    height: SIZE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transition('color', 'background-color'),
    ...theme.fontMedium(18),
    '&:not(:last-child)': {
      marginRight: 5,
    },
    '&:not($pageCurrent)': {
      cursor: 'pointer',
      '&:hover': {
        color: '#000',
        backgroundColor: '#fff',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.10)',
      },
    },
  },
  pageCurrent: {
    backgroundColor: '#fff',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.10)',
    cursor: 'default',
  },
  pageNum: {},

  dots: {
    marginRight: SPACING,
    color: 'rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.fontMedium(18),
  },
  navGroup: {
    display: 'flex',
  },
  nav: {
    borderRadius: '50%',
    transition: theme.transition('background-color'),
    // backgroundColor: 'rgba(0,0,0,0.05)',
    width: SIZE,
    height: SIZE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    '&:not(:last-child)': {
      marginRight: 10,
    },
    '&:hover': {
      backgroundColor: '#fff',
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.10)',
      '& $navIcon': {
        color: '#000',
      },
    },
  },
  navIcon: {
    color: 'rgba(0,0,0,0.3)',
    transition: theme.transition('color'),
  },
})
