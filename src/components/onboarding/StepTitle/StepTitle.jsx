import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    ...theme.fontSemibold(60, 60),
    textAlign: 'center',
    color: '#20284A',
  },
})

const StepTitle = ({ className, classes, children }) => (
  <div className={cx(classes.root, className)}>{children}</div>
)

export default injectStyles(styles)(StepTitle)
