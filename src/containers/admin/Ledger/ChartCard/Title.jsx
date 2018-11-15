import React from 'react'
import cx from 'classnames'
import { injectStyles } from '@frankmoney/ui'

const styles = theme => ({
  root: {
    ...theme.fontRegular(22, 22),
    padding: 0,
    margin: [-1, 0, 30],
  },
})

const Title = ({ children, classes, className }) => (
  <h2 className={cx(classes.root, className)}>{children}</h2>
)

export default injectStyles(styles)(Title)
