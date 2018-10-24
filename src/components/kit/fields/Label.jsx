import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import FieldContext from './FieldContext'
import { LABEL_FONT_SIZE } from './Field.jss'

const styles = {
  root: {
    color: 'rgba(37, 43, 67, 0.5)',
    fontSize: LABEL_FONT_SIZE,
    lineHeight: LABEL_FONT_SIZE,
    fontWeight: 500,
    transition:
      'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, font-weight 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    cursor: 'text',
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
    color: 'rgba(37, 43, 67, 0.3)',
  },
}

const Label = ({
  classes,
  name,
  active,
  invalid,
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
          (invalid || (field.invalid && field.focus)) && classes.invalid,
          (disabled || field.disabled) && classes.disabled,
          className
        )}
      >
        {children}
      </label>
    )}
  </FieldContext.Consumer>
)

export default injectStyles(styles)(Label)
