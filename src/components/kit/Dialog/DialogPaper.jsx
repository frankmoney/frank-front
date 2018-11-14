import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import Paper from 'components/kit/Paper'

const styles = {
  root: {
    width: 650,
    padding: 40,
  },
}

const DialogPaper = ({ classes, className, theme, type, ...otherProps }) => (
  <Paper className={cx(classes.root, className)} type="modal" {...otherProps} />
)

export default injectStyles(styles)(DialogPaper)
