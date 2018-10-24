import React from 'react'
import { findDOMNode } from 'react-dom'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import mixins from 'styles/mixins'
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
    lineHeight: 'inherit',
    letterSpacing: 'inherit',
    ...mixins.placeholder({
      color: '#20284A',
      opacity: 0.2,
      whiteSpace: 'wrap',
      transition: theme.transition('opacity'),
    }),
    '&:focus': {
      ...mixins.placeholder({
        opacity: 0.1,
      }),
    },
    '&:disabled': {
      color: 'rgba(37, 43, 67, 0.2)',
    },
  },
})

class Input extends React.Component {
  componentDidMount() {
    if (this.props.multiLine) {
      // eslint-disable-next-line react/no-find-dom-node
      adjustTextareaSize(findDOMNode(this), this.props)
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.multiLine !== this.props.multiLine) {
      if (this.props.multiLine) {
        // eslint-disable-next-line react/no-find-dom-node
        adjustTextareaSize(findDOMNode(this), this.props)
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
      classes,
      className,
      value,
      focus,
      controlRef,
      children,
      multiLine,
      minLines,
      onChange,
      ...otherProps
    } = this.props

    const cls = cx(classes.root, className)

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
        type="text"
        value={value || ''}
        onChange={this.handleChange}
        className={cls}
        {...otherProps}
      />
    )
  }
}

export default injectStyles(styles)(Input)
