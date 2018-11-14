import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    fontWeight: 500,
  },
}

const DialogMessageAccent = ({ classes, className, ...otherProps }) => (
  <span className={cx(classes.root, className)} {...otherProps} />
)

export default injectStyles(styles)(DialogMessageAccent)
