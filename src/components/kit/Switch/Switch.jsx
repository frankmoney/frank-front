/* eslint-disable jsx-a11y/label-has-for */
// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import Color from 'color-js'
import SwitchBase from 'components/kit/SwitchBase'

const getBarColor = ({ color, checked, hovered, parentHovered }) =>
  checked || hovered || parentHovered
    ? Color(color).setAlpha(parentHovered && !hovered && !checked ? 0.2 : 1)
    : 'rgba(0,0,0,0.15)'

const getRailsColor = ({ color, checked, parentHovered, hovered }) =>
  checked || hovered || parentHovered
    ? Color(color).setAlpha(0.1)
    : 'rgba(0,0,0,0.05)'

const WIDTH = 40
const HEIGHT = 20
const BORDER_RADIUS = 23
const BAR_WIDTH = 25

const styles = theme => ({
  root: {
    width: WIDTH,
    height: HEIGHT,
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    display: 'inline-block',
    '&:hover': {
      '& $bar': {
        backgroundColor: props =>
          getBarColor({ ...props, hovered: true, theme }),
      },
      '& $rail': {
        backgroundColor: props =>
          getRailsColor({ ...props, hovered: true, theme }),
      },
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
    boxShadow: props =>
      props.checked ? '0px 2px 5px rgba(0, 0, 0, 0.2)' : 'none',
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

type Props = {
  name?: string,
  color?: string,
  onChange?: Function,
  checked?: boolean,
  defaultChecked?: boolean,
  disabled?: boolean,
  parentHovered?: boolean,
  inputRef: ?Function,
  inputProps: {},
}

let SwitchUncontrolled = ({
  classes,
  className,
  inputRef,
  name,
  checked,
  disabled,
  inputProps,
  onToggle,
}) => (
  <label className={cx(classes.root, className)}>
    <div className={classes.bar} />
    <div className={classes.rail} />
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={!disabled && onToggle}
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

export default class Switch extends React.Component<Props> {
  render() {
    const { checked, defaultChecked, onChange, ...props } = this.props
    return (
      <SwitchBase on={checked} defaultOn={defaultChecked} onToggle={onChange}>
        {({ on, toggle }) => (
          <SwitchUncontrolled checked={on} onToggle={toggle} {...props} />
        )}
      </SwitchBase>
    )
  }
}
