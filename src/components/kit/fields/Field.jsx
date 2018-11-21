// @flow
import * as React from 'react'
import cx from 'classnames'
import Spinner from 'components/kit/Spinner'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import chainCallbacks from 'utils/dom/chainCallbacks'
import FloatingLabel from './FloatingLabel'
import Label from './Label'
import Placeholder from './Placeholder'
import Underline from './Underline'
import ValidationLabel from './ValidationLabel'
import FieldContext from './FieldContext'
import styles from './Field.jss'

type Value = any

type ControlElementProps = {
  onFocus: Function,
  onBlur: Function,
  placeholder?: string,
  value?: Value,
  onChange: Function,
  disabled?: boolean,
}

type ControlElement = React.ComponentType<ControlElementProps>

type Props = {|
  ...InjectStylesProps,
  //
  additionalLabel?: string,
  children?: React.Element<ControlElement>,
  disabled?: boolean,
  error?: string,
  floatingLabel?: string,
  hint?: string,
  label?: string,
  larger?: boolean,
  loading?: boolean,
  loadingText?: string,
  placeholder?: string,
  noUnderline?: boolean,
  // Контрол пытается занять всю доступную ширину
  stretch?: boolean,
  // Uncontrolled/Controlled value
  value?: ?Value,
  onChange?: (?Value) => void,
  // Uncontrolled/Controlled focus
  focus?: boolean,
  onBlur?: FocusEvent => void,
  onFocus?: FocusEvent => void,
|}

type State = {|
  focus?: boolean,
  value?: Value,
|}

export type FieldProps = Props

class Field extends React.Component<Props, State> {
  static defaultProps = {
    loadingText: 'Loading',
    noUnderline: false,
  }

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
    filled: !!this.getValue(state),
  })

  get isControlledFocus() {
    return typeof this.props.focus !== 'undefined'
  }

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

  handleChange = value => {
    if (!this.isControlledValue) {
      this.setState({ value }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(value)
        }
      })
    } else if (typeof this.props.onChange === 'function') {
      this.props.onChange(value)
    }
  }

  render() {
    const {
      additionalLabel,
      children,
      classes,
      className,
      disabled,
      error,
      floatingLabel,
      hint,
      label,
      larger,
      loading,
      loadingText,
      placeholder,
      stretch,
      style,
      noUnderline,
      onKeyDown,
    } = this.props

    const control = React.Children.only(children)

    const combinedState = this.getState()
    const { focus, invalid, filled, value } = combinedState
    const hidePlaceholder = (floatingLabel && !focus) || filled
    const showFloatingLabel = !loading && !!floatingLabel
    const additionalText = !error && !hint && additionalLabel

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
              [classes.loading]: loading,
            },
            className
          )}
          style={style}
        >
          {showFloatingLabel && (
            <FloatingLabel larger={larger}>{floatingLabel}</FloatingLabel>
          )}
          {(error || hint) && (
            <ValidationLabel invalid={invalid} className={classes.rightLabel}>
              {error || hint}
            </ValidationLabel>
          )}
          {label && (
            <Label className={classes.label} additionalText={additionalText}>
              {label}
            </Label>
          )}
          {React.cloneElement(control, {
            value,
            focus,
            className: classes.control,
            placeholder: hidePlaceholder
              ? null
              : loading
                ? loadingText
                : placeholder,
            ref: this.handleControlRef,
            onFocus: chainCallbacks(this.handleFocus, control.props.onFocus),
            onBlur: chainCallbacks(this.handleBlur, control.props.onBlur),
            onKeyDown: chainCallbacks(onKeyDown, control.props.onKeyDown),
            onChange: chainCallbacks(this.handleChange, control.props.onChange),
            disabled: disabled || loading,
          })}
          {/* {placeholder && */}
          {/*! loading && ( */}
          {/* <Placeholder */}
          {/* active={focus} */}
          {/* className={cx( */}
          {/* classes.placeholder, */}
          {/* ((floatingLabel && !focus) || filled) && */}
          {/* classes.placeholderOff */}
          {/* )} */}
          {/* > */}
          {/* {placeholder} */}
          {/* </Placeholder> */}
          {/* )} */}
          {loading && (
            <Placeholder className={classes.placeholder}>
              {loading && (
                <Spinner className={classes.spinner} size={larger ? 20 : 18} />
              )}
              {loading && loadingText}
            </Placeholder>
          )}
          {!noUnderline && <Underline className={classes.underline} />}
        </div>
      </FieldContext.Provider>
    )
  }
}

export default injectStyles(styles)(Field)
