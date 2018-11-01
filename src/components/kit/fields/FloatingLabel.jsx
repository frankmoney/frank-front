import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import FieldContext from './FieldContext'
import { FONT_SIZE, FONT_SIZE_LARGER, LABEL_TOP } from './Field.jss'

const LABEL_FONT_SIZE = 14

const styles = {
  root: {
    color: 'rgba(32,40,74,0.2)',
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: LABEL_FONT_SIZE,
    transform: `translate(0, 19px) scale(${FONT_SIZE / LABEL_FONT_SIZE})`,
    transformOrigin: 'top left',
    transition:
      'color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, font-weight 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    cursor: 'text',
    pointerEvents: 'none',
  },
  shrink: {
    transform: `translate(0,${LABEL_TOP}px) scale(1)!important`,
    fontWeight: 500,
    color: 'rgba(37, 43, 67, 0.5)',
    lineHeight: LABEL_FONT_SIZE,
    pointerEvents: 'auto',
  },
  larger: {
    transform: `translate(0, 18px) scale(${FONT_SIZE_LARGER /
      LABEL_FONT_SIZE})`,
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
    '&$shrink': {
      color: 'rgba(37, 43, 67, 0.3)',
    },
  },
}

const FloatingLabel = ({
  classes,
  name,
  active,
  shrink,
  disabled,
  className,
  larger,
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
          larger && classes.larger,
          (shrink || (field.focus || field.filled)) && classes.shrink,
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
