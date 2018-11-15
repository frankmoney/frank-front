// @flow strict-local
import React from 'react'
import cx from 'classnames'
import Paper from 'components/kit/Paper'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    width: 650,
    padding: 40,
  },
}

const DialogPaper = ({ classes, className, theme, type, ...otherProps }) => (
  <Paper
    className={cx(classes.root, className)}
    type="modal"
    role="dialog"
    {...otherProps}
  />
)

export default injectStyles(styles)(DialogPaper)
