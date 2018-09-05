import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = theme => ({
  root: {
    ...theme.fontSemibold(60, 60),
    textAlign: 'center',
  },
})

const StepTitle = ({ className, classes, children }) => (
  <div className={cx(classes.root, className)}>{children}</div>
)

export default injectStyles(styles)(StepTitle)
