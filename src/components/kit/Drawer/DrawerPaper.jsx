import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import Paper from 'components/kit/Paper'

const styles = {
  root: {
    width: 600,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
}

const DrawerPaper = ({ classes, className, theme, type, ...otherProps }) => (
  <Paper
    className={cx(classes.root, className)}
    type="drawer"
    role="dialog"
    {...otherProps}
  />
)

export default injectStyles(styles)(DrawerPaper)
