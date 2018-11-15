// @flow strict-local
import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    fontSize: 40,
    lineHeight: 46,
    marginLeft: -3,
    color: '#20284A',
    fontWeight: 600,
    marginBottom: 25,
    width: '100%',
  },
}

const DialogTitle = ({ classes, className, ...otherProps }) => (
  <div className={cx(classes.root, className)} {...otherProps} />
)

export default injectStyles(styles)(DialogTitle)
