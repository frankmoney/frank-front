import { BORDER_RADIUS, BUTTON_HEIGHT } from './constants'

const normalize = {
  boxSizing: 'border-box',
}

const normalizeFonts = {
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',
  'text-rendering': 'optimizeLegibility',
}

const styles = {
  root: {
    position: 'fixed',
    height: BUTTON_HEIGHT,
    willChange: 'width',
    overflow: 'hidden',
    transform: 'translate3d(0, 0, 0)',
    borderRadius: BORDER_RADIUS,
    zIndex: props => props.zIndex,
    '&:not($mobile)': {
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
      transition: 'all 0.2s',
      width: props => props.shrinkWidth,
      left: props =>
        props.position === 'left' ? props.horizontalOffset : 'auto',
      right: props =>
        props.position === 'right' ? props.horizontalOffset : 'auto',
      bottom: props => props.verticalOffset,
      '&$open': {
        width: props => props.width,
      },
    },
    ...normalizeFonts,
    '& *': {
      ...normalize,
    },
  },
  mobile: {
    left: 10,
    right: 10,
    bottom: 10,
  },
  open: {
    '&:not($mobile)': {
      height: props =>
        Math.min(
          props.maxHeight,
          props.screenHeight - props.verticalOffset * 2
        ),
    },
    '&$mobile': {
      borderRadius: 0,
      height: '100%',
      left: 0,
      right: 0,
      bottom: 0,
      '& $popup': {
        borderRadius: 0,
      },
    },
  },
  expander: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    height: BUTTON_HEIGHT,
    '$open$mobile &': {
      borderRadius: 0,
    },
    '$open:not($mobile) &': {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    },
  },
  popup: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    background: '#fff',
    top: 0,
    bottom: BUTTON_HEIGHT,
    padding: [0, 18],
    '$root:not($mobile) &': {
      width: props => props.width,
      backfaceVisibility: 'hidden',
      transform: 'translate3d(0, 0, 0)',
    },
    '$mobile &': {
      width: '100%',
      height: '100%',
    },
  },
  popupContent: {
    height: '100%',
  },
}

export default styles
