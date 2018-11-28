// @flow
import * as React from 'react'
import cx from 'classnames'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import Input, { type InputProps } from './Input'

const styles = {
  root: {
    width: '100%',
    color: 'inherit',
  },
}

type Value = string | number

type OnChangeCb = Event => void

type Props = {|
  ...InjectStylesProps,
  ...InputProps,
  //
  autoFocus?: boolean,
  controlRef?: ?Function,
  // Uncontrolled/Controlled value
  value?: Value,
  defaultValue?: Value,
  onChange?: OnChangeCb,
|}

interface Control {
  focus: () => void;
}

type State = {|
  value?: Value,
|}

export type TextBoxProps = Props

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
    if (this.isControlled) {
      if (typeof this.props.onChange === 'function') {
        return this.props.onChange(event.nativeEvent)
      }
    } else {
      const value = event.target.value

      this.setState({ value }, () => {
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(event.nativeEvent)
        }
      })
    }
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
        // FIXME временный фикс автофокуса в диалогах. Разобраться почему в CategoryEditDialog автофокус не срабатывает сразу после рендера
        setTimeout(() => {
          this.control.focus()
        }, 0)
      }
    }
  }

  render() {
    const {
      classes,
      className,
      value,
      defaultValue,
      autoFocus,
      controlRef,
      onChange,
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
        {...otherProps}
      />
    )
  }
}

export default injectStyles(styles)(TextBox)
