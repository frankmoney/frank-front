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
    transition: theme.transition('box-shadow 0.1s'),
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.03)',
    '&:hover': {
      boxShadow: '0 5px 10px 0px rgba(0,0,0,0.07)',
    },
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
    // padding: [35, 40],
  },
  title: {
    ...theme.fontSemibold(22, 26),
    wordBreak: 'break-word',
    marginBottom: 7,
    textDecoration: 'none',
    transition: theme.transition('color 0.1s'),
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
  text: {
    ...theme.fontRegular(16, 24),
    fontFamily: 'inherit',
    color: 'rgba(37, 43, 67, 0.9)',
    textDecoration: 'none',
    ...maxLines(3, 24),
  },
})
