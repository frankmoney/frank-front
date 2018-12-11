// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    ...theme.fontSemibold(40),
    color: '#20284A',
    marginBottom: 54,
    width: '100%',
  },
  withMessage: {
    marginBottom: 25,
  },
})

const DialogTitle = ({ classes, className, withMessage, ...otherProps }) => (
  <div
    className={cx(classes.root, withMessage && classes.withMessage, className)}
    {...otherProps}
  />
)

export default injectStyles(styles)(DialogTitle)
