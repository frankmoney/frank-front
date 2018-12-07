import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import FieldContext from './FieldContext'

const styles = {
  root: {
    marginRight: 15,
    color: 'rgba(37, 43, 67, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    color: '#484DE7',
  },
}

const Adornment = ({ className, classes, children }) => (
  <FieldContext>
    {field => (
      <div
        className={cx(
          classes.root,
          { [classes.active]: field.focus },
          className
        )}
      >
        {typeof children === 'function' ? children(field) : children}
      </div>
    )}
  </FieldContext>
)

export default injectStyles(styles)(Adornment)
