// @flow
import React from 'react'
import cx from 'classnames'
import { type OnChangeCb } from 'components/kit/SwitchBase'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import styles from './Switch.jss'

type ControlProps = {|
  checked?: boolean,
  disabled?: boolean,
|}

export type StylingProps = {|
  ...ControlProps,
  color?: string,
  focus?: boolean,
  hover?: boolean,
  parentHover?: boolean,
|}

type Props = {|
  ...InjectStylesProps,
  ...StylingProps,
  //
  autoFocus?: boolean,
  controlRef?: ?Function,
  defaultChecked?: boolean,
  inputProps?: Object,
  label?: string,
  larger?: boolean,
  name?: string,
  style?: {},
  onBlur?: FocusEvent => void,
  onChange?: OnChangeCb,
  onFocus?: FocusEvent => void,
|}

export type SwitchUncontrolledProps = Props

class SwitchUncontrolled extends React.Component<Props> {
  static defaultProps = {
    color: '#21CB61',
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.control.focus()
    }
  }

  handleControlRef = ref => {
    this.control = ref
    if (this.props.controlRef) {
      this.props.controlRef(ref)
    }
  }

  render() {
    const {
      checked,
      classes,
      className,
      style,
      disabled,
      focus,
      larger,
      hover,
      inputProps,
      name,
      label,
      onChange,
      onFocus,
      onBlur,
    } = this.props

    // TODO prop falling to root element

    return (
      <label
        className={cx(
          classes.root,
          {
            [classes.checked]: checked,
            [classes.hover]: hover,
            [classes.disabled]: disabled,
            [classes.focus]: focus,
            [classes.larger]: larger,
          },
          className
        )}
        style={style}
      >
        <div className={classes.bar} />
        <div className={classes.rail} />
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={disabled ? undefined : onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={classes.input}
          disabled={disabled}
          ref={this.handleControlRef}
          {...inputProps}
        />
        {label && <span className={classes.label}>{label}</span>}
      </label>
    )
  }
}

export default injectStyles(styles)(SwitchUncontrolled)
