// @flow
import * as React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Input from './Input'

const styles = {
  root: {
    width: '100%',
    color: 'inherit',
  },
}

type Value = string | number

type OnChangeCb = any => void

type UnusedProps = {|
  focus?: any,
|}

type Props = {|
  ...InjectStylesProps,
  ...UnusedProps, // FIXME
  //
  autoFocus?: boolean,
  controlRef?: ?Function,
  defaultValue?: Value,
  id?: string,
  name?: string,
  onChange?: OnChangeCb,
  value?: Value,
|}

interface Control {
  focus: () => void;
}

type State = {|
  value?: Value,
|}

class TextBox extends React.Component<Props, State> {
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

  // flowlint-next-line unsafe-getters-setters:off
  get isControlled() {
    return typeof this.props.value !== 'undefined'
  }

  // eslint-disable-next-line consistent-return
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

  control: Control

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
      onChange,
      // Omit
      focus,
      //
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
