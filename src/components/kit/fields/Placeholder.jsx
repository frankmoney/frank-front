import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'
import { placeholderDefaultColor, placeholderActiveColor } from 'styles/const'
import FieldContext from './FieldContext'

const styles = theme => ({
  root: {
    color: placeholderDefaultColor,
    whiteSpace: 'wrap',
    transition: [theme.transition('opacity'), theme.transition('color')].join(
      ','
    ),
    font: 'inherit',
    pointerEvents: 'none',
    opacity: 1,
  },
  active: {
    color: placeholderActiveColor,
  },
})

const Placeholder = ({
  classes,
  active,
  className,
  children,
  theme,
  ...otherProps
}) => (
  <FieldContext.Consumer>
    {field => (
      <span
        className={cx(
          classes.root,
          {
            [classes.active]: active || field.focus,
          },
          className
        )}
        {...otherProps}
      >
        {children}
      </span>
    )}
  </FieldContext.Consumer>
)

export default injectStyles(styles)(Placeholder)
