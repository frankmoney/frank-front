import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import FieldLabel from 'components/FieldLabel'
import renderProp from 'utils/renderProp'

const styles = {
  root: {
    display: props => (props.stretch ? 'block' : 'inline-block'),
  },
}

class Field extends React.Component {
  state = { fieldFocused: false, controlFocused: false }

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

  handleFocus = () => {
    this.setState({ controlFocused: true })
  }

  handleBlur = () => {
    this.setState({ controlFocused: false })
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
      labelNode = label
    } else if (title) {
      labelNode = <FieldLabel title={title} hint={hint} />
    }

    return (
      // label should be here, but: https://github.com/w3c/html/issues/734
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={cx(className, classes.root)}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        {...otherProps}
      >
        {labelNode && renderProp(labelNode, { focus })}
        {renderProp(children, {
          ref: this.childrenRef,
          focus,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
        })}
      </div>
    )
  }
}

export default injectStyles(styles)(Field)
