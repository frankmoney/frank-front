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

type Props = {|
  ...InjectStylesProps,
  //
  additionalLabel?: string,
  children?: React.Element<any>,
  disabled?: boolean,
  error?: string,
  floatingLabel?: string,
  focus?: boolean,
  hint?: string,
  label?: string,
  larger?: boolean,
  loading?: boolean,
  loadingText?: string,
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

class Field extends React.Component<Props, State> {
  static defaultProps = {
    loadingText: 'Loading',
  }

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
    invalid: !!this.props.error,
    disabled: this.props.disabled,
    loading: this.props.loading,
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
  }

  handleChange = value => {
    if (!this.isControlledValue) {
      const filled = !!value
      this.setState({ value, filled }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(value)
        }
      })
    } else if (typeof this.props.onChange === 'function') {
      this.props.onChange(value)
    }
  }

  handlePlaceholderClick = () => {
    this.control.focus()
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
    } = this.props

    const control = React.Children.only(children)

    const { focus, invalid, filled, value } = this.getState()

    return (
      <FieldContext.Provider value={this.getState()}>
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
          {!loading &&
            floatingLabel && (
              <FloatingLabel larger={larger}>{floatingLabel}</FloatingLabel>
            )}
          {(error || hint) && (
            <ValidationLabel invalid={invalid} className={classes.rightLabel}>
              {error || hint}
            </ValidationLabel>
          )}
          {label && (
            <Label
              className={classes.label}
              additionalText={!error && !hint && additionalLabel}
            >
              {label}
            </Label>
          )}
          {React.cloneElement(control, {
            value,
            className: classes.control,
            placeholder: loading ? loadingText : placeholder,
            ref: this.handleControlRef,
            onFocus: chainCallbacks(this.handleFocus, control.props.onFocus),
            onBlur: chainCallbacks(this.handleBlur, control.props.onBlur),
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
          {/* {loading && ( */}
          {/* <Placeholder className={classes.placeholder}> */}
          {/* {loading && ( */}
          {/* <Spinner className={classes.spinner} size={larger ? 20 : 18} /> */}
          {/* )} */}
          {/* {loading && loadingText} */}
          {/* </Placeholder> */}
          {/* )} */}
          <Underline className={classes.underline} />
        </div>
      </FieldContext.Provider>
    )
  }
}

export default injectStyles(styles)(Field)
