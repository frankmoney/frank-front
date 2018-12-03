export default theme => ({
  storyPage: {
    backgroundColor: 'white',
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 110,
    paddingBottom: 100,
  },
  container: {
    width: 850,
  },
  prelude: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 80,
    padding: [0, 40],
  },
  title: {
    ...theme.fontSemibold(50, 54),
    wordBreak: 'break-word',
    color: '#252B43',
    marginBottom: 20,
    textDecoration: 'none',
  },
  stats: {
    marginLeft: -2,
    marginBottom: 30,
  },
  share: {
    height: 40,
  },
  imageContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 70,
  },
  coverImage: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  text: {
    padding: [0, 40],
    marginBottom: 50,
    ...theme.fontRegular(20, 35),
    wordBreak: 'break-word',
    fontFamily: 'inherit',
    color: 'rgba(37, 43, 67, 0.8)',
    textDecoration: 'none',
    whiteSpace: 'pre-line',
  },
  payments: {
    margin: [0, 40],
  },
})
