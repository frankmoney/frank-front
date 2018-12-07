import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = theme => ({
  root: {
    ...theme.fontSemibold(40, 46),
    margin: [-8, 0, 0],
  },
})

const CardTitle = ({ classes, className, text }) => (
  <h2 className={cx(classes.root, className)}>{text}</h2>
)

export default injectStyles(styles)(CardTitle)
