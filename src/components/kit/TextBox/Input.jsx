// @flow
import * as React from 'react'
import { isNil } from 'ramda'
import cx from 'classnames'
import mixins from 'styles/mixins'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import unsafeFindDOMNode from 'utils/dom/unsafeFindDOMNode'
import { placeholderDefaultColor, placeholderActiveColor } from 'styles/const'
import { adjustTextareaSize } from './utils'
import NumericInput from './NumericInput'

const styles = theme => ({
  root: {
    width: '100%',
    padding: 0,
    background: 'transparent',
    resize: 'none',
    outline: 'none',
    border: 'none',
    borderRadius: 0,
    fontSize: 'inherit',
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    ...mixins.placeholder({
      color: placeholderDefaultColor,
      whiteSpace: 'wrap',
      transition: theme.transition('color'),
    }),
    '&:focus, &$focus': {
      ...mixins.placeholder({
        color: placeholderActiveColor,
      }),
    },
    '&:disabled': {
      color: 'rgba(37, 43, 67, 0.2)',
    },
  },
  disableSafariAutoFill: {
    '&::-webkit-contacts-auto-fill-button, &::-webkit-credentials-auto-fill-button': {
      visibility: 'hidden',
      pointerEvents: 'none',
      position: 'absolute',
      right: 0,
    },
  },
  focus: {},
})

type OnChangeCb = any => void

type InputType = 'text' | 'password' | 'number' // TODO

const formattedValue = value => (isNil(value) ? '' : value)

export type InputProps = {|
  // устанавливает состояние фокуса(стили)
  focus?: boolean,
  controlRef?: ?Function,
  multiLine?: boolean,
  readOnly?: boolean,
  disabled?: boolean,
  type?: InputType,
  minLines?: number,
  // TODO disableEnter используется сейчас в комбинации с multiline чтобы получить инпут который переносится по строкам
  // в будущем нужно дорабоатать сингллайн инпут чтобы тот переносился по строкам а в остальном был обычным сингллайн инпутом
  // сейчас все равно можно вставить содержимое с переносами на новую строку для комбинации mulitline+disableEnter
  disableEnter?: boolean,
  name?: string,
  disableAutoComplete?: boolean,
  // Controlled value
  onChange: OnChangeCb,
  onKeyPress?: KeyboardEvent => void,
  value: string | number,
  numeric?: boolean,
|}

type Props = {|
  ...InjectStylesProps,
  ...InputProps,
|}

class Input extends React.Component<Props> {
  static defaultProps = {
    type: 'text',
    disableEnter: false,
    disableAutoComplete: false,
  }

  componentDidMount() {
    if (this.props.multiLine) {
      adjustTextareaSize(unsafeFindDOMNode(this), this.props)
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.multiLine !== this.props.multiLine ||
      (this.props.multiLine && prevProps.value !== this.props.value)
    ) {
      if (this.props.multiLine) {
        adjustTextareaSize(unsafeFindDOMNode(this), this.props)
      }
    }
  }

  handleKeyPress = event => {
    if (this.props.disableEnter && event.key === 'Enter') {
      event.preventDefault()
      return false
    }

    if (typeof this.props.onKeyPress === 'function') {
      return this.props.onKeyPress(event)
    }
  }

  render() {
    const {
      children,
      classes,
      className,
      controlRef,
      multiLine,
      onKeyPress,
      value,
      type,
      focus,
      minLines,
      disableEnter,
      disableAutoComplete,
      numeric,
      // Omit
      autoComplete: autoCompleteProp,
      //
      ...otherProps
    } = this.props

    const autoComplete = disableAutoComplete ? 'off' : null
    const cls = cx(
      classes.root,
      {
        [classes.focus]: focus,
        [classes.disableSafariAutoFill]: disableAutoComplete,
      },
      className
    )

    if (multiLine) {
      return (
        <textarea
          ref={controlRef}
          value={value || ''}
          onChange={this.handleChange} // FIXME: there is now handleChange in Input
          className={cls}
          autoComplete={autoComplete}
          onKeyPress={this.handleKeyPress}
          {...otherProps}
        />
      )
    }

    const InputComponent = numeric ? NumericInput : 'input'

    return (
      <InputComponent
        ref={controlRef}
        type={type}
        value={formattedValue(value)}
        onChange={this.handleChange}
        className={cls}
        autoComplete={autoComplete}
        {...otherProps}
      />
    )
  }
}

export default injectStyles(styles)(Input)
