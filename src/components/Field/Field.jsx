import React, { isValidElement, cloneElement } from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import FieldLabel from 'components/FieldLabel'

const styles = {
  root: {
    display: props => (props.stretch ? 'block' : 'inline-block'),
  },
}

class Field extends React.Component {
  state = {
    fieldFocused: false,
    controlFocused: false,
  }

  childrenRef = children => {
    this.children = children
  }

  handleClick = (...args) => {
    if (this.children) {
      if (typeof this.children.focus === 'function') {
        this.children.focus()
      }
    }

    return this.props.onClick && this.props.onClick(...args)
  }

  handleKeyDown = (...args) => {
    this.props.onKeyDown && this.props.onKeyDown(...args)
  }

  handleMouseDown = (...args) => {
    this.setState({ fieldFocused: true }, () => {
      if (this.state.fieldFocused || this.state.controlFocused) {
        if (this.children && typeof this.children.focus === 'function') {
          this.children.focus()
        }
      }
    })

    return this.props.onMouseDown && this.props.onMouseDown(...args)
  }

  handleMouseUp = (...args) => {
    this.setState({ fieldFocused: false }, () => {
      if (this.state.fieldFocused || this.state.controlFocused) {
        if (this.children && typeof this.children.focus === 'function') {
          this.children.focus()
        }
      }
    })

    return this.props.onMouseUp && this.props.onMouseUp(...args)
  }

  handleFocus = (...args) => {
    this.setState({ controlFocused: true })
    return this.props.onFocus && this.props.onFocus(...args)
  }

  handleBlur = (...args) => {
    this.setState({ controlFocused: false })
    return this.props.onBlur && this.props.onBlur(...args)
  }

  render() {
    const {
      classes,
      className,
      label,
      title,
      hint,
      children,
      stretch,
      // omit
      onClick,
      onFocus,
      onBlur,
      ...otherProps
    } = this.props

    const { fieldFocused, controlFocused } = this.state

    const focus = fieldFocused || controlFocused

    let labelNode
    if (this.props.label) {
      labelNode = this.props.label
    } else if (title) {
      labelNode = <FieldLabel title={title} hint={hint} />
    }

    return (
      // label should be here, but: https://github.com/w3c/html/issues/734
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className={cx(classes.root, className)} {...otherProps}>
        {labelNode &&
          cloneElement(labelNode, {
            focus,
            onClick: this.handleClick,
            onMouseDown: this.handleMouseDown,
            onMouseUp: this.handleMouseUp,
          })}
        {children &&
          cloneElement(children, {
            ref: this.childrenRef,
            focus,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onKeyDown: this.handleKeyDown,
          })}
      </div>
    )
  }
}

export default injectStyles(styles)(Field)
