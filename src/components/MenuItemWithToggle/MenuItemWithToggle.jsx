import React from 'react'
import { injectStyles } from '@frankmoney/ui'
import { CustomMenuItem, Switch } from '@frankmoney/components'

const styles = {
  menuItem: {
    color: 'black',
  },
}

const MenuItemWithToggle = ({
  classes,
  toggleColor,
  onToggle,
  checked,
  children: label,
}) => (
  <CustomMenuItem className={classes.menuItem}>
    {label} <Switch color={toggleColor} checked={checked} onChange={onToggle} />
  </CustomMenuItem>
)

export default injectStyles(styles)(MenuItemWithToggle)
