import React from 'react'
import cx from 'classnames'
import { injectStyles } from 'utils/styles'

const styles = {
  root: {
    // no affect on total list height
    height: 0,
    width: '100%',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      borderTop: '1px solid rgba(0,0,0,0.1)',
    },
  },
}

const MenuItemSeparator = ({ classes, className }) => (
  <div className={cx(classes.root, className)} />
)

export default injectStyles(styles)(MenuItemSeparator)
