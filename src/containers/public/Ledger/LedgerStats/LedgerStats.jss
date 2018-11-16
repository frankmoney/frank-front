import { maxLines } from '@frankmoney/ui'

export default theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.colors.black,
  },
  title: {
    ...theme.fontSemibold(50, 52),
    marginBottom: 40,
  },
  stats: {
    display: 'flex',
    marginBottom: 40,
  },
  stat: {
    justifyItems: 'center',
    paddingLeft: 30,
    paddingRight: 40,
    '&:not(:last-child)': {
      borderRight: '1px solid rgba(32, 40, 74, 0.07)',
    },
  },
  statLabel: {
    ...theme.fontRegular(16, 28),
    opacity: 0.7,
  },
  statSum: {
    ...theme.fontRegular(20, 24),
  },
  info: {
    width: 660,
    ...theme.fontRegular(20, 35),
    textAlign: 'center',
    marginBottom: 45,
  },
  infoText: {
    opacity: 0.7,
  },
  infoMore: {
    opacity: 0.3,
    cursor: 'hand',
  },
})