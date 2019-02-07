export default theme => ({
  root: {
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 110,
    paddingBottom: 100,
  },
  logo: {
    position: 'absolute',
    width: 70,
    top: 30,
    left: 30,
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 90,
    background: 'rgba(255,255,255,0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: [0, 20],
    boxShadow: '0px -1px 0px rgba(37, 43, 67, 0.08)',
  },
  footerButtonWrap: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
  },
  footerText: {
    color: '#20284A',
    opacity: 0.4,
    ...theme.fontRegular(16, 22),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  centered: {
    paddingTop: 0,
    paddingBottom: 0,
    '& $container': {
      justifyContent: 'center',
    },
  },
  disabled: {
    pointerEvents: 'none',
  },
})
