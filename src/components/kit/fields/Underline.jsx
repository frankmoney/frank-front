import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'
import React from 'react'
import FieldContext from './FieldContext'

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottom: '1px solid rgba(32, 40, 74, 0.12)',
    transition: theme.transition('border-bottom-color'),
  },
  hover: {
    borderColor: '1px solid rgba(32, 40, 74, 0.2)',
  },
  active: {
    '&:not($disabled)': {
      borderColor: '#484DE7',
      borderBottomWidth: 2,
    },
  },
  invalid: {
    '&:not($disabled)': {
      borderColor: '#C70000',
      borderBottomWidth: 2,
    },
  },
  disabled: {
    borderBottomStyle: 'dashed',
  },
})

const Underline = ({
  className,
  active,
  invalid,
  disabled,
  hover,
  classes,
}) => (
  <FieldContext.Consumer>
    {field => (
      <div
        className={cx(
          classes.root,
          !field.loading && (invalid || field.invalid) && classes.invalid,
          !field.loading && (active || field.focus) && classes.active,
          (disabled || field.disabled) && classes.disabled,
          (hover || field.hover) && classes.hover,
          className
        )}
      />
    )}
  </FieldContext.Consumer>
)

export default injectStyles(styles)(Underline)
