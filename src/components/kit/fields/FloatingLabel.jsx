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
    transform: props =>
      `translate(${props.marginLeft || 0}px, 19px) scale(${FONT_SIZE /
        LABEL_FONT_SIZE})`,
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

let FloatingLabel = ({
  classes,
  name,
  active,
  shrink,
  disabled,
  className,
  larger,
  invalid,
  children,
}) => (
  <label
    htmlFor={name}
    className={cx(
      classes.root,
      {
        [classes.active]: active,
        [classes.invalid]: invalid,
        [classes.larger]: larger,
        [classes.shrink]: shrink,
        [classes.disabled]: disabled,
      },
      className
    )}
  >
    {children}
  </label>
)

FloatingLabel = injectStyles(styles)(FloatingLabel)

const FieldFloatingLabel = props => (
  <FieldContext.Consumer>
    {field => (
      <FloatingLabel
        marginLeft={field.hasAdornment ? field.adornmentWidth : 0}
        active={field.focus}
        invalid={field.invalid && field.focus}
        shrink={field.focus || field.filled}
        disabled={field.disabled}
        {...props}
      />
    )}
  </FieldContext.Consumer>
)

export default FieldFloatingLabel
