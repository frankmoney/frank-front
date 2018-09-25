export default theme => ({
  storyPreviewPage: {
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
  imageContainer: {
    marginBottom: 36,
  },
  coverImage: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 'inherit',
    padding: [0, 40],
  },
  title: {
    ...theme.fontSemibold(40, 46),
    color: '#252B43',
    marginBottom: 20,
    textDecoration: 'none',
  },
  stats: {
    marginLeft: -2,
  },
  text: {
    margin: [40, 0],
    ...theme.fontRegular(20, 32),
    fontFamily: 'inherit',
    color: 'rgba(37, 43, 67, 0.9)',
    textDecoration: 'none',
    whiteSpace: 'pre-line',
  },
})
