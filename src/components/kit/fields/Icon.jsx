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
    '& $additionalText': {
      color: 'rgba(72, 77, 231, 0.5)',
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
  additionalText: {
    fontWeight: 400,
    marginLeft: 5,
    color: 'rgba(37, 43, 67, 0.3)',
  },
}

const IconLabel = ({
  classes,
  name,
  active,
  invalid,
  disabled,
  className,
  children,
  additionalText,
}) => (
  <FieldContext.Consumer>
    {field => (
      <label
        htmlFor={name}
        className={cx(
          classes.root,
          {
            [classes.active]: active || field.focus,
            [classes.invalid]: invalid || (field.invalid && field.focus),
            [classes.disabled]: disabled || field.disabled,
          },
          className
        )}
      >
        {children}
        {additionalText && (
          <span className={classes.additionalText}>{additionalText}</span>
        )}
      </label>
    )}
  </FieldContext.Consumer>
)

export default injectStyles(styles)(IconLabel)
