import React from 'react'
import { CheckedMenuList, HeaderFilter } from '@frankmoney/components'
import { injectStyles } from '@frankmoney/ui'
import * as R from 'ramda'
import CategoryLabel from 'components/CategoryLabel'
import colors from 'styles/colors'
import CategorySelectItem from './CategorySelectItem'

const styles = {
  root: {},
}

const items = [
  {
    value: 'uncategorized',
    name: 'Uncategorized',
    color: 'rgba(37, 43, 67, 0.2)',
  },
  { value: 'marketing', name: 'Marketing', color: colors.purple },
]

const CategorySelect = ({ classes, size = 16, value, ...otherProps }) => {
  const item = R.find(R.propEq('value', value), items) || items[0]
  const selection = (
    <CategoryLabel size={size} color={item.color} name={item.name} />
  )

  return (
    <HeaderFilter selectedValue={selection} {...otherProps}>
      <CheckedMenuList className={classes.root}>
        {items.map(({ value: itemValue, name, color }) => (
          <CategorySelectItem
            key={itemValue}
            value={itemValue}
            size={size}
            name={name}
            color={color}
            selected={value === itemValue}
          />
        ))}
      </CheckedMenuList>
    </HeaderFilter>
  )
}

export default injectStyles(styles)(CategorySelect)
