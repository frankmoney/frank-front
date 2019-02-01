import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import cx from 'classnames'

const styles = theme => ({
  root: {
    ...theme.fontRegular(22, 34),
    marginTop: 25,
    textAlign: 'center',
    color: 'rgba(32, 40, 74, 0.9)',
  },
})

const StepDescription = ({ className, classes, children }) => (
  <div className={cx(classes.root, className)}>{children}</div>
)

export default injectStyles(styles)(StepDescription)