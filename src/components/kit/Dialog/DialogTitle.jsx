// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    ...theme.fontSemibold(40),
    color: '#20284A',
    marginBottom: 25,
    width: '100%',
  },
})

const DialogTitle = ({ classes, className, ...otherProps }) => (
  <div className={cx(classes.root, className)} {...otherProps} />
)

export default injectStyles(styles)(DialogTitle)
