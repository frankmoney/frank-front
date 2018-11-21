// @flow
import * as React from 'react'
import cx from 'classnames'
import mixins from 'styles/mixins'
import { injectStyles, type InjectStylesProps } from 'utils/styles'
import unsafeFindDOMNode from 'utils/dom/unsafeFindDOMNode'
import { placeholderDefaultColor, placeholderActiveColor } from 'styles/const'
import { adjustTextareaSize } from './utils'

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
  focus: {},
})

type OnChangeCb = any => void

type InputType = 'text' | 'password' | 'number' // TODO

type Props = {|
  ...InjectStylesProps,
  // устанавливает состояние фокуса(стили)
  focus?: boolean,
  controlRef?: ?Function,
  multiLine?: boolean,
  readOnly?: boolean,
  disabled?: boolean,
  type: InputType,
  minLines?: number,
  name?: string,
  // Controlled value
  onChange: OnChangeCb,
  value: string | number,
|}

export type InputProps = Props

class Input extends React.Component<Props> {
  static defaultProps = {
    type: 'text',
  }

  componentDidMount() {
    if (this.props.multiLine) {
      adjustTextareaSize(unsafeFindDOMNode(this), this.props)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.multiLine !== this.props.multiLine) {
      if (this.props.multiLine) {
        adjustTextareaSize(unsafeFindDOMNode(this), this.props)
      }
    }
  }

  handleChange = event => {
    if (this.props.multiLine) {
      adjustTextareaSize(event.target, this.props)
    }

    this.props.onChange(event)
  }

  render() {
    const {
      children,
      classes,
      className,
      controlRef,
      multiLine,
      onChange,
      value,
      type,
      focus,
      minLines,
      // Omit
      theme,
      //
      ...otherProps
    } = this.props

    const cls = cx(classes.root, { [classes.focus]: focus }, className)

    if (multiLine) {
      return (
        <textarea
          ref={controlRef}
          value={value || ''}
          onChange={this.handleChange}
          className={cls}
          {...otherProps}
        />
      )
    }

    return (
      <input
        ref={controlRef}
        type={type}
        value={value || ''}
        onChange={this.handleChange}
        className={cls}
        {...otherProps}
      />
    )
  }
}

export default injectStyles(styles)(Input)
