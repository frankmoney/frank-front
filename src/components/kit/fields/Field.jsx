// @flow
import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { Spinner } from '@frankmoney/components'
import FloatingLabel from './FloatingLabel'
import Label from './Label'
import Placeholder from './Placeholder'
import Underline from './Underline'
import ValidationLabel from './ValidationLabel'
import FieldContext from './FieldContext'
import styles from './Field.jss'

type Props = {
  larger?: boolean,
  error?: string,
  hint?: string,
  label?: string,
  floatingLabel?: string,
  additionalLabel?: string,
  focus?: boolean,
  disabled?: boolean,
  loading?: boolean,
  loadingText: string,
}

const combineCallbacks = (...cb) => (...args) =>
  cb.forEach(fn => fn && fn(...args))

class Field extends React.Component<Props> {
  static defaultProps = {
    loadingText: 'Loading',
  }

  state = {
    focus: this.props.focus,
    filled: this.isFilledDefault,
  }

  get isFilledDefault() {
    return !!this.controlProps.value || !!this.controlProps.defaultValue
  }

  get controlProps() {
    return React.Children.only(this.props.children).props
  }

  get isControlledFocus() {
    return typeof this.props.focus !== 'undefined'
  }

  handleFocus = event => {
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
    if (typeof this.controlProps.controlRef === 'function') {
      this.controlProps.controlRef(control)
    }
  }

  handleChange = value => {
    const filled = !!value
    if (this.state.filled !== filled) {
      this.setState({ filled })
    }
  }

  handlePlaceholderClick = () => {
    this.control.focus()
  }

  componentDidUpdate() {
    const value = this.controlProps.value
    if (typeof value !== 'undefined') {
      const filled = !!value
      if (this.state.filled !== filled) {
        this.setState({ filled })
      }
    }
  }

  getState = (state = this.state) => ({
    focus: this.isControlledFocus ? this.props.focus : state.focus,
    invalid: !!this.props.error,
    disabled: this.props.disabled,
    loading: this.props.loading,
    filled: this.state.filled,
  })

  render() {
    const {
      classes,
      className,
      floatingLabel,
      larger,
      loading,
      loadingText,
      label,
      additionalLabel,
      error,
      hint,
      disabled,
      placeholder,
      style,
      children,
    } = this.props
    const control = React.Children.only(children)
    const { focus, invalid, filled } = this.getState()

    return (
      <FieldContext.Provider value={this.getState()}>
        <div
          className={cx(
            classes.root,
            larger && classes.larger,
            focus && classes.focus,
            filled && classes.filled,
            disabled && classes.disabled,
            loading && classes.loading,
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
            className: classes.control,
            controlRef: this.handleControlRef,
            onFocus: combineCallbacks(this.handleFocus, control.props.onFocus),
            onBlur: combineCallbacks(this.handleBlur, control.props.onBlur),
            onChange: combineCallbacks(
              this.handleChange,
              control.props.onChange
            ),
            disabled: disabled || loading,
          })}
          {placeholder &&
            !loading && (
              <Placeholder
                active={focus}
                className={cx(
                  classes.placeholder,
                  ((floatingLabel && !focus) || filled) &&
                    classes.placeholderOff
                )}
              >
                {placeholder}
              </Placeholder>
            )}
          {loading && (
            <Placeholder className={classes.placeholder}>
              {loading && (
                <Spinner className={classes.spinner} size={larger ? 20 : 18} />
              )}
              {loading && loadingText}
            </Placeholder>
          )}
          <Underline className={classes.underline} />
        </div>
      </FieldContext.Provider>
    )
  }
}

export default injectStyles(styles)(Field)
