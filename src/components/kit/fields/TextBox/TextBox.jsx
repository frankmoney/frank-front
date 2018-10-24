/* eslint-disable consistent-return,jsx-a11y/label-has-for */
import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import Input from './Input'

const styles = {
  root: {
    width: '100%',
    color: 'inherit',
  },
}

class TextBox extends React.Component {
  static defaultProps = {
    defaultValue: '',
  }

  state = {
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
      onChange,
      ...otherProps
    } = this.props

    const combinedValue = this.isControlled ? value : this.state.value

    return (
      <Input
        className={cx(classes.root, className)}
        controlRef={this.handleInputRef}
        value={combinedValue}
        onChange={this.handleChange}
        id={id}
        name={name}
        {...otherProps}
      />
    )
  }
}

export default injectStyles(styles)(TextBox)
