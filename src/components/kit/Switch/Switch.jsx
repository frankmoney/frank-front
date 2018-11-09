// @flow
import React from 'react'
import cx from 'classnames'
import Color from 'color-js'
import SwitchBase, { type OnChangeCb } from 'components/kit/SwitchBase'
import { injectStyles, type InjectStylesProps } from 'utils/styles'

type FlagProps = {|
  checked?: boolean,
  disabled?: boolean,
|}

type StylingProps = {|
  ...FlagProps,
  color?: string,
  hover?: boolean,
  parentHover?: boolean,
|}

type Props = {|
  ...InjectStylesProps,
  ...StylingProps,
  //
  defaultChecked?: boolean,
  inputProps?: Object,
  inputRef?: ?Function,
  name?: string,
  onChange?: OnChangeCb,
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
  parentHover,
}: StylingProps) => {
  const hovered = parentHover || hover
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
    width: WIDTH,
    height: HEIGHT,
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'inline-block',
    '&:hover, $hover': {
      '& $bar': {
        backgroundColor: props => getBarColor({ ...props, hover: true }),
      },
      '& $rail': {
        backgroundColor: props => getRailsColor({ ...props, hover: true }),
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
  disabled: {
    cursor: 'default',
    pointerEvents: 'none',
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
})

let SwitchUncontrolled = ({
  checked,
  classes,
  className,
  disabled,
  hover,
  inputProps,
  inputRef,
  name,
  onChange,
}: Props) => (
  <label
    className={cx(
      classes.root,
      {
        [classes.checked]: checked,
        [classes.hover]: hover,
        [classes.disabled]: disabled,
      },
      className
    )}
  >
    <div className={classes.bar} />
    <div className={classes.rail} />
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={disabled ? undefined : onChange}
      className={classes.input}
      disabled={disabled}
      ref={inputRef}
      {...inputProps}
    />
  </label>
)

SwitchUncontrolled.defaultProps = {
  color: '#21CB61',
}

SwitchUncontrolled = injectStyles(styles, { inject: ['theme', 'classes'] })(
  SwitchUncontrolled
)

const Switch = ({ checked, defaultChecked, onChange, ...props }: Props) => (
  <SwitchBase on={checked} defaultOn={defaultChecked} onToggle={onChange}>
    {({ on, toggle }) => (
      <SwitchUncontrolled checked={on} onChange={toggle} {...props} />
    )}
  </SwitchBase>
)

export default Switch
