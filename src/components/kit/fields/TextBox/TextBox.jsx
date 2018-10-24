/* eslint-disable consistent-return,jsx-a11y/label-has-for */
import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import Input from './Input'

const styles = {
  root: {
    position: 'relative',
  },
  input: {
    width: '100%',
    color: 'inherit',
  },
  focused: {
    composes: ['$labelActive', '$hintActive'],
    '& $label': {
      fontWeight: 500,
      color: '#484DE7',
    },
  },
}

class TextBox extends React.Component {
  static defaultProps = {
    defaultValue: '',
    underline: false,
  }

  state = {
    focused: this.props.focus,
    value: this.props.defaultValue,
  }

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus()
    }
  }

  get isControlled() {
    return typeof this.props.value !== 'undefined'
  }

  get isControlledFocus() {
    return typeof this.props.focus !== 'undefined'
  }

  handleFocus = event => {
    if (this.isControlled) {
      if (typeof this.props.onFocus === 'function') {
        return this.props.onFocus(event)
      }
    }

    this.setState({ focused: true }, () => {
      if (typeof this.props.onFocus === 'function') {
        this.props.onFocus(event)
      }
    })
  }

  handleBlur = event => {
    if (this.isControlledFocus) {
      if (typeof this.props.onBlur === 'function') {
        return this.props.onBlur(event)
      }
    }

    this.setState({ focused: false }, () => {
      if (typeof this.props.onBlur === 'function') {
        this.props.onBlur(event)
      }
    })
  }

  handleChange = event => {
    const value = event.target.value

    if (this.isControlled) {
      if (typeof this.props.onChange === 'function') {
        return this.props.onChange(value)
      }
    }

    this.setState({ value }, () => {
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(value)
      }
    })
  }

  handleInputRef = control => {
    this.control = control
    if (typeof this.props.controlRef === 'function') {
      this.props.controlRef(control)
    }
  }

  focus() {
    if (this.control) {
      if (typeof this.control.focus === 'function') {
        this.control.focus()
      }
    }
  }

  render() {
    const {
      classes,
      className,
      id,
      name,
      value,
      defaultValue,
      autoFocus,
      controlRef,
      focus,
      onFocus,
      onBlur,
      onChange,
      ...otherProps
    } = this.props

    const combinedValue = this.isControlled ? value : this.state.value
    const combinedFocus = this.isControlledFocus ? focus : this.state.focused

    return (
      <div
        className={cx(
          classes.root,
          this.state.focused && classes.focused,
          combinedValue && classes.filled,
          className
        )}
      >
        <Input
          controlRef={this.handleInputRef}
          value={combinedValue}
          focus={combinedFocus}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className={classes.input}
          id={id}
          name={name}
          {...otherProps}
        />
      </div>
    )
  }
}

export default injectStyles(styles)(TextBox)
