export const SNACK_HEIGHT = 50

const SNACK_COLORS = {
  blue: '#484DE7',
  dark: '#252B43',
}

const styles = theme => ({
  root: {
    height: SNACK_HEIGHT,
    width: 460,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
    padding: [0, 15, 0, 20],
    backgroundColor: props => SNACK_COLORS[props.color],
    position: 'fixed',
    bottom: 0,
    left: 0,
    transition:
      'transform 0.1s linear, opacity 0.1s linear, bottom 0.1s linear',
  },
  message: {
    ...theme.fontRegular(14, 22),
    flexGrow: 1,
    color: 'white',
    '& strong': {
      fontWeight: 500,
    },
  },
})

export default styles
