import { maxLines } from '@frankmoney/ui'

export default theme => ({
  storyCard: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    textDecoration: 'none',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    transition: 'box-shadow 0.1s ease-out',
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.03)',
    '&:hover': {
      boxShadow: '0 5px 10px 0px rgba(0,0,0,0.07)',
    },
    marginBottom: 35,
  },
  textContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: 'inherit',
    padding: [35, 40],
  },
  title: {
    ...theme.fontSemibold(40, 46),
    paddingRight: 130,
    color: '#252B43',
    transition: 'color 0.1s ease-out',
    marginBottom: 15,
    textDecoration: 'none',
    '$storyCard:hover &': {
      color: '#484DE7',
    },
  },
  stats: {
    marginBottom: 15,
  },
  description: {
    ...theme.fontRegular(20, 30),
    fontFamily: 'inherit',
    color: 'rgba(37, 43, 67, 0.9)',
    textDecoration: 'none',
    ...maxLines(3, 30),
  },
  flag: {
    ...theme.fontRegular(18),
    position: 'absolute',
    top: 40,
    right: 40,
    color: '#FF3939',
  },
})
