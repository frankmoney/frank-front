import React from 'react'
import { CheckedMenuItem } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import CategoryLabel from 'components/CategoryLabel'

const styles = {
  root: {},
}

const CategorySelectItem = ({
  classes,
  color,
  iconClassName,
  name,
  ...otherProps
}) => (
  <CheckedMenuItem {...otherProps}>
    <CategoryLabel iconClassName={iconClassName} color={color} name={name} />
  </CheckedMenuItem>
)

export default injectStyles(styles)(CategorySelectItem)
