import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'
import Sidebar from './Sidebar'

const styles = theme => ({
  '@global body': {
    background: theme.background,
  },
  root: {
    width: '100%',
    minWidth: 1024,
    background: theme.background,
  },
})

const AdminLayout = ({ classes, className, sidebarProps, ...props }) => (
  <Sidebar
    className={cx(classes.root, className)}
    {...sidebarProps}
    {...props}
  />
)

export default injectStyles(styles)(AdminLayout)
