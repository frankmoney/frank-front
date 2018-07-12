import React from 'react'
import { CheckedMenuItem } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import CategoryLabel from 'components/CategoryLabel'

const styles = {
  root: {},
}

const CategorySelectItem = ({ classes, size, name, color, ...otherProps }) => (
  <CheckedMenuItem {...otherProps}>
    <CategoryLabel size={size} color={color} name={name} />
  </CheckedMenuItem>
)

export default injectStyles(styles)(CategorySelectItem)
