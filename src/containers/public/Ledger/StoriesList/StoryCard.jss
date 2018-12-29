import { maxLines } from '@frankmoney/ui'

export default theme => ({
  storyCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    padding: 30,
    textDecoration: 'none',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.06)',
    marginBottom: 35,
  },
  coverImage: {
    width: 300,
    height: 200,
  },
  textContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: 270,
  },
  title: {
    ...theme.fontSemibold(22, 26),
    wordBreak: 'break-word',
    marginBottom: 7,
    textDecoration: 'none',
    transition: theme.transition('color'),
    color: '#252B43',
    '$storyCard:hover &': {
      color: '#484DE7',
    },
    ...maxLines(3, 26),
  },
  stats: {
    ...theme.fontRegular(16, 30),
    fontSize: 16,
    marginBottom: 13,
    alignItems: 'center',
  },
  statsCounter: {
    marginRight: 10,
  },
  statsSymbol: {
    width: 20,
    height: 20,
    margin: [-3, 5, 0, 0],
  },
  statsDate: {
    color: 'rgba(37, 43, 67, 0.5)',
  },
  text: {
    ...theme.fontRegular(16, 24),
    fontFamily: 'inherit',
    color: 'rgba(37, 43, 67, 0.5)',
    textDecoration: 'none',
    ...maxLines(3, 24),
  },
})
