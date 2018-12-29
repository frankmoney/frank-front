export default {
  root: {
    position: 'relative',
    left: 0,
    bottom: 0,
    top: 0,
    width: props => props.width,
    height: '100%',
    backgroundColor: '#F3F3F3',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    padding: [25, 0, 36, 25],
    backgroundColor: '#FFF',
    // позиция лого должна сочетаться с FixedHeader для пиксель перфекта
    height: 78,
    marginBottom: 1,
  },
  menuWrap: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginBottom: 52,
  },
  menuGroup: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 50,
    '& > :last-child': {
      boxShadow:
        '0px 1px 0px rgba(32, 40, 74, 0.08), 0px 2px 1px rgba(32, 40, 74, 0.05)',
    },
  },
  menuGroupWrapper: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
  },
  menuGroupContentWrap: {
    zIndex: 2,
    overflowY: 'auto',
    maxHeight: '100%',
    width: '100%',

    '&::-webkit-scrollbar': {
      background: 'transparent',
      width: 0,
    },
  },
  overflowGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 78,
    background:
      'linear-gradient(rgba(243, 243, 243, 0) 0%, rgba(243, 243, 243, 1) 100%)',
    zIndex: 5,
    pointerEvents: 'none',
  },
  menuGlobal: {
    padding: [28, 0],
    flexGrow: 0,
    flexShrink: 0,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  hasDelimiter: {
    boxShadow: '0 0 0 1px rgba(229, 229, 229, 1)',
  },
}
