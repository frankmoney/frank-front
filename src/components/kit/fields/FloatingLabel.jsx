import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import FieldContext from './FieldContext'

const styles = {
  root: {
    color: 'rgba(32,40,74,0.2)',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: 'translate(0, 29px) scale(1)',
    transformOrigin: 'top left',
    transition:
      'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, font-weight 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    cursor: 'text',
  },
  floated: {
    transform: 'translate(0, 0) scale(0.63)',
    fontWeight: 500,
    color: 'rgba(37, 43, 67, 0.5)',
  },
  active: {
    '&:not($disabled)': {
      color: '#4C51F3',
    },
  },
  invalid: {
    '&:not($disabled)': {
      color: '#C70000',
    },
  },
  disabled: {
    '&$floated': {
      color: 'rgba(37, 43, 67, 0.3)',
    },
  },
}

const FloatingLabel = ({
  classes,
  name,
  active,
  floated,
  disabled,
  className,
  children,
}) => (
  <FieldContext.Consumer>
    {field => (
      <label
        htmlFor={name}
        className={cx(
          classes.root,
          (active || field.focus) && classes.active,
          field.invalid && field.focus && classes.invalid,
          (floated || (field.focus || field.filled)) && classes.floated,
          (disabled || field.disabled) && classes.disabled,
          className
        )}
      >
        {children}
      </label>
    )}
  </FieldContext.Consumer>
)

export default injectStyles(styles)(FloatingLabel)
