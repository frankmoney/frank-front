import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import * as R from 'ramda'
import { compose, withPropsOnChange } from 'recompose'
import { placeholderDefaultColor } from 'styles/const'

const LINE_HEIGHT = 26
const BOTTOM_PADDING = 14
const styles = theme => ({
  root: {
    width: '100%',
    padding: [0, 0, BOTTOM_PADDING, 0],
    background: 'transparent',
    resize: 'none',
    outline: 'none',
    border: 'none',
    ...theme.fontRegular(18, LINE_HEIGHT),
    fontFamily: 'inherit',
    color: 'inherit',
    minHeight: props =>
      `${(props.minLines || 1) * LINE_HEIGHT + BOTTOM_PADDING}px`,
    borderBottom: ({ focus, disableUnderline }) =>
      disableUnderline
        ? 'none'
        : `1px solid ${focus ? theme.colors.blue : '#E4E5E9'}`,
    '&::placeholder': {
      color: placeholderDefaultColor,
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
})

const TextBox = ({
  classes,
  className,
  value,
  focus,
  controlRef,
  children,
  expand,
  disableUnderline,
  minLines,
  autoComplete,
  ...otherProps
}) => {
  const props = {
    className: cx(
      className,
      autoComplete === false && classes.disableSafariAutoFill,
      classes.root
    ),
    autoComplete: autoComplete ? null : 'off',
    ...otherProps,
  }

  switch (expand) {
    case 'vertically':
      return <textarea ref={controlRef} value={value || ''} {...props} />

    default:
      return (
        <input ref={controlRef} type="text" value={value || ''} {...props} />
      )
  }
}

TextBox.defaultProps = {
  disableUnderline: false,
}

const adjustTextareaSize = element => {
  /* eslint-disable no-param-reassign */
  const scrollTop = element.scrollTop
  try {
    element.style.height = '0px'
    element.style.height = `${element.scrollHeight}px`

    // fix the "border adding pixels" issue
    element.scrollTop = 100000
    element.style.height = `${element.scrollHeight + element.scrollTop}px`
  } finally {
    element.scrollTop = scrollTop
  }
  /* eslint-enable no-param-reassign */
}

const DecoratedTextBox = compose(
  withPropsOnChange(['expand', 'onChange'], ({ expand, onChange }) => ({
    onChange:
      expand === 'vertically'
        ? (event, ...args) => {
            adjustTextareaSize(event.target)
            return onChange && onChange(event, ...args)
          }
        : onChange,
  })),
  injectStyles(styles)
)(TextBox)

export default class TextBoxWrap extends React.Component {
  state = { focused: false }

  focus() {
    if (this.control) {
      if (typeof this.control.focus === 'function') {
        this.control.focus()
      }
    }
  }

  controlRef = control => {
    if (this.control !== control) {
      if (this.control) {
        if (typeof this.control.removeEventListener === 'function') {
          this.control.removeEventListener('focusin', this.handleFocus)
          this.control.removeEventListener('focusout', this.handleBlur)
        }
      }

      this.control = control

      if (control) {
        if (typeof control.addEventListener === 'function') {
          control.addEventListener('focusin', this.handleFocus)
          control.addEventListener('focusout', this.handleBlur)
        }

        if (this.props.expand === 'vertically') {
          adjustTextareaSize(control)
        }
      }
    }
  }

  handleFocus = (...args) => {
    this.setState({ focused: true })
    return this.props.onFocus && this.props.onFocus(...args)
  }

  handleBlur = (...args) => {
    this.setState({ focused: false })
    return this.props.onBlur && this.props.onBlur(...args)
  }

  componentDidMount() {
    if (this.props.autoFocus && typeof this.control.focus === 'function') {
      this.control.focus()
    }
  }

  render() {
    const {
      value,
      autoFocus,
      focus,
      onFocus,
      onBlur,
      ...otherProps
    } = this.props
    const { focused } = this.state

    return (
      <DecoratedTextBox
        controlRef={this.controlRef}
        value={value}
        focus={R.isNil(focus) ? focused : focus}
        {...otherProps}
      />
    )
  }
}
