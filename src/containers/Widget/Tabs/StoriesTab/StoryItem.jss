import { maxLines } from '@frankmoney/ui'

export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    textDecoration: 'none',
    width: '100%',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  textContainer: {
    position: 'relative',
    width: 'inherit',
  },
  title: {
    wordBreak: 'break-word',
  },
  statsRoot: {
    alignItems: 'center',
  },
  statsSymbol: {
    fontSize: '1.375em',
    marginRight: 2,
  },
  statsCounter: {
    marginRight: 12,
  },
  text: {
    ...theme.fontRegular(16, 24),
    fontFamily: 'inherit',
    color: 'rgba(37, 43, 67, 0.5)',
    ...maxLines(3, 24),
  },
})
