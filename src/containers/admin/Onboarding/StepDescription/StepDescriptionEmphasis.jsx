import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = theme => ({
  root: {
    ...theme.fontSemibold(22, 34),
    marginTop: 25,
  },
})

const StepDescriptionEmphasis = ({ className, classes, children }) => (
  <span className={cx(classes.root, className)}>{children}</span>
)

export default injectStyles(styles)(StepDescriptionEmphasis)
