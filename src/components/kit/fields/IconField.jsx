// @flow strict-local
import * as React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import chainCallbacks from 'utils/dom/chainCallbacks'
import Icon from './Icon'
import ValidationLabel from './ValidationLabel'
import FieldContext from './FieldContext'
import styles from './IconField.jss'

type Value = any // flowlint-line unclear-type:off

type OnChangeCb = (?Value) => void

type ControlElementProps = {
  disabled?: boolean,
  onBlur: FocusEvent => void,
  onChange: OnChangeCb,
  onFocus: FocusEvent => void,
  placeholder?: string,
  value?: Value,
}

type ControlElement = React.ComponentType<ControlElementProps>

type Props = {|
  ...InjectStylesProps,
  //
  children?: React.Element<ControlElement>,
  defaultValue?: Value,
  disabled?: boolean,
  error?: boolean | string,
  hint?: string,
  icon?: React.Element,
  larger?: boolean,
  placeholder?: string,
  // Контрол пытается занять всю доступную ширину
  stretch?: boolean,
  // Uncontrolled/Controlled value
  value?: ?Value,
  onChange?: OnChangeCb,
  // Uncontrolled/Controlled focus
  focus?: boolean,
  onBlur?: FocusEvent => void,
  onFocus?: FocusEvent => void,
  onKeyDown?: KeyboardEvent => void,
  onKeyPress?: KeyboardEvent => void,
  onKeyUp?: KeyboardEvent => void,
  controlRef?: Function,
|}

type State = {|
  focus?: boolean,
  value?: Value,
|}

export type IconFieldProps = Props

class IconField extends React.Component<Props, State> {
  static defaultProps = {}

  state = {
    focus: this.props.focus,
    value: this.props.defaultValue,
  }

  getState = (state = this.state) => ({
    focus: this.isControlledFocus ? this.props.focus : state.focus,
    value: this.getValue(state),
    invalid: !!this.props.error,
    disabled: this.props.disabled,
    loading: this.props.loading,
  })

  // flowlint-next-line unsafe-getters-setters:off
  get isControlledFocus() {
    return typeof this.props.focus !== 'undefined'
  }

  // flowlint-next-line unsafe-getters-setters:off
  get isControlledValue() {
    return typeof this.props.value !== 'undefined'
  }

  getValue = (state = this.state) =>
    this.isControlledValue ? this.props.value : state.value

  handleFocus = (event: FocusEvent) => {
    if (!this.isControlledFocus) {
      this.setState({ focus: true }, () => {
        if (typeof this.props.onFocus === 'function') {
          this.props.onFocus(event)
        }
      })
    } else if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event)
    }
  }

  handleBlur = event => {
    if (!this.isControlledFocus) {
      this.setState({ focus: false }, () => {
        if (typeof this.props.onBlur === 'function') {
          this.props.onBlur(event)
        }
      })
    } else if (typeof this.props.onBlur === 'function') {
      this.props.onBlur(event)
    }
  }

  handleControlRef = control => {
    this.control = control
  }

  handleChange = eventOrValue => {
    if (!this.isControlledValue) {
      const value =
        eventOrValue && eventOrValue.target
          ? eventOrValue.target.value
          : eventOrValue

      this.setState({ value }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(eventOrValue)
        }
      })
    } else if (typeof this.props.onChange === 'function') {
      this.props.onChange(eventOrValue)
    }
  }

  render() {
    const {
      children,
      classes,
      className,
      disabled,
      error,
      hint,
      icon: IconComponent,
      larger,
      placeholder,
      stretch,
      style,
      autoFocus,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      controlRef,
    } = this.props

    const control = React.Children.only(children)

    const combinedState = this.getState()
    const { focus, invalid, filled, value, hasAdornment } = combinedState
    const hidePlaceholder = filled

    return (
      <FieldContext.Provider value={combinedState}>
        <div
          className={cx(
            classes.root,
            {
              [classes.stretch]: stretch,
              [classes.larger]: larger,
              [classes.focus]: focus,
              [classes.filled]: filled,
              [classes.disabled]: disabled,
            },
            className
          )}
          style={style}
        >
          {(error || hint) && (
            <ValidationLabel invalid={invalid} className={classes.rightLabel}>
              {error || hint}
            </ValidationLabel>
          )}
          <Icon className={classes.icon}>
            <IconComponent />
          </Icon>
          {React.cloneElement(control, {
            value,
            focus,
            autoFocus,
            className: classes.control,
            placeholder: hidePlaceholder ? null : placeholder,
            controlRef,
            ref: this.handleControlRef,
            onFocus: chainCallbacks(this.handleFocus, control.props.onFocus),
            onBlur: chainCallbacks(this.handleBlur, control.props.onBlur),
            onKeyUp: chainCallbacks(onKeyUp, control.props.onKeyUp),
            onKeyDown: chainCallbacks(onKeyDown, control.props.onKeyDown),
            onKeyPress: chainCallbacks(onKeyPress, control.props.onKeyPress),
            onChange: chainCallbacks(this.handleChange, control.props.onChange),
            disabled,
          })}
        </div>
      </FieldContext.Provider>
    )
  }
}

export default injectStyles(styles)(IconField)
