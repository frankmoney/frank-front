// @flow
import Color from 'color-js'

type ControlProps = {|
  checked?: boolean,
  disabled?: boolean,
|}

export type StylingProps = {|
  ...ControlProps,
  color?: string,
  hover?: boolean,
  focus?: boolean,
  parentHover?: boolean,
|}

const GRAY_RAIL_COLOR = 'rgba(37, 43, 67, 0.08)'
const WIDTH = 40
const HEIGHT = 20
const BORDER_RADIUS = 23
const BAR_WIDTH = 25

const getBarColor = ({
  checked,
  color,
  disabled,
  hover,
  focus,
  parentHover,
}: StylingProps) => {
  const hovered = parentHover || hover || focus
  return disabled
    ? GRAY_RAIL_COLOR
    : checked
      ? hovered
        ? Color(color)
            .darkenByAmount(0.04)
            .saturateByAmount(0.005)
        : color
      : Color(GRAY_RAIL_COLOR).setAlpha(hovered ? 0.25 : 0.15)
}

const getRailsColor = ({ checked, color, disabled }: StylingProps) =>
  disabled
    ? GRAY_RAIL_COLOR
    : checked
      ? Color(color).setAlpha(0.1)
      : GRAY_RAIL_COLOR

const styles = theme => ({
  root: {
    height: HEIGHT,
    paddingLeft: WIDTH,
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    '&:hover, $hover': {
      '& $bar': {
        backgroundColor: props => getBarColor({ ...props, hover: true }),
      },
      '& $rail': {
        backgroundColor: props => getRailsColor({ ...props, hover: true }),
      },
      '& $label': {
        color: 'rgba(37, 43, 67, 0.8)',
      },
    },
  },
  checked: {
    '& > $bar': {
      boxShadow: props =>
        props.disabled ? 'none' : '0px 2px 5px rgba(0, 0, 0, 0.2)',
    },
  },
  hover: {},
  focus: {
    '& $bar': {
      backgroundColor: props => getBarColor({ ...props, focus: true }),
    },
    '& $rail': {
      backgroundColor: props => getRailsColor({ ...props, focus: true }),
    },
    '& $label': {
      color: 'rgba(37, 43, 67, 0.8)',
    },
  },
  disabled: {
    cursor: 'default',
    pointerEvents: 'none',
    '& $label': {
      color: 'rgba(37, 43, 67, 0.2)',
    },
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: BORDER_RADIUS,
    width: BAR_WIDTH,
    height: HEIGHT,
    backgroundColor: props => getBarColor({ ...props, theme }),
    transform: props =>
      props.checked ? `translateX(${WIDTH - BAR_WIDTH}px)` : 'translateX(0)',
    transition: theme.transition('all'),
  },
  rail: {
    position: 'absolute',
    top: 0,
    left: 0,
    transition: theme.transition('color'),
    backgroundColor: props => getRailsColor({ ...props, theme }),
    borderRadius: BORDER_RADIUS,
    width: WIDTH,
    height: HEIGHT,
  },
  input: {
    cursor: 'inherit',
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
  },
  label: {
    marginLeft: 20,
    ...theme.fontMedium(18, HEIGHT),
    color: 'rgba(37, 43, 67, 0.6)',
    transition: theme.transition('color'),
  },
  larger: {
    '& $label': {
      fontSize: 20,
    },
  },
})

export default styles
