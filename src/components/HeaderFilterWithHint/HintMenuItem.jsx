import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { CustomMenuItem } from '@frankmoney/components'

const styles = {
  menuItem: {
    fontWeight: 500,
  },
}

const HintMenuItem = ({ classes, children: label }) => (
  <CustomMenuItem className={classes.menuItem} disabled>
    {label}...
  </CustomMenuItem>
)

export default injectStyles(styles)(HintMenuItem)
