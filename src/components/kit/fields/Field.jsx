// @flow strict-local
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
  additionalLabel?: string,
  children?: React.Element<ControlElement>,
  defaultValue?: Value,
  disabled?: boolean,
  error?: boolean | string,
  floatingLabel?: string,
  hint?: string,
  label?: string,
  larger?: boolean,
  loading?: boolean,
  loadingText?: string,
  noUnderline?: boolean,
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
      autoFocus,
      noUnderline,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      controlRef,
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
            autoFocus,
            className: classes.control,
            placeholder: hidePlaceholder
              ? null
              : loading
                ? loadingText
                : placeholder,
            controlRef,
            ref: this.handleControlRef,
            onFocus: chainCallbacks(this.handleFocus, control.props.onFocus),
            onBlur: chainCallbacks(this.handleBlur, control.props.onBlur),
            onKeyUp: chainCallbacks(onKeyUp, control.props.onKeyUp),
            onKeyDown: chainCallbacks(onKeyDown, control.props.onKeyDown),
            onKeyPress: chainCallbacks(onKeyPress, control.props.onKeyPress),
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
