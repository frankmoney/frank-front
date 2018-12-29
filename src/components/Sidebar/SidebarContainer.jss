import zIndex from 'styles/zIndex'

export const TOGGLE_DURATION = 450

const getPosition = props => (props.isFixed ? 'fixed' : 'absolute')

export default {
  root: {},
  backdrop: {
    position: getPosition,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    top: 0,
    left: 0,
    zIndex: zIndex.sidebar - 1,
    outline: 'none',
  },
  content: {
    position: 'relative',
    minHeight: '100vh',
    transition: `all ${TOGGLE_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1) 0ms`,
    marginLeft: ({ overlayOn, open, width: panelWidth, minContentWidth }) => {
      const actualSidebarWidth = !open ? 0 : panelWidth

      return open && overlayOn
        ? `calc(100% - ${minContentWidth}px)`
        : actualSidebarWidth
    },
  },
  panel: {
    zIndex: zIndex.sidebar,
    position: getPosition,
    boxShadow: ({ open, overlayOn }) =>
      open && overlayOn ? '0 0 20px 0 rgba(0,0,0,0.20)' : null,
    transform: props =>
      props.open ? 'translateX(0px)' : `translateX(-${props.width}px)`,
    transition: `all ${TOGGLE_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1) 0ms`,
  },
}
