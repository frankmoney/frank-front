// @flow
import * as React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import chainCallbacks from 'utils/dom/chainCallbacks'
import Label from './Label'
import Placeholder from './Placeholder'
import Underline from './Underline'
import FieldContext from './FieldContext'
import styles from './LeftField.jss'

type Value = any

type Props = {|
  ...InjectStylesProps,
  //
  children?: React.Element<any>,
  disabled?: boolean,
  error?: string,
  focus?: boolean,
  label?: string,
  onChange?: Value => void,
  onBlur?: FocusEvent => void,
  onFocus?: FocusEvent => void,
  placeholder?: string,
  stretch?: boolean,
|}

type State = {|
  focus?: boolean,
  filled?: boolean,
  value?: Value,
|}

class LeftField extends React.Component<Props, State> {
  state = {
    focus: this.props.focus,
    filled: !!this.props.defaultValue,
    value: this.props.defaultValue,
  }

  componentDidUpdate() {
    if (this.isControlledValue) {
      const filled = !!this.props.value
      if (this.state.filled !== filled) {
        this.setState({ filled })
      }
    }
  }

  getState = (state = this.state) => ({
    focus: this.isControlledFocus ? this.props.focus : state.focus,
    value: this.isControlledValue ? this.props.value : state.value,
    disabled: this.props.disabled,
    filled: this.state.filled,
  })

  get isControlledFocus() {
    return typeof this.props.focus !== 'undefined'
  }

  get isControlledValue() {
    return typeof this.props.value !== 'undefined'
  }

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
    if (typeof this.props.controlRef === 'function') {
      this.props.controlRef(control)
    }
  }

  handleChange = event => {
    const value = event.target.value

    if (!this.isControlledValue) {
      const filled = !!value
      this.setState({ value, filled }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(event)
        }
      })
    } else if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  }

  handlePlaceholderClick = () => {
    this.control.focus()
  }

  render() {
    const {
      children,
      classes,
      className,
      disabled,
      label,
      placeholder,
      stretch,
      onFocus,
      onChange,
      onBlur,
      ...otherProps
    } = this.props

    const control = React.Children.only(children)

    const { focus, filled, value } = this.getState()

    return (
      <FieldContext.Provider value={this.getState()}>
        <div
          className={cx(
            classes.root,
            {
              [classes.stretch]: stretch,
              [classes.focus]: focus,
              [classes.filled]: filled,
              [classes.disabled]: disabled,
            },
            className
          )}
          {...otherProps}
        >
          {label && <Label className={classes.label}>{label}</Label>}
          <div className={classes.controlWrap}>
            {React.cloneElement(control, {
              value,
              className: classes.control,
              ref: this.handleControlRef,
              onFocus: chainCallbacks(this.handleFocus, control.props.onFocus),
              onBlur: chainCallbacks(this.handleBlur, control.props.onBlur),
              onChange: chainCallbacks(
                this.handleChange,
                control.props.onChange
              ),
              disabled,
            })}
            {placeholder && (
              <Placeholder
                active={focus}
                className={cx(
                  classes.placeholder,
                  filled && classes.placeholderOff
                )}
              >
                {placeholder}
              </Placeholder>
            )}
            <Underline className={classes.underline} />
          </div>
        </div>
      </FieldContext.Provider>
    )
  }
}

export default injectStyles(styles)(LeftField)
