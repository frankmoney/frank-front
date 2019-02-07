import { BUTTON_HEIGHT } from '../constants'

const getLightenColor = color =>
  `linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)), ${color}`

const styles = theme => ({
  root: {
    boxSizing: 'border-box',
    alignItems: 'center',
    background: props => props.color,
    borderRadius: 8,
    bottom: -1,
    display: 'flex',
    height: BUTTON_HEIGHT,
    left: 0,
    paddingLeft: 57,
    position: 'absolute',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color .2s',
    '&:hover': {
      background: props => props.colorHover || getLightenColor(props.color),
      '&:not($expanded) $chartIcon': {
        transform: 'scale(0)',
        opacity: 0,
      },
      '&:not($expanded) $chevronIcon': {
        transform: 'translateY(0px)',
        opacity: 1,
      },
    },
  },
  title: {
    ...theme.fontMedium(16, 20),
    color: '#FFFFFF',
  },
  subtitle: {
    ...theme.fontRegular(14, 20),
    color: 'rgba(255,255,255,0.5)',
    '& strong': {
      fontWeight: 500,
    },
  },
  closeIcon: {
    color: '#fff',
    position: 'absolute',
    right: 20,
    cursor: 'pointer',
    transform: 'scale(.6) rotate(90deg) translateX(12px)',
    transformOrigin: '100% 50%',
    transition: 'transform .3s, opacity .3s',
    opacity: 0,
  },
  leftIcon: {
    position: 'absolute',
    left: 20,
    transition: 'transform .2s, opacity .2s',
  },
  chartIcon: {
    composes: '$leftIcon',
    top: 20,
    color: '#FFFFFF',
  },
  chevronIcon: {
    composes: '$leftIcon',
    color: '#FFFFFF',
    top: 24,
    transform: 'translateY(-10px)',
    opacity: 0,
  },
  expanded: {
    '& $closeIcon': {
      transitionDelay: '.1s',
      transitionDuration: '.2s',
      opacity: 1,
      transform: 'scale(1) rotate(0) translateX(0)',
    },
  },
})

export default styles
